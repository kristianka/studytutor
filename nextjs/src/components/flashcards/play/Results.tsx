import Confetti from "react-dom-confetti";
import Link from "next/link";

import { formatTime } from "@/components/misc";
import { useState } from "react";

interface ResultsProps {
    seconds: number;
}

export default function Results({ seconds }: ResultsProps) {
    const [isExploding, setIsExploding] = useState(true);

    const handleExplode = () => {
        setIsExploding(!isExploding);
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
            <div className="mt-32">
                <Link href="/flashcards" className="text-gray-600 hover:text-gray-400">
                    Return home
                </Link>
            </div>
        </div>
    );
}
