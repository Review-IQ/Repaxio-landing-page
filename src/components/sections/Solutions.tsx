import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Sparkles,
  MessageSquare,
  BarChart3,
  MapPin,
  Users,
} from "lucide-react";

const solutions = [
  {
    icon: LayoutDashboard,
    title: "All Reviews in One Dashboard",
    description:
      "See reviews from Google, Yelp, Facebook, and 100+ platforms in a single, beautiful dashboard.",
    color: "bg-primary-100 text-primary-700",
    size: "md:col-span-2 lg:col-span-1",
  },
  {
    icon: Sparkles,
    title: "AI Writes Your Responses",
    description:
      "Our GPT-powered AI generates personalized, on-brand responses in seconds. Edit or send with one click.",
    color: "bg-secondary-100 text-secondary-700",
    size: "md:col-span-2 lg:col-span-1",
    featured: true,
  },
  {
    icon: MessageSquare,
    title: "Automated Review Requests",
    description:
      "Send SMS (USA) or WhatsApp (India) requests automatically after every transaction. Connect to your POS for hands-free automation.",
    color: "bg-emerald-100 text-emerald-700",
    size: "md:col-span-2 lg:col-span-1",
  },
  {
    icon: BarChart3,
    title: "Smart Analytics & Insights",
    description:
      "AI analyzes sentiment trends, extracts keywords, and tells you exactly what customers love and hate.",
    color: "bg-blue-100 text-blue-700",
    size: "md:col-span-2 lg:col-span-1",
  },
  {
    icon: MapPin,
    title: "Multi-Location Control",
    description:
      "Manage 1 location or 50 from a single dashboard. Compare performance, set location-specific automations.",
    color: "bg-purple-100 text-purple-700",
    size: "md:col-span-2 lg:col-span-1",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description:
      "Add team members with role-based access. Assign reviews, track who responded, maintain accountability.",
    color: "bg-pink-100 text-pink-700",
    size: "md:col-span-2 lg:col-span-1",
  },
];

export function Solutions() {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark mb-4"
          >
            One Platform. Every Review.{" "}
            <span className="gradient-text">Zero Headaches.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 max-w-2xl mx-auto"
          >
            Repaxio brings everything together, automates the busywork, and lets
            AI handle the rest.
          </motion.p>
        </div>

        {/* Bento Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutions.map((solution, index) => (
            <motion.div
              key={solution.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative bg-white rounded-2xl p-6 lg:p-8 card-shadow hover:card-shadow-hover hover:-translate-y-1 transition-all duration-300 ${solution.size} ${
                solution.featured ? "ring-2 ring-primary-200" : ""
              }`}
            >
              {solution.featured && (
                <div className="absolute -top-3 left-6">
                  <span className="bg-primary-700 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              <div
                className={`w-14 h-14 rounded-2xl ${solution.color} flex items-center justify-center mb-5`}
              >
                <solution.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-semibold text-dark mb-3">
                {solution.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {solution.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
