// Plan definitions based on subscription_plans table
// Production plans have environment = 'production', test plans have environment = 'test'

export interface PlanDefinition {
  id: string;
  name: string;
  displayName: string;
  priceMonthly: number; // in dollars
  environment: "production" | "test";
  className: string;
}

// Production plans
export const PRODUCTION_PLANS: PlanDefinition[] = [
  {
    id: "trial",
    name: "trial",
    displayName: "Trial",
    priceMonthly: 0,
    environment: "production",
    className: "bg-blue-100 text-blue-800 border-blue-300",
  },
  {
    id: "basic",
    name: "Basic",
    displayName: "Basic",
    priceMonthly: 67,
    environment: "production",
    className: "bg-gray-100 text-gray-700 border-gray-300",
  },
  {
    id: "plus",
    name: "Plus",
    displayName: "Plus",
    priceMonthly: 97,
    environment: "production",
    className: "bg-purple-100 text-purple-800 border-purple-300",
  },
  {
    id: "pro",
    name: "Pro",
    displayName: "Pro",
    priceMonthly: 199,
    environment: "production",
    className: "bg-emerald-100 text-emerald-800 border-emerald-300",
  },
  {
    id: "ultra_basic",
    name: "ultra basic",
    displayName: "Ultra Basic",
    priceMonthly: 1,
    environment: "production",
    className: "bg-amber-100 text-amber-800 border-amber-300",
  },
  {
    id: "additional_location",
    name: "additional_location",
    displayName: "Ubicación Adicional",
    priceMonthly: 15,
    environment: "production",
    className: "bg-cyan-100 text-cyan-800 border-cyan-300",
  },
];

// Test plans
export const TEST_PLANS: PlanDefinition[] = [
  {
    id: "trial_test",
    name: "trial_test",
    displayName: "Trial (Test)",
    priceMonthly: 0,
    environment: "test",
    className: "bg-blue-100 text-blue-800 border-blue-300",
  },
  {
    id: "starter_test",
    name: "starter_test",
    displayName: "Starter (Test)",
    priceMonthly: 0,
    environment: "test",
    className: "bg-gray-100 text-gray-700 border-gray-300",
  },
  {
    id: "pro_demo",
    name: "PRO DEMO",
    displayName: "Pro Demo",
    priceMonthly: 0,
    environment: "test",
    className: "bg-emerald-100 text-emerald-800 border-emerald-300",
  },
  {
    id: "additional_location_test",
    name: "additional_location_test",
    displayName: "Ubicación Adicional (Test)",
    priceMonthly: 0,
    environment: "test",
    className: "bg-cyan-100 text-cyan-800 border-cyan-300",
  },
];

// Get plans by environment
export const getPlansForEnvironment = (isTestMode: boolean): PlanDefinition[] => {
  return isTestMode ? TEST_PLANS : PRODUCTION_PLANS;
};

// Get plan display name by plan name (handles both environments)
export const getPlanDisplayName = (planName: string | null, isTestMode: boolean): string => {
  if (!planName) return "Sin plan";

  const plans = getPlansForEnvironment(isTestMode);
  const plan = plans.find(p => p.name.toLowerCase() === planName.toLowerCase());

  return plan?.displayName || planName;
};

// Special value for businesses without a plan
export const NO_PLAN_VALUE = "__no_plan__";
