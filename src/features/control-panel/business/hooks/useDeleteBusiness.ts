import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface DeleteBusinessParams {
  businessId: string;
  businessName?: string;
}

interface DeleteBusinessResult {
  success: boolean;
  deleted_business: {
    id: string;
    name: string;
    owner_id: string;
  };
  deleted_counts: Record<string, number>;
  deleted_at: string;
}

/**
 * Hook to hard delete a business and all related data
 * Only superadmins can execute this function
 *
 * DANGER: This is a destructive operation that cannot be undone!
 */
export const useDeleteBusiness = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ businessId }: DeleteBusinessParams): Promise<DeleteBusinessResult> => {
      // Call the RPC function that handles cascade deletion
      const { data, error } = await supabase.rpc("hard_delete_business", {
        p_business_id: businessId,
      });

      if (error) {
        console.error("Error deleting business:", error);
        throw new Error(error.message || "Error al eliminar el negocio");
      }

      if (!data || !data.success) {
        throw new Error("No se pudo eliminar el negocio");
      }

      return data as DeleteBusinessResult;
    },
    onSuccess: (data) => {
      const totalDeleted = Object.values(data.deleted_counts).reduce(
        (sum, count) => sum + count,
        0
      );

      toast.success("Negocio eliminado", {
        description: `"${data.deleted_business.name}" y ${totalDeleted} registros relacionados fueron eliminados permanentemente.`,
        duration: 5000,
      });

      // Invalidate all related queries
      queryClient.invalidateQueries({ queryKey: ["businesses"] });
      queryClient.invalidateQueries({ queryKey: ["trials"] });
      queryClient.invalidateQueries({ queryKey: ["trial-stats"] });
      queryClient.invalidateQueries({ queryKey: ["business-stats"] });
    },
    onError: (error: Error) => {
      toast.error("Error al eliminar negocio", {
        description: error.message,
        duration: 5000,
      });
    },
  });
};
