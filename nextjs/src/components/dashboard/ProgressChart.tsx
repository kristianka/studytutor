"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { History } from "@/types";

const chartConfig: ChartConfig = {
    flashcard: {
        label: "Flashcards",
        color: "hsl(var(--chart-1))"
    }
};

interface ProgressChartProps {
    data: History[];
}

export function ProgressChart({ data }: ProgressChartProps) {
    // Define days of the week starting from Monday
    const daysOfWeek = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
    ];

    // Initialize day counts and calculate counts for each day based on `data`
    const dayCounts = daysOfWeek.reduce(
        (acc, day) => ({ ...acc, [day]: 0 }),
        {} as Record<string, number>
    );
    data.forEach(({ created_at }) => {
        const dayName = daysOfWeek[(new Date(created_at).getUTCDay() + 6) % 7]; // Shift Sunday (0) to the end
        dayCounts[dayName]++;
    });

    // Convert dayCounts to array format for the chart
    const chartData = Object.entries(dayCounts).map(([day, flashcard]) => ({ day, flashcard }));

    return (
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
            <BarChart data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey="day"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value.slice(0, 3)}
                />
                <YAxis allowDecimals={false} />
                <Bar dataKey="flashcard" fill={chartConfig.flashcard.color} radius={4} />
            </BarChart>
        </ChartContainer>
    );
}
