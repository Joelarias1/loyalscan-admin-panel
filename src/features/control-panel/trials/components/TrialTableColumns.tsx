import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { Trial } from "../types";
import {
  getTrialTypeLabel,
  getTrialStatusLabel,
  formatDaysRemaining,
  formatCurrency,
  multiColumnFilterFn,
  statusFilterFn,
} from "../utils";

interface CreateColumnsOptions {
  onSacUpdate?: (businessId: string, field: "meeting_scheduled" | "attended_implementation", value: boolean) => void;
}

export const createColumns = (options?: CreateColumnsOptions): ColumnDef<Trial>[] => [
  {
    header: "Negocio",
    accessorKey: "name",
    cell: ({ row }) => {
      const phone = row.original.phone;
      const cleanPhone = phone?.replace(/[\s\-\(\)]/g, "").replace(/^\+/, "");
      return (
        <div className="flex flex-col">
          <span className="font-semibold text-gray-900">{row.getValue("name")}</span>
          <span className="text-sm text-gray-500">{row.original.email || "—"}</span>
          {phone && (
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-gray-400">{phone}</span>
              <a
                href={`https://wa.me/${cleanPhone}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-600 hover:text-emerald-700"
                title="Abrir en WhatsApp"
              >
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
            </div>
          )}
        </div>
      );
    },
    size: 260,
    filterFn: multiColumnFilterFn,
    enableHiding: false,
  },
  {
    header: "Clientes",
    accessorKey: "customer_count",
    cell: ({ row }) => {
      const count = row.original.customer_count;
      return (
        <span className={`text-sm font-medium ${count > 0 ? "text-gray-900" : "text-gray-400"}`}>
          {count}
        </span>
      );
    },
    size: 100,
    enableSorting: true,
  },
  {
    header: "Escaneos",
    accessorKey: "transaction_count",
    cell: ({ row }) => {
      const count = row.original.transaction_count;
      return (
        <span className={`text-sm font-medium ${count > 0 ? "text-gray-900" : "text-gray-400"}`}>
          {count}
        </span>
      );
    },
    size: 100,
    enableSorting: true,
  },
  {
    header: "Ingresos",
    accessorKey: "total_revenue",
    cell: ({ row }) => {
      const revenue = row.original.total_revenue;
      const currency = row.original.currency;
      return (
        <span className={`text-sm font-medium ${revenue > 0 ? "text-emerald-700" : "text-gray-400"}`}>
          {formatCurrency(revenue, currency)}
        </span>
      );
    },
    size: 120,
    enableSorting: true,
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
  {
    id: "sac",
    header: "SAC",
    cell: ({ row }) => {
      const businessId = row.original.id;
      const meetingScheduled = row.original.sac_meeting_scheduled;
      const attendedImplementation = row.original.sac_attended_implementation;

      return (
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <Checkbox
              checked={meetingScheduled}
              onCheckedChange={(checked) => {
                options?.onSacUpdate?.(businessId, "meeting_scheduled", checked === true);
              }}
              className="h-4 w-4"
            />
            <span className={`text-xs ${meetingScheduled ? "text-gray-700" : "text-gray-400"}`}>
              Agendó cita
            </span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <Checkbox
              checked={attendedImplementation}
              onCheckedChange={(checked) => {
                options?.onSacUpdate?.(businessId, "attended_implementation", checked === true);
              }}
              className="h-4 w-4"
            />
            <span className={`text-xs ${attendedImplementation ? "text-gray-700" : "text-gray-400"}`}>
              Asistió cita
            </span>
          </label>
        </div>
      );
    },
    size: 100,
    enableHiding: true,
  },
];
