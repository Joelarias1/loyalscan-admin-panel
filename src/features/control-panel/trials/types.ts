export type TrialType = "with_card" | "without_card";

export type TrialStatus = "active" | "converted" | "expired" | "cancelled" | "pending_checkout";

export interface Trial {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  payment_status: string;
  is_trial: boolean;
  created_at: string;
  // Trial tracking fields
  trial_type: TrialType | null;
  trial_status: TrialStatus | null;
  trial_started_at: string | null;
  trial_ends_at: string | null;
  source_url: string | null;
  days_remaining: number | null;
  // Onboarding fields
  onboarding_completed: boolean;
  // Conversion fields
  converted_at: string | null;
  // Counts
  customer_count: number;
  transaction_count: number;
}
