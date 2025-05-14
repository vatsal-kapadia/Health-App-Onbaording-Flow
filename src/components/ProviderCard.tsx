
import { cn } from "@/lib/utils";

interface ProviderCardProps {
  name: string;
  credentials: string;
  specialty: string;
  matchReason?: string;
  imageUrl: string;
  onSelect: () => void;
  isRecommended?: boolean;
  className?: string;
}

const ProviderCard = ({ 
  name, 
  credentials, 
  specialty,
  matchReason,
  imageUrl,
  onSelect,
  isRecommended = false,
  className 
}: ProviderCardProps) => {
  return (
    <div className={cn(
      "border rounded-xl p-4 bg-white",
      isRecommended && "border-legion-teal",
      className
    )}>
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
          <img 
            src={imageUrl} 
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h4 className="font-semibold">{name}</h4>
          <p className="text-sm text-gray-600">{credentials}</p>
          <p className="text-sm text-gray-600">{specialty}</p>
        </div>
      </div>
      
      {matchReason && (
        <div className="mt-3 text-sm">
          <span className="font-medium text-legion-teal">Match reason:</span> {matchReason}
        </div>
      )}
      
      <button 
        onClick={onSelect}
        className="btn btn-primary w-full mt-4"
      >
        {isRecommended ? "Keep this provider" : "Select this provider"}
      </button>
    </div>
  );
};

export default ProviderCard;
