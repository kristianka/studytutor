"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import SettingsCard from "./SettingsCard";
import { User } from "@/types";
import { AlertDestructive } from "../login/AlertDestructive";
import { generatePrompt } from "@/utils/misc";
import { createTopic } from "@/lib/history";

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

        const prompt = generatePrompt(amount, topic, difficulty);
        console.log(prompt);
        const body = { userId: user.id, message: prompt };

        try {
            const data = await createTopic(body);
            setStatus({ data: data, error: null, loading: false });
        } catch (err) {
            console.log(err);
            const error = err instanceof Error ? err.message : "Failed to fetch data";
            setStatus({ data: null, error: error, loading: false });
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
