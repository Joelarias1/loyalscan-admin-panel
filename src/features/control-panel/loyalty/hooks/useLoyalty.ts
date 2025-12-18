import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useLocations = (businessId?: string | null) => {
  return useQuery({
    queryKey: ["locations", businessId],
    queryFn: async () => {
      let query = supabase.from("locations")
        .select("*")
        .is("deleted_at", null)
        .order("name", { ascending: true });
      
      if (businessId) {
        query = query.eq("business_id", businessId);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });
};

export const useLoyaltyClubs = (businessId?: string | null) => {
  return useQuery({
    queryKey: ["loyalty_clubs", businessId],
    queryFn: async () => {
      let query = supabase.from("loyalty_clubs")
        .select("*")
        .order("name", { ascending: true });
      
      if (businessId) {
        query = query.eq("business_id", businessId);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });
};
