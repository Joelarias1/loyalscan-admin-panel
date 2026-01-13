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

// Get computed status for filtering (includes trial types)
// Consolidates all statuses into: trial_with_card, trial_without_card, active, no_payment, canceled, trial_expired
export const getBusinessComputedStatus = (business: Business): string => {
  const { payment_status, trialType, subscriptionStatus } = business;

  // Check if it's a trial (any form of trialing)
  const isTrial = subscriptionStatus === "trialing" ||
    (trialType && payment_status === "trialing") ||
    payment_status === "trialing";

  if (isTrial) {
    return trialType === "with_card" ? "trial_with_card" : "trial_without_card";
  }

  // For active/paid subscriptions - consolidate to "active"
  if (subscriptionStatus === "active" || payment_status === "paid" || payment_status === "active") {
    return "active";
  }

  // Canceled states
  if (payment_status === "canceled" || payment_status === "unpaid") {
    return "canceled";
  }

  // Trial expired
  if (payment_status === "trial_expired") {
    return "trial_expired";
  }

  // No payment / solo registro
  if (payment_status === "no_payment") {
    return "no_payment";
  }

  // Any other status defaults to no_payment (solo registro)
  return "no_payment";
};

export const statusFilterFn: FilterFn<Business> = (row, columnId, filterValue: string[]) => {
  if (!filterValue?.length) return true;
  const computedStatus = getBusinessComputedStatus(row.original);
  return filterValue.includes(computedStatus);
};

// Get label for computed status (for filter dropdown)
export const getComputedStatusLabel = (status: string): string => {
  switch (status) {
    case "trial_with_card":
      return "Prueba con tarjeta";
    case "trial_without_card":
      return "Prueba sin tarjeta";
    case "active":
    case "paid":
      return "Pagando";
    case "no_payment":
      return "Solo registro";
    case "canceled":
    case "unpaid":
      return "Cancelado";
    case "trial_expired":
      return "Trial expirado";
    default:
      return status || "—";
  }
};

// Helper to check if business is in trial
const isBusinessInTrial = (business: Business): boolean => {
  const { payment_status, trialType, subscriptionStatus } = business;
  return subscriptionStatus === "trialing" ||
    (trialType && payment_status === "trialing") ||
    payment_status === "trialing";
};

// Plan filter function (trials count as "no plan" since they don't show plan in table)
export const planFilterFn: FilterFn<Business> = (row, columnId, filterValue: string[]) => {
  if (!filterValue?.length) return true;

  const business = row.original;
  const isTrial = isBusinessInTrial(business);

  // Handle "no plan" filter - includes trials and businesses without plan
  if (filterValue.includes("__no_plan__")) {
    if (isTrial || !business.planName) return true;
  }

  // Trials don't match any specific plan filter
  if (isTrial) return false;

  if (!business.planName) return false;
  return filterValue.includes(business.planName.toLowerCase());
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
    if (trialType === "with_card") {
      return {
        label: "Prueba con tarjeta",
        className: "bg-violet-100 text-violet-800 border-violet-300"
      };
    }
    return {
      label: "Prueba sin tarjeta",
      className: "bg-amber-100 text-amber-800 border-amber-300"
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
      if (trialType === "with_card") {
        return {
          label: "Prueba con tarjeta",
          className: "bg-violet-100 text-violet-800 border-violet-300"
        };
      }
      return {
        label: "Prueba sin tarjeta",
        className: "bg-amber-100 text-amber-800 border-amber-300"
      };
    }
    case "no_payment":
      return {
        label: "Solo registro",
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

// Plan label - shows which plan they selected (only for paying customers)
export const getPlanLabel = (
  business: Business
): { label: string; className: string } | null => {
  const { payment_status, trialType, subscriptionStatus, planName } = business;

  // Don't show plan for trials
  const isTrial = subscriptionStatus === "trialing" ||
    (trialType && payment_status === "trialing") ||
    payment_status === "trialing";

  if (isTrial) {
    return null;
  }

  // Show plan name if they have one and are paying
  if (planName) {
    return {
      label: formatPlanName(planName),
      className: "bg-emerald-100 text-emerald-800 border-emerald-300"
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
