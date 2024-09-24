"use client";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ChoicesProps {
    answers: { id: number; text: string }[];
    correctAnswer: string;
}

export default function Choises({ answers, correctAnswer }: ChoicesProps) {
    const selectCorrect = (value: string) => {
        console.log(value);
        if (value !== correctAnswer) {
            return alert("Incorrect!");
        }
        alert("Correct!");
    };

    return (
        <div className="mt-32 grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-10">
            {answers.map((answer) => (
                <Card
                    key={answer.id}
                    className="cursor-pointer select-none hover:bg-slate-100"
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
