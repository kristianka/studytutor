"use client";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { getCards } from "@/lib/card";
import { HistoryContent } from "@/types";
import Link from "next/link";
import { useEffect, useState } from "react";

interface ChoicesProps {
    body: { userId: string; cardId: string };
}

export default function Choices({ body }: ChoicesProps) {
    const [isCorrect, setIsCorrect] = useState(false);
    const [choices, setChoices] = useState<HistoryContent | null>(null);
    const [totalCards, setTotalCards] = useState(0);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getCards({ body, index });
            const { card, totalCards } = data;
            setChoices(card);
            setTotalCards(totalCards);
        };
        void fetchData();
    }, [body, index]);

    const correctAnswer = choices?.correctAnswer;
    const selectCorrect = (value: string) => {
        if (value !== correctAnswer) {
            return alert("Incorrect!");
        }
        setIsCorrect(true);
        // alert("Correct!");
        setTimeout(() => {
            setIndex((prev) => prev + 1);
            setIsCorrect(false);
        }, 1000);
    };

    return (
        <div>
            <Progress className="" value={(index / totalCards) * 100} />
            <div className="mt-16 flex items-center justify-between">
                <h2 className="text-2xl font-bold">{choices && choices.question}</h2>
                <div>
                    {index < totalCards ? (
                        <h2>
                            Question {index + 1} of {totalCards}
                        </h2>
                    ) : (
                        <h2 className="text-2xl font-bold">Quiz Complete! 🎉</h2>
                    )}
                </div>
            </div>

            <div className="mt-32 grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-10">
                {choices &&
                    choices.answers.map((answer) => (
                        <Card
                            key={answer}
                            className={`cursor-pointer select-none hover:bg-slate-100 ${
                                isCorrect && answer === correctAnswer ? "bg-green-400" : ""
                            }`}
                            onClick={() => selectCorrect(answer)}
                        >
                            <CardHeader>
                                <CardDescription>Choice {answer}</CardDescription>
                                <CardTitle>{answer}</CardTitle>
                            </CardHeader>
                        </Card>
                    ))}
            </div>
            <div className="mt-32">
                <Link href="/flashcards" className="hover:text-gray-400">
                    Return home
                </Link>
            </div>
        </div>
    );
}
