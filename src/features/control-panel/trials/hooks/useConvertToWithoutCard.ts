import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const TRIAL_DURATION_DAYS = 15;

interface ConvertToWithoutCardParams {
  businessId: string;
}

/**
 * Hook to convert a pending_checkout CT trial to ST (without card)
 * Only works for trials that haven't completed Stripe checkout yet
 */
export const useConvertToWithoutCard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ businessId }: ConvertToWithoutCardParams) => {
      // 1. Get current trial tracking
      const { data: trialTracking, error: trackingError } = await supabase
        .from("trial_tracking")
        .select("*")
        .eq("business_id", businessId)
        .maybeSingle();

      if (trackingError) {
        throw new Error("Error al obtener información del trial");
      }

      if (!trialTracking) {
        throw new Error("No se encontró un trial para este negocio");
      }

      // 2. Validate trial type
      if (trialTracking.trial_type !== "with_card") {
        throw new Error("Este trial ya es sin tarjeta");
      }

      // 3. Only allow pending_checkout status
      if (trialTracking.status !== "pending_checkout") {
        throw new Error(
          `Solo se pueden convertir trials que no han completado el checkout. Estado actual: ${trialTracking.status}`
        );
      }

      // 4. Calculate trial dates
      const now = new Date();
      const trialEndsAt = new Date(now.getTime() + TRIAL_DURATION_DAYS * 24 * 60 * 60 * 1000);

      // 5. Update trial_tracking
      const { error: updateError } = await supabase
        .from("trial_tracking")
        .update({
          trial_type: "without_card",
          status: "active",
          trial_started_at: now.toISOString(),
          trial_ends_at: trialEndsAt.toISOString(),
          stripe_subscription_id: null,
          stripe_checkout_session_id: null,
          updated_at: now.toISOString(),
        })
        .eq("id", trialTracking.id);

      if (updateError) {
        throw new Error("Error al actualizar el trial");
      }

      // 6. Get trial plan
      const { data: trialPlan, error: planError } = await supabase
        .from("subscription_plans")
        .select("id")
        .or("name.eq.trial,name.eq.trial_test")
        .limit(1)
        .single();

      if (planError || !trialPlan) {
        console.error("Trial plan not found, continuing anyway");
      }

      // 7. Create local subscription record
      if (trialPlan) {
        const { data: subscription, error: subscriptionError } = await supabase
          .from("subscriptions")
          .insert({
            plan_id: trialPlan.id,
            status: "trialing",
            current_period_start: now.toISOString(),
            current_period_end: trialEndsAt.toISOString(),
            billing_cycle: "monthly",
            subscription_type: "trial",
          })
          .select()
          .single();

        if (!subscriptionError && subscription) {
          // 8. Link subscription to business
          await supabase
            .from("business_subscriptions")
            .insert({
              business_id: businessId,
              subscription_id: subscription.id,
              is_active: true,
            });
        }
      }

      // 9. Update business status
      await supabase
        .from("business")
        .update({
          payment_status: "trialing",
          is_trial: true,
        })
        .eq("id", businessId);

      // 10. Add to expiration queue
      await supabase
        .from("trial_expiration_queue")
        .insert({
          trial_tracking_id: trialTracking.id,
          business_id: businessId,
          expires_at: trialEndsAt.toISOString(),
          status: "pending",
        });

      return {
        success: true,
        trialId: trialTracking.id,
        trialEndsAt: trialEndsAt.toISOString(),
      };
    },
    onSuccess: () => {
      toast.success("Trial convertido exitosamente", {
        description: `El negocio ahora tiene ${TRIAL_DURATION_DAYS} días de prueba gratuita sin tarjeta.`,
        duration: 4000,
      });
      // Invalidate all trials, stats, and businesses queries to refetch updated data
      queryClient.invalidateQueries({ queryKey: ["trials"] });
      queryClient.invalidateQueries({ queryKey: ["trial-stats"] });
      queryClient.invalidateQueries({ queryKey: ["businesses"] });
    },
    onError: (error: Error) => {
      toast.error("Error al convertir trial", {
        description: error.message,
      });
    },
  });
};
