import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

// Animated Feature Illustrations
const ReviewDashboardAnimation = () => (
  <div className="relative w-full h-64 flex items-center justify-center">
    {/* Main dashboard mockup */}
    <motion.div
      className="relative w-full max-w-sm bg-slate-800 rounded-xl shadow-2xl overflow-hidden"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="bg-slate-900 px-4 py-2 flex items-center gap-2">
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-red-500" />
          <div className="w-2 h-2 rounded-full bg-yellow-500" />
          <div className="w-2 h-2 rounded-full bg-green-500" />
        </div>
        <span className="text-xs text-slate-400 ml-2">Reviews Dashboard</span>
      </div>
      {/* Content */}
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xs text-slate-400">All Platforms</span>
          <div className="flex gap-1">
            {["Google", "Yelp", "FB"].map((p, i) => (
              <motion.div
                key={p}
                className="px-2 py-0.5 bg-primary-500/20 rounded text-[10px] text-primary-400"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
              >
                {p}
              </motion.div>
            ))}
          </div>
        </div>
        {/* Review cards */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="bg-slate-700/50 rounded-lg p-2 mb-2 flex items-center gap-2"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 + i * 0.1 }}
          >
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary-400 to-accent-400" />
            <div className="flex-1">
              <div className="flex gap-0.5 mb-1">
                {[...Array(5)].map((_, j) => (
                  <svg key={j} className="w-2 h-2 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <div className="h-1.5 bg-slate-600 rounded w-3/4" />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
    {/* Floating notification */}
    <motion.div
      className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full shadow-lg"
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      +5 new
    </motion.div>
  </div>
);

const AIResponseAnimation = () => (
  <div className="relative w-full h-64 flex items-center justify-center">
    <div className="w-full max-w-sm">
      {/* Input review */}
      <motion.div
        className="bg-slate-700/50 rounded-xl p-3 mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-orange-400 flex items-center justify-center text-white text-xs font-bold">
            J
          </div>
          <div>
            <p className="text-xs font-medium text-white">John D.</p>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-3 h-3 text-yellow-400 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>
        </div>
        <p className="text-xs text-slate-300">"Amazing service! Best experience ever."</p>
      </motion.div>

      {/* AI processing animation */}
      <motion.div
        className="flex items-center justify-center gap-2 mb-4"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <span className="text-xs text-primary-400">AI generating response...</span>
      </motion.div>

      {/* Generated response */}
      <motion.div
        className="bg-primary-500/10 border border-primary-500/30 rounded-xl p-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-xs text-slate-300">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            "Thank you so much, John! We're thrilled you had an amazing experience..."
          </motion.span>
        </p>
        <div className="flex gap-2 mt-2">
          <motion.button
            className="px-2 py-1 bg-primary-500 text-white text-[10px] rounded font-medium"
            whileHover={{ scale: 1.05 }}
          >
            Send
          </motion.button>
          <motion.button
            className="px-2 py-1 bg-slate-600 text-white text-[10px] rounded font-medium"
            whileHover={{ scale: 1.05 }}
          >
            Edit
          </motion.button>
        </div>
      </motion.div>
    </div>
  </div>
);

const CampaignAnimation = () => (
  <div className="relative w-full h-64 flex items-center justify-center">
    <div className="relative">
      {/* Phone mockup */}
      <motion.div
        className="w-32 h-56 bg-slate-800 rounded-3xl border-4 border-slate-700 flex flex-col items-center p-2 shadow-2xl"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <div className="w-12 h-1 bg-slate-600 rounded-full mb-2" />
        <div className="flex-1 w-full bg-slate-900 rounded-2xl p-2 flex flex-col">
          <motion.div
            className="bg-primary-500/20 rounded-lg p-2 mb-2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-[8px] text-white">Hi! Thanks for visiting!</p>
            <p className="text-[6px] text-primary-300 mt-1">Leave us a review?</p>
          </motion.div>
          <motion.div
            className="flex gap-1 justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {[...Array(5)].map((_, i) => (
              <motion.svg
                key={i}
                className="w-4 h-4 text-yellow-400 fill-current"
                viewBox="0 0 20 20"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ delay: 0.8 + i * 0.1, duration: 0.3 }}
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </motion.svg>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Flying messages */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute text-lg"
          style={{ left: "-40px", top: `${30 + i * 30}%` }}
          animate={{
            x: [-20, 0],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 2,
            delay: i * 0.5,
            repeat: Infinity,
          }}
        >
          📱
        </motion.div>
      ))}
    </div>
  </div>
);

const AnalyticsAnimation = () => (
  <div className="relative w-full h-64 flex items-center justify-center">
    <div className="w-full max-w-sm bg-slate-800 rounded-xl p-4 shadow-2xl">
      {/* Chart header */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-xs text-white font-medium">Rating Trends</span>
        <span className="text-xs text-primary-400">Last 30 days</span>
      </div>
      {/* Bar chart */}
      <div className="flex items-end gap-2 h-32">
        {[65, 78, 82, 70, 88, 95, 92].map((height, i) => (
          <motion.div
            key={i}
            className="flex-1 bg-gradient-to-t from-primary-600 to-accent-500 rounded-t"
            initial={{ height: 0 }}
            animate={{ height: `${height}%` }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
          />
        ))}
      </div>
      {/* Legend */}
      <div className="flex justify-between mt-2 text-[8px] text-slate-400">
        <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
      </div>
      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 mt-4">
        {[
          { label: "Avg Rating", value: "4.8" },
          { label: "Total", value: "847" },
          { label: "Growth", value: "+23%" },
        ].map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="text-sm font-bold text-white">{stat.value}</p>
            <p className="text-[8px] text-slate-400">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const MultiLocationAnimation = () => (
  <div className="relative w-full h-64 flex items-center justify-center">
    <div className="relative">
      {/* Map-like grid */}
      <motion.div
        className="w-64 h-48 bg-slate-800/50 rounded-xl p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {/* Location pins */}
        {[
          { x: 20, y: 30, name: "NYC", rating: "4.9" },
          { x: 60, y: 50, name: "LA", rating: "4.7" },
          { x: 40, y: 70, name: "MIA", rating: "4.8" },
        ].map((loc, i) => (
          <motion.div
            key={loc.name}
            className="absolute"
            style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: i * 0.2 }}
          >
            <motion.div
              className="relative"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
            >
              <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-slate-700 px-2 py-0.5 rounded text-[8px] text-white whitespace-nowrap">
                {loc.name} • {loc.rating}⭐
              </div>
            </motion.div>
          </motion.div>
        ))}
        {/* Connection lines */}
        <svg className="absolute inset-0 w-full h-full opacity-30">
          <motion.line
            x1="28%" y1="38%" x2="68%" y2="58%"
            stroke="#10b981"
            strokeWidth="1"
            strokeDasharray="4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.line
            x1="48%" y1="78%" x2="68%" y2="58%"
            stroke="#10b981"
            strokeWidth="1"
            strokeDasharray="4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 0.5, repeat: Infinity }}
          />
        </svg>
      </motion.div>
    </div>
  </div>
);

const CompetitorAnimation = () => (
  <div className="relative w-full h-64 flex items-center justify-center">
    <div className="w-full max-w-sm">
      {/* Comparison bars */}
      {[
        { name: "Your Business", rating: 4.8, color: "from-primary-500 to-accent-500", width: 95 },
        { name: "Competitor A", rating: 4.2, color: "from-slate-500 to-slate-600", width: 75 },
        { name: "Competitor B", rating: 3.9, color: "from-slate-500 to-slate-600", width: 65 },
      ].map((item, i) => (
        <motion.div
          key={item.name}
          className="mb-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.2 }}
        >
          <div className="flex justify-between mb-1">
            <span className={`text-xs ${i === 0 ? "text-primary-400 font-medium" : "text-slate-400"}`}>
              {item.name}
            </span>
            <span className={`text-xs ${i === 0 ? "text-white" : "text-slate-400"}`}>
              {item.rating} ⭐
            </span>
          </div>
          <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
            <motion.div
              className={`h-full bg-gradient-to-r ${item.color} rounded-full`}
              initial={{ width: 0 }}
              animate={{ width: `${item.width}%` }}
              transition={{ delay: 0.5 + i * 0.2, duration: 0.8 }}
            />
          </div>
        </motion.div>
      ))}
      {/* Trophy icon */}
      <motion.div
        className="text-center mt-4"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-2xl">🏆</span>
        <p className="text-xs text-primary-400 mt-1">You're #1 in your area!</p>
      </motion.div>
    </div>
  </div>
);

const MarketingAnimation = () => (
  <div className="relative w-full h-64 flex items-center justify-center">
    <div className="w-full max-w-sm">
      {/* Marketing dashboard mockup */}
      <motion.div
        className="bg-slate-800 rounded-xl p-4 shadow-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <span className="text-xs text-white font-medium">Campaign Performance</span>
          <motion.div
            className="px-2 py-0.5 bg-green-500/20 rounded text-[10px] text-green-400"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Live
          </motion.div>
        </div>
        {/* Campaign cards */}
        {[
          { name: "SMS Blast", sent: 1250, opens: "89%", color: "from-blue-500 to-blue-600" },
          { name: "Email Drip", sent: 3400, opens: "42%", color: "from-purple-500 to-purple-600" },
          { name: "Referral", sent: 890, opens: "67%", color: "from-orange-500 to-orange-600" },
        ].map((campaign, i) => (
          <motion.div
            key={campaign.name}
            className="flex items-center justify-between py-2 border-b border-slate-700 last:border-none"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + i * 0.15 }}
          >
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${campaign.color}`} />
              <span className="text-xs text-slate-300">{campaign.name}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[10px] text-slate-400">{campaign.sent} sent</span>
              <motion.span
                className="text-xs text-green-400 font-medium"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
              >
                {campaign.opens}
              </motion.span>
            </div>
          </motion.div>
        ))}
        {/* Bottom stats */}
        <div className="flex justify-between mt-4 pt-3 border-t border-slate-700">
          <div className="text-center">
            <motion.p
              className="text-lg font-bold text-white"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              +127
            </motion.p>
            <p className="text-[8px] text-slate-400">New Reviews</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-primary-400">$2.4k</p>
            <p className="text-[8px] text-slate-400">Revenue</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-accent-400">34%</p>
            <p className="text-[8px] text-slate-400">Conversion</p>
          </div>
        </div>
      </motion.div>
    </div>
  </div>
);

const featureCategories = [
  {
    id: "dashboard",
    label: "Review Management",
    animation: <ReviewDashboardAnimation />,
    features: [
      "All reviews from 100+ platforms in one place",
      "Real-time alerts via email, SMS, and push",
      "Smart sentiment analysis",
      "Advanced search and filtering",
      "Bulk actions for efficiency",
    ],
  },
  {
    id: "ai",
    label: "AI Automation",
    animation: <AIResponseAnimation />,
    features: [
      "GPT-powered response generation",
      "Auto-respond to positive reviews",
      "Brand voice matching",
      "Continuous learning from your style",
      "One-click publish to any platform",
    ],
  },
  {
    id: "campaigns",
    label: "Review Generation",
    animation: <CampaignAnimation />,
    features: [
      "SMS campaigns (USA)",
      "WhatsApp campaigns (India)",
      "Email drip sequences",
      "QR codes for in-store",
      "Smart timing optimization",
    ],
  },
  {
    id: "analytics",
    label: "Analytics & Insights",
    animation: <AnalyticsAnimation />,
    features: [
      "AI-powered sentiment analysis on all reviews",
      "Review volume & rating trends over time",
      "Response rate & time tracking",
      "Keyword extraction & topic clustering",
      "Automated weekly/monthly reports (PDF, CSV)",
    ],
  },
  {
    id: "multi-location",
    label: "Multi-Location & Team",
    animation: <MultiLocationAnimation />,
    features: [
      "Manage unlimited locations",
      "Location performance comparison",
      "Role-based team access",
      "Centralized brand control",
      "Per-location reporting",
    ],
  },
  {
    id: "competitor",
    label: "Competitor Intel",
    animation: <CompetitorAnimation />,
    features: [
      "Track unlimited competitors' ratings & reviews",
      "AI insights on competitor strengths & weaknesses",
      "Local market ranking & share of voice",
      "Identify service gaps & opportunities",
      "Real-time alerts when competitors slip",
    ],
  },
  {
    id: "marketing",
    label: "Campaigns & Marketing",
    animation: <MarketingAnimation />,
    features: [
      "Bulk SMS & email marketing campaigns",
      "Automated referral program to turn reviews into new customers",
      "Campaign performance analytics & ROI tracking",
      "Customer segmentation & targeted messaging",
      "Social media post scheduling & performance insights",
    ],
  },
];

export function Features() {
  const [activeTab, setActiveTab] = useState(featureCategories[0].id);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const activeCategory = featureCategories.find((cat) => cat.id === activeTab);

  return (
    <section id="features" className="py-24 lg:py-32 bg-slate-50 dark:bg-slate-900 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-50/30 to-transparent dark:via-primary-950/10" />

      <div className="max-w-7xl mx-auto px-6 relative z-10" ref={ref}>
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 mb-6"
          >
            <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
              The Solution
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
          >
            <span className="text-slate-900 dark:text-white">Everything You Need to</span>
            <br />
            <span className="text-gradient">Dominate Your Market</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto"
          >
            Powered by advanced AI, Repaxio gives you enterprise-grade reputation
            management at a price that makes sense for your business.
          </motion.p>
        </div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {featureCategories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 ${
                activeTab === category.id
                  ? "bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg shadow-primary-500/25"
                  : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700"
              }`}
            >
              {category.label}
            </motion.button>
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
              className="grid lg:grid-cols-2 gap-12 items-center"
            >
              {/* Animation */}
              <div className="order-1 lg:order-2">
                <div className="glass-morphism rounded-2xl p-6 min-h-[320px] flex items-center justify-center">
                  {activeCategory.animation}
                </div>
              </div>

              {/* Feature List */}
              <div className="order-2 lg:order-1">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                  {activeCategory.label}
                </h3>
                <ul className="space-y-4">
                  {activeCategory.features.map((feature, index) => (
                    <motion.li
                      key={feature}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <div className="w-6 h-6 rounded-full bg-primary-500/20 text-primary-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-slate-700 dark:text-slate-300">{feature}</span>
                    </motion.li>
                  ))}
                </ul>

                <motion.a
                  href="#pricing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="inline-flex items-center gap-2 mt-8 text-primary-500 hover:text-primary-600 font-medium"
                >
                  See pricing
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
