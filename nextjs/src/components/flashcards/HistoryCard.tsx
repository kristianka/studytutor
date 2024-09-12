import * as React from "react";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function HistoryCard() {
    return (
        <Card className="w-auto">
            <CardHeader>
                <CardTitle>History</CardTitle>
            </CardHeader>
            {/* remember to sort by newest first */}
            <CardContent className="space-y-6">
                <div className="flex justify-between items-center">
                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="name">React hooks</Label>
                        <CardDescription>Studied 1 hour ago</CardDescription>
                    </div>
                    <Button variant="default">Study</Button>
                </div>
                <div className="flex justify-between items-center">
                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="name">TailwindCSS classnames</Label>
                        <CardDescription>Studied yesterday</CardDescription>
                    </div>
                    <Button variant="default">Study</Button>
                </div>

                <div className="flex justify-between items-center">
                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="name">TypeScript differences</Label>
                        <CardDescription>Studied 2 days ago</CardDescription>
                    </div>
                    <Button variant="default">Study</Button>
                </div>
                <div className="flex justify-between items-center">
                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="name">React 19 features</Label>
                        <CardDescription>Studied 6 days ago</CardDescription>
                    </div>
                    <Button variant="default">Study</Button>
                </div>
                <div className="flex justify-between items-center">
                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="name">Angular basics</Label>
                        <CardDescription>Studied last week</CardDescription>
                    </div>
                    <Button variant="default">Study</Button>
                </div>
            </CardContent>
        </Card>
    );
}
