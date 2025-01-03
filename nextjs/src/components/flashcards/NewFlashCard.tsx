"use client";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import SettingsCard from "./SettingsCard";
import { CardsDifficultyLabels, User } from "@/types";
import { AlertDestructive } from "../login/AlertDestructive";
import { generatePrompt } from "@/utils/misc";
import { createTopic } from "@/lib/history";
import { useRouter } from "next/navigation";
import { LoadingSpinner } from "../LoadingSpinner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { useProfile } from "@/lib/profile";

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
    const { data: profile } = useProfile();

    const router = useRouter();

    const [topic, setTopic] = useState("");
    const [amount, setAmount] = useState(3);
    const [difficulty, setDifficulty] = useState<"easy" | "normal" | "hard">("normal");
    const [status, setStatus] = useState({ data: null, error: null, loading: false } as Status);

    // Set default values from profile
    useEffect(() => {
        if (profile) {
            setAmount(profile.cards_default_amount || 1);
            setDifficulty(
                profile.cards_default_difficulty
                    ? CardsDifficultyLabels[profile.cards_default_difficulty]
                    : "easy"
            );
        }
    }, [profile]);

    // Fetch data from the API
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
        const body = { userId: user.id, message: prompt };

        try {
            const data = await createTopic(body);
            setStatus({ data: data.parsed, error: null, loading: false });
            router.push(`/flashcards/play/?session=${data.id}`);
        } catch (err) {
            console.error(err);
            const error = err instanceof Error ? err.message : "Failed to fetch data";
            setStatus({ data: null, error: error, loading: false });
        }
    };

    // Reset the form
    const resetForm = () => {
        setTopic("");
        setAmount(0);
        setDifficulty("easy");
        setStatus({ data: null, error: null, loading: false });
    };

    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>New card</CardTitle>
                    <CardDescription>Create a new flashcard set</CardDescription>
                </CardHeader>
                <CardContent>
                    {status.error && (
                        <div className="mb-5">
                            <AlertDestructive error={status.error} />
                        </div>
                    )}
                    <Label htmlFor="topic">Topic</Label>
                    <Input
                        value={topic}
                        onChange={(event) => setTopic(event.target.value)}
                        type="text"
                        id="topic"
                        name="flashcardsTopic"
                        placeholder="React hooks"
                    />
                </CardContent>
            </Card>
            <div className="my-5">
                <SettingsCard
                    amount={amount}
                    setAmount={setAmount}
                    difficulty={difficulty}
                    setDifficulty={setDifficulty}
                />
            </div>
            <p className="mx-3 block text-sm text-muted-foreground md:hidden">
                Tip: You can change the default options in your profile!
            </p>
            <div className="flex items-baseline justify-end gap-x-5">
                <p className="mx-3 hidden text-sm text-muted-foreground md:block">
                    Tip: You can change the default options in your profile!
                </p>
                <Button onClick={resetForm} className="items-end">
                    Reset
                </Button>
                <Button onClick={fetchData} className="items-end">
                    {status.loading ? <LoadingSpinner /> : "Start"}
                </Button>
            </div>
        </div>
    );
}
