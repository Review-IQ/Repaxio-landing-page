import { motion } from "framer-motion";
import { CheckCircle2, Sparkles } from "lucide-react";
import { WaitlistForm } from "../WaitlistForm";

export function FinalCTA() {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 noise opacity-50" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-600/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary-500/20 rounded-full blur-3xl" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white/80 text-sm mb-8"
        >
          <Sparkles className="w-4 h-4" />
          <span>Limited early access spots available</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6"
        >
          Ready to Transform Your{" "}
          <span className="text-secondary-400">Online Reputation?</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg text-primary-100 mb-10 max-w-2xl mx-auto"
        >
          Join 500+ businesses getting early access to Repaxio. Be the first to
          know when we launch and get exclusive early-bird pricing.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="max-w-md mx-auto"
        >
          <WaitlistForm variant="cta" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-8 text-primary-200"
        >
          {[
            "14-day free trial at launch",
            "No credit card required",
            "Cancel anytime",
          ].map((item) => (
            <span key={item} className="flex items-center text-sm">
              <CheckCircle2 className="w-4 h-4 mr-2 text-emerald-400" />
              {item}
            </span>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-8 text-primary-300 text-sm"
        >
          Questions?{" "}
          <a
            href="mailto:hello@repaxio.com"
            className="text-white hover:underline"
          >
            Email us at hello@repaxio.com
          </a>
        </motion.p>
      </div>
    </section>
  );
}
