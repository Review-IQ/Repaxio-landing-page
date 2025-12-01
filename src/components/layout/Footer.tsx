import { motion } from "framer-motion";
import { Twitter, Linkedin, Mail } from "lucide-react";

// FoundHex Hexagon Logo
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
      stroke="url(#hexGradientFooter)"
      strokeWidth="2"
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
    { label: "How It Works", href: "#features" },
    { label: "FAQ", href: "#faq" },
  ],
  company: [
    { label: "About FoundHex", href: "https://foundhex.com", external: true },
    { label: "Blog", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Contact", href: "mailto:hello@repaxio.com" },
  ],
  resources: [
    { label: "Documentation", href: "#" },
    { label: "API Reference", href: "#" },
    { label: "Integrations", href: "#features" },
    { label: "Status", href: "#" },
  ],
  legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
    { label: "Security", href: "#" },
  ],
};

const socialLinks = [
  { icon: Twitter, href: "https://twitter.com/repaxio", label: "Twitter" },
  { icon: Linkedin, href: "https://linkedin.com/company/repaxio", label: "LinkedIn" },
  { icon: Mail, href: "mailto:hello@repaxio.com", label: "Email" },
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
    <footer className="bg-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2">
            <a href="#" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center">
                <span className="text-white font-bold text-lg">R</span>
              </div>
              <span className="text-xl font-bold">Repaxio</span>
            </a>
            <p className="text-slate-400 text-sm mb-4">
              Your Reputation, Amplified by AI. The smarter way to manage reviews and grow your business.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-primary-700 flex items-center justify-center transition-colors duration-200"
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
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
                    className="text-slate-400 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="text-slate-400 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      if (link.href.startsWith("#")) {
                        e.preventDefault();
                        scrollToSection(link.href);
                      }
                    }}
                    className="text-slate-400 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* FoundHex Branding */}
            <div className="flex items-center gap-3">
              <span className="text-slate-500 text-sm">A product of</span>
              <a
                href="https://foundhex.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              >
                <FoundHexLogo />
                <span className="text-lg font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                  FoundHex
                </span>
              </a>
            </div>

            {/* Copyright */}
            <p className="text-slate-500 text-sm text-center">
              &copy; {new Date().getFullYear()} FoundHex Inc. All rights reserved.
            </p>

            {/* Additional Links */}
            <div className="flex items-center gap-6 text-sm">
              <a
                href="mailto:hello@repaxio.com"
                className="text-slate-400 hover:text-white transition-colors"
              >
                hello@repaxio.com
              </a>
              <a
                href="mailto:support@repaxio.com"
                className="text-slate-400 hover:text-white transition-colors"
              >
                support@repaxio.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
