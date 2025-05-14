
import { PropsWithChildren } from "react";
import ProgressBar from "./ProgressBar";
import HIPAABadge from "./HIPAABadge";
import { cn } from "@/lib/utils";

interface LayoutProps extends PropsWithChildren {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

const Layout = ({ 
  children, 
  currentStep, 
  totalSteps,
  className 
}: LayoutProps) => {
  return (
    <div className="min-h-screen bg-white pb-12">
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      <main className={cn("container-custom pt-2 pb-16", className)}>
        {children}
      </main>
      <HIPAABadge />
    </div>
  );
};

export default Layout;
