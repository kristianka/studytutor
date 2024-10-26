"use client";
import { motion } from "framer-motion";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { getCards } from "@/lib/card";
import { HistoryContent } from "@/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import Timer from "./Timer";
import Results from "./Results";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { sendResults } from "@/lib/result";
import { MoveLeft } from "lucide-react";

interface ChoicesProps {
    body: { userId: string; cardId: string };
}

export default function Choices({ body }: ChoicesProps) {
    const [selectedCorrectAnswer, setSelectedCorrectAnswer] = useState<string | null>(null);
    const [selectedIncorrectAnswer, setSelectedIncorrectAnswer] = useState<string | null>(null);

    const [choices, setChoices] = useState<HistoryContent | null>(null);
    const [totalCards, setTotalCards] = useState(0);
    const [index, setIndex] = useState(0);
    const [seconds, setSeconds] = useState<number>(0);
    const [isActive, setIsActive] = useState<boolean>(false);
    const [hasLoaded, setHasLoaded] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getCards({ body, index });
            const { card, totalCards } = data;
            setChoices(card);
            setTotalCards(totalCards);
            setHasLoaded(true);
            if (index >= totalCards) {
                return setIsActive(false);
            }
            setIsActive(true);
        };
        void fetchData();
    }, [body, index, totalCards]);

    const postResults = async () => {
        const newBody = {
            userId: body.userId,
            cardId: body.cardId,
            stats: seconds.toString()
        };
        await sendResults({ body: newBody });
    };

    const correctAnswer = choices?.correctAnswer;
    const selectCorrect = (value: string) => {
        if (value === correctAnswer) {
            setSelectedCorrectAnswer(value);
            setTimeout(() => {
                setSelectedCorrectAnswer(null);
                setIndex((prev) => prev + 1);
            }, 2000);
        } else {
            setSelectedIncorrectAnswer(value);
            setTimeout(() => {
                setSelectedIncorrectAnswer(null);
            }, 2000);
        }
    };

    return (
        <div className="mx-5">
            <Progress className="" value={(index / totalCards) * 100} />
            <div className="mt-16 items-center justify-between sm:flex sm:space-x-3">
                <h2 className="text-lg font-bold sm:text-2xl">{choices && choices.question}</h2>
                <div>
                    {index < totalCards && (
                        <div className="mt-3 text-right sm:mt-0">
                            <h2>
                                {index + 1} / {totalCards}
                            </h2>
                            <div>
                                <Timer
                                    seconds={seconds}
                                    setSeconds={setSeconds}
                                    isActive={isActive}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {isActive ? (
                <div className="mt-16 grid grid-cols-1 gap-5 sm:mt-32 sm:grid-cols-3 sm:gap-10">
                    {choices &&
                        choices.answers.map((answer, index) => (
                            <motion.div
                                key={answer}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                transition={{
                                    scale: {
                                        type: "spring",
                                        stiffness: 400,
                                        damping: 17
                                    },
                                    x: {
                                        duration: 0.5,
                                        ease: "easeInOut",
                                        times: [0, 10]
                                    }
                                }}
                                // make the card shake if the answer is incorrect, zoom if correct
                                animate={
                                    selectedCorrectAnswer === answer
                                        ? { scale: 1.1 }
                                        : selectedIncorrectAnswer === answer
                                          ? {
                                                x: [0, -5, 5, -5, 5, -5, 0] // defines the shaking motion,
                                            }
                                          : {}
                                }
                            >
                                <Card
                                    className={`cursor-pointer select-none hover:bg-slate-50 ${selectedCorrectAnswer === answer ? "bg-green-400" : ""} ${selectedIncorrectAnswer === answer ? "bg-red-400" : ""}`}
                                    onClick={() => selectCorrect(answer)}
                                >
                                    <CardHeader>
                                        <CardDescription>Choice {index + 1}</CardDescription>
                                        <CardTitle className="text-md sm:text-xl">
                                            {answer}
                                        </CardTitle>
                                    </CardHeader>
                                </Card>
                            </motion.div>
                        ))}
                </div>
            ) : !hasLoaded ? (
                <div className="flex flex-col">
                    <p className="text-center text-lg font-bold">
                        Getting your cards ready, please wait...
                    </p>
                    <LoadingSpinner className="mx-auto mt-5" size={32} />
                </div>
            ) : (
                <Results postResults={postResults} seconds={seconds} />
            )}
            <div className="mt-16 sm:mt-64">
                <Link href="/flashcards" className="inline-flex text-gray-700 hover:text-gray-500">
                    <MoveLeft className="mr-1" />
                    Return home
                </Link>
            </div>
        </div>
    );
}
