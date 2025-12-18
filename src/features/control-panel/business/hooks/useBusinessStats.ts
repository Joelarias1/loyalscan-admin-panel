import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type SubscriptionEnvironment = "production" | "test";

export const useBusinessStats = (environment: SubscriptionEnvironment = "production") => {
  return useQuery({
    queryKey: ["business-stats", environment],
    queryFn: async () => {
      const mode = environment === "production" ? "live" : "test";
      
      const { data, error } = await supabase
        .from("business")
        .select(`
          id,
          is_trial,
          payment_status,
          status,
          stripe_mode,
          business_subscriptions (
            is_active,
            subscriptions (
              status,
              subscription_plans (
                name,
                environment
              )
            )
          )
        `)
        .eq("stripe_mode", mode);

      if (error) throw error;

      const stats = {
        total: data.length,
        active: data.filter(b => {
          const sub = b.business_subscriptions?.[0];
          return b.payment_status === 'paid' || b.payment_status === 'active' || (sub?.is_active && sub?.subscriptions?.status === 'active');
        }).length,
        canceled: data.filter(b => {
          const sub = b.business_subscriptions?.[0];
          return b.payment_status === 'canceled' || sub?.subscriptions?.status === 'canceled';
        }).length,
        trial: data.filter(b => {
          const sub = b.business_subscriptions?.[0];
          return b.is_trial === true || sub?.subscriptions?.status === 'trialing';
        }).length,
      };

      return stats;
    },
  });
};
