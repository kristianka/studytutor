"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { User } from "@/types";
import { getHistory } from "@/lib/history";
import { History } from "@/types";
import { HistoryCardContent } from "./HistoryCardContent";

export default function HistoryCard({ user }: { user: User }) {
    const [history, setHistory] = useState<History[] | null>(null);
    useEffect(() => {
        const fetchData = async () => {
            const body = { userId: user.id };
            const data: History[] = await getHistory(body);
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
            <CardContent className="space-y-2">
                {cleanedHistory &&
                    cleanedHistory.map((h) => (
                        <HistoryCardContent key={h.content} history={h} user={user} />
                    ))}
            </CardContent>
        </Card>
    );
}
