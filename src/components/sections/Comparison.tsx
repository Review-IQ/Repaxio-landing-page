import { motion } from "framer-motion";
import { Check, X, Minus } from "lucide-react";

const comparisonData = [
  {
    feature: "Starting Price",
    repaxio: "$49/mo",
    others: "$299-399/mo",
  },
  {
    feature: "AI Responses",
    repaxio: true,
    others: "Add-on / Higher tiers",
  },
  {
    feature: "Contracts",
    repaxio: "None",
    others: "Annual",
  },
  {
    feature: "Setup Time",
    repaxio: "Minutes",
    others: "Weeks",
  },
  {
    feature: "Multi-location",
    repaxio: true,
    others: true,
  },
  {
    feature: "WhatsApp Support",
    repaxio: true,
    others: false,
  },
  {
    feature: "POS Integration",
    repaxio: true,
    others: true,
  },
  {
    feature: "Cancel Anytime",
    repaxio: true,
    others: false,
  },
];

function FeatureValue({ value }: { value: boolean | string }) {
  if (value === true) {
    return (
      <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
        <Check className="w-4 h-4 text-emerald-600" />
      </div>
    );
  }
  if (value === false) {
    return (
      <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center">
        <X className="w-4 h-4 text-red-500" />
      </div>
    );
  }
  if (typeof value === "string" && (value === "Add-on" || value === "Higher tiers" || value === "Add-on / Higher tiers")) {
    return (
      <div className="flex items-center gap-1">
        <Minus className="w-4 h-4 text-slate-400" />
        <span className="text-sm text-slate-500">{value}</span>
      </div>
    );
  }
  return <span className="text-sm font-medium text-slate-700">{value}</span>;
}

export function Comparison() {
  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark mb-4"
          >
            Why Businesses{" "}
            <span className="gradient-text">Switch to Repaxio</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 max-w-2xl mx-auto"
          >
            See how Repaxio stacks up against the enterprise giants.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl card-shadow overflow-hidden"
        >
          {/* Table Header */}
          <div className="grid grid-cols-3 gap-4 p-6 bg-slate-50 border-b border-slate-100">
            <div className="font-semibold text-slate-600">Feature</div>
            <div className="text-center">
              <span className="font-bold text-primary-700">Repaxio</span>
            </div>
            <div className="text-center">
              <span className="font-medium text-slate-500">Other Tools</span>
            </div>
          </div>

          {/* Table Rows */}
          {comparisonData.map((row, index) => (
            <motion.div
              key={row.feature}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className={`grid grid-cols-3 gap-4 p-6 items-center ${
                index % 2 === 0 ? "bg-white" : "bg-slate-50/50"
              }`}
            >
              <div className="font-medium text-dark text-sm sm:text-base">
                {row.feature}
              </div>
              <div className="flex justify-center">
                <FeatureValue value={row.repaxio} />
              </div>
              <div className="flex justify-center">
                <FeatureValue value={row.others} />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <p className="text-slate-600">
            All the features you need at a price that makes sense.{" "}
            <a href="#pricing" className="text-primary-700 font-medium hover:underline">
              See our pricing →
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
