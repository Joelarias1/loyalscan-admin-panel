import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useCustomers = (businessId?: string | null) => {
  return useQuery({
    queryKey: ["customers", businessId],
    queryFn: async () => {
      let query = supabase.from("customers").select("*");
      
      if (businessId) {
        query = query.eq("business_id", businessId);
      }
      
      const { data, error } = await query.order("created_at", { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });
};

export const useCustomerDetails = (id: string | null) => {
  return useQuery({
    queryKey: ["customer", id],
    queryFn: async () => {
      if (!id) return null;
      const { data, error } = await supabase
        .from("customers")
        .select(`
          *,
          locations(name),
          loyalty_club_customers(*)
        `)
        .eq("id", id)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });
};
