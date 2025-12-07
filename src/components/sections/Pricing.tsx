import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useWaitlist } from "../../App";

type Region = "usa" | "india";
type BillingPeriod = "monthly" | "annual";

// SVG Flags
const USAFlag = () => (
  <svg className="w-5 h-4 rounded-sm" viewBox="0 0 7410 3900" preserveAspectRatio="xMidYMid meet">
    <rect width="7410" height="3900" fill="#b22234"/>
    <path d="M0,450H7410m0,600H0m0,600H7410m0,600H0m0,600H7410m0,600H0" stroke="#fff" strokeWidth="300"/>
    <rect width="2964" height="2100" fill="#3c3b6e"/>
    <g fill="#fff">
      {[...Array(9)].map((_, row) => (
        [...Array(row % 2 === 0 ? 6 : 5)].map((__, col) => (
          <circle key={`${row}-${col}`} cx={247 * (col * 2 + 1 + (row % 2))} cy={210 * (row + 1)} r="60"/>
        ))
      ))}
    </g>
  </svg>
);

const IndiaFlag = () => (
  <svg className="w-5 h-4 rounded-sm" viewBox="0 0 900 600">
    <rect width="900" height="600" fill="#fff"/>
    <rect width="900" height="200" fill="#FF9933"/>
    <rect y="400" width="900" height="200" fill="#138808"/>
    <circle cx="450" cy="300" r="60" fill="#000080"/>
    <circle cx="450" cy="300" r="52" fill="#fff"/>
    <circle cx="450" cy="300" r="16" fill="#000080"/>
    {[...Array(24)].map((_, i) => (
      <line key={i} x1="450" y1="300" x2={450 + 52 * Math.cos(i * 15 * Math.PI / 180)} y2={300 + 52 * Math.sin(i * 15 * Math.PI / 180)} stroke="#000080" strokeWidth="2"/>
    ))}
  </svg>
);

const pricingPlans = [
  {
    name: "Starter",
    description: "Perfect for single-location businesses getting started",
    usa: { monthly: 49, annual: 41 },
    india: { monthly: 999, annual: 833 },
    features: {
      locations: "1 location",
      messages: "100",
      aiReplies: "50 AI replies/mo",
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
    popular: false,
  },
  {
    name: "Growth",
    description: "Ideal for growing businesses with multiple needs",
    usa: { monthly: 99, annual: 82 },
    india: { monthly: 2499, annual: 2083 },
    features: {
      locations: "3 locations",
      messages: "500",
      aiReplies: "Unlimited",
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
    popular: true,
  },
  {
    name: "Professional",
    description: "Best for established businesses scaling fast",
    usa: { monthly: 199, annual: 166 },
    india: { monthly: 4999, annual: 4166 },
    features: {
      locations: "10 locations",
      messages: "2,000",
      aiReplies: "Unlimited",
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
    popular: false,
  },
  {
    name: "Enterprise",
    description: "For large organizations with custom needs",
    usa: { monthly: 0, annual: 0 },
    india: { monthly: 0, annual: 0 },
    features: {
      locations: "Unlimited",
      messages: "Unlimited",
      aiReplies: "Unlimited",
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
    popular: false,
  },
];

export function Pricing() {
  const { openWaitlist } = useWaitlist();
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>("monthly");
  const [region, setRegion] = useState<Region>("usa");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (timezone.includes("Asia/Kolkata") || timezone.includes("Asia/Calcutta")) {
      setRegion("india");
    }
  }, []);

  const formatPrice = (price: number, region: Region) => {
    const symbol = region === "usa" ? "$" : "₹";
    return `${symbol}${price.toLocaleString()}`;
  };

  const getMessageType = (region: Region) => region === "usa" ? "SMS" : "WhatsApp";

  return (
    <section id="pricing" className="py-24 lg:py-32 bg-slate-50 dark:bg-slate-900 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-50/20 to-transparent dark:via-primary-950/10" />

      <div className="max-w-7xl mx-auto px-6 relative z-10" ref={ref}>
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 mb-6"
          >
            <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
              Pricing
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
          >
            <span className="text-slate-900 dark:text-white">Simple,</span>{" "}
            <span className="text-gradient">Transparent Pricing</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto"
          >
            No hidden fees. No contracts. Join the waitlist for early access.
          </motion.p>
        </div>

        {/* Toggles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12"
        >
          {/* Billing Toggle */}
          <div className="flex items-center gap-2 bg-white dark:bg-slate-800 rounded-xl p-1 shadow-sm border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setBillingPeriod("monthly")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                billingPeriod === "monthly"
                  ? "bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow"
                  : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod("annual")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                billingPeriod === "annual"
                  ? "bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow"
                  : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
              }`}
            >
              Annual
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                billingPeriod === "annual"
                  ? "bg-white/20"
                  : "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
              }`}>
                -17%
              </span>
            </button>
          </div>

          <div className="h-8 w-px bg-slate-200 dark:bg-slate-700 hidden sm:block" />

          {/* Region Toggle */}
          <div className="flex items-center gap-2 bg-white dark:bg-slate-800 rounded-xl p-1 shadow-sm border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setRegion("usa")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                region === "usa"
                  ? "bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow"
                  : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
              }`}
            >
              <USAFlag />
              USA
            </button>
            <button
              onClick={() => setRegion("india")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                region === "india"
                  ? "bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow"
                  : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
              }`}
            >
              <IndiaFlag />
              India
            </button>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pricingPlans.map((plan, index) => {
            const price = plan[region][billingPeriod];

            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className={`relative glass-morphism rounded-2xl p-6 transition-all duration-300 ${
                  plan.popular
                    ? "border-2 border-primary-500 shadow-xl shadow-primary-500/20"
                    : "border border-slate-200/50 dark:border-slate-700/50 hover:border-primary-500/30"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-to-r from-primary-500 to-accent-500 text-white text-sm font-semibold px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      Most Popular
                    </span>
                  </div>
                )}

                <div className={plan.popular ? "pt-4" : ""}>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">{plan.name}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 mb-4 min-h-[40px]">
                    {plan.description}
                  </p>

                  <div className="mb-6">
                    <span className="text-4xl font-bold text-slate-900 dark:text-white">
                      {plan.name === "Enterprise" ? "Custom" : formatPrice(price, region)}
                    </span>
                    {plan.name !== "Enterprise" && (
                      <span className="text-slate-500 dark:text-slate-400 ml-1">/mo</span>
                    )}
                    {billingPeriod === "annual" && plan.name !== "Enterprise" && (
                      <p className="text-sm text-primary-500 mt-1">
                        Billed annually
                      </p>
                    )}
                  </div>

                  {/* Key Limits */}
                  <div className="space-y-2 mb-6 pb-6 border-b border-slate-200/50 dark:border-slate-700/50">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500 dark:text-slate-400">Locations</span>
                      <span className="font-medium text-slate-900 dark:text-white">
                        {plan.features.locations}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500 dark:text-slate-400">
                        {getMessageType(region)}/mo
                      </span>
                      <span className="font-medium text-slate-900 dark:text-white">
                        {plan.features.messages}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500 dark:text-slate-400">AI Replies</span>
                      <span className="font-medium text-slate-900 dark:text-white">
                        {plan.features.aiReplies}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500 dark:text-slate-400">Team Users</span>
                      <span className="font-medium text-slate-900 dark:text-white">
                        {plan.features.teamUsers}
                      </span>
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-6">
                    {plan.allFeatures.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm">
                        <svg className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-slate-600 dark:text-slate-300">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <motion.button
                    onClick={plan.name !== "Enterprise" ? openWaitlist : undefined}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
                      plan.popular
                        ? "bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-white shadow-lg hover:shadow-xl hover:shadow-primary-500/25"
                        : "bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700"
                    }`}
                  >
                    {plan.name === "Enterprise" ? "Contact Sales" : "Join Waitlist"}
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Comparison Callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-3 glass-morphism rounded-full px-6 py-3 border border-primary-500/20">
            <span className="text-2xl">💰</span>
            <span className="text-primary-600 dark:text-primary-400 font-medium">
              Save 60-80% compared to enterprise tools
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
