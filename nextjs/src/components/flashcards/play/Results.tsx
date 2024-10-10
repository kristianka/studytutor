import Confetti from "react-dom-confetti";
import { useEffect, useState } from "react";
import { formatTime } from "@/utils/misc";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface ResultsProps {
    seconds: number;
    postResults: () => void;
}

export default function Results({ seconds, postResults }: ResultsProps) {
    const [isExploding, setIsExploding] = useState(false);
    const router = useRouter();

    useEffect(() => {
        postResults();
        setIsExploding(!isExploding);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [postResults]);

    const handleExplode = () => {
        setIsExploding(!isExploding);
    };

    const handleReturnHome = () => {
        router.push("/flashcards");
    };

    const handleRetry = () => {
        router.refresh();
    };

    return (
        <div className="mx-auto space-y-5 text-center">
            <h1 className="text-3xl font-bold">Quiz Complete!</h1>
            <button onClick={handleExplode} className="text-3xl font-bold">
                🎉
                <Confetti active={isExploding} />
            </button>
            <div>
                <span className="text-xl font-bold">Time taken: {formatTime(seconds)}</span>
            </div>
            <div className="space-x-5">
                <Button onClick={handleRetry} className="mt-32">
                    Retry
                </Button>
                <Button onClick={handleReturnHome} className="">
                    Return to home
                </Button>
            </div>
        </div>
    );
}
