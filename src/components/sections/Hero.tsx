import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useWaitlist } from "../../App";


// Animated Background Grid
const AnimatedGrid = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20 dark:opacity-10">
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: `
          linear-gradient(rgba(16, 185, 129, 0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(16, 185, 129, 0.1) 1px, transparent 1px)
        `,
        backgroundSize: "50px 50px",
      }}
    />
  </div>
);

// Glowing Orbs - subtle background
const GlowingOrbs = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <motion.div
      animate={{
        x: [0, 50, 0],
        y: [0, -30, 0],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 25,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/15 rounded-full blur-3xl"
    />
    <motion.div
      animate={{
        x: [0, -40, 0],
        y: [0, 40, 0],
        scale: [1, 1.05, 1],
      }}
      transition={{
        duration: 30,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-500/15 rounded-full blur-3xl"
    />
  </div>
);

// Floating Review Cards around dashboard - fade in/out elegantly
const FloatingReviewCards = ({ isInView }: { isInView: boolean }) => {
  const reviews = [
    { name: "J", rating: 5, text: "Amazing service!", x: "-15%", y: "20%", delay: 0 },
    { name: "S", rating: 5, text: "Highly recommend", x: "95%", y: "40%", delay: 4 },
    { name: "M", rating: 5, text: "5 stars!", x: "-10%", y: "70%", delay: 8 },
  ];

  if (!isInView) return null;

  return (
    <>
      {reviews.map((review, i) => (
        <motion.div
          key={i}
          className="absolute bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-lg shadow-lg p-2 border border-slate-200/50 dark:border-slate-700/50 z-10"
          style={{ left: review.x, top: review.y }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{
            opacity: [0, 0.9, 0.9, 0],
            scale: [0.9, 1, 1, 0.9],
            y: [5, 0, 0, -5],
          }}
          transition={{
            duration: 8,
            delay: review.delay + 1.5,
            repeat: Infinity,
            repeatDelay: 4,
            ease: "easeInOut",
          }}
        >
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-gradient-to-br from-primary-400 to-accent-400 flex items-center justify-center text-white text-[10px] font-bold">
              {review.name}
            </div>
            <div className="flex gap-0.5">
              {[...Array(review.rating)].map((_, j) => (
                <svg key={j} className="w-2.5 h-2.5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>
          <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">{review.text}</p>
        </motion.div>
      ))}
    </>
  );
};

// Ambient stars around dashboard - fade in/out at fixed positions
const FloatingStars = ({ isInView }: { isInView: boolean }) => {
  const stars = [
    { x: "-8%", y: "15%", delay: 0, size: "w-3 h-3" },
    { x: "102%", y: "25%", delay: 2, size: "w-4 h-4" },
    { x: "-5%", y: "50%", delay: 5, size: "w-3 h-3" },
    { x: "100%", y: "65%", delay: 3, size: "w-4 h-4" },
    { x: "-3%", y: "85%", delay: 7, size: "w-3 h-3" },
  ];

  if (!isInView) return null;

  return (
    <>
      {stars.map((star, i) => (
        <motion.div
          key={i}
          className="absolute z-10"
          style={{ left: star.x, top: star.y }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: [0, 0.8, 0.8, 0],
            scale: [0.5, 1, 1, 0.5],
          }}
          transition={{
            duration: 6,
            delay: star.delay + 1.5,
            repeat: Infinity,
            repeatDelay: 6,
            ease: "easeInOut",
          }}
        >
          <svg className={`${star.size} text-yellow-400 fill-current`} viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </motion.div>
      ))}
    </>
  );
};

// Dashboard Preview Component with animations
const DashboardPreview = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, rotateX: 10 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="relative perspective-1000"
    >
      {/* Floating animations around dashboard */}
      <FloatingReviewCards isInView={isInView} />
      <FloatingStars isInView={isInView} />
      {/* Main Dashboard Card */}
      <div className="relative bg-slate-800/80 backdrop-blur-xl rounded-2xl border border-slate-700/50 shadow-2xl overflow-hidden">
        {/* Browser Header */}
        <div className="flex items-center gap-2 px-4 py-3 bg-slate-900/80 border-b border-slate-700/50">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <div className="flex-1 mx-4">
            <div className="bg-slate-700/50 rounded-lg px-3 py-1 text-xs text-slate-400 text-center">
              app.repaxio.com/dashboard
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="p-6">
          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {[
              { label: "Total Reviews", value: "2,847", change: "+12%" },
              { label: "Avg. Rating", value: "4.8", change: "+0.3" },
              { label: "Response Rate", value: "98%", change: "+5%" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 + i * 0.1 }}
                className="bg-slate-700/30 rounded-xl p-4 border border-slate-600/30"
              >
                <p className="text-slate-400 text-xs mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <span className="text-xs text-primary-400">{stat.change}</span>
              </motion.div>
            ))}
          </div>

          {/* Review List */}
          <div className="space-y-3">
            {[
              { name: "Sarah Mitchell", time: "2 min ago", rating: 5, text: "Absolutely incredible service! The team went above and beyond..." },
              { name: "James Wilson", time: "15 min ago", rating: 5, text: "Best experience I've ever had. Highly recommend to everyone!" },
            ].map((review, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.8 + i * 0.15 }}
                className="bg-slate-700/20 rounded-xl p-4 border border-slate-600/20"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-accent-400 flex items-center justify-center text-white font-semibold">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-white">{review.name}</p>
                      <p className="text-xs text-slate-400">{review.time}</p>
                    </div>
                  </div>
                  <div className="flex gap-0.5">
                    {[...Array(review.rating)].map((_, j) => (
                      <svg key={j} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-slate-300">{review.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating AI Response Card */}
      <motion.div
        initial={{ opacity: 0, y: 30, x: -30 }}
        animate={isInView ? { opacity: 1, y: 0, x: 0 } : {}}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute -bottom-6 -left-6 bg-white dark:bg-slate-800 rounded-xl shadow-2xl p-4 max-w-xs border border-slate-200 dark:border-slate-700"
      >
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900 dark:text-white">AI Response Ready</p>
            <p className="text-xs text-slate-500">Generated in 0.8s</p>
          </div>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-300 mb-3">
          "Thank you so much for your wonderful feedback, Sarah! We're absolutely thrilled..."
        </p>
        <div className="flex gap-2">
          <button className="flex-1 px-3 py-2 bg-gradient-to-r from-primary-500 to-accent-500 text-white text-xs font-semibold rounded-lg">
            Send Now
          </button>
          <button className="px-3 py-2 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-semibold rounded-lg">
            Edit
          </button>
        </div>
      </motion.div>

      {/* Floating Notification */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 1.4, type: "spring" }}
        className="absolute -top-4 -right-4 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-full shadow-lg px-4 py-2 flex items-center gap-2"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        <span className="text-sm font-semibold">+23 reviews today</span>
      </motion.div>
    </motion.div>
  );
};

export function Hero() {
  const { openWaitlist } = useWaitlist();
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Parallax effects - content moves up faster than background
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Backgrounds with subtle parallax */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 bg-gradient-to-br from-slate-50 via-primary-50/30 to-accent-50/20 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950"
      />
      <motion.div style={{ y: backgroundY }}>
        <AnimatedGrid />
        <GlowingOrbs />
      </motion.div>

      <motion.div
        style={{ y: contentY, opacity }}
        className="relative max-w-7xl mx-auto px-6 pt-24 pb-12 lg:pt-28 lg:pb-16"
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 mb-8"
            >
              <motion.svg
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-4 h-4 text-primary-500"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                {/* AI Sparkle/Magic icon */}
                <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
              </motion.svg>
              <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                AI-Powered Reputation Management
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6"
            >
              <span className="text-slate-900 dark:text-white">Transform Your</span>
              <br />
              <span className="text-gradient-hero">Online Reputation</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              AI-powered reputation management that helps local businesses monitor,
              respond to, and grow their online presence. All in one intelligent platform.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
            >
              <motion.button
                onClick={openWaitlist}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group px-8 py-4 bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl hover:shadow-primary-500/25 transition-all duration-300 text-center relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Reserve My Spot
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </motion.button>
              <motion.a
                href="#how-it-works"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 glass-morphism hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl font-semibold text-lg transition-all duration-300 text-center flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Watch Demo
              </motion.a>
            </motion.div>

            {/* Urgency Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap justify-center lg:justify-start gap-4 mb-4"
            >
              {/* Spots Left Counter */}
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20">
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 rounded-full bg-orange-500"
                />
                <span className="text-sm font-medium text-orange-600 dark:text-orange-400">
                  Only 127 early access spots left
                </span>
              </div>
            </motion.div>

            {/* Trust Indicators - Waitlist focused */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap justify-center lg:justify-start gap-6"
            >
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm text-slate-600 dark:text-slate-400">30% off for early birds</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span className="text-sm text-slate-600 dark:text-slate-400">No credit card required</span>
              </div>
            </motion.div>

          </div>

          {/* Dashboard Preview */}
          <div className="hidden lg:block">
            <DashboardPreview />
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.a
          href="#logo-bar"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-slate-400 hover:text-primary-500 transition-colors"
        >
          <span className="text-xs font-medium">Scroll to explore</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.a>
      </motion.div>
    </section>
  );
}
