import { motion } from "framer-motion";
import { CheckCircle2, Star, Sparkles } from "lucide-react";
import { Badge } from "../ui/Badge";
import { WaitlistForm } from "../WaitlistForm";

export function Hero() {
  const trustIndicators = [
    "14-day free trial at launch",
    "No credit card required",
    "Cancel anytime",
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-primary-50/30 to-secondary-50/20" />

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary-200/20 rounded-full blur-3xl" />

      {/* Floating stars */}
      <motion.div
        className="absolute top-32 right-[20%] text-secondary-400"
        animate={{ y: [0, -10, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <Star className="w-8 h-8 fill-current" />
      </motion.div>
      <motion.div
        className="absolute top-48 left-[15%] text-secondary-300"
        animate={{ y: [0, -15, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
      >
        <Star className="w-6 h-6 fill-current" />
      </motion.div>
      <motion.div
        className="absolute bottom-40 left-[25%] text-primary-300"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
      >
        <Sparkles className="w-7 h-7" />
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge variant="outline" className="mb-6">
                <Sparkles className="w-4 h-4 mr-2" />
                AI-Powered Reputation Management
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-dark leading-tight mb-6"
            >
              Turn Every Customer Into a{" "}
              <span className="gradient-text">5-Star Review</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg sm:text-xl text-slate-600 mb-8 max-w-xl mx-auto lg:mx-0"
            >
              Repaxio helps local businesses collect more reviews, respond instantly with AI,
              and outrank competitors—at a fraction of what enterprise tools charge.
            </motion.p>

            {/* Waitlist Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              id="waitlist"
              className="max-w-md mx-auto lg:mx-0"
            >
              <WaitlistForm variant="hero" />
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-2 mt-6"
            >
              {trustIndicators.map((indicator) => (
                <span key={indicator} className="flex items-center text-sm text-slate-500">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mr-2" />
                  {indicator}
                </span>
              ))}
            </motion.div>

            {/* Social Proof */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-8 text-slate-500"
            >
              Join <span className="font-semibold text-primary-700">500+</span> businesses already on the waitlist
            </motion.p>
          </div>

          {/* Dashboard Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="relative">
              {/* Main Dashboard */}
              <div className="bg-white rounded-2xl shadow-2xl p-4 border border-slate-100">
                <div className="bg-slate-50 rounded-xl p-6">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="font-semibold text-dark">Review Dashboard</h3>
                      <p className="text-sm text-slate-500">All locations</p>
                    </div>
                    <div className="flex items-center gap-2 text-secondary-500">
                      <Star className="w-5 h-5 fill-current" />
                      <span className="font-bold">4.8</span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {[
                      { label: "Total Reviews", value: "1,248" },
                      { label: "This Month", value: "+89" },
                      { label: "Response Rate", value: "98%" },
                    ].map((stat) => (
                      <div key={stat.label} className="bg-white rounded-lg p-3 text-center">
                        <p className="text-2xl font-bold text-primary-700">{stat.value}</p>
                        <p className="text-xs text-slate-500">{stat.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Review Cards */}
                  <div className="space-y-3">
                    {[
                      { name: "Sarah M.", rating: 5, text: "Amazing service! Will definitely come back..." },
                      { name: "John D.", rating: 5, text: "Best experience I've had in years..." },
                    ].map((review, i) => (
                      <div key={i} className="bg-white rounded-lg p-3 flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-semibold text-sm">
                          {review.name.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-sm text-dark">{review.name}</span>
                            <div className="flex text-secondary-400">
                              {Array.from({ length: review.rating }).map((_, i) => (
                                <Star key={i} className="w-3 h-3 fill-current" />
                              ))}
                            </div>
                          </div>
                          <p className="text-xs text-slate-500 truncate">{review.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating AI Response Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="absolute -bottom-8 -left-8 bg-white rounded-xl shadow-xl p-4 max-w-xs border border-slate-100"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full gradient-bg flex items-center justify-center">
                    <Sparkles className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-sm font-medium text-dark">AI Response Generated</span>
                </div>
                <p className="text-xs text-slate-500">
                  "Thank you so much for your kind words, Sarah! We're thrilled you had an amazing experience..."
                </p>
                <div className="flex gap-2 mt-3">
                  <button className="px-3 py-1.5 bg-primary-700 text-white text-xs font-medium rounded-lg hover:bg-primary-600 transition-colors">
                    Send Response
                  </button>
                  <button className="px-3 py-1.5 bg-slate-100 text-slate-600 text-xs font-medium rounded-lg hover:bg-slate-200 transition-colors">
                    Edit
                  </button>
                </div>
              </motion.div>

              {/* Floating Notification */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
                className="absolute -top-4 -right-4 bg-emerald-500 text-white rounded-xl shadow-lg px-4 py-2 flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span className="text-sm font-medium">+15 reviews this week</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
