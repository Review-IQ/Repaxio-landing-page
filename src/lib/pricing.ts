export type Region = "usa" | "india";
export type BillingPeriod = "monthly" | "annual";

export interface PricingPlan {
  name: string;
  description: string;
  popular?: boolean;
  usa: {
    monthly: number;
    annual: number;
  };
  india: {
    monthly: number;
    annual: number;
  };
  features: {
    locations: string;
    messages: string;
    aiReplies: string;
    competitors: string;
    teamUsers: string;
  };
  allFeatures: string[];
}

export const pricingPlans: PricingPlan[] = [
  {
    name: "Starter",
    description: "Perfect for single-location businesses getting started",
    usa: { monthly: 49, annual: 39 },
    india: { monthly: 999, annual: 799 },
    features: {
      locations: "1 location",
      messages: "100 SMS/mo",
      aiReplies: "50 AI replies/mo",
      competitors: "1 competitor",
      teamUsers: "1 user",
    },
    allFeatures: [
      "Unified review dashboard",
      "AI-powered responses",
      "Review monitoring & alerts",
      "Unlimited email notifications",
      "Basic analytics",
      "Email support",
    ],
  },
  {
    name: "Growth",
    description: "Ideal for growing businesses with multiple needs",
    usa: { monthly: 99, annual: 79 },
    india: { monthly: 2499, annual: 1999 },
    features: {
      locations: "3 locations",
      messages: "500 SMS/mo",
      aiReplies: "Unlimited",
      competitors: "3 competitors",
      teamUsers: "3 users",
    },
    allFeatures: [
      "Everything in Starter",
      "Unlimited AI responses",
      "Advanced analytics",
      "Review generation campaigns",
      "Unlimited email campaigns",
      "QR code generator",
      "Priority email support",
    ],
  },
  {
    name: "Professional",
    description: "Best for established businesses scaling fast",
    popular: true,
    usa: { monthly: 179, annual: 149 },
    india: { monthly: 3999, annual: 3299 },
    features: {
      locations: "10 locations",
      messages: "2,000 SMS/mo",
      aiReplies: "Unlimited",
      competitors: "10 competitors",
      teamUsers: "10 users",
    },
    allFeatures: [
      "Everything in Growth",
      "Multi-location analytics",
      "Competitor benchmarking",
      "POS integrations",
      "Unlimited campaigns",
      "Custom reports",
      "Priority chat support",
    ],
  },
  {
    name: "Enterprise",
    description: "For large organizations with custom needs",
    usa: { monthly: 349, annual: 0 },
    india: { monthly: 7999, annual: 0 },
    features: {
      locations: "Unlimited",
      messages: "Unlimited",
      aiReplies: "Unlimited",
      competitors: "Unlimited",
      teamUsers: "Unlimited",
    },
    allFeatures: [
      "Everything in Professional",
      "Unlimited everything",
      "Custom integrations",
      "White-label reports",
      "API access",
      "Dedicated account manager",
      "SLA guarantee",
    ],
  },
];

export function formatPrice(
  amount: number,
  region: Region,
  isCustom = false
): string {
  if (isCustom) return "Custom";

  if (region === "usa") {
    return `$${amount}`;
  }
  return `₹${amount.toLocaleString("en-IN")}`;
}

export function getCurrency(region: Region): string {
  return region === "usa" ? "USD" : "INR";
}

export function getMessageType(region: Region): string {
  return region === "usa" ? "SMS" : "WhatsApp";
}
