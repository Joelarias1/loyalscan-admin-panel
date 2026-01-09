import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface UpdateSacTrackingParams {
  businessId: string;
  field: "meeting_scheduled" | "attended_implementation";
  value: boolean;
}

export const useSacTracking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ businessId, field, value }: UpdateSacTrackingParams) => {
      // First, try to update existing record
      const { data: existingRecord } = await supabase
        .from("sac_tracking")
        .select("id")
        .eq("business_id", businessId)
        .single();

      if (existingRecord) {
        // Update existing record
        const { error } = await supabase
          .from("sac_tracking")
          .update({ [field]: value })
          .eq("business_id", businessId);

        if (error) throw error;
      } else {
        // Insert new record
        const { error } = await supabase
          .from("sac_tracking")
          .insert({
            business_id: businessId,
            [field]: value,
          });

        if (error) throw error;
      }

      return { businessId, field, value };
    },
    onSuccess: () => {
      // Invalidate trials queries to refetch updated data
      queryClient.invalidateQueries({ queryKey: ["trials"] });
    },
  });
};
