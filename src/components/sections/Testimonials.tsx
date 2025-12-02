import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const testimonials = [
  {
    quote:
      "We went from 3.8 to 4.6 stars in just 2 months. The AI responses save us hours every week and feel genuinely personal.",
    author: "Michael Chen",
    role: "Owner",
    company: "Chen's Family Restaurant",
    avatar: "M",
    rating: 5,
    location: "San Francisco, CA",
  },
  {
    quote:
      "Finally, a tool that doesn't cost a fortune. The WhatsApp automation is perfect for our customers in India. Game changer!",
    author: "Priya Sharma",
    role: "Founder",
    company: "Glamour Salon",
    avatar: "P",
    rating: 5,
    location: "Mumbai, India",
  },
  {
    quote:
      "Managing 5 locations used to be a nightmare. Now I see everything in one place and respond in seconds. Repaxio is incredible.",
    author: "David Rodriguez",
    role: "Operations Manager",
    company: "AutoCare Plus",
    avatar: "D",
    rating: 5,
    location: "Austin, TX",
  },
  {
    quote:
      "The AI understands our brand voice perfectly. Our response rate went from 40% to 98%, and customers love the quick replies.",
    author: "Sarah Johnson",
    role: "Marketing Director",
    company: "Sunrise Dental",
    avatar: "S",
    rating: 5,
    location: "Denver, CO",
  },
];

const stats = [
  { value: "2x", label: "More reviews in 60 days" },
  { value: "4.9★", label: "Average user rating" },
  { value: "85%", label: "Time saved on responses" },
  { value: "500+", label: "Happy businesses" },
];

export function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="testimonials" className="py-24 lg:py-32 bg-white dark:bg-slate-950 relative overflow-hidden">
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
              Testimonials
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
          >
            <span className="text-slate-900 dark:text-white">Businesses</span>{" "}
            <span className="text-gradient">Love Repaxio</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto"
          >
            See what our customers are saying about their experience with
            AI-powered reputation management.
          </motion.p>
        </div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ y: -5 }}
              className="text-center p-6 glass-morphism rounded-2xl border border-slate-200/50 dark:border-slate-700/50"
            >
              <p className="text-3xl lg:text-4xl font-bold text-gradient mb-1">
                {stat.value}
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="relative glass-morphism rounded-2xl p-8 border border-slate-200/50 dark:border-slate-700/50 hover:border-primary-500/30 transition-all duration-300"
            >
              {/* Quote icon */}
              <div className="absolute top-6 right-6 w-10 h-10 text-primary-500/20">
                <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <motion.svg
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.5 + index * 0.1 + i * 0.05 }}
                    className="w-5 h-5 text-yellow-400 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </motion.svg>
                ))}
              </div>

              <p className="text-slate-700 dark:text-slate-300 text-lg mb-6 leading-relaxed">
                "{testimonial.quote}"
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">{testimonial.author}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {testimonial.role}, {testimonial.company}
                    </p>
                  </div>
                </div>
                <span className="text-xs text-slate-400 dark:text-slate-500">
                  {testimonial.location}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
