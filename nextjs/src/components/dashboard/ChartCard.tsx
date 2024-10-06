import * as React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { ProgressChart } from "./ProgressChart";

export default async function ProgressCard() {
    return (
        <Card className="w-auto">
            <CardHeader>
                <CardTitle>Completed Flashcards</CardTitle>
            </CardHeader>
            <CardContent>
                <ProgressChart />
            </CardContent>
        </Card>
    );
}
