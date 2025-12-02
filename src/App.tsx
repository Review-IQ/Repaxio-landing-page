import { useState, useEffect, createContext, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { Hero } from "./components/sections/Hero";
import { LogoBar } from "./components/sections/LogoBar";
import { Problems } from "./components/sections/Problems";
import { Features } from "./components/sections/Features";
import { HowItWorks } from "./components/sections/HowItWorks";
import { Pricing } from "./components/sections/Pricing";
import { FAQ } from "./components/sections/FAQ";
import { FinalCTA } from "./components/sections/FinalCTA";
import { WaitlistModal } from "./components/WaitlistModal";

// Context for waitlist modal
interface WaitlistContextType {
  openWaitlist: () => void;
}

export const WaitlistContext = createContext<WaitlistContextType>({
  openWaitlist: () => {},
});

export const useWaitlist = () => useContext(WaitlistContext);

function App() {
  // Initialize from localStorage synchronously to prevent flash
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const savedMode = localStorage.getItem("darkMode");
      if (savedMode !== null) {
        return savedMode === "true";
      }
    }
    // Default to dark mode for premium SaaS look
    return true;
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);

  // Apply dark mode class immediately on mount
  useEffect(() => {
    // Apply immediately
    if (darkMode) {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    }
    localStorage.setItem("darkMode", String(darkMode));
  }, [darkMode]);

  useEffect(() => {
    // Simulate loading for smooth entrance
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const openWaitlist = () => setIsWaitlistOpen(true);
  const closeWaitlist = () => setIsWaitlistOpen(false);

  return (
    <WaitlistContext.Provider value={{ openWaitlist }}>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-slate-950 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.2, opacity: 0 }}
              className="text-4xl font-bold text-gradient"
            >
              Repaxio
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={`min-h-screen transition-colors duration-300 ${darkMode ? "bg-slate-950 text-slate-100" : "bg-white text-slate-900"}`}>
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <main>
          <Hero />
          <LogoBar />
          <Problems />
          <Features />
          <HowItWorks />
          <Pricing />
          <FAQ />
          <FinalCTA />
        </main>
        <Footer />
      </div>

      {/* Waitlist Modal */}
      <WaitlistModal isOpen={isWaitlistOpen} onClose={closeWaitlist} />
    </WaitlistContext.Provider>
  );
}

export default App;
