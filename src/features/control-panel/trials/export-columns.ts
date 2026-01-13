import { ExportColumn } from "@/components/TableExport";
import { Trial } from "./types";
import {
  formatCurrency,
  formatDaysRemaining,
  getTrialStatusLabel,
  getTrialTypeLabel,
} from "./utils";

export const trialExportColumns: ExportColumn<Trial>[] = [
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
    key: "customerCount",
    label: "Clientes",
    getValue: (row) => row.customer_count,
  },
  {
    key: "transactionCount",
    label: "Escaneos",
    getValue: (row) => row.transaction_count,
  },
  {
    key: "totalRevenue",
    label: "Ingresos",
    getValue: (row) => (row.total_revenue > 0 ? formatCurrency(row.total_revenue, row.currency) : ""),
  },
  {
    key: "trialType",
    label: "Tipo",
    getValue: (row) => getTrialTypeLabel(row.trial_type).label,
  },
  {
    key: "trialStatus",
    label: "Estado",
    getValue: (row) => getTrialStatusLabel(row.trial_status).label,
  },
  {
    key: "onboardingCompleted",
    label: "Onboarding",
    getValue: (row) => row.onboarding_completed,
  },
  {
    key: "converted",
    label: "Conversión",
    getValue: (row) => {
      if (!row.converted_at) return "";
      const now = new Date();
      const trialEndDate = row.trial_ends_at ? new Date(row.trial_ends_at) : null;
      const hasRealPayment = trialEndDate && trialEndDate < now;
      return hasRealPayment ? "Pagó" : "Por cobrar";
    },
  },
  {
    key: "daysRemaining",
    label: "Días Restantes",
    getValue: (row) => formatDaysRemaining(row.days_remaining),
  },
  {
    key: "trialStartedAt",
    label: "Inicio Prueba",
    getValue: (row) =>
      row.trial_started_at ? new Date(row.trial_started_at).toLocaleDateString("es-ES") : "",
  },
  {
    key: "trialEndsAt",
    label: "Fin Prueba",
    getValue: (row) =>
      row.trial_ends_at ? new Date(row.trial_ends_at).toLocaleDateString("es-ES") : "",
  },
  {
    key: "sacMeetingScheduled",
    label: "SAC: Agendó Cita",
    getValue: (row) => row.sac_meeting_scheduled,
  },
  {
    key: "sacAttendedImplementation",
    label: "SAC: Asistió Cita",
    getValue: (row) => row.sac_attended_implementation,
  },
  {
    key: "created_at",
    label: "Fecha Registro",
    getValue: (row) => new Date(row.created_at).toLocaleDateString("es-ES"),
  },
];
