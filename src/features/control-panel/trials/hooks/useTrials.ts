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
            phone,
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

      // Filter by stripe mode
      const filteredData = (data as any[])?.filter(
        (item) => item.business?.stripe_mode === mode
      ) ?? [];

      // Get business IDs to fetch customer counts
      const businessIds = filteredData
        .map((item) => item.business?.id)
        .filter(Boolean);

      // Fetch customer and transaction counts for all businesses
      let customerCounts: Record<string, number> = {};
      let transactionCounts: Record<string, number> = {};
      let sacTracking: Record<string, { meeting_scheduled: boolean; attended_implementation: boolean }> = {};

      if (businessIds.length > 0) {
        // Fetch customer counts
        const { data: customerData } = await supabase
          .from("customers")
          .select("business_id")
          .in("business_id", businessIds);

        if (customerData) {
          customerCounts = customerData.reduce((acc, row) => {
            acc[row.business_id] = (acc[row.business_id] || 0) + 1;
            return acc;
          }, {} as Record<string, number>);
        }

        // Fetch transaction counts (escaneos)
        const { data: transactionData } = await supabase
          .from("transactions")
          .select("business_id")
          .in("business_id", businessIds);

        if (transactionData) {
          transactionCounts = transactionData.reduce((acc, row) => {
            acc[row.business_id] = (acc[row.business_id] || 0) + 1;
            return acc;
          }, {} as Record<string, number>);
        }

        // Fetch SAC tracking data
        const { data: sacData } = await supabase
          .from("sac_tracking")
          .select("business_id, meeting_scheduled, attended_implementation")
          .in("business_id", businessIds);

        if (sacData) {
          sacData.forEach((row) => {
            sacTracking[row.business_id] = {
              meeting_scheduled: row.meeting_scheduled ?? false,
              attended_implementation: row.attended_implementation ?? false,
            };
          });
        }
      }

      // Transform the data with counts
      return filteredData.map((item): Trial => {
        const business = item.business;
        const daysRemaining = calculateDaysRemaining(item.trial_ends_at);
        const businessId = business?.id ?? item.id;

        return {
          id: businessId,
          name: business?.name ?? "Sin nombre",
          email: business?.email ?? "",
          phone: business?.phone ?? null,
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
          customer_count: customerCounts[businessId] ?? 0,
          transaction_count: transactionCounts[businessId] ?? 0,
          sac_meeting_scheduled: sacTracking[businessId]?.meeting_scheduled ?? false,
          sac_attended_implementation: sacTracking[businessId]?.attended_implementation ?? false,
        };
      });
    },
  });
};
