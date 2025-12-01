import { motion } from "framer-motion";
import { Link2, Settings, TrendingUp } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Connect Your Accounts",
    time: "2 minutes",
    description:
      "Link your Google Business, Yelp, and other review platforms. We handle the rest.",
    icon: Link2,
    color: "from-primary-500 to-primary-600",
  },
  {
    number: "02",
    title: "Configure Your Automation",
    description:
      "Set up AI responses, review request triggers, and notification preferences.",
    icon: Settings,
    color: "from-secondary-500 to-secondary-600",
  },
  {
    number: "03",
    title: "Watch Your Reputation Grow",
    description:
      "Sit back as reviews pour in, responses go out automatically, and your ratings climb.",
    icon: TrendingUp,
    color: "from-emerald-500 to-emerald-600",
  },
];

export function HowItWorks() {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark mb-4"
          >
            Get Started in{" "}
            <span className="gradient-text">3 Simple Steps</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 max-w-2xl mx-auto"
          >
            No complex setup. No lengthy onboarding. Start managing your
            reputation in minutes.
          </motion.p>
        </div>

        <div className="relative">
          {/* Connection Line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-200 via-secondary-200 to-emerald-200 hidden lg:block -translate-y-1/2" />

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative"
              >
                <div className="bg-white rounded-2xl p-8 card-shadow hover:card-shadow-hover transition-all duration-300 text-center lg:text-left">
                  {/* Step Number */}
                  <div className="relative z-10 mb-6">
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mx-auto lg:mx-0 shadow-lg`}
                    >
                      <step.icon className="w-8 h-8 text-white" />
                    </div>
                    <span className="absolute -top-2 -right-2 lg:left-12 lg:right-auto w-8 h-8 rounded-full bg-dark text-white text-sm font-bold flex items-center justify-center">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-dark mb-2">
                    {step.title}
                  </h3>
                  {step.time && (
                    <span className="inline-block text-sm text-primary-600 font-medium mb-3">
                      {step.time}
                    </span>
                  )}
                  <p className="text-slate-600">{step.description}</p>
                </div>

                {/* Arrow for desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-6 transform -translate-y-1/2 z-10">
                    <div className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-slate-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
