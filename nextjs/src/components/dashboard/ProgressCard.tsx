"use client";
import * as React from "react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ProgressChart } from "./ProgressChart";
import Link from "next/link";
import { Button } from "../ui/button";
import { useHistory } from "@/lib/history";
import ProgressTable from "./ProgressTable";

export default function ProgressCard() {
    const { data: history } = useHistory();
    const cleanedHistory = history ? history.filter((a) => a.role === "assistant") : [];
    return (
        <Card className="w-auto">
            <CardHeader>
                <CardTitle>Flashcards</CardTitle>
                <CardDescription>
                    Create and study flash cards on any topic. The AI generates questions to help
                    reinforce your learning.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex w-full flex-wrap">
                    <div className="w-full p-2 md:w-1/2">
                        <ProgressTable data={cleanedHistory} />
                    </div>
                    <div className="w-full p-2 md:w-1/2">
                        <ProgressChart data={cleanedHistory} />
                    </div>
                    <div className="mt-6 flex justify-end">
                        <Link href="/flashcards">
                            <Button className="btn btn-primary">New Flashcard</Button>
                        </Link>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
