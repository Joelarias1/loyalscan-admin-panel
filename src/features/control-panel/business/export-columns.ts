import { ExportColumn } from "@/components/TableExport";
import { Business } from "./types";
import {
  formatCurrency,
  formatPlanName,
  getBusinessComputedStatus,
  getComputedStatusLabel,
} from "./utils";

export const businessExportColumns: ExportColumn<Business>[] = [
  {
    key: "name",
    label: "Nombre",
    getValue: (row) => row.name,
  },
  {
    key: "email",
    label: "Email",
    getValue: (row) => row.email,
  },
  {
    key: "phone",
    label: "Teléfono",
    getValue: (row) => row.phone,
  },
  {
    key: "status",
    label: "Estado",
    getValue: (row) => getComputedStatusLabel(getBusinessComputedStatus(row)),
  },
  {
    key: "plan",
    label: "Plan",
    getValue: (row) => {
      // Same logic as getPlanLabel - don't show for trials
      const isTrial =
        row.subscriptionStatus === "trialing" ||
        (row.trialType && row.payment_status === "trialing") ||
        row.payment_status === "trialing";
      if (isTrial || !row.planName) return "";
      return formatPlanName(row.planName);
    },
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
    key: "implementation_club",
    label: "Progreso: Club",
    getValue: (row) => row.implementation.firstLoyaltyCardCreated,
  },
  {
    key: "implementation_cliente",
    label: "Progreso: Cliente",
    getValue: (row) => row.implementation.firstCustomerRegistered,
  },
  {
    key: "implementation_escaneo",
    label: "Progreso: Escaneo",
    getValue: (row) => row.implementation.firstStampGiven,
  },
  {
    key: "implementation_staff",
    label: "Progreso: Staff",
    getValue: (row) => row.implementation.hasStaff,
  },
  {
    key: "currentPeriodEnd",
    label: "Próximo Pago",
    getValue: (row) => {
      if (!row.currentPeriodEnd) return "";
      // Don't show for trials
      const isTrial =
        row.subscriptionStatus === "trialing" ||
        (row.trialType && row.payment_status === "trialing") ||
        row.payment_status === "trialing";
      if (isTrial) return "";
      return new Date(row.currentPeriodEnd).toLocaleDateString("es-ES");
    },
  },
  {
    key: "canceledAt",
    label: "Fecha Cancelación",
    getValue: (row) =>
      row.canceledAt ? new Date(row.canceledAt).toLocaleDateString("es-ES") : "",
  },
  {
    key: "created_at",
    label: "Fecha Registro",
    getValue: (row) => new Date(row.created_at).toLocaleDateString("es-ES"),
  },
];
