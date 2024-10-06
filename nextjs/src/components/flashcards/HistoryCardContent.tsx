"use client";
import { Button } from "@/components/ui/button";
import { CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { User } from "@/types";
import { History, HistoryContent } from "@/types";
import { useRouter } from "next/navigation";
import Alert from "./DeleteCard";
import { formatHistoryDate } from "@/utils/misc";

export function HistoryCardContent({ history, user }: { history: History; user: User }) {
    const router = useRouter();
    const open = () => {
        router.push(`/flashcards/play/?session=${history.id}`);
    };

    try {
        const parsed: HistoryContent[] = JSON.parse(history.content);
        return (
            <div>
                <div className="flex items-center justify-between">
                    <div className="flex flex-col space-y-1.5">
                        <Label>{parsed[0].topic}</Label>
                        <CardDescription>
                            Studied {formatHistoryDate(history.created_at)}
                        </CardDescription>
                    </div>
                    <div className="">
                        <div>
                            <Button onClick={open} variant="default">
                                Study
                            </Button>
                        </div>
                        <div className="text-center">
                            <Alert userId={user.id} cardId={history.id} />
                        </div>
                    </div>
                </div>
            </div>
        );
    } catch (_err) {
        return (
            <div className="flex items-center justify-between">
                <div className="flex flex-col space-y-1.5">
                    <Label>Unknown topic</Label>
                    <CardDescription>Studied 1 hour ago</CardDescription>
                </div>
                <Button disabled variant="default">
                    Study
                </Button>
            </div>
        );
    }
}
