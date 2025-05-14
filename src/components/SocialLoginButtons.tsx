
import { cn } from "@/lib/utils";

interface SocialLoginButtonsProps {
  onGoogleLogin: () => void;
  onAppleLogin: () => void;
  className?: string;
}

const SocialLoginButtons = ({ 
  onGoogleLogin, 
  onAppleLogin,
  className 
}: SocialLoginButtonsProps) => {
  return (
    <div className={cn("space-y-3", className)}>
      <button 
        onClick={onGoogleLogin}
        className="btn btn-secondary w-full"
      >
        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="currentColor"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="currentColor"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="currentColor"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
          <path fill="none" d="M1 1h22v22H1z" />
        </svg>
        Continue with Google
      </button>
      <button 
        onClick={onAppleLogin}
        className="btn btn-secondary w-full"
      >
        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M16.65 5.68c-1.06.85-1.67 2.13-1.51 3.43 1.12.08 2.33-.62 3.07-1.61.75-1 1.22-2.27 1.08-3.56-1.18-.04-2.35.69-3.09 1.71"
          />
          <path
            fill="currentColor"
            d="M20 15.97a12.1 12.1 0 01-1.15 2.33c-.7 1.05-1.44 2.1-2.59 2.11-1.15.02-1.5-.67-2.83-.67-1.32 0-1.7.66-2.8.7-1.11.04-1.95-1.12-2.66-2.16-1.46-2.12-2.55-5.96-1.07-8.56.75-1.3 2.04-2.1 3.41-2.12 1.06-.03 2.08.71 2.73.71.65 0 1.85-.87 3.12-.75.53.03 2.03.21 3 1.61-.08.04-1.79 1.04-1.77 3.12.03 2.47 2.17 3.29 2.2 3.3"
          />
        </svg>
        Continue with Apple
      </button>
    </div>
  );
};

export default SocialLoginButtons;
