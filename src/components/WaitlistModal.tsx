import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwRCYy0MVuYEWRTo5UqCSJfNZczkPSe7FAw9GLdAVMTUm-7bZu1dN5te0NuI6KMwHFz/exec";

// Get UTM parameters from URL
const getUTMParams = () => {
  const params = new URLSearchParams(window.location.search);
  return {
    utmSource: params.get("utm_source") || "",
    utmMedium: params.get("utm_medium") || "",
    utmCampaign: params.get("utm_campaign") || "",
  };
};

// Get user metadata
const getMetadata = () => {
  return {
    userAgent: navigator.userAgent,
    referrer: document.referrer || "direct",
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    language: navigator.language,
    screenResolution: `${window.screen.width}x${window.screen.height}`,
    pageUrl: window.location.href,
  };
};

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = 1 | 2 | 3 | 4;

interface FormData {
  email: string;
  firstName: string;
  lastName: string;
  companyName: string;
  countryCode: string;
  phoneNumber: string;
  locations: string;
  website: string; // Honeypot field - should always be empty
}

interface FormErrors {
  email?: string;
  firstName?: string;
  lastName?: string;
  companyName?: string;
  phoneNumber?: string;
  locations?: string;
}

const locationOptions = [
  { value: "1", label: "1 location", plan: "Starter" },
  { value: "2-3", label: "2-3 locations", plan: "Growth" },
  { value: "4-10", label: "4-10 locations", plan: "Professional" },
  { value: "10+", label: "10+ locations", plan: "Enterprise" },
];

// Validation helpers
const validateEmail = (email: string): string | undefined => {
  if (!email) return "Email is required";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return "Please enter a valid email";
  // Check for business email (not personal)
  const personalDomains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "aol.com"];
  const domain = email.split("@")[1]?.toLowerCase();
  if (personalDomains.includes(domain)) {
    return undefined; // Allow personal emails but could show a warning
  }
  return undefined;
};

const validatePhone = (phone: string, countryCode: string): string | undefined => {
  if (!phone) return "Phone number is required";
  const digitsOnly = phone.replace(/\D/g, "");
  if (countryCode === "+1" && digitsOnly.length !== 10) {
    return "Please enter a valid 10-digit US phone number";
  }
  if (countryCode === "+91" && digitsOnly.length !== 10) {
    return "Please enter a valid 10-digit Indian phone number";
  }
  return undefined;
};

const validateName = (name: string, field: string): string | undefined => {
  if (!name) return `${field} is required`;
  if (name.length < 2) return `${field} must be at least 2 characters`;
  if (!/^[a-zA-Z\s'-]+$/.test(name)) return `${field} contains invalid characters`;
  return undefined;
};

const validateCompany = (company: string): string | undefined => {
  if (!company) return "Company name is required";
  if (company.length < 2) return "Company name must be at least 2 characters";
  return undefined;
};

export function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
  const [step, setStep] = useState<Step>(1);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [ipAddress, setIpAddress] = useState<string>("");
  const [formData, setFormData] = useState<FormData>({
    email: "",
    firstName: "",
    lastName: "",
    companyName: "",
    countryCode: "+1",
    phoneNumber: "",
    locations: "",
    website: "", // Honeypot - bots will fill this, humans won't see it
  });

  // Fetch IP address on mount
  useEffect(() => {
    fetch("https://api.ipify.org?format=json")
      .then((res) => res.json())
      .then((data) => setIpAddress(data.ip))
      .catch(() => setIpAddress("unknown"));
  }, []);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleBlur = (field: keyof FormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateField(field);
  };

  const validateField = (field: keyof FormData): boolean => {
    let error: string | undefined;

    switch (field) {
      case "email":
        error = validateEmail(formData.email);
        break;
      case "firstName":
        error = validateName(formData.firstName, "First name");
        break;
      case "lastName":
        error = validateName(formData.lastName, "Last name");
        break;
      case "companyName":
        error = validateCompany(formData.companyName);
        break;
      case "phoneNumber":
        error = validatePhone(formData.phoneNumber, formData.countryCode);
        break;
    }

    setErrors((prev) => ({ ...prev, [field]: error }));
    return !error;
  };

  const validateStep1 = (): boolean => {
    const emailError = validateEmail(formData.email);
    setErrors({ email: emailError });
    setTouched({ email: true });
    return !emailError;
  };

  const validateStep2 = (): boolean => {
    const newErrors: FormErrors = {
      firstName: validateName(formData.firstName, "First name"),
      lastName: validateName(formData.lastName, "Last name"),
      companyName: validateCompany(formData.companyName),
      phoneNumber: validatePhone(formData.phoneNumber, formData.countryCode),
    };
    setErrors(newErrors);
    setTouched({
      firstName: true,
      lastName: true,
      companyName: true,
      phoneNumber: true,
    });
    return !Object.values(newErrors).some((error) => error);
  };

  const validateStep3 = (): boolean => {
    if (!formData.locations) {
      setErrors({ locations: "Please select the number of locations" });
      return false;
    }
    return true;
  };

  const submitToGoogleSheets = async () => {
    const metadata = getMetadata();
    const utmParams = getUTMParams();

    // Get raw phone digits and combine with country code
    const rawPhone = formData.phoneNumber.replace(/\D/g, "");
    const fullPhone = `${formData.countryCode}${rawPhone}`;

    const payload = {
      email: formData.email,
      firstName: formData.firstName,
      lastName: formData.lastName,
      companyName: formData.companyName,
      phone: fullPhone,
      locations: formData.locations,
      package: getRecommendedPlan(),
      ip: ipAddress,
      ...metadata,
      ...utmParams,
    };

    try {
      // Using no-cors mode since Google Apps Script doesn't support CORS properly
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      return true;
    } catch (error) {
      console.error("Error submitting to Google Sheets:", error);
      return false;
    }
  };

  const handleNextStep = async () => {
    // Honeypot check - if filled, it's a bot
    if (formData.website) {
      // Silently "succeed" to not alert the bot
      setStep(4);
      return;
    }

    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateStep2()) return;
    if (step === 3) {
      if (!validateStep3()) return;
      setIsLoading(true);

      // Submit to Google Sheets
      await submitToGoogleSheets();

      setIsLoading(false);
      setStep(4);
      return;
    }
    setStep((prev) => (prev + 1) as Step);
  };

  const handleClose = () => {
    onClose();
    // Reset after animation
    setTimeout(() => {
      setStep(1);
      setErrors({});
      setTouched({});
      setFormData({
        email: "",
        firstName: "",
        lastName: "",
        companyName: "",
        countryCode: "+1",
        phoneNumber: "",
        locations: "",
        website: "",
      });
    }, 300);
  };

  const formatPhoneNumber = (value: string, countryCode: string): string => {
    const digits = value.replace(/\D/g, "");
    if (countryCode === "+1") {
      if (digits.length <= 3) return digits;
      if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
      return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
    }
    if (countryCode === "+91") {
      if (digits.length <= 5) return digits;
      return `${digits.slice(0, 5)} ${digits.slice(5, 10)}`;
    }
    return digits;
  };

  const handlePhoneChange = (value: string) => {
    const formatted = formatPhoneNumber(value, formData.countryCode);
    handleInputChange("phoneNumber", formatted);
  };

  const getRecommendedPlan = () => {
    const option = locationOptions.find((opt) => opt.value === formData.locations);
    return option?.plan || "Starter";
  };

  const isStep1Valid = formData.email && !errors.email;
  const isStep2Valid =
    formData.firstName &&
    formData.lastName &&
    formData.companyName &&
    formData.phoneNumber &&
    !errors.firstName &&
    !errors.lastName &&
    !errors.companyName &&
    !errors.phoneNumber;
  const isStep3Valid = formData.locations;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={handleClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors z-10"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Progress bar */}
            {step < 4 && (
              <div className="h-1 bg-slate-100 dark:bg-slate-800">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary-500 to-accent-500"
                  initial={{ width: "0%" }}
                  animate={{ width: `${(step / 3) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            )}

            <div className="p-8">
              <AnimatePresence mode="wait">
                {/* Step 1: Email */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="text-center mb-8">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                        Reserve Your Spot
                      </h3>
                      <p className="text-slate-500 dark:text-slate-400 mb-4">
                        Be the first to experience AI-powered reputation management
                      </p>
                      {/* Urgency Banner */}
                      <div className="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 mx-auto w-fit">
                        <motion.span
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="w-2 h-2 rounded-full bg-orange-500"
                        />
                        <span className="text-sm font-medium text-orange-600 dark:text-orange-400">
                          Only 127 early access spots left
                        </span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {/* Honeypot field - hidden from humans, visible to bots */}
                      <div
                        aria-hidden="true"
                        style={{
                          position: "absolute",
                          left: "-9999px",
                          top: "-9999px",
                          opacity: 0,
                          pointerEvents: "none",
                        }}
                      >
                        <label htmlFor="website">Website</label>
                        <input
                          type="text"
                          id="website"
                          name="website"
                          value={formData.website}
                          onChange={(e) => handleInputChange("website", e.target.value)}
                          tabIndex={-1}
                          autoComplete="off"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                          Work Email
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          onBlur={() => handleBlur("email")}
                          placeholder="you@company.com"
                          className={`w-full px-4 py-3 rounded-xl border ${
                            touched.email && errors.email
                              ? "border-red-500 focus:ring-red-500/50 focus:border-red-500"
                              : "border-slate-200 dark:border-slate-700 focus:ring-primary-500/50 focus:border-primary-500"
                          } bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all`}
                          autoFocus
                        />
                        {touched.email && errors.email && (
                          <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            {errors.email}
                          </p>
                        )}
                      </div>

                      <button
                        onClick={handleNextStep}
                        disabled={!isStep1Valid}
                        className="w-full py-3 px-6 bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 disabled:from-slate-300 disabled:to-slate-400 dark:disabled:from-slate-600 dark:disabled:to-slate-700 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        Continue
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </button>
                    </div>

                    {/* Early Bird Benefits */}
                    <div className="mt-6 p-4 rounded-xl bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-500/10 dark:to-accent-500/10 border border-primary-100 dark:border-primary-500/20">
                      <p className="text-xs font-semibold text-primary-600 dark:text-primary-400 mb-2">Early access members get:</p>
                      <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
                        <li className="flex items-center gap-2">
                          <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          30% off for life (locked-in pricing)
                        </li>
                        <li className="flex items-center gap-2">
                          <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          Priority onboarding & support
                        </li>
                        <li className="flex items-center gap-2">
                          <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          Direct input on new features
                        </li>
                      </ul>
                    </div>

                    <p className="text-center text-xs text-slate-400 mt-4">
                      By continuing, you agree to our Terms of Service and Privacy Policy
                    </p>
                  </motion.div>
                )}

                {/* Step 2: Personal & Company Info */}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                        Tell us about yourself
                      </h3>
                      <p className="text-slate-500 dark:text-slate-400">
                        Help us personalize your experience
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            First Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={formData.firstName}
                            onChange={(e) => handleInputChange("firstName", e.target.value)}
                            onBlur={() => handleBlur("firstName")}
                            placeholder="John"
                            className={`w-full px-4 py-3 rounded-xl border ${
                              touched.firstName && errors.firstName
                                ? "border-red-500 focus:ring-red-500/50 focus:border-red-500"
                                : "border-slate-200 dark:border-slate-700 focus:ring-primary-500/50 focus:border-primary-500"
                            } bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all`}
                            autoFocus
                          />
                          {touched.firstName && errors.firstName && (
                            <p className="mt-1 text-xs text-red-500">{errors.firstName}</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                            Last Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            value={formData.lastName}
                            onChange={(e) => handleInputChange("lastName", e.target.value)}
                            onBlur={() => handleBlur("lastName")}
                            placeholder="Doe"
                            className={`w-full px-4 py-3 rounded-xl border ${
                              touched.lastName && errors.lastName
                                ? "border-red-500 focus:ring-red-500/50 focus:border-red-500"
                                : "border-slate-200 dark:border-slate-700 focus:ring-primary-500/50 focus:border-primary-500"
                            } bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all`}
                          />
                          {touched.lastName && errors.lastName && (
                            <p className="mt-1 text-xs text-red-500">{errors.lastName}</p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                          Company Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={formData.companyName}
                          onChange={(e) => handleInputChange("companyName", e.target.value)}
                          onBlur={() => handleBlur("companyName")}
                          placeholder="Acme Inc."
                          className={`w-full px-4 py-3 rounded-xl border ${
                            touched.companyName && errors.companyName
                              ? "border-red-500 focus:ring-red-500/50 focus:border-red-500"
                              : "border-slate-200 dark:border-slate-700 focus:ring-primary-500/50 focus:border-primary-500"
                          } bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all`}
                        />
                        {touched.companyName && errors.companyName && (
                          <p className="mt-1 text-xs text-red-500">{errors.companyName}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                          Phone Number <span className="text-red-500">*</span>
                        </label>
                        <div className="flex gap-2">
                          <select
                            value={formData.countryCode}
                            onChange={(e) => {
                              handleInputChange("countryCode", e.target.value);
                              handleInputChange("phoneNumber", ""); // Reset phone on country change
                            }}
                            className="w-28 px-3 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all"
                          >
                            <option value="+1">🇺🇸 +1</option>
                            <option value="+91">🇮🇳 +91</option>
                          </select>
                          <input
                            type="tel"
                            value={formData.phoneNumber}
                            onChange={(e) => handlePhoneChange(e.target.value)}
                            onBlur={() => handleBlur("phoneNumber")}
                            placeholder={formData.countryCode === "+1" ? "(555) 123-4567" : "98765 43210"}
                            className={`flex-1 px-4 py-3 rounded-xl border ${
                              touched.phoneNumber && errors.phoneNumber
                                ? "border-red-500 focus:ring-red-500/50 focus:border-red-500"
                                : "border-slate-200 dark:border-slate-700 focus:ring-primary-500/50 focus:border-primary-500"
                            } bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all`}
                          />
                        </div>
                        {touched.phoneNumber && errors.phoneNumber && (
                          <p className="mt-1 text-xs text-red-500">{errors.phoneNumber}</p>
                        )}
                      </div>

                      <div className="flex gap-3 pt-2">
                        <button
                          onClick={() => setStep(1)}
                          className="px-6 py-3 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-semibold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                        >
                          Back
                        </button>
                        <button
                          onClick={handleNextStep}
                          disabled={!isStep2Valid}
                          className="flex-1 py-3 px-6 bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 disabled:from-slate-300 disabled:to-slate-400 dark:disabled:from-slate-600 dark:disabled:to-slate-700 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
                        >
                          Continue
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Number of Locations */}
                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                        How many locations?
                      </h3>
                      <p className="text-slate-500 dark:text-slate-400">
                        This helps us recommend the right plan for you
                      </p>
                    </div>

                    <div className="space-y-3 mb-6">
                      {locationOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => {
                            handleInputChange("locations", option.value);
                            setErrors((prev) => ({ ...prev, locations: undefined }));
                          }}
                          className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                            formData.locations === option.value
                              ? "border-primary-500 bg-primary-50 dark:bg-primary-500/10"
                              : "border-slate-200 dark:border-slate-700 hover:border-primary-300 dark:hover:border-primary-700"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <p className={`font-semibold ${
                                formData.locations === option.value
                                  ? "text-primary-600 dark:text-primary-400"
                                  : "text-slate-900 dark:text-white"
                              }`}>
                                {option.label}
                              </p>
                              <p className="text-sm text-slate-500 dark:text-slate-400">
                                Recommended: {option.plan} plan
                              </p>
                            </div>
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                              formData.locations === option.value
                                ? "border-primary-500 bg-primary-500"
                                : "border-slate-300 dark:border-slate-600"
                            }`}>
                              {formData.locations === option.value && (
                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              )}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>

                    {errors.locations && (
                      <p className="mb-4 text-sm text-red-500 text-center">{errors.locations}</p>
                    )}

                    <div className="flex gap-3">
                      <button
                        onClick={() => setStep(2)}
                        className="px-6 py-3 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-semibold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
                      >
                        Back
                      </button>
                      <button
                        onClick={handleNextStep}
                        disabled={!isStep3Valid || isLoading}
                        className="flex-1 py-3 px-6 bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 disabled:from-slate-300 disabled:to-slate-400 dark:disabled:from-slate-600 dark:disabled:to-slate-700 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        {isLoading ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                            />
                            Joining...
                          </>
                        ) : (
                          <>
                            Join Waitlist
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </>
                        )}
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Success */}
                {step === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="text-center py-4"
                  >
                    {/* Animated checkmark */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", duration: 0.5, delay: 0.1 }}
                      className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center"
                    >
                      <motion.svg
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="w-10 h-10 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <motion.path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </motion.svg>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                        You're on the list!
                      </h3>
                      <p className="text-slate-500 dark:text-slate-400 mb-6">
                        Thanks for joining, {formData.firstName}! We'll notify you at{" "}
                        <span className="text-primary-500 font-medium">{formData.email}</span>{" "}
                        when Repaxio launches.
                      </p>

                      {/* Recommended plan card */}
                      <div className="bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-500/10 dark:to-accent-500/10 rounded-xl p-4 mb-6 border border-primary-100 dark:border-primary-500/20">
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                          Based on your {formData.locations === "10+" ? "10+" : formData.locations} location(s), we recommend:
                        </p>
                        <p className="text-xl font-bold text-gradient">
                          {getRecommendedPlan()} Plan
                        </p>
                        <p className="text-sm text-green-600 dark:text-green-400 mt-1 font-medium">
                          You've locked in 30% off for life!
                        </p>
                      </div>

                      {/* Social share */}
                      <div className="mb-6">
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
                          Share with others and move up the waitlist
                        </p>
                        <div className="flex justify-center gap-3">
                          <button className="p-3 rounded-xl bg-[#1DA1F2]/10 text-[#1DA1F2] hover:bg-[#1DA1F2]/20 transition-colors">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                          </button>
                          <button className="p-3 rounded-xl bg-[#0A66C2]/10 text-[#0A66C2] hover:bg-[#0A66C2]/20 transition-colors">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                          </button>
                        </div>
                      </div>

                      <button
                        onClick={handleClose}
                        className="w-full py-3 px-6 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold rounded-xl transition-all"
                      >
                        Done
                      </button>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
