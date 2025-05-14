
import { cn } from "@/lib/utils";

interface YesNoButtonsProps {
  onYes: () => void;
  onNo: () => void;
  className?: string;
}

const YesNoButtons = ({ onYes, onNo, className }: YesNoButtonsProps) => {
  return (
    <div className={cn("grid grid-cols-2 gap-4", className)}>
      <button 
        onClick={onYes}
        className="btn btn-primary"
      >
        Yes
      </button>
      <button 
        onClick={onNo}
        className="btn btn-secondary"
      >
        No
      </button>
    </div>
  );
};

export default YesNoButtons;
