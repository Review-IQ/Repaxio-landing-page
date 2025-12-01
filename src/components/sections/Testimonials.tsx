import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "We went from 3.8 to 4.6 stars in just 2 months. The AI responses save us hours every week.",
    author: "Michael Chen",
    role: "Owner",
    company: "Chen's Family Restaurant",
    avatar: "M",
    rating: 5,
  },
  {
    quote:
      "Finally, a tool that doesn't cost a fortune. The WhatsApp automation is perfect for our customers in India.",
    author: "Priya Sharma",
    role: "Founder",
    company: "Glamour Salon",
    avatar: "P",
    rating: 5,
  },
  {
    quote:
      "Managing 5 locations used to be a nightmare. Now I see everything in one place and respond in seconds.",
    author: "David Rodriguez",
    role: "Operations Manager",
    company: "AutoCare Plus",
    avatar: "D",
    rating: 5,
  },
  {
    quote:
      "The competitor tracking feature is incredible. We always know what our rivals are doing now.",
    author: "Sarah Johnson",
    role: "Marketing Director",
    company: "Sunrise Dental",
    avatar: "S",
    rating: 5,
  },
];

const stats = [
  { value: "2x", label: "More reviews in 60 days" },
  { value: "4.8★", label: "Average user rating" },
  { value: "85%", label: "Time saved on responses" },
  { value: "500+", label: "Businesses on waitlist" },
];

export function Testimonials() {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark mb-4"
          >
            Businesses <span className="gradient-text">Love Repaxio</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 max-w-2xl mx-auto"
          >
            See what early access users are saying about their experience.
          </motion.p>
        </div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center p-6 bg-white rounded-2xl card-shadow"
            >
              <p className="text-3xl lg:text-4xl font-bold gradient-text mb-1">
                {stat.value}
              </p>
              <p className="text-sm text-slate-500">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative bg-white rounded-2xl p-8 card-shadow hover:card-shadow-hover transition-all duration-300"
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-primary-100" />

              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-secondary-400 fill-current"
                  />
                ))}
              </div>

              <p className="text-slate-700 text-lg mb-6 leading-relaxed">
                "{testimonial.quote}"
              </p>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full gradient-bg flex items-center justify-center text-white font-bold text-lg">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-semibold text-dark">{testimonial.author}</p>
                  <p className="text-sm text-slate-500">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
