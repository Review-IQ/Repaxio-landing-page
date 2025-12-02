import { motion } from "framer-motion";

// Repaxio Logo
const RepaxioLogo = () => (
  <svg className="w-10 h-10" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="footerLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#10b981" />
        <stop offset="100%" stopColor="#06b6d4" />
      </linearGradient>
    </defs>
    <path
      d="M50 5 L90 27.5 L90 72.5 L50 95 L10 72.5 L10 27.5 Z"
      fill="url(#footerLogoGradient)"
    />
    <text
      x="50"
      y="60"
      fontSize="36"
      fontWeight="800"
      fill="white"
      textAnchor="middle"
      fontFamily="Inter, sans-serif"
    >
      R
    </text>
  </svg>
);

// FoundHex Logo
const FoundHexLogo = () => (
  <svg className="w-8 h-8" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="hexGradientFooter" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#667eea" />
        <stop offset="100%" stopColor="#764ba2" />
      </linearGradient>
    </defs>
    <path
      d="M50 5 L90 27.5 L90 72.5 L50 95 L10 72.5 L10 27.5 Z"
      fill="url(#hexGradientFooter)"
    />
    <text
      x="50"
      y="58"
      fontSize="32"
      fontWeight="800"
      fill="white"
      textAnchor="middle"
      fontFamily="Inter, sans-serif"
    >
      FH
    </text>
  </svg>
);

const footerLinks = {
  product: [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "FAQ", href: "#faq" },
  ],
  company: [
    { label: "About", href: "#", comingSoon: true },
    { label: "Blog", href: "#", comingSoon: true },
    { label: "Careers", href: "#", comingSoon: true },
    { label: "Contact", href: "mailto:hello@repaxio.com" },
  ],
  resources: [
    { label: "Documentation", href: "#", comingSoon: true },
    { label: "API Reference", href: "#", comingSoon: true },
    { label: "Integrations", href: "#features" },
    { label: "Status", href: "#", comingSoon: true },
  ],
  legal: [
    { label: "Privacy Policy", href: "#", comingSoon: true },
    { label: "Terms of Service", href: "#", comingSoon: true },
    { label: "Cookie Policy", href: "#", comingSoon: true },
    { label: "Security", href: "#", comingSoon: true },
  ],
};

const socialLinks = [
  {
    name: "Twitter",
    href: "https://twitter.com/repaxio",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/company/repaxio",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: "Email",
    href: "mailto:hello@repaxio.com",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
];

export function Footer() {
  const scrollToSection = (href: string) => {
    if (href.startsWith("#")) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-white relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-950 dark:from-slate-950 dark:to-black" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary-500/50 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2">
            <a href="#" className="flex items-center gap-3 mb-6 group">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <RepaxioLogo />
              </motion.div>
              <span className="text-2xl font-bold text-gradient">Repaxio</span>
            </a>
            <p className="text-slate-400 text-sm mb-6 leading-relaxed">
              Your Reputation, Amplified by AI. The smarter way to manage reviews, respond faster, and grow your business.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-primary-500/20 border border-slate-700 hover:border-primary-500/50 flex items-center justify-center transition-all duration-300 text-slate-400 hover:text-primary-400"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold text-white mb-4">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      if (link.href.startsWith("#")) {
                        e.preventDefault();
                        scrollToSection(link.href);
                      }
                    }}
                    className="text-slate-400 hover:text-primary-400 transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  {link.comingSoon ? (
                    <span className="text-slate-500 text-sm flex items-center gap-2">
                      {link.label}
                      <span className="text-xs px-1.5 py-0.5 rounded bg-slate-800 text-slate-500">
                        Soon
                      </span>
                    </span>
                  ) : (
                    <a
                      href={link.href}
                      className="text-slate-400 hover:text-primary-400 transition-colors duration-200 text-sm"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  {link.comingSoon ? (
                    <span className="text-slate-500 text-sm flex items-center gap-2">
                      {link.label}
                      <span className="text-xs px-1.5 py-0.5 rounded bg-slate-800 text-slate-500">
                        Soon
                      </span>
                    </span>
                  ) : (
                    <a
                      href={link.href}
                      onClick={(e) => {
                        if (link.href.startsWith("#")) {
                          e.preventDefault();
                          scrollToSection(link.href);
                        }
                      }}
                      className="text-slate-400 hover:text-primary-400 transition-colors duration-200 text-sm"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  {link.comingSoon ? (
                    <span className="text-slate-500 text-sm flex items-center gap-2">
                      {link.label}
                      <span className="text-xs px-1.5 py-0.5 rounded bg-slate-800 text-slate-500">
                        Soon
                      </span>
                    </span>
                  ) : (
                    <a
                      href={link.href}
                      className="text-slate-400 hover:text-primary-400 transition-colors duration-200 text-sm"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 pt-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* FoundHex Branding */}
            <div className="flex items-center gap-3">
              <span className="text-slate-500 text-sm">A product of</span>
              <motion.a
                href="https://foundhex.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 group"
                whileHover={{ scale: 1.02 }}
              >
                <FoundHexLogo />
                <span className="text-lg font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent group-hover:from-purple-300 group-hover:to-indigo-300 transition-all">
                  FoundHex
                </span>
              </motion.a>
            </div>

            {/* Copyright */}
            <p className="text-slate-500 text-sm text-center">
              © {new Date().getFullYear()} FoundHex Inc. All rights reserved.
            </p>

            {/* Contact emails */}
            <div className="flex items-center gap-6 text-sm">
              <a
                href="mailto:hello@repaxio.com"
                className="text-slate-400 hover:text-primary-400 transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                hello@repaxio.com
              </a>
              <a
                href="mailto:support@repaxio.com"
                className="text-slate-400 hover:text-primary-400 transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                support@repaxio.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
