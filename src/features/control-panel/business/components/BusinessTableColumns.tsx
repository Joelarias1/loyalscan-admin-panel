import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import { Check, X } from "lucide-react";
import { Business } from "../types";
import {
  formatPlanName,
  getPaymentStatusLabel,
  getPlanLabel,
  multiColumnFilterFn,
  planFilterFn,
  statusFilterFn,
} from "../utils";
import { RowActions } from "./RowActions";

export const createColumns = (_isTestMode: boolean): ColumnDef<Business>[] => [
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
  {
    id: "actions",
    header: () => <span className="sr-only">Acciones</span>,
    cell: ({ row }) => <RowActions row={row} />,
    size: 60,
    enableHiding: false,
  },
];
