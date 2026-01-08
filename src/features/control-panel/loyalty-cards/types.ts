export type RewardsType = "stamps" | "levels" | "prepaid";

export interface LoyaltyCard {
  id: string;
  name: string;
  rewardsType: RewardsType;
  isActive: boolean;
  createdAt: string;
  // Business info
  businessId: string;
  businessName: string;
  businessEmail: string;
  currency: string;
  // Counts & Revenue
  customerCount: number;
  transactionCount: number;
  totalRevenue: number;
}
