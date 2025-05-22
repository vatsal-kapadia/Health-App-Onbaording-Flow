import { useToast } from "@/components/ui/use-toast";
import { useState, useEffect } from "react";
import Layout from "./Layout";
import MultiSelectChips from "./MultiSelectChips";
import SocialLoginButtons from "./SocialLoginButtons";
import YesNoButtons from "./YesNoButtons";
import InsuranceCard from "./InsuranceCard";
import ReservationCard from "./ReservationCard";
import ProviderCard from "./ProviderCard";
import { captureEvent, ANALYTICS_EVENTS } from "@/lib/analytics";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Check } from "lucide-react";

// Mock data
const SYMPTOM_OPTIONS = [
  { id: "anxiety", label: "Anxiety" },
  { id: "depression", label: "Depression" },
  { id: "adhd", label: "ADHD" },
  { id: "refill", label: "Refill" },
  { id: "other", label: "Other" },
];

const INSURANCE_OPTIONS = [
  { id: "aetna", name: "Aetna", cost: 25 },
  { id: "bcbs", name: "Blue Cross Blue Shield", cost: 30 },
  { id: "cigna", name: "Cigna", cost: 35 },
  { id: "unitedhealth", name: "UnitedHealthcare", cost: 20 },
  { id: "self-pay", name: "Self-Pay", cost: 120 },
];

const PROVIDERS = [
  { 
    id: "1", 
    name: "Dr. Sarah Johnson",
    credentials: "MD, Psychiatrist",
    specialty: "Anxiety & Depression",
    matchReason: "Specializes in your selected symptoms",
    imageUrl: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  { 
    id: "2", 
    name: "Dr. Michael Chen",
    credentials: "PhD, Psychologist",
    specialty: "ADHD & Anxiety",
    imageUrl: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  { 
    id: "3", 
    name: "Dr. Emily Rodriguez",
    credentials: "LMFT, Therapist",
    specialty: "Depression & Trauma",
    imageUrl: "https://randomuser.me/api/portraits/women/68.jpg"
  },
];

const OnboardingFlow = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [completed, setCompleted] = useState(false);
  const totalSteps = 7;
  
  // State for each step
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isTexasResident, setIsTexasResident] = useState<boolean | null>(null);
  const [hasMedicare, setHasMedicare] = useState<boolean | null>(null);
  const [selectedInsurance, setSelectedInsurance] = useState<string>("");
  const [selectedProvider, setSelectedProvider] = useState<string>("");

  // Analytics tracking using PostHog
  const trackAnalytics = (event: string, properties?: Record<string, any>) => {
    console.log(`Analytics event: ${event}`, properties);
    captureEvent(event, properties);
  };

  const handleContinue = () => {
    if (currentStep === 1) {
      trackAnalytics(ANALYTICS_EVENTS.SYMPTOM_SELECTED, { symptoms: selectedSymptoms });
    } else if (currentStep === 2) {
      trackAnalytics(ANALYTICS_EVENTS.SIGNUP_COMPLETED, { email_signup: email !== "" });
    } else if (currentStep === 3) {
      trackAnalytics(ANALYTICS_EVENTS.RESIDENCY_ANSWERED, { 
        is_texas_resident: isTexasResident,
        has_medicare: hasMedicare
      });
    } else if (currentStep === 4) {
      trackAnalytics(ANALYTICS_EVENTS.INSURANCE_CHOSEN, { insurance: selectedInsurance });
    } else if (currentStep === 5) {
      trackAnalytics(ANALYTICS_EVENTS.SLOT_RESERVED);
    } else if (currentStep === 6) {
      trackAnalytics(ANALYTICS_EVENTS.INTAKE_COMPLETED);
    } else if (currentStep === 7) {
      trackAnalytics(ANALYTICS_EVENTS.PROVIDER_FINALIZED, { provider_id: selectedProvider });
      setCompleted(true);
    }

    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSymptomsChange = (selected: string[]) => {
    setSelectedSymptoms(selected);
  };

  const handleGoogleLogin = () => {
    // Mock implementation
    trackAnalytics("google_login_clicked");
    setEmail("user@example.com");
    handleContinue();
  };

  const handleAppleLogin = () => {
    // Mock implementation
    trackAnalytics("apple_login_clicked");
    setEmail("user@example.com");
    handleContinue();
  };

  const handleEmailSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      trackAnalytics("email_signup_submitted", { has_email: !!email });
      handleContinue();
    }
  };

  const handleTexasResidency = (isResident: boolean) => {
    trackAnalytics("texas_residency_answered", { is_resident: isResident });
    setIsTexasResident(isResident);
    if (!isResident) {
      toast({
        title: "Not Available in Your Area",
        description: "We've added you to our waitlist and will notify you when we expand to your state.",
      });
    } else {
      // Continue to Medicare question
    }
  };

  const handleMedicare = (hasMedicareInsurance: boolean) => {
    trackAnalytics("medicare_status_answered", { has_medicare: hasMedicareInsurance });
    setHasMedicare(hasMedicareInsurance);
    if (hasMedicareInsurance) {
      toast({
        title: "Medicare Coverage",
        description: "Currently we offer self-pay options for Medicare patients. You can continue or join our waitlist for when we accept Medicare.",
      });
    }
    handleContinue();
  };

  const handleInsuranceSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    trackAnalytics("insurance_selected", { insurance: value });
    setSelectedInsurance(value);
  };

  const handleProviderSelect = (providerId: string) => {
    trackAnalytics("provider_selected", { provider_id: providerId });
    setSelectedProvider(providerId);
    handleContinue();
  };

  const confirmReservation = () => {
    trackAnalytics("booking_confirmed", { provider_id: selectedProvider });
    toast({
      title: "Booking Confirmed!",
      description: "Your appointment has been scheduled.",
    });
    setCompleted(true);
  };

  const startIntake = () => {
    trackAnalytics(ANALYTICS_EVENTS.INTAKE_STARTED);
    handleContinue();
  };

  const renderStep = () => {
    if (completed) {
      return (
        <div className="text-center py-10">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 mb-4">
            <Check className="h-6 w-6 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Booking Confirmed!</h2>
          <p className="text-gray-600 mb-6">
            Your appointment is scheduled for Tuesday, 3:30 PM CT.
          </p>
          <button 
            className="btn btn-primary w-full mb-3"
            onClick={() => trackAnalytics("add_to_calendar_clicked")}
          >
            Add to Calendar
          </button>
          <a 
            href="#" 
            className="text-legion-teal text-sm underline"
            onClick={() => trackAnalytics("manage_appointment_clicked")}
          >
            Manage your appointment
          </a>
        </div>
      );
    }

    switch (currentStep) {
      case 1:
        return (
          <>
            <h1 className="text-2xl font-bold mb-6">What brings you here today?</h1>
            <p className="text-gray-600 mb-6">Select all that apply</p>
            <MultiSelectChips 
              options={SYMPTOM_OPTIONS} 
              onChange={handleSymptomsChange}
            />
            <button 
              onClick={handleContinue}
              disabled={selectedSymptoms.length === 0}
              className={`btn w-full mt-8 ${
                selectedSymptoms.length === 0 ? "btn-disabled" : "btn-primary"
              }`}
            >
              Continue
            </button>
          </>
        );
      
      case 2:
        return (
          <>
            <h1 className="text-2xl font-bold mb-6">Create your account</h1>
            <SocialLoginButtons 
              onGoogleLogin={handleGoogleLogin}
              onAppleLogin={handleAppleLogin}
              className="mb-6"
            />
            <div className="flex items-center gap-4 my-6">
              <div className="h-px bg-gray-200 flex-1"></div>
              <span className="text-sm text-gray-500">or</span>
              <div className="h-px bg-gray-200 flex-1"></div>
            </div>
            <form onSubmit={handleEmailSignup}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
                <button 
                  type="submit"
                  className="btn btn-primary w-full mt-2"
                >
                  Create Account
                </button>
              </div>
            </form>
          </>
        );
      
      case 3:
        return (
          <>
            <h1 className="text-2xl font-bold mb-6">Let's check if we can help you</h1>
            <div className="space-y-8">
              <div>
                <h2 className="text-lg font-semibold mb-3">Are you a Texas resident?</h2>
                <YesNoButtons 
                  onYes={() => handleTexasResidency(true)}
                  onNo={() => handleTexasResidency(false)}
                />
              </div>
              
              {isTexasResident && (
                <div>
                  <h2 className="text-lg font-semibold mb-3">Are you covered by Medicare?</h2>
                  <YesNoButtons 
                    onYes={() => handleMedicare(true)}
                    onNo={() => handleMedicare(false)}
                  />
                </div>
              )}
            </div>
          </>
        );
      
      case 4:
        return (
          <>
            <h1 className="text-2xl font-bold mb-6">Let's check your coverage</h1>
            <div className="space-y-6">
              <div>
                <label htmlFor="insurance" className="block text-sm font-medium text-gray-700 mb-1">
                  Select your insurance provider
                </label>
                <select
                  id="insurance"
                  value={selectedInsurance}
                  onChange={handleInsuranceSelect}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                >
                  <option value="">Select an option</option>
                  {INSURANCE_OPTIONS.map(option => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>
              
              {selectedInsurance && (
                <InsuranceCard 
                  insurerName={INSURANCE_OPTIONS.find(i => i.id === selectedInsurance)?.name || ""}
                  cost={INSURANCE_OPTIONS.find(i => i.id === selectedInsurance)?.cost || 0}
                />
              )}
              
              <button 
                onClick={handleContinue}
                disabled={!selectedInsurance}
                className={`btn w-full mt-4 ${
                  !selectedInsurance ? "btn-disabled" : "btn-primary"
                }`}
              >
                Continue
              </button>
            </div>
          </>
        );
      
      case 5:
        return (
          <>
            <h1 className="text-2xl font-bold mb-6">Your appointment</h1>
            <ReservationCard 
              dateTime="Tue • 3:30 PM CT"
              holdHours={24}
              className="mb-6"
            />
            <p className="text-center text-sm text-gray-600 mb-6">
              Complete your intake form to confirm this appointment
            </p>
            <button 
              onClick={startIntake}
              className="btn btn-primary w-full"
            >
              Finish intake to confirm
            </button>
          </>
        );
      
      case 6:
        return (
          <>
            <h1 className="text-2xl font-bold mb-4">Complete your intake</h1>
            <div className="bg-legion-teal bg-opacity-10 text-sm p-3 rounded-lg flex items-center justify-center gap-2 mb-6">
              <span>Secure</span>
              <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
              <span>HIPAA-compliant</span>
              <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
              <span>Avg 3 min</span>
            </div>
            
            <div className="border border-gray-300 rounded-xl h-[400px] mb-6 flex items-center justify-center bg-gray-50">
              <div className="text-center p-6">
                <h3 className="text-lg font-medium mb-2">Healthie Intake Form</h3>
                <p className="text-sm text-gray-600 mb-4">
                  (Placeholder for Healthie iFrame)
                </p>
                <div className="space-y-4 w-full">
                  <div className="flex flex-col items-start text-left mb-4">
                    <label className="text-sm font-medium mb-1">Full Name</label>
                    <input 
                      type="text" 
                      className="w-full p-2 border border-gray-300 rounded"
                      value="John Smith"
                      readOnly
                    />
                  </div>
                  <div className="flex flex-col items-start text-left">
                    <label className="text-sm font-medium mb-1">Email</label>
                    <input 
                      type="email" 
                      className="w-full p-2 border border-gray-300 rounded"
                      value="john@example.com"
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col gap-4">
              <button 
                onClick={handleContinue}
                className="btn btn-primary w-full"
              >
                Submit and continue
              </button>
              <button 
                className="text-legion-teal text-sm"
                onClick={() => trackAnalytics("save_for_later_clicked")}
              >
                Save & finish later
              </button>
            </div>
          </>
        );
      
      case 7:
        return (
          <>
            <h1 className="text-2xl font-bold mb-6">Your Provider</h1>
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                  <span className="font-medium">Recommended for you</span>
                </div>
                <ProviderCard 
                  {...PROVIDERS[0]}
                  onSelect={() => confirmReservation()}
                  isRecommended={true}
                />
              </div>
              
              <div className="pt-3">
                <Accordion type="single" collapsible>
                  <AccordionItem value="other-providers">
                    <AccordionTrigger className="text-legion-teal">
                      Prefer someone else?
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4 pt-4">
                        {PROVIDERS.slice(1).map(provider => (
                          <ProviderCard 
                            key={provider.id}
                            {...provider}
                            onSelect={() => handleProviderSelect(provider.id)}
                          />
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </>
        );
      
      default:
        return <p>Something went wrong</p>;
    }
  };

  return (
    <Layout 
      currentStep={currentStep} 
      totalSteps={totalSteps}
      onBack={handleBack}
      showBackButton={!completed && currentStep > 1}
    >
      <div className="py-4">
        {renderStep()}
      </div>
    </Layout>
  );
};

export default OnboardingFlow;
