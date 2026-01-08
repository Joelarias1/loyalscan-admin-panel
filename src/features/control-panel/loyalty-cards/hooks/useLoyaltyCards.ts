import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { LoyaltyCard } from "../types";

type StripeMode = "live" | "test";

export const useLoyaltyCards = (mode: StripeMode = "live") => {
  return useQuery({
    queryKey: ["loyalty-cards", mode],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("loyalty_clubs")
        .select(`
          id,
          name,
          rewards_type,
          is_active,
          created_at,
          business:business_id (
            id,
            name,
            email,
            stripe_mode,
            business_currency
          ),
          loyalty_club_customers (
            id,
            transactions (
              id,
              amount_spent
            )
          )
        `)
        .eq("is_active", true)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("useLoyaltyCards error:", error);
        throw error;
      }

      // Filter by stripe mode and transform the data
      return (data as any[])
        ?.filter((item) => item.business?.stripe_mode === mode)
        .map((item): LoyaltyCard => {
          const business = item.business;
          const customers = item.loyalty_club_customers ?? [];
          const customerCount = customers.length;

          // Calculate transaction count and revenue from all customers
          let transactionCount = 0;
          let totalRevenue = 0;

          customers.forEach((customer: any) => {
            const transactions = customer.transactions ?? [];
            transactionCount += transactions.length;
            totalRevenue += transactions.reduce(
              (sum: number, t: any) => sum + (parseFloat(t.amount_spent) || 0),
              0
            );
          });

          return {
            id: item.id,
            name: item.name,
            rewardsType: item.rewards_type,
            isActive: item.is_active,
            createdAt: item.created_at,
            businessId: business?.id ?? "",
            businessName: business?.name ?? "Sin negocio",
            businessEmail: business?.email ?? "",
            currency: business?.business_currency ?? "CLP",
            customerCount,
            transactionCount,
            totalRevenue,
          };
        }) ?? [];
    },
  });
};
