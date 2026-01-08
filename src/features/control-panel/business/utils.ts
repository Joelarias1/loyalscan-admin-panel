import { Business, PaymentStatus, TrialType } from "./types";
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
  const searchableRowContent = `${row.original.name} ${row.original.email} ${row.original.phone || ""}`.toLowerCase();
  const searchTerm = (filterValue ?? "").toLowerCase();
  return searchableRowContent.includes(searchTerm);
};

export const statusFilterFn: FilterFn<Business> = (row, columnId, filterValue: string[]) => {
  if (!filterValue?.length) return true;
  const status = row.getValue(columnId) as string;
  return filterValue.includes(status);
};

// Plan filter function
export const planFilterFn: FilterFn<Business> = (row, columnId, filterValue: string[]) => {
  if (!filterValue?.length) return true;
  const planName = row.original.planName;
  // Handle "no plan" filter
  if (filterValue.includes("__no_plan__")) {
    if (!planName) return true;
  }
  if (!planName) return false;
  return filterValue.includes(planName.toLowerCase());
};

// Payment status label mapping (Estado Plan)
// Uses business data to determine REAL status (not just payment_status field)
export const getPaymentStatusLabel = (
  business: Business
): { label: string; className: string } => {
  const { payment_status, trialType, subscriptionStatus, currentPeriodEnd } = business;

  // First check: If subscription is trialing OR has trial type, they're in trial
  // This catches CT trials where payment_status might say "active" but trial hasn't ended
  if (subscriptionStatus === "trialing" || (trialType && payment_status === "trialing")) {
    const trialLabel = trialType === "with_card" ? "CT" : trialType === "without_card" ? "ST" : "";
    return {
      label: `Prueba gratis${trialLabel ? ` (${trialLabel})` : ""}`,
      className: "bg-blue-100 text-blue-800 border-blue-300"
    };
  }

  // Second check: If has active subscription AND period end is in the past, they've paid
  // If currentPeriodEnd is in future and status is "active", it means first payment was made
  if (subscriptionStatus === "active" && currentPeriodEnd) {
    return {
      label: "Pagando",
      className: "bg-emerald-100 text-emerald-800 border-emerald-300"
    };
  }

  // Fallback to payment_status field
  switch (payment_status) {
    case "paid":
    case "active":
      return {
        label: "Pagando",
        className: "bg-emerald-100 text-emerald-800 border-emerald-300"
      };
    case "trialing": {
      const trialLabel = trialType === "with_card" ? "CT" : trialType === "without_card" ? "ST" : "";
      return {
        label: `Prueba gratis${trialLabel ? ` (${trialLabel})` : ""}`,
        className: "bg-blue-100 text-blue-800 border-blue-300"
      };
    }
    case "no_payment":
      return {
        label: "Aún no paga",
        className: "bg-gray-100 text-gray-600 border-gray-300"
      };
    case "canceled":
    case "unpaid":
      return {
        label: "Cancelado",
        className: "bg-rose-100 text-rose-800 border-rose-300"
      };
    case "trial_expired":
      return {
        label: "Trial expirado",
        className: "bg-amber-100 text-amber-800 border-amber-300"
      };
    default:
      return {
        label: payment_status || "—",
        className: "bg-gray-100 text-gray-600 border-gray-300"
      };
  }
};

// Plan label - shows which plan they selected (regardless of payment status)
export const getPlanLabel = (
  business: Business
): { label: string; className: string } | null => {
  // Show plan name if they have one (whether paying or trialing)
  if (business.planName) {
    // Different styling for active vs trialing
    const isActive = business.subscriptionStatus === "active";
    return {
      label: formatPlanName(business.planName),
      className: isActive
        ? "bg-emerald-100 text-emerald-800 border-emerald-300"
        : "bg-gray-100 text-gray-700 border-gray-300" // Lighter for trials
    };
  }

  // No plan selected
  return null;
};

// Trial type short label
export const getTrialTypeShort = (trialType: TrialType): string => {
  if (trialType === "with_card") return "CT";
  if (trialType === "without_card") return "ST";
  return "—";
};

// Currency data with symbols
const CURRENCIES: Record<string, { symbol: string; locale: string }> = {
  EUR: { symbol: "€", locale: "de-DE" },
  USD: { symbol: "$", locale: "en-US" },
  GBP: { symbol: "£", locale: "en-GB" },
  JPY: { symbol: "¥", locale: "ja-JP" },
  CAD: { symbol: "C$", locale: "en-CA" },
  AUD: { symbol: "A$", locale: "en-AU" },
  CHF: { symbol: "CHF", locale: "de-CH" },
  CNY: { symbol: "¥", locale: "zh-CN" },
  INR: { symbol: "₹", locale: "en-IN" },
  BRL: { symbol: "R$", locale: "pt-BR" },
  MXN: { symbol: "$", locale: "es-MX" },
  ARS: { symbol: "$", locale: "es-AR" },
  CLP: { symbol: "$", locale: "es-CL" },
  COP: { symbol: "$", locale: "es-CO" },
  PEN: { symbol: "S/", locale: "es-PE" },
  UYU: { symbol: "$", locale: "es-UY" },
  BOB: { symbol: "Bs.", locale: "es-BO" },
  PYG: { symbol: "₲", locale: "es-PY" },
  VES: { symbol: "Bs.S", locale: "es-VE" },
  GTQ: { symbol: "Q", locale: "es-GT" },
  HNL: { symbol: "L", locale: "es-HN" },
  NIO: { symbol: "C$", locale: "es-NI" },
  CRC: { symbol: "₡", locale: "es-CR" },
  PAB: { symbol: "B/.", locale: "es-PA" },
  DOP: { symbol: "$", locale: "es-DO" },
  KRW: { symbol: "₩", locale: "ko-KR" },
  ZAR: { symbol: "R", locale: "en-ZA" },
  NZD: { symbol: "$", locale: "en-NZ" },
  SEK: { symbol: "kr", locale: "sv-SE" },
  NOK: { symbol: "kr", locale: "nb-NO" },
  DKK: { symbol: "kr", locale: "da-DK" },
  PLN: { symbol: "zł", locale: "pl-PL" },
  CZK: { symbol: "Kč", locale: "cs-CZ" },
  HUF: { symbol: "Ft", locale: "hu-HU" },
  RON: { symbol: "lei", locale: "ro-RO" },
};

// Currencies that don't use decimals
const NO_DECIMAL_CURRENCIES = ["CLP", "JPY", "KRW", "PYG", "HUF"];

// Format currency based on business currency
export const formatCurrency = (value: number, currencyCode: string = "CLP"): string => {
  if (value === 0) return "—";

  const currency = CURRENCIES[currencyCode] || CURRENCIES.EUR;
  const decimals = NO_DECIMAL_CURRENCIES.includes(currencyCode) ? 0 : 2;

  const formatted = new Intl.NumberFormat(currency.locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);

  return `${currency.symbol}${formatted} ${currencyCode}`;
};

// Legacy status label for backwards compatibility
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
