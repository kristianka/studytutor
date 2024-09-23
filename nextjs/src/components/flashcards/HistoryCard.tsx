"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { User } from "@/types";

interface History {
    content: string;
    role: string;
}

interface HistoryContent {
    topic: string;
    answers: string[];
    correctAnswer: string;
    question: string;
}

export function HistoryCardContent({ history }: { history: History }) {
    try {
        const parsed: HistoryContent[] = JSON.parse(history.content);
        console.log(parsed);
        return (
            <div className="flex items-center justify-between">
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">{parsed[0].topic}</Label>
                    <CardDescription>Studied 1 hour ago</CardDescription>
                </div>
                <Button variant="default">Study</Button>
            </div>
        );
    } catch (_error) {
        // console.error(error);
        return null;
    }
}

export default function HistoryCard({ user }: { user: User }) {
    const [history, setHistory] = useState<History[] | null>(null);
    useEffect(() => {
        const fetchData = async () => {
            const body = { userId: user.id };
            const res = await fetch("/api/history", {
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
            const data: History[] = json.previousMessages;
            setHistory(data);
        };
        void fetchData();
    }, [user]);

    const cleanedHistory = history ? history.filter((a) => a.role === "assistant") : [];

    return (
        <Card className="w-auto">
            <CardHeader>
                <CardTitle>History</CardTitle>
            </CardHeader>
            {/* remember to sort by newest first */}
            <CardContent className="space-y-6">
                {cleanedHistory &&
                    cleanedHistory.map((h) => <HistoryCardContent key={h.content} history={h} />)}
            </CardContent>
        </Card>
    );
}
