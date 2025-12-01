import { motion } from "framer-motion";
import { Accordion } from "../ui/Accordion";

const faqItems = [
  {
    question: "How is Repaxio different from Birdeye or Podium?",
    answer:
      "Birdeye and Podium charge $300-600/month with annual contracts. Repaxio offers the same AI-powered features starting at $49/month with no contracts. We're built specifically for small and mid-size local businesses, not enterprises.",
  },
  {
    question: "Is there a free trial?",
    answer:
      "Yes! All plans include a 14-day free trial when we launch. No credit card required to join the waitlist or start your trial.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Absolutely. All plans are month-to-month with no cancellation fees. We believe if we're not providing value, you shouldn't be locked in.",
  },
  {
    question: "What review platforms do you support?",
    answer:
      "We support 100+ platforms including Google Business Profile, Yelp, Facebook, TripAdvisor, Zomato, and many more. If you need a specific platform, let us know!",
  },
  {
    question: "How does the AI response generation work?",
    answer:
      "Our AI analyzes each review's content and sentiment, then generates a personalized, professional response that matches your brand voice. You can edit before sending or set up auto-responses for positive reviews.",
  },
  {
    question: "Do you support multiple locations?",
    answer:
      "Yes! Our Growth plan supports up to 3 locations, Professional supports 10, and Enterprise offers unlimited locations with advanced multi-location analytics.",
  },
  {
    question: "What's the difference between USA and India pricing?",
    answer:
      "Pricing is adjusted for purchasing power parity. India plans use WhatsApp instead of SMS (which is more popular and cost-effective in India), and prices are in INR.",
  },
  {
    question: "Do you offer annual billing discounts?",
    answer:
      "Yes, annual billing saves you ~17% (equivalent to 2 months free).",
  },
  {
    question: "What integrations do you support?",
    answer:
      "We integrate with popular POS systems (Square, Toast, Clover), CRMs (Salesforce, HubSpot), and automation tools (Zapier). Enterprise plans include custom integration support.",
  },
  {
    question: "How do I get help if I have issues?",
    answer:
      "All plans include email support. Professional and Enterprise include priority chat support. Enterprise plans also get a dedicated account manager.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="py-20 lg:py-32 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark mb-4"
          >
            Frequently Asked{" "}
            <span className="gradient-text">Questions</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600"
          >
            Everything you need to know about Repaxio.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Accordion items={faqItems} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-8 text-slate-500"
        >
          Have more questions?{" "}
          <a
            href="mailto:hello@repaxio.com"
            className="text-primary-700 font-medium hover:underline"
          >
            Email us at hello@repaxio.com
          </a>
        </motion.p>
      </div>
    </section>
  );
}
