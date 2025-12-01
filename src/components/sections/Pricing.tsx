import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";
import { Button } from "../ui/Button";
import { Toggle } from "../ui/Toggle";
import {
  pricingPlans,
  formatPrice,
  getMessageType,
  type Region,
  type BillingPeriod,
} from "../../lib/pricing";

export function Pricing() {
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>("monthly");
  const [region, setRegion] = useState<Region>("usa");

  // Auto-detect region based on timezone
  useEffect(() => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (
      timezone.includes("Asia/Kolkata") ||
      timezone.includes("Asia/Calcutta") ||
      timezone.includes("Asia/Kolkata")
    ) {
      setRegion("india");
    }
  }, []);

  const scrollToWaitlist = () => {
    const element = document.querySelector("#waitlist");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="pricing" className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark mb-4"
          >
            Simple, <span className="gradient-text">Transparent Pricing</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 max-w-2xl mx-auto"
          >
            No hidden fees. No contracts. Cancel anytime.
          </motion.p>
        </div>

        {/* Toggles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12"
        >
          <Toggle
            options={[
              { value: "monthly" as const, label: "Monthly" },
              { value: "annual" as const, label: "Annual" },
            ]}
            value={billingPeriod}
            onChange={setBillingPeriod}
            badge={billingPeriod === "annual" ? "Save 17%" : undefined}
          />

          <div className="h-8 w-px bg-slate-200 hidden sm:block" />

          <Toggle
            options={[
              { value: "usa" as const, label: "🇺🇸 USA" },
              { value: "india" as const, label: "🇮🇳 India" },
            ]}
            value={region}
            onChange={setRegion}
          />
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pricingPlans.map((plan, index) => {
            const price = plan[region][billingPeriod];
            const isCustom = plan.name === "Enterprise" && billingPeriod === "annual";

            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative bg-white rounded-2xl p-6 border-2 transition-all duration-300 ${
                  plan.popular
                    ? "border-primary-500 shadow-xl shadow-primary-500/10"
                    : "border-slate-100 hover:border-slate-200 card-shadow"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-primary-700 text-white text-sm font-semibold px-4 py-1.5 rounded-full flex items-center gap-1.5">
                      <Star className="w-4 h-4 fill-current" />
                      Most Popular
                    </span>
                  </div>
                )}

                <div className={plan.popular ? "pt-2" : ""}>
                  <h3 className="text-xl font-bold text-dark">{plan.name}</h3>
                  <p className="text-sm text-slate-500 mt-1 mb-4">
                    {plan.description}
                  </p>

                  <div className="mb-6">
                    <span className="text-4xl font-bold text-dark">
                      {formatPrice(price, region, isCustom)}
                    </span>
                    {!isCustom && (
                      <span className="text-slate-500 ml-1">/mo</span>
                    )}
                    {billingPeriod === "annual" && !isCustom && (
                      <p className="text-sm text-emerald-600 mt-1">
                        Billed annually
                      </p>
                    )}
                  </div>

                  {/* Key Limits */}
                  <div className="space-y-2 mb-6 pb-6 border-b border-slate-100">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Locations</span>
                      <span className="font-medium text-dark">
                        {plan.features.locations}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">
                        {getMessageType(region)}/mo
                      </span>
                      <span className="font-medium text-dark">
                        {plan.features.messages}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">AI Replies</span>
                      <span className="font-medium text-dark">
                        {plan.features.aiReplies}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Team Users</span>
                      <span className="font-medium text-dark">
                        {plan.features.teamUsers}
                      </span>
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-6">
                    {plan.allFeatures.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2 text-sm"
                      >
                        <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-600">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant={plan.popular ? "primary" : "outline"}
                    className="w-full"
                    onClick={scrollToWaitlist}
                  >
                    {plan.name === "Enterprise" ? "Contact Sales" : "Join Waitlist"}
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Comparison Callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-full px-6 py-3">
            <span className="text-2xl">💰</span>
            <span className="text-emerald-700 font-medium">
              Save 60-80% compared to Birdeye & Podium
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
