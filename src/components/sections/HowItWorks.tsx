import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useWaitlist } from "../../App";

const steps = [
  {
    number: "01",
    title: "Connect Your Platforms",
    description:
      "Link your Google Business, Yelp, Facebook, and other review platforms in just a few clicks.",
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      </svg>
    ),
    animation: (
      <div className="relative w-full h-full flex items-center justify-center">
        {["Google", "Yelp", "FB"].map((platform, i) => (
          <motion.div
            key={platform}
            className="absolute w-12 h-12 rounded-xl flex items-center justify-center text-xs font-bold text-white shadow-lg"
            style={{
              backgroundColor: i === 0 ? "#4285F4" : i === 1 ? "#FF1A1A" : "#1877F2",
              left: `${30 + i * 15}%`,
            }}
            animate={{
              y: [0, -10, 0],
              rotate: [-5 + i * 5, 5 - i * 5, -5 + i * 5],
            }}
            transition={{
              duration: 2,
              delay: i * 0.2,
              repeat: Infinity,
            }}
          >
            {platform}
          </motion.div>
        ))}
        <motion.div
          className="absolute bottom-4 w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-xl"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>
      </div>
    ),
  },
  {
    number: "02",
    title: "AI Learns Your Brand",
    description:
      "Our intelligent system analyzes your business and creates responses that match your unique voice and style.",
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    animation: (
      <div className="relative w-full h-full flex items-center justify-center">
        <motion.div
          className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-2xl"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        >
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </motion.div>
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 rounded-full bg-primary-400"
            style={{
              top: "50%",
              left: "50%",
            }}
            animate={{
              x: [0, Math.cos((i * Math.PI) / 2) * 50],
              y: [0, Math.sin((i * Math.PI) / 2) * 50],
              opacity: [1, 0],
              scale: [1, 0.5],
            }}
            transition={{
              duration: 1.5,
              delay: i * 0.3,
              repeat: Infinity,
            }}
          />
        ))}
      </div>
    ),
  },
  {
    number: "03",
    title: "Monitor & Engage",
    description:
      "Get real-time notifications, AI-suggested responses, and powerful analytics. All from one dashboard.",
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
    ),
    animation: (
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="w-24 h-16 bg-slate-800 rounded-lg border border-slate-600 flex items-center justify-center shadow-xl p-2">
          <div className="w-full h-full bg-slate-700 rounded flex flex-col gap-1 p-1">
            <motion.div
              className="w-full h-2 bg-primary-500/50 rounded"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <motion.div
              className="w-3/4 h-2 bg-accent-500/50 rounded"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, delay: 0.3, repeat: Infinity }}
            />
            <motion.div
              className="w-1/2 h-2 bg-green-500/50 rounded"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, delay: 0.6, repeat: Infinity }}
            />
          </div>
        </div>
        <motion.div
          className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          3
        </motion.div>
      </div>
    ),
  },
  {
    number: "04",
    title: "Grow Your Business",
    description:
      "Watch your ratings improve, response time decrease, and customer satisfaction soar.",
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    animation: (
      <div className="relative w-full h-full flex items-end justify-center pb-8 gap-2">
        {[40, 55, 70, 90].map((height, i) => (
          <motion.div
            key={i}
            className="w-8 bg-gradient-to-t from-primary-600 to-accent-500 rounded-t"
            initial={{ height: 0 }}
            animate={{ height: `${height}%` }}
            transition={{ delay: i * 0.2, duration: 0.8 }}
          />
        ))}
        <motion.div
          className="absolute top-4 right-4 bg-green-500 text-white text-xs px-2 py-1 rounded-full"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          +127%
        </motion.div>
      </div>
    ),
  },
];

export function HowItWorks() {
  const { openWaitlist } = useWaitlist();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="how-it-works" className="py-24 lg:py-32 bg-white dark:bg-slate-950 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50/50 to-transparent dark:from-slate-900/50" />

      <div className="max-w-7xl mx-auto px-6 relative z-10" ref={ref}>
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 mb-6"
          >
            <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
              How It Works
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
          >
            <span className="text-slate-900 dark:text-white">Get Started in</span>{" "}
            <span className="text-gradient">4 Simple Steps</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto"
          >
            No complex setup. No lengthy onboarding. Our AI handles the heavy
            lifting so you can focus on growing your business.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + index * 0.15 }}
              className="relative group"
            >
              {/* Connection line for desktop */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-primary-500/50 to-transparent z-0" />
              )}

              <div className="relative glass-morphism rounded-2xl p-6 h-full hover:shadow-xl transition-all duration-300 border border-slate-200/50 dark:border-slate-700/50 group-hover:border-primary-500/30">
                {/* Step number badge */}
                <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                  {step.number}
                </div>

                {/* Animation area */}
                <div className="h-32 mb-6 bg-slate-100/50 dark:bg-slate-800/50 rounded-xl overflow-hidden">
                  {step.animation}
                </div>

                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  {step.icon}
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
                  {step.title}
                </h3>

                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <motion.button
            onClick={openWaitlist}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:shadow-primary-500/25 transition-all duration-300"
          >
            Join Waitlist
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
