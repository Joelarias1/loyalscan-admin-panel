import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import { Check, X } from "lucide-react";
import { Business } from "../types";
import {
  formatCurrency,
  formatPlanName,
  getPaymentStatusLabel,
  getPlanLabel,
  multiColumnFilterFn,
  planFilterFn,
  statusFilterFn,
} from "../utils";

export const createColumns = (_isTestMode: boolean): ColumnDef<Business>[] => [
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
    accessorKey: "planName",
    cell: ({ row }) => {
      const plan = getPlanLabel(row.original);
      const planPrice = row.original.planPrice;
      if (!plan) {
        return <span className="text-gray-400">—</span>;
      }
      return (
        <div className="flex flex-col gap-0.5">
          <Badge variant="outline" className={`${plan.className} font-medium w-fit`}>
            {plan.label}
          </Badge>
          {planPrice && (
            <span className="text-xs text-gray-500">{planPrice}</span>
          )}
        </div>
      );
    },
    size: 140,
    filterFn: planFilterFn,
  },
  {
    id: "implementation",
    header: "Progreso",
    cell: ({ row }) => {
      const impl = row.original.implementation;
      const items = [
        { done: impl.firstLoyaltyCardCreated, label: "Club" },
        { done: impl.firstCustomerRegistered, label: "Cliente" },
        { done: impl.firstStampGiven, label: "Escaneo" },
        { done: impl.hasStaff, label: "Staff" },
      ];

      return (
        <div className="flex flex-col gap-1">
          {items.map((item) => (
            <div key={item.label} className="flex items-center gap-1.5">
              <div
                className={`flex items-center justify-center w-4 h-4 rounded ${
                  item.done
                    ? "bg-emerald-100 text-emerald-600"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                {item.done ? (
                  <Check className="w-2.5 h-2.5" />
                ) : (
                  <X className="w-2.5 h-2.5" />
                )}
              </div>
              <span className={`text-xs ${item.done ? "text-gray-700" : "text-gray-400"}`}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
      );
    },
    size: 110,
  },
  {
    header: "Clientes",
    accessorKey: "customerCount",
    cell: ({ row }) => {
      const count = row.original.customerCount;
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
    accessorKey: "transactionCount",
    cell: ({ row }) => {
      const count = row.original.transactionCount;
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
    accessorKey: "totalRevenue",
    cell: ({ row }) => {
      const revenue = row.original.totalRevenue;
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
    enableSorting: true,
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
