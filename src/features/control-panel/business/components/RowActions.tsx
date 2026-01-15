import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { CreditCard, Ellipsis, ExternalLink, Mail, Trash2 } from "lucide-react";
import { Row } from "@tanstack/react-table";
import { Business } from "../types";
import { useDeleteBusiness } from "../hooks/useDeleteBusiness";

export function RowActions({ row }: { row: Row<Business> }) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const deleteBusiness = useDeleteBusiness();
  const business = row.original;

  const handleDelete = () => {
    deleteBusiness.mutate({
      businessId: business.id,
      businessName: business.name,
    });
    setShowDeleteDialog(false);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex justify-end">
            <Button size="icon" variant="ghost" className="shadow-none" aria-label="Acciones">
              <Ellipsis size={16} strokeWidth={2} aria-hidden="true" />
            </Button>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <ExternalLink className="mr-2 h-4 w-4" />
              <span>Ver detalle</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Mail className="mr-2 h-4 w-4" />
              <span>Enviar email</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <CreditCard className="mr-2 h-4 w-4" />
              <span>Ver suscripción</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-red-600 focus:text-red-600 focus:bg-red-50"
            onClick={() => setShowDeleteDialog(true)}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            <span>Eliminar negocio</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-red-600">
              ¿Eliminar negocio permanentemente?
            </AlertDialogTitle>
            <AlertDialogDescription className="space-y-2">
              <span className="block">
                Estás a punto de eliminar <strong>"{business.name}"</strong> y todos sus datos:
              </span>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                <li>Clientes y membresías</li>
                <li>Programas de lealtad y recompensas</li>
                <li>Transacciones e historial</li>
                <li>Campañas y plantillas</li>
                <li>Ubicaciones y staff</li>
                <li>Suscripciones y pagos</li>
              </ul>
              <span className="block text-red-600 font-medium mt-3">
                Esta acción NO se puede deshacer.
              </span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={deleteBusiness.isPending}
              className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
            >
              {deleteBusiness.isPending ? "Eliminando..." : "Sí, eliminar todo"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
