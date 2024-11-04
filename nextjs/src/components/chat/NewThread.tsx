"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewThreadButton() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleNewThread = async () => {
        setIsLoading(true);
        try {
            const response = await fetch("/api/openai", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ action: "create-thread" })
            });

            if (!response.ok) {
                throw new Error("Failed to create a new thread");
            }

            const { threadId } = await response.json();
            router.push(`/chat/${threadId}`);
        } catch (error) {
            console.error("Error creating a new thread:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Button onClick={handleNewThread} disabled={isLoading}>
            {isLoading ? "Creating..." : "New Thread"}
        </Button>
    );
}
