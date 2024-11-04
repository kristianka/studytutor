"use client";

import { useState } from "react";
import Chat from "@/components/chat/Chat";
import ThreadList from "@/components/chat/ThreadList";

interface ChatContainerProps {
    userId: string;
    initialThreads: Array<{ id: string; created_at: string }>;
}

export default function ChatContainer({ userId, initialThreads }: ChatContainerProps) {
    const [threads, setThreads] = useState(initialThreads);
    const [selectedThreadId, setSelectedThreadId] = useState<string | null>(null);

    const handleSelectThread = (threadId: string) => setSelectedThreadId(threadId);

    const handleNewThread = async () => {
        try {
            const response = await fetch("/api/openai", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ userId, action: "create-thread" })
            });

            if (!response.ok) {
                throw new Error("Failed to create a new thread");
            }

            const { threadId } = await response.json();
            setThreads((prevThreads) => [
                { id: threadId, created_at: new Date().toISOString() },
                ...prevThreads
            ]);
            setSelectedThreadId(threadId);
        } catch (error) {
            console.error("Error creating a new thread:", error);
        }
    };

    const handleDeleteThread = async (threadId: string) => {
        try {
            const response = await fetch("/api/openai", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ userId, action: "delete-thread", threadId })
            });

            if (!response.ok) {
                throw new Error("Failed to delete thread");
            }

            setThreads((prevThreads) => prevThreads.filter((thread) => thread.id !== threadId));
            if (selectedThreadId === threadId) {
                setSelectedThreadId(null);
            }
        } catch (error) {
            console.error("Error deleting thread:", error);
        }
    };

    return (
        <div className="flex h-full w-full max-w-6xl">
            <div className="w-1/4 border-r border-gray-300 bg-white p-4">
                <ThreadList
                    threads={threads}
                    onSelectThread={handleSelectThread}
                    onNewThread={handleNewThread}
                    onDeleteThread={handleDeleteThread}
                />
            </div>
            <div className="w-3/4 bg-white p-4">
                <Chat
                    userId={userId}
                    threadId={selectedThreadId}
                    onNewThread={handleNewThread}
                    onSelectThread={handleSelectThread}
                />
            </div>
        </div>
    );
}
