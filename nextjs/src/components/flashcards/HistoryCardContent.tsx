"use client";
import { Button } from "@/components/ui/button";
import { CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { User } from "@/types";
import { History, HistoryContent } from "@/types";
import { useRouter } from "next/navigation";
import { formatHistoryDate } from "@/utils/misc";
import Link from "next/link";
import DeleteDropdown from "./DeleteDropdown";
import DeleteCard from "./DeleteCard";
import { useState } from "react";

export function HistoryCardContent({ history, user }: { history: History; user: User }) {
    const [showDelete, setShowDelete] = useState(false);
    const router = useRouter();

    // navigate to the flashcard session
    const open = () => {
        router.push(`/flashcards/play/?session=${history.id}`);
    };

    try {
        // parse content since it's returned as a string
        const parsed: HistoryContent[] = JSON.parse(history.content);
        return (
            <div>
                <div className="flex items-center justify-between">
                    <div className="flex flex-col space-y-1.5">
                        <Link
                            className="hover:cursor-pointer hover:text-gray-600"
                            href={`/flashcards/play/?session=${history.id}`}
                        >
                            <Label className="hover:cursor-pointer">{parsed[0].topic}</Label>
                            <CardDescription>
                                Studied {formatHistoryDate(history.created_at)}
                            </CardDescription>
                        </Link>
                    </div>
                    <div className="flex">
                        <Button onClick={open} variant="ghost">
                            Study
                        </Button>
                        <DeleteDropdown setShowDelete={setShowDelete} />
                        <DeleteCard
                            setShowDelete={setShowDelete}
                            showDelete={showDelete}
                            userId={user.id}
                            cardId={history.id}
                        />
                    </div>
                </div>
            </div>
        );
    } catch (_err) {
        // fallback if content is not parsable
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
