import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ChatCard() {
    return (
        <Card className="w-auto">
            <CardHeader>
                <CardTitle>Study Chat</CardTitle>
                <CardDescription>
                    Ask anything about your studies and get instant, accurate answers from the AI.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Link href="/chat">
                    <Button className="btn btn-primary">Go to Study Chat</Button>
                </Link>
            </CardContent>
        </Card>
    );
}
