export type PaymentStatus = "trialing" | "paid" | "active" | "no_payment" | "canceled" | "unpaid" | "trial_expired";
export type TrialType = "with_card" | "without_card" | null;
export type TrialStatus = "active" | "converted" | "expired" | "cancelled" | "pending_checkout" | null;

export interface BusinessImplementation {
  firstLoyaltyCardCreated: boolean;
  firstCustomerRegistered: boolean;
  firstStampGiven: boolean;
  hasStaff: boolean;
}

export interface Business {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  payment_status: PaymentStatus;
  is_trial: boolean;
  // Plan info
  planName: string | null;
  planPrice: string | null;
  subscriptionType: string | null;
  subscriptionStatus: string | null;
  // Trial info
  trialType: TrialType;
  trialStatus: TrialStatus;
  // Subscription dates
  currentPeriodEnd: string | null;
  canceledAt: string | null;
  // Implementation milestones
  implementation: BusinessImplementation;
  // Counts
  customerCount: number;
  transactionCount: number;
  // Revenue
  totalRevenue: number;
  currency: string;
  // Timestamps
  created_at: string;
}
