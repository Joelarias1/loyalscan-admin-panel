import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Trial } from "../types";
import { calculateDaysRemaining } from "../utils";

type StripeMode = "live" | "test";

export const useTrials = (mode: StripeMode = "live") => {
  return useQuery({
    queryKey: ["trials", mode],
    queryFn: async () => {
      // Query from trial_tracking and join with business
      // This works because trial_tracking has FK to business
      const { data, error } = await supabase
        .from("trial_tracking")
        .select(`
          id,
          trial_type,
          status,
          trial_started_at,
          trial_ends_at,
          source_url,
          created_at,
          converted_at,
          business:business_id (
            id,
            name,
            email,
            payment_status,
            is_trial,
            stripe_mode,
            created_at,
            onboarding_completed
          )
        `)
        .order("trial_ends_at", { ascending: true });

      if (error) {
        console.error("useTrials error:", error);
        throw error;
      }

      // Filter by stripe mode and transform the data
      return (data as any[])
        ?.filter((item) => item.business?.stripe_mode === mode)
        .map((item): Trial => {
          const business = item.business;
          const daysRemaining = calculateDaysRemaining(item.trial_ends_at);

          return {
            id: business?.id ?? item.id,
            name: business?.name ?? "Sin nombre",
            email: business?.email ?? "",
            payment_status: business?.payment_status ?? "unknown",
            is_trial: business?.is_trial ?? false,
            created_at: business?.created_at ?? item.created_at,
            trial_type: item.trial_type,
            trial_status: item.status,
            trial_started_at: item.trial_started_at,
            trial_ends_at: item.trial_ends_at,
            source_url: item.source_url,
            days_remaining: daysRemaining,
            onboarding_completed: business?.onboarding_completed ?? false,
            converted_at: item.converted_at,
          };
        }) ?? [];
    },
  });
};
