import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { Business } from "../types";
import {
  formatPlanName,
  getPaymentStatusLabel,
  getPlanLabel,
  multiColumnFilterFn,
  statusFilterFn,
} from "../utils";
import { RowActions } from "./RowActions";

export const createColumns = (isTestMode: boolean): ColumnDef<Business>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Seleccionar todo"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Seleccionar fila"
      />
    ),
    size: 40,
    enableSorting: false,
    enableHiding: false,
  },
  {
    header: "Negocio",
    accessorKey: "name",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-semibold text-gray-900">{row.getValue("name")}</span>
        <span className="text-sm text-gray-500">{row.original.email || "—"}</span>
        {row.original.phone && (
          <span className="text-xs text-gray-400">{row.original.phone}</span>
        )}
      </div>
    ),
    size: 260,
    filterFn: multiColumnFilterFn,
    enableHiding: false,
  },
  {
    header: "Estado Plan",
    accessorKey: "payment_status",
    cell: ({ row }) => {
      const { label, className } = getPaymentStatusLabel(row.original);
      return (
        <Badge variant="outline" className={`${className} font-medium`}>
          {label}
        </Badge>
      );
    },
    size: 140,
    filterFn: statusFilterFn,
  },
  {
    header: "Plan",
    accessorKey: "subscriptionType",
    cell: ({ row }) => {
      const plan = getPlanLabel(row.original);
      if (!plan) {
        return <span className="text-gray-400">—</span>;
      }
      return (
        <Badge variant="outline" className={`${plan.className} font-medium w-fit`}>
          {plan.label}
        </Badge>
      );
    },
    size: 140,
  },
  {
    header: "Próximo Pago",
    accessorKey: "currentPeriodEnd",
    cell: ({ row }) => {
      const periodEnd = row.original.currentPeriodEnd;
      const paymentStatus = row.original.payment_status;

      // Don't show for canceled or no_payment
      if (!periodEnd || paymentStatus === "canceled" || paymentStatus === "no_payment") {
        return <span className="text-gray-400">—</span>;
      }

      const date = new Date(periodEnd);
      const now = new Date();
      const diffDays = Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

      return (
        <div className="flex flex-col">
          <span className="text-sm text-gray-700">
            {date.toLocaleDateString("es-ES", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </span>
          {diffDays > 0 && diffDays <= 7 && (
            <span className="text-xs text-amber-600">En {diffDays} días</span>
          )}
        </div>
      );
    },
    size: 120,
  },
  {
    header: "Cancelación",
    accessorKey: "canceledAt",
    cell: ({ row }) => {
      const canceledAt = row.original.canceledAt;
      const planName = row.original.planName;

      if (!canceledAt) {
        return <span className="text-gray-400">—</span>;
      }

      const date = new Date(canceledAt);
      return (
        <div className="flex flex-col">
          <Badge variant="outline" className="bg-rose-100 text-rose-800 border-rose-300 font-medium w-fit">
            Cancelado
          </Badge>
          {planName && (
            <span className="text-xs text-gray-500">{formatPlanName(planName)}</span>
          )}
          <span className="text-xs text-gray-400">
            {date.toLocaleDateString("es-ES", {
              day: "2-digit",
              month: "short",
            })}
          </span>
        </div>
      );
    },
    size: 120,
  },
  {
    header: "Registro",
    accessorKey: "created_at",
    cell: ({ row }) => {
      const date = new Date(row.getValue("created_at"));
      return (
        <span className="text-gray-600 text-sm">
          {date.toLocaleDateString("es-ES", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </span>
      );
    },
    size: 100,
    enableSorting: true,
  },
  {
    id: "actions",
    header: () => <span className="sr-only">Acciones</span>,
    cell: ({ row }) => <RowActions row={row} />,
    size: 60,
    enableHiding: false,
  },
];
