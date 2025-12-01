import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { Hero } from "./components/sections/Hero";
import { LogoBar } from "./components/sections/LogoBar";
import { Problems } from "./components/sections/Problems";
import { Solutions } from "./components/sections/Solutions";
import { Features } from "./components/sections/Features";
import { HowItWorks } from "./components/sections/HowItWorks";
import { Pricing } from "./components/sections/Pricing";
import { Testimonials } from "./components/sections/Testimonials";
import { Comparison } from "./components/sections/Comparison";
import { FAQ } from "./components/sections/FAQ";
import { FinalCTA } from "./components/sections/FinalCTA";

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <LogoBar />
        <Problems />
        <Solutions />
        <Features />
        <HowItWorks />
        <Pricing />
        <Testimonials />
        <Comparison />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;
