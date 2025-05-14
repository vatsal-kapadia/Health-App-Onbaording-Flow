
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressBar = ({ currentStep, totalSteps }: ProgressBarProps) => {
  const progress = Math.round((currentStep / totalSteps) * 100);
  const progressWidth = `${progress}%`;

  return (
    <div className="sticky top-0 pt-2 pb-5 bg-white z-10">
      <div className="container-custom">
        <div className="flex justify-between text-xs text-gray-500 mb-2">
          <span>Step {currentStep} of {totalSteps}</span>
          <span>{progress}%</span>
        </div>
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-legion-teal animate-progress-fill" 
            style={{ 
              '--progress-width': progressWidth,
              width: progressWidth
            } as React.CSSProperties} 
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
