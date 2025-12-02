import { motion } from "framer-motion";

const platforms = [
  { name: "Google", color: "#4285F4" },
  { name: "Yelp", color: "#FF1A1A" },
  { name: "Facebook", color: "#1877F2" },
  { name: "TripAdvisor", color: "#34E0A1" },
  { name: "Trustpilot", color: "#00B67A" },
  { name: "Apple Maps", color: "#000000" },
];

export function LogoBar() {
  return (
    <section id="logo-bar" className="py-16 bg-slate-50/50 dark:bg-slate-900/50 border-y border-slate-200/50 dark:border-slate-800/50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-sm text-slate-500 dark:text-slate-400 mb-8"
        >
          Monitors and manages reviews across all major platforms
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap justify-center items-center gap-8 md:gap-12"
        >
          {platforms.map((platform, index) => (
            <motion.div
              key={platform.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ scale: 1.1, y: -5 }}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 cursor-pointer transition-all duration-200 hover:shadow-md"
            >
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: platform.color }}
              />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                {platform.name}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { value: "50K+", label: "Reviews Managed" },
            { value: "500+", label: "Happy Businesses" },
            { value: "4.9/5", label: "Customer Rating" },
            { value: "< 1min", label: "AI Response Time" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="text-center"
            >
              <p className="text-2xl md:text-3xl font-bold text-gradient">{stat.value}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
