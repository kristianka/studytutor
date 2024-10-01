import * as React from "react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ProgressTable } from "./progress_table/ProgressTable";
import { ProgressChart } from "./ProgressChart";
import { getData } from "./progress_table/Data";
import { columns } from "./progress_table/Columns";
import Link from "next/link";
import { Button } from "../ui/button";

export default async function ProgressCard() {
    const data = await getData();

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
                        <ProgressTable columns={columns} data={data} />
                    </div>
                    <div className="w-full p-2 md:w-1/2">
                        <ProgressChart />
                    </div>
                    <div className="mt-6 flex justify-end">
                        <Link href="/chat">
                            <Button className="btn btn-primary">New Flashcard</Button>
                        </Link>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
