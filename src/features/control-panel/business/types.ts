export interface Business {
  id: string;
  name: string;
  email: string;
  payment_status: "trialing" | "paid" | "active" | "no_payment" | "canceled" | "unpaid";
  is_trial: boolean;
  planName: string | null;
  planPrice: string | null;
  subscriptionType: string | null;
  created_at: string;
}
