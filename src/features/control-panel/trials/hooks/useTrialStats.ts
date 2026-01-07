import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

type StripeMode = "live" | "test";

export const useTrialStats = (mode: StripeMode = "live") => {
  return useQuery({
    queryKey: ["trial-stats", mode],
    queryFn: async () => {
      // Query from trial_tracking and join with business
      const { data, error } = await supabase
        .from("trial_tracking")
        .select(`
          id,
          trial_type,
          status,
          converted_at,
          trial_ends_at,
          business:business_id (
            id,
            stripe_mode,
            payment_status
          )
        `);

      if (error) throw error;

      // Filter by stripe mode
      const trials = (data as any[])?.filter(
        (item) => item.business?.stripe_mode === mode
      ) ?? [];

      const now = new Date();

      // Real conversion = has converted_at AND trial period ended (payment charged)
      const realConversions = trials.filter((t) => {
        if (!t.converted_at || !t.trial_ends_at) return false;
        const trialEndDate = new Date(t.trial_ends_at);
        return trialEndDate < now;
      });

      // Pending payment = has converted_at but trial period not ended yet
      const pendingPayment = trials.filter((t) => {
        if (!t.converted_at || !t.trial_ends_at) return false;
        const trialEndDate = new Date(t.trial_ends_at);
        return trialEndDate >= now;
      });

      const stats = {
        total: trials.length,
        active: trials.filter((t) => t.status === "active").length,
        withCard: trials.filter((t) => t.trial_type === "with_card").length,
        withoutCard: trials.filter((t) => t.trial_type === "without_card").length,
        expired: trials.filter((t) => t.status === "expired").length,
        converted: realConversions.length,
        pendingPayment: pendingPayment.length,
      };

      return stats;
    },
  });
};
