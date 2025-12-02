import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

const faqItems = [
  {
    question: "How is Repaxio different from Birdeye, Podium, or Reputation.com?",
    answer:
      "These enterprise platforms charge $249-$600/month with mandatory annual contracts and setup fees. Repaxio delivers the same AI-powered features starting at just $49/month with no contracts, no setup fees, and cancel anytime. We're purpose-built for small and mid-size local businesses who need enterprise-grade tools without the enterprise price tag.",
  },
  {
    question: "How do I get early access?",
    answer:
      "Join our waitlist to be first in line when we launch. Early waitlist members receive exclusive early-bird pricing (30% off for life), priority onboarding, and direct input on features we build. We're launching soon and spots are limited.",
  },
  {
    question: "How does the AI response generation work?",
    answer:
      "Our AI analyzes each review's content, sentiment, and context, then generates a personalized, professional response that matches your brand voice. It learns from your editing patterns and gets smarter over time. You can review and edit before sending, or enable auto-responses for positive reviews to save even more time.",
  },
  {
    question: "What review platforms do you support?",
    answer:
      "We support 100+ platforms including Google Business Profile, Yelp, Facebook, TripAdvisor, Trustpilot, Zomato, Healthgrades, Zillow, Cars.com, and many industry-specific sites. New platforms are added regularly based on customer requests.",
  },
  {
    question: "Can I run review request campaigns?",
    answer:
      "Yes! Send SMS campaigns (USA) or WhatsApp campaigns (India) to request reviews from happy customers. Features include automated drip sequences, smart timing optimization, QR codes for in-store requests, email campaigns, and detailed analytics to track what's working.",
  },
  {
    question: "Do you support multiple business locations?",
    answer:
      "Yes! Our Growth plan supports up to 3 locations, Professional supports 10, and Enterprise offers unlimited locations. You get multi-location analytics, performance comparisons, centralized brand control, and per-location reporting.",
  },
  {
    question: "Why are your prices so much lower than competitors?",
    answer:
      "We built Repaxio from the ground up with modern AI and cloud infrastructure, keeping our costs low. We also focus specifically on what local businesses actually need, without bloated enterprise features you'll never use. Lower overhead means lower prices for you.",
  },
  {
    question: "Do you require long-term contracts?",
    answer:
      "Never. All Repaxio plans are month-to-month with no cancellation fees or penalties. Unlike Birdeye, Podium, and others that lock you into 12-month contracts, we believe you should stay because our product delivers value, not because you're stuck.",
  },
  {
    question: "What's the difference between USA and India pricing?",
    answer:
      "Pricing is adjusted for local purchasing power. India plans use WhatsApp instead of SMS (more popular and cost-effective there) and prices are in INR. Both regions get identical features and the same level of support.",
  },
  {
    question: "Is my business data secure?",
    answer:
      "Absolutely. We use bank-level encryption (AES-256), SOC 2 compliant infrastructure, and never sell or share your data. Your reviews, customer information, and business insights remain private and secure.",
  },
];

function FAQItem({ item, index, isOpen, onToggle }: {
  item: typeof faqItems[0];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="border-b border-slate-200/50 dark:border-slate-700/50 last:border-none"
    >
      <button
        onClick={onToggle}
        className="w-full py-6 flex items-center justify-between text-left group"
      >
        <span className="text-lg font-medium text-slate-900 dark:text-white group-hover:text-primary-500 transition-colors pr-8">
          {item.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-500/10 flex items-center justify-center text-primary-500"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v12m6-6H6" />
          </svg>
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-slate-600 dark:text-slate-400 leading-relaxed">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="faq" className="py-24 lg:py-32 bg-slate-50 dark:bg-slate-900 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-50/20 to-transparent dark:via-primary-950/10" />

      <div className="max-w-3xl mx-auto px-6 relative z-10" ref={ref}>
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 mb-6"
          >
            <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
              FAQ
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
          >
            <span className="text-slate-900 dark:text-white">Frequently Asked</span>{" "}
            <span className="text-gradient">Questions</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600 dark:text-slate-300"
          >
            Everything you need to know about Repaxio.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="glass-morphism rounded-2xl p-6 md:p-8 border border-slate-200/50 dark:border-slate-700/50"
        >
          {faqItems.map((item, index) => (
            <FAQItem
              key={item.question}
              item={item}
              index={index}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="text-center mt-8 text-slate-500 dark:text-slate-400"
        >
          Have more questions?{" "}
          <a
            href="mailto:hello@repaxio.com"
            className="text-primary-500 hover:text-primary-600 font-medium transition-colors"
          >
            Email us at hello@repaxio.com
          </a>
        </motion.p>
      </div>
    </section>
  );
}
