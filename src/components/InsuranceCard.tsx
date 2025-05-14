
import { Info } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface InsuranceCardProps {
  insurerName: string;
  cost: number;
  className?: string;
}

const InsuranceCard = ({ insurerName, cost, className }: InsuranceCardProps) => {
  return (
    <div className={cn("border rounded-xl p-4 bg-legion-lightTeal bg-opacity-50", className)}>
      <div className="text-sm text-gray-600 flex items-center gap-1 mb-1">
        Estimate with {insurerName}:
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Info size={14} className="text-gray-400" />
            </TooltipTrigger>
            <TooltipContent>
              <p className="w-64 text-xs">
                This is an estimate based on typical coverage for your plan. 
                The final cost may change after we verify your benefits.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="text-xl font-semibold">
        ≈ ${cost} <span className="text-sm font-normal text-gray-600">/ session</span>
      </div>
      <div className="text-xs text-gray-500 mt-1">
        (subject to change after verification)
      </div>
    </div>
  );
};

export default InsuranceCard;
