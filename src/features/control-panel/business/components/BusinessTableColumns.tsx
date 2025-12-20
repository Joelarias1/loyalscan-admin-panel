import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { Business } from "../types";
import { formatPlanName, getStatusLabel, multiColumnFilterFn, statusFilterFn } from "../utils";
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
      <div className="font-semibold text-gray-900">{row.getValue("name")}</div>
    ),
    size: 200,
    filterFn: multiColumnFilterFn,
    enableHiding: false,
  },
  {
    header: "Email",
    accessorKey: "email",
    cell: ({ row }) => (
      <span className="text-gray-600">{row.getValue("email") || "—"}</span>
    ),
    size: 240,
  },
  {
    header: "Estado",
    accessorKey: "payment_status",
    cell: ({ row }) => {
      const status = row.getValue("payment_status") as string;
      const { label, variant, className } = getStatusLabel(status, isTestMode);
      return <Badge variant={variant} className={className}>{label}</Badge>;
    },
    size: 120,
    filterFn: statusFilterFn,
  },
  {
    header: "Plan",
    accessorKey: "planName",
    cell: ({ row }) => {
      const planName = row.original.planName;
      const planPrice = row.original.planPrice;
      const subscriptionType = row.original.subscriptionType;

      if (!planName) {
        return <span className="text-gray-500 italic text-sm">Sin plan</span>;
      }

      if (subscriptionType === 'trial' || planName.toLowerCase().includes("trial")) {
        return (
          <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-300 font-semibold hover:bg-amber-100">
            TRIAL
          </Badge>
        );
      }

      if (planName.toLowerCase().includes("demo")) {
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300 font-semibold hover:bg-blue-100">
            DEMO
          </Badge>
        );
      }

      const formattedPlanName = formatPlanName(planName);

      return (
        <div className="flex flex-col">
          <span className="font-semibold text-sm text-gray-900">{formattedPlanName}</span>
          {planPrice && (
            <span className="text-xs text-gray-600">{planPrice}</span>
          )}
        </div>
      );
    },
    size: 150,
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
    size: 120,
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
