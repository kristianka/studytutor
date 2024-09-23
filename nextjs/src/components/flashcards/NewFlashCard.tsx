"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import SettingsCard from "./SettingsCard";
import { User } from "@/types";
import { AlertDestructive } from "../login/AlertDestructive";

interface Card {
    topic: string;
    question: string;
    answers: string[];
    correctAnswer: string;
}

type Status = {
    data: Card[] | null;
    error: string | null;
    loading: boolean;
};

export default function NewFlashCard({ user }: { user: User }) {
    const [topic, setTopic] = useState("");
    const [amount, setAmount] = useState(0);
    const [difficulty, setDifficulty] = useState("easy");
    const [status, setStatus] = useState({ data: null, error: null, loading: false } as Status);

    // Reusable prompt
    const generatePrompt = (amount: number, topic: string) =>
        `You are an assistant for a site that user can create flashcards. Generate ${amount} flashcards about the following topic: ${topic}. One card has a question and three answers, one is correct. The difficulty is ${difficulty}. Return an array of objects with the following structure:
            {
                topic: string;
                question: string;
                answers: string[];
                correctAnswer: string;
            }`;

    const fetchData = async () => {
        if (!topic) {
            setStatus({ ...status, error: "Please enter a topic" });
            return;
        }
        if (!amount) {
            setStatus({ ...status, error: "Please enter a number of flashcards" });
            return;
        }
        if (amount < 1 || amount > 10) {
            setStatus({ ...status, error: "Please enter a number greater than 0, less than 10" });
            return;
        }
        if (!difficulty) {
            setStatus({ ...status, error: "Please select a difficulty" });
            return;
        }
        setStatus({ ...status, loading: true, error: null });

        const prompt = generatePrompt(amount, topic);
        const body = { userId: user.id, message: prompt };

        try {
            const res = await fetch("/api/openai", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            });

            if (!res.ok) {
                throw new Error("Failed to fetch data");
            }

            const json = await res.json();
            const parsed = JSON.parse(json.assistantMessage);
            console.log(parsed);

            setStatus({ data: parsed, error: null, loading: false });
        } catch (err) {
            console.log(err);
            setStatus({ data: null, error: err.message, loading: false });
        }
    };

    const resetForm = () => {
        setTopic("");
        setAmount(0);
        setDifficulty("easy");
        setStatus({ data: null, error: null, loading: false });
    };

    return (
        <div>
            {status.error && (
                <div className="mb-5">
                    <AlertDestructive error={status.error} />
                </div>
            )}
            <Label htmlFor="topic">Please enter a topic</Label>
            <Input
                value={topic}
                onChange={(event) => setTopic(event.target.value)}
                type="text"
                id="topic"
                placeholder="React hooks"
            />
            <div className="my-5">
                <SettingsCard
                    user={user}
                    amount={amount}
                    setAmount={setAmount}
                    difficulty={difficulty}
                    setDifficulty={setDifficulty}
                />
            </div>
            <p className="mx-3 block text-sm text-muted-foreground md:hidden">
                Tip: Lorem ipsum dolor sit amet consectetur adipisicing numquam molestiae sequi.
            </p>
            <div className="flex justify-end gap-x-5">
                <p className="mx-3 hidden text-sm text-muted-foreground md:block">
                    Tip: Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem numquam
                    molestiae sequi.
                </p>
                <Button onClick={resetForm} className="items-end">
                    Reset
                </Button>
                <Button onClick={fetchData} className="items-end">
                    {status.loading ? "Loading..." : "Start"}
                </Button>
            </div>
        </div>
    );
}
