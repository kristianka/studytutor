"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "@/types";
import { useHistory } from "@/lib/history";
import { HistoryCardContent } from "./HistoryCardContent";
import { HistorySkeleton } from "./HistorySkeleton";

export default function HistoryCard({ user }: { user: User }) {
    const { data: history, isLoading } = useHistory();
    const cleanedHistory = history ? history.filter((a) => a.role === "assistant") : [];
    const skeletonArray = Array(3).fill(null);

    return (
        <Card className="w-auto">
            <CardHeader>
                <CardTitle>History</CardTitle>
            </CardHeader>
            {/* remember to sort by newest first */}
            <CardContent className="space-y-2">
                {isLoading && skeletonArray.map((_, index) => <HistorySkeleton key={index} />)}
                {cleanedHistory &&
                    cleanedHistory.map((h) => (
                        <HistoryCardContent key={h.content} history={h} user={user} />
                    ))}
            </CardContent>
        </Card>
    );
}
