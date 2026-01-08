import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import { LoyaltyCard } from "../types";
import {
  getRewardsTypeLabel,
  formatCurrency,
  multiColumnFilterFn,
  rewardsTypeFilterFn,
} from "../utils";

export const createColumns = (): ColumnDef<LoyaltyCard>[] => [
  {
    header: "Club",
    accessorKey: "name",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-semibold text-gray-900">{row.getValue("name")}</span>
        <span className="text-sm text-gray-500">{row.original.businessName}</span>
      </div>
    ),
    size: 260,
    filterFn: multiColumnFilterFn,
    enableHiding: false,
  },
  {
    header: "Tipo",
    accessorKey: "rewardsType",
    cell: ({ row }) => {
      const type = row.original.rewardsType;
      const { label, className } = getRewardsTypeLabel(type);
      return (
        <Badge variant="outline" className={`${className} font-medium w-fit`}>
          {label}
        </Badge>
      );
    },
    size: 100,
    filterFn: rewardsTypeFilterFn,
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
    size: 140,
    enableSorting: true,
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
    size: 90,
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
    size: 90,
    enableSorting: true,
  },
  {
    header: "Creación",
    accessorKey: "createdAt",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      return (
        <span className="text-gray-600 text-sm">
          {date.toLocaleDateString("es-ES", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </span>
      );
    },
    size: 100,
    enableSorting: true,
  },
];
