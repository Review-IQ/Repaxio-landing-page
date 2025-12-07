import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// Animated illustration components
const ScatteredReviewsIllustration = () => (
  <motion.div className="relative w-full h-40">
    {/* Multiple floating platform cards */}
    {[
      { name: "Google", x: 10, y: 20, delay: 0, color: "#4285F4" },
      { name: "Yelp", x: 60, y: 10, delay: 0.5, color: "#FF1A1A" },
      { name: "Facebook", x: 30, y: 60, delay: 1, color: "#1877F2" },
      { name: "TripAdvisor", x: 70, y: 50, delay: 1.5, color: "#34E0A1" },
    ].map((platform) => (
      <motion.div
        key={platform.name}
        className="absolute w-16 h-10 rounded-lg flex items-center justify-center text-white text-xs font-semibold shadow-lg"
        style={{
          left: `${platform.x}%`,
          top: `${platform.y}%`,
          backgroundColor: platform.color
        }}
        animate={{
          y: [0, -4, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          delay: platform.delay,
          ease: "easeInOut",
        }}
      >
        {platform.name}
      </motion.div>
    ))}
    {/* Connecting dotted lines */}
    <svg className="absolute inset-0 w-full h-full opacity-15">
      <motion.line
        x1="20%" y1="30%" x2="70%" y2="20%"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="4"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.line
        x1="40%" y1="70%" x2="80%" y2="60%"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="4"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 4, delay: 1, repeat: Infinity }}
      />
    </svg>
  </motion.div>
);

const TimeWastedIllustration = () => (
  <motion.div className="relative w-full h-40 flex items-center justify-center">
    {/* Clock */}
    <div className="w-24 h-24 rounded-full border-4 border-red-400/30 flex items-center justify-center relative">
      {/* Hour hand */}
      <motion.div
        className="absolute w-1 h-6 bg-red-500 rounded-full origin-bottom"
        style={{ bottom: "50%" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />
      {/* Minute hand */}
      <motion.div
        className="absolute w-0.5 h-8 bg-red-400 rounded-full origin-bottom"
        style={{ bottom: "50%" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
      <div className="w-2 h-2 rounded-full bg-red-500 absolute" />
    </div>
    {/* Flying hours */}
    {[0, 1, 2].map((i) => (
      <motion.span
        key={i}
        className="absolute text-red-400/70 font-bold text-sm"
        initial={{ opacity: 0, x: 0 }}
        animate={{
          opacity: [0, 0.7, 0],
          x: [0, 50 + i * 15],
          y: [-15 * i, -30 - i * 8],
        }}
        transition={{
          duration: 4,
          delay: i * 1.2,
          repeat: Infinity,
          ease: "easeOut",
        }}
      >
        -{i + 1}h
      </motion.span>
    ))}
  </motion.div>
);

const NoReviewsIllustration = () => (
  <motion.div className="relative w-full h-40 flex items-center justify-center">
    {/* Empty stars animation */}
    <div className="flex gap-2">
      {[...Array(5)].map((_, i) => (
        <motion.svg
          key={i}
          className="w-8 h-8"
          viewBox="0 0 24 24"
          initial={{ opacity: i < 2 ? 0.8 : 0.3 }}
          animate={{
            opacity: i < 2 ? [0.6, 1, 0.6] : 0.3,
          }}
          transition={{
            duration: 4,
            delay: i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <path
            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
            fill={i < 2 ? "#FBBF24" : "none"}
            stroke={i < 2 ? "#FBBF24" : "#94A3B8"}
            strokeWidth="2"
          />
        </motion.svg>
      ))}
    </div>
    {/* Sad face emoji */}
    <motion.div
      className="absolute -right-2 top-0 text-2xl"
      animate={{ y: [0, -3, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      😔
    </motion.div>
  </motion.div>
);

const ExpensiveToolsIllustration = () => (
  <motion.div className="relative w-full h-40 flex items-center justify-center">
    {/* Flying dollar signs */}
    <div className="relative">
      <motion.div
        className="text-4xl font-bold text-red-500"
        animate={{ scale: [1, 1.03, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        $499
      </motion.div>
      <motion.span
        className="absolute -top-2 -right-4 text-red-400/70 text-lg"
        animate={{ y: [0, -15], opacity: [0.7, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
      >
        💸
      </motion.span>
      <motion.span
        className="absolute top-0 -left-4 text-red-400/70 text-lg"
        animate={{ y: [0, -18], opacity: [0.7, 0] }}
        transition={{ duration: 3, delay: 1, repeat: Infinity, ease: "easeOut" }}
      >
        💸
      </motion.span>
      <motion.span
        className="absolute -bottom-2 right-0 text-red-400/70 text-lg"
        animate={{ y: [0, -12], opacity: [0.7, 0] }}
        transition={{ duration: 3, delay: 2, repeat: Infinity, ease: "easeOut" }}
      >
        💸
      </motion.span>
    </div>
    <p className="absolute bottom-0 text-xs text-slate-400">
      /month per location
    </p>
  </motion.div>
);

const NoCampaignsIllustration = () => (
  <motion.div className="relative w-full h-40 flex items-center justify-center">
    {/* Campaign request visualization */}
    <div className="relative">
      {/* Central phone */}
      <motion.div
        className="w-16 h-28 rounded-xl border-2 border-slate-600 bg-slate-800 flex items-center justify-center"
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-12 h-20 rounded-lg bg-slate-700 flex flex-col items-center justify-center gap-1">
          <motion.div
            className="w-8 h-2 rounded bg-primary-500"
            animate={{ scaleX: [0.3, 1, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <span className="text-[8px] text-slate-400">SMS Campaign</span>
        </div>
      </motion.div>
      {/* Flying review requests */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute -right-12 text-lg"
          style={{ top: `${20 + i * 25}%` }}
          animate={{
            x: [0, 30],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: 4,
            delay: i * 1,
            repeat: Infinity,
            ease: "easeOut",
          }}
        >
          ⭐
        </motion.div>
      ))}
    </div>
  </motion.div>
);

const NoScaleIllustration = () => (
  <motion.div className="relative w-full h-40 flex items-center justify-center">
    {/* Multiple location buildings */}
    <div className="flex gap-4 items-end">
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="flex flex-col items-center"
          animate={{ y: [0, -2, 0] }}
          transition={{ duration: 5, delay: i * 0.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <div
            className={`w-8 bg-gradient-to-t from-slate-600 to-slate-500 rounded-t-lg`}
            style={{ height: `${40 + i * 20}px` }}
          >
            {/* Windows */}
            <div className="grid grid-cols-2 gap-1 p-1 mt-2">
              {[...Array(i * 2)].map((_, j) => (
                <motion.div
                  key={j}
                  className="w-2 h-2 bg-yellow-400 rounded-sm"
                  animate={{ opacity: [0.4, 0.9, 0.4] }}
                  transition={{ duration: 4, delay: j * 0.5, repeat: Infinity, ease: "easeInOut" }}
                />
              ))}
            </div>
          </div>
          <span className="text-[8px] text-slate-400 mt-1">Loc {i}</span>
        </motion.div>
      ))}
    </div>
    <motion.div
      className="absolute -right-2 top-2 text-xl"
      animate={{ rotate: [0, 3, -3, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      😰
    </motion.div>
  </motion.div>
);

const problems = [
  {
    illustration: <ScatteredReviewsIllustration />,
    title: "Reviews scattered across platforms",
    description:
      "Google, Yelp, Facebook, TripAdvisor... logging into each one daily is exhausting and time-consuming.",
  },
  {
    illustration: <TimeWastedIllustration />,
    title: "Hours wasted writing responses",
    description:
      "Every review deserves a thoughtful response, but crafting personalized replies takes forever.",
  },
  {
    illustration: <NoReviewsIllustration />,
    title: "Not enough reviews coming in",
    description:
      "Happy customers leave without reviewing. You need a system to capture their positive experiences.",
  },
  {
    illustration: <ExpensiveToolsIllustration />,
    title: "Enterprise tools cost a fortune",
    description:
      "Enterprise platforms charge $400-500/month per location. Your budget simply says no to these prices.",
  },
  {
    illustration: <NoCampaignsIllustration />,
    title: "No way to run review campaigns",
    description:
      "You need SMS and email campaigns to request reviews, but setting them up is complex and expensive.",
  },
  {
    illustration: <NoScaleIllustration />,
    title: "Can't scale across locations",
    description:
      "Each location needs attention and consistent management, but you're just one person.",
  },
];

export function Problems() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 lg:py-32 bg-white dark:bg-slate-950 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-50/30 to-transparent dark:via-red-950/10" />

      <div className="max-w-7xl mx-auto px-6 relative z-10" ref={ref}>
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 mb-6"
          >
            <span className="text-sm font-medium text-red-600 dark:text-red-400">
              The Problem
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
          >
            <span className="text-slate-900 dark:text-white">Managing Your Reputation</span>
            <br />
            <span className="text-gradient">Shouldn't Be This Hard</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto"
          >
            Sound familiar? You're not alone. These are the challenges every
            local business faces. And exactly why we built Repaxio.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {problems.map((problem, index) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group relative glass-morphism rounded-2xl p-6 hover:shadow-xl transition-all duration-300 border border-red-200/20 dark:border-red-500/10 hover:border-red-300/30 dark:hover:border-red-500/20"
            >
              {/* Animated Illustration */}
              <div className="mb-4 overflow-hidden rounded-xl bg-slate-100/50 dark:bg-slate-800/50">
                {problem.illustration}
              </div>

              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                {problem.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                {problem.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Transition text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-xl text-slate-600 dark:text-slate-300">
            What if there was a better way?{" "}
            <span className="text-gradient font-semibold">There is.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
