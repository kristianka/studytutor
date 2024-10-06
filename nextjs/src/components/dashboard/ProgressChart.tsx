"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";

const dataByDay = [
    { day: "Monday", flashcard: 1 },
    { day: "Tuesday", flashcard: 3 },
    { day: "Wednesday", flashcard: 5 },
    { day: "Thursday", flashcard: 6 },
    { day: "Friday", flashcard: 1 },
    { day: "Saturday", flashcard: 0 },
    { day: "Sunday", flashcard: 0 }
];

{
    /*

const dataByWeek = [
    { week: "Week 1", flashcard: 16 },
    { week: "Week 2", flashcard: 25 },
    { week: "Week 3", flashcard: 3 },
    { week: "Week 4", flashcard: 5 }
];

const dataByMonth = [
    { month: "January", flashcard: 33 },
    { month: "February", flashcard: 36 },
    { month: "March", flashcard: 50 },
    { month: "April", flashcard: 48 },
    { month: "May", flashcard: 13 },
    { month: "June", flashcard: 0 },
    { month: "July", flashcard: 0 },
    { month: "August", flashcard: 0 },
    { month: "September", flashcard: 12 },
    { month: "October", flashcard: 21 },
    { month: "November", flashcard: 28 },
    { month: "December", flashcard: 39 }
];
*/
}

const chartConfig = {
    flashcard: {
        label: "Flashcards",
        color: "hsl(var(--chart-1))"
    }
} satisfies ChartConfig;

export function ProgressChart() {
    return (
        <div>
            <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                <BarChart accessibilityLayer data={dataByDay}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                        dataKey="day"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                        tickFormatter={(value) => value.slice(0, 3)}
                    />
                    <YAxis dataKey="flashcard" />
                    <Bar dataKey="flashcard" fill="var(--color-flashcard)" radius={4} />
                </BarChart>
            </ChartContainer>
        </div>
    );
}
