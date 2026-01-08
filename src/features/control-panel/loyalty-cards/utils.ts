import { LoyaltyCard, RewardsType } from "./types";
import { FilterFn } from "@tanstack/react-table";

// Custom filter function for multi-column searching
export const multiColumnFilterFn: FilterFn<LoyaltyCard> = (row, columnId, filterValue) => {
  const searchableRowContent = `${row.original.name} ${row.original.businessName} ${row.original.businessEmail}`.toLowerCase();
  const searchTerm = (filterValue ?? "").toLowerCase();
  return searchableRowContent.includes(searchTerm);
};

export const rewardsTypeFilterFn: FilterFn<LoyaltyCard> = (row, columnId, filterValue: string[]) => {
  if (!filterValue?.length) return true;
  const type = row.getValue(columnId) as string;
  return filterValue.includes(type);
};

// Rewards type label mapping
export const getRewardsTypeLabel = (type: RewardsType): { label: string; className: string } => {
  switch (type) {
    case "stamps":
      return {
        label: "Estampillas",
        className: "bg-violet-100 text-violet-800 border-violet-300",
      };
    case "levels":
      return {
        label: "Niveles",
        className: "bg-blue-100 text-blue-800 border-blue-300",
      };
    case "prepaid":
      return {
        label: "Prepago",
        className: "bg-emerald-100 text-emerald-800 border-emerald-300",
      };
    default:
      return {
        label: "—",
        className: "bg-gray-100 text-gray-800 border-gray-300",
      };
  }
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
