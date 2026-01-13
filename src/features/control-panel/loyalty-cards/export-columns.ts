import { ExportColumn } from "@/components/TableExport";
import { LoyaltyCard } from "./types";
import { formatCurrency, getRewardsTypeLabel } from "./utils";

export const loyaltyCardExportColumns: ExportColumn<LoyaltyCard>[] = [
  {
    key: "name",
    label: "Nombre",
    getValue: (row) => row.name,
  },
  {
    key: "businessName",
    label: "Negocio",
    getValue: (row) => row.businessName,
  },
  {
    key: "businessEmail",
    label: "Email Negocio",
    getValue: (row) => row.businessEmail,
  },
  {
    key: "rewardsType",
    label: "Tipo",
    getValue: (row) => getRewardsTypeLabel(row.rewardsType).label,
  },
  {
    key: "customerCount",
    label: "Clientes",
    getValue: (row) => row.customerCount,
  },
  {
    key: "transactionCount",
    label: "Escaneos",
    getValue: (row) => row.transactionCount,
  },
  {
    key: "totalRevenue",
    label: "Ingresos",
    getValue: (row) => (row.totalRevenue > 0 ? formatCurrency(row.totalRevenue, row.currency) : ""),
  },
  {
    key: "isActive",
    label: "Activo",
    getValue: (row) => (row.isActive ? "Sí" : "No"),
  },
  {
    key: "createdAt",
    label: "Fecha Creación",
    getValue: (row) => new Date(row.createdAt).toLocaleDateString("es-ES"),
  },
];
