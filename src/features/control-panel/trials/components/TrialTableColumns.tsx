import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { Trial } from "../types";
import {
  getTrialTypeLabel,
  getTrialStatusLabel,
  formatDaysRemaining,
  multiColumnFilterFn,
  statusFilterFn,
} from "../utils";

export const createColumns = (): ColumnDef<Trial>[] => [
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
      </div>
    ),
    size: 260,
    filterFn: multiColumnFilterFn,
    enableHiding: false,
  },
  {
    header: "Tipo",
    accessorKey: "trial_type",
    cell: ({ row }) => {
      const type = row.original.trial_type;
      const { label, className } = getTrialTypeLabel(type);
      return (
        <Badge variant="outline" className={`${className} font-medium w-fit`}>
          {label}
        </Badge>
      );
    },
    size: 120,
  },
  {
    header: "Estado",
    accessorKey: "trial_status",
    cell: ({ row }) => {
      const status = row.original.trial_status;
      const { label, className } = getTrialStatusLabel(status);
      return (
        <Badge variant="outline" className={`${className} font-medium w-fit`}>
          {label}
        </Badge>
      );
    },
    size: 130,
    filterFn: statusFilterFn,
  },
  {
    header: "Onboarding",
    accessorKey: "onboarding_completed",
    cell: ({ row }) => {
      const completed = row.original.onboarding_completed;
      return (
        <Badge
          variant="outline"
          className={`font-medium ${
            completed
              ? "bg-emerald-100 text-emerald-800 border-emerald-300"
              : "bg-gray-100 text-gray-600 border-gray-300"
          }`}
        >
          {completed ? "Completado" : "Pendiente"}
        </Badge>
      );
    },
    size: 120,
  },
  {
    header: "Conversión",
    accessorKey: "converted_at",
    cell: ({ row }) => {
      const convertedAt = row.original.converted_at;
      const trialEndsAt = row.original.trial_ends_at;

      // No conversion attempt
      if (!convertedAt) {
        return <span className="text-gray-400">—</span>;
      }

      // Check if trial period has ended (real payment occurred)
      const now = new Date();
      const trialEndDate = trialEndsAt ? new Date(trialEndsAt) : null;
      const hasRealPayment = trialEndDate && trialEndDate < now;

      if (hasRealPayment) {
        // Real conversion - payment was charged
        return (
          <div className="flex flex-col">
            <Badge
              variant="outline"
              className="font-medium bg-emerald-100 text-emerald-800 border-emerald-300 mb-1 w-fit"
            >
              Pagó
            </Badge>
            <span className="text-xs text-gray-500">
              {trialEndDate.toLocaleDateString("es-ES", {
                day: "2-digit",
                month: "short",
              })}
            </span>
          </div>
        );
      } else {
        // Has card but payment pending (still in trial)
        return (
          <Badge
            variant="outline"
            className="font-medium bg-blue-100 text-blue-800 border-blue-300 w-fit"
          >
            Por cobrar
          </Badge>
        );
      }
    },
    size: 130,
  },
  {
    header: "Días restantes",
    accessorKey: "days_remaining",
    cell: ({ row }) => {
      const days = row.original.days_remaining;
      const formatted = formatDaysRemaining(days);
      const isExpired = days !== null && days < 0;
      const isUrgent = days !== null && days >= 0 && days <= 3;

      return (
        <span
          className={`font-medium ${
            isExpired
              ? "text-rose-600"
              : isUrgent
              ? "text-amber-600"
              : "text-gray-700"
          }`}
        >
          {formatted}
        </span>
      );
    },
    size: 120,
    enableSorting: true,
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
];
