import { ProgressItem } from "./Columns";

export async function getData(): Promise<ProgressItem[]> {
    // Fetch data from API later
    return [
        {
            id: 1,
            topic: "React hooks",
            field: "Frontend",
            progress: 100
        },
        {
            id: 2,
            topic: "Next.js API routes",
            field: "Backend",
            progress: 75
        },
        {
            id: 3,
            topic: "Docker",
            field: "DevOps",
            progress: 35
        }
    ];
}
