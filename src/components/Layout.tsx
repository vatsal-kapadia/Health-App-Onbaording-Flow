
import { PropsWithChildren } from "react";
import ProgressBar from "./ProgressBar";
import HIPAABadge from "./HIPAABadge";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import { captureEvent, ANALYTICS_EVENTS } from "@/lib/analytics";

interface LayoutProps extends PropsWithChildren {
  currentStep: number;
  totalSteps: number;
  className?: string;
  onBack?: () => void;
  showBackButton?: boolean;
}

const Layout = ({ 
  children, 
  currentStep, 
  totalSteps,
  className,
  onBack,
  showBackButton = true
}: LayoutProps) => {
  const handleBack = () => {
    if (onBack) {
      captureEvent(ANALYTICS_EVENTS.BACK_BUTTON_CLICKED, { from_step: currentStep });
      onBack();
    }
  };

  return (
    <div className="min-h-screen bg-white pb-12">
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      {showBackButton && currentStep > 1 && (
        <div className="container-custom pt-4">
          <button 
            onClick={handleBack}
            className="flex items-center text-gray-600 hover:text-legion-teal transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5 mr-1" />
            <span>Back</span>
          </button>
        </div>
      )}
      <main className={cn("container-custom pt-2 pb-16", className)}>
        {children}
      </main>
      <HIPAABadge />
    </div>
  );
};

export default Layout;
