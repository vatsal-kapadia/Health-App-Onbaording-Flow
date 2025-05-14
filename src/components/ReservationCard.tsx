
import { cn } from "@/lib/utils";
import { Clock } from "lucide-react";
import { useEffect, useState } from "react";

interface ReservationCardProps {
  dateTime: string;
  holdHours: number;
  className?: string;
}

const ReservationCard = ({ dateTime, holdHours, className }: ReservationCardProps) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: holdHours,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const totalSeconds = holdHours * 60 * 60;
    let secondsLeft = totalSeconds;

    const timer = setInterval(() => {
      secondsLeft--;
      
      const hours = Math.floor(secondsLeft / 3600);
      const minutes = Math.floor((secondsLeft % 3600) / 60);
      const seconds = secondsLeft % 60;

      setTimeLeft({ hours, minutes, seconds });
      
      if (secondsLeft <= 0) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [holdHours]);

  const formatTime = (num: number) => num.toString().padStart(2, '0');

  return (
    <div className={cn("border rounded-xl p-4 bg-legion-lightTeal bg-opacity-50", className)}>
      <div className="text-sm text-gray-600 mb-2">
        We've held the next available slot:
      </div>
      <div className="text-xl font-semibold mb-3">
        {dateTime}
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <Clock size={16} className="text-legion-teal" />
        <span>
          Slot held for: {formatTime(timeLeft.hours)}:{formatTime(timeLeft.minutes)}:{formatTime(timeLeft.seconds)}
        </span>
      </div>
    </div>
  );
};

export default ReservationCard;
