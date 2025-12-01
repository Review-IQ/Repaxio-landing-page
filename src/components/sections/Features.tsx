import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  Sparkles,
  Send,
  BarChart3,
  Building2,
  Megaphone,
  Check,
} from "lucide-react";

const featureCategories = [
  {
    id: "review-management",
    label: "Review Management",
    icon: Star,
    features: [
      "Unified multi-platform dashboard (100+ platforms)",
      "Real-time review alerts (email, SMS, push)",
      "Review sentiment analysis",
      "Response templates library",
      "Review history and search",
      "Bulk response actions",
    ],
  },
  {
    id: "ai-automation",
    label: "AI Automation",
    icon: Sparkles,
    features: [
      "GPT-powered response generation",
      "Auto-respond to 5-star reviews",
      "Smart tone matching to your brand",
      "Bulk AI response actions",
      "AI improvement suggestions",
      "Learning from your responses",
    ],
  },
  {
    id: "review-generation",
    label: "Review Generation",
    icon: Send,
    features: [
      "SMS review requests (USA)",
      "WhatsApp review requests (India)",
      "Email campaign builder",
      "QR code generator",
      "POS integration triggers",
      "Smart timing optimization",
    ],
  },
  {
    id: "analytics",
    label: "Analytics & Insights",
    icon: BarChart3,
    features: [
      "Rating trends over time",
      "Sentiment analysis dashboard",
      "Keyword extraction from reviews",
      "Competitor benchmarking",
      "Custom date ranges",
      "Exportable reports (PDF, CSV)",
    ],
  },
  {
    id: "multi-location",
    label: "Multi-Location & Team",
    icon: Building2,
    features: [
      "Unlimited locations (Enterprise)",
      "Location performance comparison",
      "Role-based access control",
      "Activity logs and audit trails",
      "Team member assignments",
      "White-label reports",
    ],
  },
  {
    id: "campaigns",
    label: "Campaigns & Marketing",
    icon: Megaphone,
    features: [
      "Customer database/CRM",
      "Segmentation tools",
      "Drip campaigns",
      "Birthday & win-back offers",
      "A/B testing for messages",
      "Compliance management",
    ],
  },
];

export function Features() {
  const [activeTab, setActiveTab] = useState(featureCategories[0].id);

  const activeCategory = featureCategories.find((cat) => cat.id === activeTab);

  return (
    <section id="features" className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark mb-4"
          >
            Everything You Need to{" "}
            <span className="gradient-text">Dominate Your Market</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 max-w-2xl mx-auto"
          >
            A complete suite of tools to manage, grow, and protect your online
            reputation.
          </motion.p>
        </div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {featureCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
                activeTab === category.id
                  ? "bg-primary-700 text-white shadow-lg shadow-primary-700/25"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              <category.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{category.label}</span>
            </button>
          ))}
        </motion.div>

        {/* Feature Content */}
        <AnimatePresence mode="wait">
          {activeCategory && (
            <motion.div
              key={activeCategory.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid md:grid-cols-2 gap-8 items-center"
            >
              {/* Feature List */}
              <div className="order-2 md:order-1">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary-100 text-primary-700 flex items-center justify-center">
                    <activeCategory.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-dark">
                    {activeCategory.label}
                  </h3>
                </div>
                <ul className="space-y-4">
                  {activeCategory.features.map((feature, index) => (
                    <motion.li
                      key={feature}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3" />
                      </div>
                      <span className="text-slate-700">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Visual */}
              <div className="order-1 md:order-2">
                <div className="relative bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl p-8 min-h-[300px] flex items-center justify-center">
                  <div className="absolute inset-0 bg-white/40 rounded-2xl" />
                  <div className="relative">
                    <div className="w-32 h-32 rounded-2xl gradient-bg flex items-center justify-center shadow-2xl shadow-primary-500/30">
                      <activeCategory.icon className="w-16 h-16 text-white" />
                    </div>
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute top-8 right-8 w-16 h-16 bg-white rounded-xl shadow-lg flex items-center justify-center">
                    <Star className="w-8 h-8 text-secondary-400 fill-current" />
                  </div>
                  <div className="absolute bottom-8 left-8 w-12 h-12 bg-white rounded-lg shadow-lg flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-primary-500" />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
