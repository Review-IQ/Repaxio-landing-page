import { motion } from "framer-motion";
import {
  LayoutGrid,
  Clock,
  ThumbsDown,
  DollarSign,
  Eye,
  Building2,
} from "lucide-react";

const problems = [
  {
    icon: LayoutGrid,
    title: "Reviews scattered across platforms",
    description:
      "Google, Yelp, Facebook, TripAdvisor... logging into each one daily is exhausting.",
  },
  {
    icon: Clock,
    title: "Hours wasted writing responses",
    description:
      "Every review deserves a response, but crafting thoughtful replies takes forever.",
  },
  {
    icon: ThumbsDown,
    title: "Not enough reviews coming in",
    description:
      "Happy customers leave without reviewing. Only the unhappy ones speak up.",
  },
  {
    icon: DollarSign,
    title: "Enterprise tools cost a fortune",
    description:
      "Birdeye wants $400/month. Podium wants $500. Your budget says no.",
  },
  {
    icon: Eye,
    title: "No time to track competitors",
    description:
      "You're so busy managing your own reputation, you can't see what competitors are doing.",
  },
  {
    icon: Building2,
    title: "Can't scale across locations",
    description:
      "Each location needs attention, but you're just one person.",
  },
];

export function Problems() {
  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark mb-4"
          >
            Managing Your Reputation{" "}
            <span className="gradient-text">Shouldn't Be This Hard</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 max-w-2xl mx-auto"
          >
            Sound familiar? You're not alone. These are the challenges every
            local business faces.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {problems.map((problem, index) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-slate-50 rounded-2xl p-6 hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-slate-100"
            >
              <div className="w-12 h-12 rounded-xl bg-red-100 text-red-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <problem.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-dark mb-2">
                {problem.title}
              </h3>
              <p className="text-slate-600">{problem.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
