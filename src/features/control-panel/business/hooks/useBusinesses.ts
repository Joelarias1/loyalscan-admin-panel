import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type SubscriptionEnvironment = "production" | "test";

export const useBusinesses = (environment: SubscriptionEnvironment = "production") => {
  return useQuery({
    queryKey: ["businesses", environment],
    queryFn: async () => {
      const mode = environment === "production" ? "live" : "test";

      // Cast to any to avoid TypeScript recursion issues with deeply nested selects
      const query = supabase.from("business") as any;
      // Use LEFT JOIN (no !inner) to include businesses without subscriptions
      const { data, error } = await query
        .select(`
          id,
          name,
          email,
          owner_id,
          stripe_mode,
          stripe_customer_id,
          payment_status,
          is_trial,
          created_at,
          updated_at,
          business_subscriptions (
            is_active,
            subscriptions (
              id,
              status,
              subscription_type,
              current_period_start,
              current_period_end,
              stripe_subscription_id,
              subscription_plans (
                id,
                name,
                environment,
                price_monthly_cents,
                price_yearly_cents,
                description
              )
            )
          )
        `)
        .eq("stripe_mode", mode)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("useBusinesses error:", error);
        throw error;
      }

      // Flatten the nested structure for easier consumption
      return (data as any[])?.map((business: any) => {
        // Find the active subscription (if any)
        const activeSub = business.business_subscriptions?.find((bs: any) => bs.is_active);
        // subscriptions is a single object
        const subscription = activeSub?.subscriptions ?? null;
        // subscription_plans is a single object
        const plan = subscription?.subscription_plans ?? null;

        // Format price for display
        const priceMonthly = plan?.price_monthly_cents
          ? `$${(plan.price_monthly_cents / 100).toFixed(0)}/mes`
          : null;

        return {
          ...business,
          subscription,
          plan,
          // Computed fields for easier table access
          planName: plan?.name ?? null,
          planEnvironment: plan?.environment ?? null,
          planPrice: priceMonthly,
          subscriptionStatus: subscription?.status ?? null,
          subscriptionType: subscription?.subscription_type ?? null,
          periodEnd: subscription?.current_period_end ?? null,
        };
      });
    },
  });
};

// Alternative: Get ALL businesses with their environment info
export const useAllBusinessesWithEnvironment = () => {
  return useQuery({
    queryKey: ["businesses", "all-with-environment"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("business")
        .select(`
          id,
          name,
          stripe_mode,
          payment_status,
          created_at,
          business_subscriptions (
            is_active,
            subscriptions (
              status,
              subscription_type,
              current_period_end,
              subscription_plans (
                name
              )
            )
          )
        `)
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      
      // Using 'as any' temporarily until types are regenerated
      const typedData = data as any[];
      
      // Separate into production and test
      const production = typedData?.filter(b => b.stripe_mode === 'live') ?? [];
      const test = typedData?.filter(b => b.stripe_mode === 'test') ?? [];
      
      return { production, test, all: typedData };
    },
  });
};

export const useBusinessDetails = (id: string | null) => {
  return useQuery({
    queryKey: ["business", id],
    queryFn: async () => {
      if (!id) return null;
      
      const { data, error } = await supabase
        .from("business")
        .select(`
          *,
          business_subscriptions (
            is_active,
            subscriptions (
              *,
              subscription_plans (*)
            )
          )
        `)
        .eq("id", id)
        .single();
      
      if (error) throw error;
      
      // Using 'as any' temporarily until types are regenerated
      const typedData = data as any;
      
      return {
        ...typedData,
        isTestMode: typedData.stripe_mode === 'test',
        subscription: typedData.business_subscriptions?.find((bs: any) => bs.is_active)?.subscriptions ?? null,
      };
    },
    enabled: !!id,
  });
};
