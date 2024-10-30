"use client";

import { useState } from "react";
import ConfirmationDialog from "@/components/chat/DeleteThread";

interface ThreadListProps {
    threads: Array<{ id: string; created_at: string }>;
    onSelectThread: (id: string) => void;
    onNewThread: () => void;
    onDeleteThread: (id: string) => void;
}

export default function ThreadList({
    threads,
    onSelectThread,
    onNewThread,
    onDeleteThread
}: ThreadListProps) {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [threadToDelete, setThreadToDelete] = useState<string | null>(null);

    const handleDeleteClick = (threadId: string) => {
        setThreadToDelete(threadId);
        setShowDeleteDialog(true);
    };

    const handleConfirmDelete = () => {
        if (threadToDelete) {
            onDeleteThread(threadToDelete);
        }
        setShowDeleteDialog(false);
        setThreadToDelete(null);
    };

    const handleCancelDelete = () => {
        setShowDeleteDialog(false);
        setThreadToDelete(null);
    };

    return (
        <div className="rounded-lg border-2 border-black p-2">
            <button
                onClick={onNewThread}
                className="mb-4 w-full rounded bg-blue-500 p-2 text-white"
            >
                New Thread
            </button>
            <ul className="space-y-2 bg-gray-300">
                {threads.map((thread) => (
                    <li
                        key={thread.id}
                        className="flex cursor-pointer items-center justify-between rounded p-2 hover:bg-gray-400"
                    >
                        <span onClick={() => onSelectThread(thread.id)}>Thread {thread.id}</span>
                        <button
                            onClick={() => handleDeleteClick(thread.id)}
                            className="ml-4 rounded bg-red-400 p-2 text-white"
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
            <ConfirmationDialog
                open={showDeleteDialog}
                onClose={handleCancelDelete}
                onConfirm={handleConfirmDelete}
                title="Delete Thread"
                description="Are you sure you want to delete this thread? This action cannot be undone."
            />
        </div>
    );
}
