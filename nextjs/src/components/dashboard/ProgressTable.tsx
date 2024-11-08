"use client";

import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { History } from "@/types";

interface ProgressTableProps {
    data: History[];
}

export default function ProgressTable({ data }: ProgressTableProps) {
    if (!data) {
        return null;
    }

    const parsedHistory = data.map((h) => JSON.parse(h.content));
    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Topic</TableHead>
                        <TableHead>Created at</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.length > 0 ? (
                        data.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>{parsedHistory[index][0].topic}</TableCell>
                                <TableCell>{new Date(item.created_at).toDateString()}</TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={4} className="h-24 text-center">
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
