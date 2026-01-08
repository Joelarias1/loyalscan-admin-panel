import { Trial, TrialStatus, TrialType } from "./types";
import { FilterFn } from "@tanstack/react-table";

// Custom filter function for multi-column searching
export const multiColumnFilterFn: FilterFn<Trial> = (row, columnId, filterValue) => {
  const searchableRowContent = `${row.original.name} ${row.original.email}`.toLowerCase();
  const searchTerm = (filterValue ?? "").toLowerCase();
  return searchableRowContent.includes(searchTerm);
};

export const statusFilterFn: FilterFn<Trial> = (row, columnId, filterValue: string[]) => {
  if (!filterValue?.length) return true;
  const status = row.getValue(columnId) as string;
  return filterValue.includes(status);
};

// Trial type label mapping
export const getTrialTypeLabel = (type: TrialType | null): { label: string; className: string } => {
  switch (type) {
    case "with_card":
      return {
        label: "Con tarjeta",
        className: "bg-violet-100 text-violet-800 border-violet-300",
      };
    case "without_card":
      return {
        label: "Sin tarjeta",
        className: "bg-amber-100 text-amber-800 border-amber-300",
      };
    default:
      return {
        label: "—",
        className: "bg-gray-100 text-gray-800 border-gray-300",
      };
  }
};

// Trial status label mapping
export const getTrialStatusLabel = (status: TrialStatus | null): { label: string; className: string } => {
  switch (status) {
    case "active":
      return {
        label: "Activo",
        className: "bg-blue-100 text-blue-800 border-blue-300",
      };
    case "converted":
      return {
        label: "Convertido",
        className: "bg-emerald-100 text-emerald-800 border-emerald-300",
      };
    case "expired":
      return {
        label: "Expirado",
        className: "bg-rose-100 text-rose-800 border-rose-300",
      };
    case "cancelled":
      return {
        label: "Cancelado",
        className: "bg-gray-100 text-gray-800 border-gray-300",
      };
    case "pending_checkout":
      return {
        label: "Solo registro",
        className: "bg-orange-100 text-orange-800 border-orange-300",
      };
    default:
      return {
        label: "Desconocido",
        className: "bg-gray-100 text-gray-800 border-gray-300",
      };
  }
};

// Calculate days remaining
export const calculateDaysRemaining = (trialEndsAt: string | null): number | null => {
  if (!trialEndsAt) return null;
  const now = new Date();
  const endDate = new Date(trialEndsAt);
  const diffTime = endDate.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

// Format days remaining for display
export const formatDaysRemaining = (days: number | null): string => {
  if (days === null) return "—";
  if (days < 0) return "Expirado";
  if (days === 0) return "Hoy";
  if (days === 1) return "1 día";
  return `${days} días`;
};
