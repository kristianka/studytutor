"use client";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

interface ChoicesProps {
    answers: { id: number; text: string }[];
    correctAnswer: string;
}

export default function Choices({ answers, correctAnswer }: ChoicesProps) {
    const [isCorrect, setIsCorrect] = useState(false);

    const selectCorrect = (value: string) => {
        console.log(value);
        if (value !== correctAnswer) {
            return alert("Incorrect!");
        }
        setIsCorrect(true);
        alert("Correct!");
    };

    return (
        <div className="mt-32 grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-10">
            {answers.map((answer) => (
                <Card
                    key={answer.id}
                    className={`cursor-pointer select-none hover:bg-slate-100 ${isCorrect ? "bg-green-400" : ""}`}
                    onClick={() => selectCorrect(answer.text)}
                >
                    <CardHeader>
                        <CardDescription>Choice {answer.id}</CardDescription>
                        <CardTitle>{answer.text}</CardTitle>
                    </CardHeader>
                </Card>
            ))}
        </div>
    );
}
