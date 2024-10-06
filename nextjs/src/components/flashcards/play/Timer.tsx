import { formatTime } from "@/utils/misc";
import { useEffect } from "react";

interface TimerProps {
    seconds: number;
    setSeconds: (value: number | ((prevSeconds: number) => number)) => void;
    isActive: boolean;
}

export default function Timer({ seconds, setSeconds, isActive }: TimerProps) {
    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;

        // If the timer is active, start the interval. Increment every second
        if (isActive) {
            interval = setInterval(() => {
                setSeconds((prevSeconds) => prevSeconds + 1);
            }, 1000);
        } else if (!isActive && seconds !== 0) {
            // Clear the interval if timer is inactive
            clearInterval(interval!);
        }

        // Cleanup the interval when component unmounts
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isActive, seconds, setSeconds]);

    return (
        <div>
            <span className="text-xl font-bold">{formatTime(seconds)}</span>
        </div>
    );
}
