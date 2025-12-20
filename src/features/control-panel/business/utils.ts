import { Business } from "./types";
import { FilterFn } from "@tanstack/react-table";

// Helper to format plan names (remove _test suffix, capitalize)
export const formatPlanName = (planName: string): string => {
  if (!planName) return "";
  let formatted = planName.replace(/_test$/i, "");
  formatted = formatted
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
  return formatted;
};

// Custom filter function for multi-column searching
export const multiColumnFilterFn: FilterFn<Business> = (row, columnId, filterValue) => {
  const searchableRowContent = `${row.original.name} ${row.original.email}`.toLowerCase();
  const searchTerm = (filterValue ?? "").toLowerCase();
  return searchableRowContent.includes(searchTerm);
};

export const statusFilterFn: FilterFn<Business> = (row, columnId, filterValue: string[]) => {
  if (!filterValue?.length) return true;
  const status = row.getValue(columnId) as string;
  return filterValue.includes(status);
};

// Status label mapping
export const getStatusLabel = (status: string, isTestMode: boolean): { label: string; variant: "default" | "outline" | "destructive" | "secondary"; className: string } => {
  switch (status) {
    case "trialing":
      return {
        label: "TRIAL",
        variant: "outline",
        className: "bg-amber-100 text-amber-800 border-amber-300 font-semibold hover:bg-amber-100"
      };
    case "paid":
    case "active":
      return {
        label: isTestMode ? "Pagado (Test)" : "Pagado",
        variant: "default",
        className: "bg-emerald-600 hover:bg-emerald-600 text-white font-semibold"
      };
    case "no_payment":
      return {
        label: "Sin pago",
        variant: "secondary",
        className: "bg-gray-200 text-gray-700 font-semibold hover:bg-gray-200"
      };
    case "canceled":
    case "unpaid":
      return {
        label: "Cancelado",
        variant: "destructive",
        className: "bg-rose-600 hover:bg-rose-600 text-white font-semibold"
      };
    default:
      return {
        label: status,
        variant: "outline",
        className: "font-semibold"
      };
  }
};
