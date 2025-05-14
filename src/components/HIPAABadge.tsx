
import { cn } from "@/lib/utils";
import { Lock } from "lucide-react";

const HIPAABadge = () => {
  return (
    <div className="hipaa-badge">
      <div className="flex items-center justify-center gap-1">
        <Lock size={12} className="text-gray-500" />
        <span>HIPAA-compliant • Secure & Encrypted</span>
      </div>
    </div>
  );
};

export default HIPAABadge;
