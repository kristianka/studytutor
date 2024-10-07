"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Progress } from "@/components/ui/progress";

export type ProgressItem = {
    id: number;
    topic: string;
    field: string;
    progress: number;
};

export const columns: ColumnDef<ProgressItem>[] = [
    {
        accessorKey: "topic",
        header: "Topic"
    },
    {
        accessorKey: "field",
        header: "Field"
    },
    {
        accessorKey: "progress",
        header: "Progress",
        cell: ({ row }) => (
            <div className="flex items-center">
                <Progress
                    value={row.original.progress}
                    max={100}
                    className="mr-2 w-24 rounded bg-gray-200"
                />
                <span>{row.original.progress}%</span>
            </div>
        )
    }
];
