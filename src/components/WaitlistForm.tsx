import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Mail,
  User,
  Building2,
  Phone,
  MapPin,
  Package,
} from "lucide-react";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { Select } from "./ui/Select";
import { Modal } from "./ui/Modal";
import { pricingPlans } from "../lib/pricing";

interface WaitlistFormData {
  email: string;
  firstName: string;
  lastName: string;
  companyName: string;
  phoneNumber: string;
  numberOfLocations: string;
  packageInterested: string;
}

interface WaitlistFormProps {
  variant?: "hero" | "cta";
  className?: string;
}

const locationOptions = [
  { value: "1", label: "1 location" },
  { value: "2-3", label: "2-3 locations" },
  { value: "4-10", label: "4-10 locations" },
  { value: "11-25", label: "11-25 locations" },
  { value: "26-50", label: "26-50 locations" },
  { value: "50+", label: "50+ locations" },
];

const packageOptions = pricingPlans.map((plan) => ({
  value: plan.name.toLowerCase(),
  label: plan.name,
}));

export function WaitlistForm({ variant = "hero", className }: WaitlistFormProps) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errors, setErrors] = useState<Partial<WaitlistFormData>>({});

  const [formData, setFormData] = useState<WaitlistFormData>({
    email: "",
    firstName: "",
    lastName: "",
    companyName: "",
    phoneNumber: "",
    numberOfLocations: "",
    packageInterested: "",
  });

  const updateField = (field: keyof WaitlistFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateStep1 = () => {
    const newErrors: Partial<WaitlistFormData> = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Partial<WaitlistFormData> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    if (!formData.companyName.trim()) {
      newErrors.companyName = "Company name is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      setStep(3);
    }
  };

  const handlePrevStep = () => {
    setStep((prev) => Math.max(1, prev - 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Store in localStorage for MVP
    const waitlist = JSON.parse(localStorage.getItem("repaxio_waitlist") || "[]");
    waitlist.push({
      ...formData,
      timestamp: new Date().toISOString(),
    });
    localStorage.setItem("repaxio_waitlist", JSON.stringify(waitlist));

    setIsSubmitting(false);
    setShowSuccessModal(true);

    // Reset form
    setFormData({
      email: "",
      firstName: "",
      lastName: "",
      companyName: "",
      phoneNumber: "",
      numberOfLocations: "",
      packageInterested: "",
    });
    setStep(1);
  };

  const isDark = variant === "cta";

  const inputClasses = isDark
    ? "bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/20"
    : "";

  return (
    <>
      <div className={className}>
        {/* Progress Indicator */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <motion.div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                  s === step
                    ? isDark
                      ? "bg-secondary-500 text-white"
                      : "bg-primary-700 text-white"
                    : s < step
                    ? isDark
                      ? "bg-emerald-500 text-white"
                      : "bg-emerald-500 text-white"
                    : isDark
                    ? "bg-white/20 text-white/60"
                    : "bg-slate-200 text-slate-500"
                }`}
                animate={{ scale: s === step ? 1.1 : 1 }}
              >
                {s < step ? <CheckCircle2 className="w-4 h-4" /> : s}
              </motion.div>
              {s < 3 && (
                <div
                  className={`w-8 h-0.5 mx-1 ${
                    s < step
                      ? isDark
                        ? "bg-emerald-500"
                        : "bg-emerald-500"
                      : isDark
                      ? "bg-white/20"
                      : "bg-slate-200"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step Labels */}
        <p
          className={`text-center text-sm mb-6 ${
            isDark ? "text-primary-200" : "text-slate-500"
          }`}
        >
          {step === 1 && "Step 1: Your Email"}
          {step === 2 && "Step 2: About You"}
          {step === 3 && "Step 3: Your Business"}
        </p>

        <form onSubmit={handleSubmit}>
          <AnimatePresence mode="wait">
            {/* Step 1: Email */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="relative">
                  <Mail
                    className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${
                      isDark ? "text-white/50" : "text-slate-400"
                    }`}
                  />
                  <Input
                    type="email"
                    placeholder="Enter your work email"
                    value={formData.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    error={errors.email}
                    className={`pl-12 h-14 ${inputClasses}`}
                  />
                </div>
                <Button
                  type="button"
                  onClick={handleNextStep}
                  variant={isDark ? "secondary" : "primary"}
                  size="lg"
                  className="w-full h-14"
                >
                  Continue
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </motion.div>
            )}

            {/* Step 2: Personal Info */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <User
                      className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${
                        isDark ? "text-white/50" : "text-slate-400"
                      }`}
                    />
                    <Input
                      type="text"
                      placeholder="First name"
                      value={formData.firstName}
                      onChange={(e) => updateField("firstName", e.target.value)}
                      error={errors.firstName}
                      className={`pl-12 ${inputClasses}`}
                    />
                  </div>
                  <Input
                    type="text"
                    placeholder="Last name"
                    value={formData.lastName}
                    onChange={(e) => updateField("lastName", e.target.value)}
                    error={errors.lastName}
                    className={inputClasses}
                  />
                </div>
                <div className="relative">
                  <Building2
                    className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${
                      isDark ? "text-white/50" : "text-slate-400"
                    }`}
                  />
                  <Input
                    type="text"
                    placeholder="Company name"
                    value={formData.companyName}
                    onChange={(e) => updateField("companyName", e.target.value)}
                    error={errors.companyName}
                    className={`pl-12 ${inputClasses}`}
                  />
                </div>
                <div className="relative">
                  <Phone
                    className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${
                      isDark ? "text-white/50" : "text-slate-400"
                    }`}
                  />
                  <Input
                    type="tel"
                    placeholder="Phone number (optional)"
                    value={formData.phoneNumber}
                    onChange={(e) => updateField("phoneNumber", e.target.value)}
                    className={`pl-12 ${inputClasses}`}
                  />
                </div>
                <div className="flex gap-3">
                  <Button
                    type="button"
                    onClick={handlePrevStep}
                    variant="outline"
                    size="lg"
                    className={`flex-1 ${isDark ? "border-white/30 text-white hover:bg-white/10" : ""}`}
                  >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back
                  </Button>
                  <Button
                    type="button"
                    onClick={handleNextStep}
                    variant={isDark ? "secondary" : "primary"}
                    size="lg"
                    className="flex-1"
                  >
                    Continue
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Business Info */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="relative">
                  <MapPin
                    className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${
                      isDark ? "text-white/50" : "text-slate-400"
                    } z-10`}
                  />
                  <Select
                    options={locationOptions}
                    placeholder="Number of locations"
                    value={formData.numberOfLocations}
                    onChange={(e) => updateField("numberOfLocations", e.target.value)}
                    className={`pl-12 ${inputClasses}`}
                  />
                </div>
                <div className="relative">
                  <Package
                    className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${
                      isDark ? "text-white/50" : "text-slate-400"
                    } z-10`}
                  />
                  <Select
                    options={packageOptions}
                    placeholder="Package you're interested in"
                    value={formData.packageInterested}
                    onChange={(e) => updateField("packageInterested", e.target.value)}
                    className={`pl-12 ${inputClasses}`}
                  />
                </div>
                <div className="flex gap-3">
                  <Button
                    type="button"
                    onClick={handlePrevStep}
                    variant="outline"
                    size="lg"
                    className={`flex-1 ${isDark ? "border-white/30 text-white hover:bg-white/10" : ""}`}
                  >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back
                  </Button>
                  <Button
                    type="submit"
                    variant={isDark ? "secondary" : "primary"}
                    size="lg"
                    isLoading={isSubmitting}
                    className="flex-1"
                  >
                    Join Waitlist
                    <Sparkles className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </div>

      {/* Success Modal */}
      <Modal isOpen={showSuccessModal} onClose={() => setShowSuccessModal(false)}>
        <div className="p-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle2 className="w-10 h-10 text-emerald-500" />
          </motion.div>

          <h3 className="text-2xl font-bold text-dark mb-3">
            You're on the list!
          </h3>

          <p className="text-slate-600 mb-6">
            Thank you for your interest in Repaxio. Our team will review your
            application and get back to you shortly with early access details.
          </p>

          <div className="bg-slate-50 rounded-xl p-4 mb-6">
            <p className="text-sm text-slate-500 mb-2">What happens next?</p>
            <ul className="text-left space-y-2">
              {[
                "We'll review your application within 24-48 hours",
                "You'll receive a confirmation email shortly",
                "Early access users get 20% off their first 3 months",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <Button
            onClick={() => setShowSuccessModal(false)}
            className="w-full"
          >
            Got it, thanks!
          </Button>

          <p className="text-xs text-slate-400 mt-4">
            Questions? Email us at{" "}
            <a
              href="mailto:hello@repaxio.com"
              className="text-primary-600 hover:underline"
            >
              hello@repaxio.com
            </a>
          </p>
        </div>
      </Modal>
    </>
  );
}
