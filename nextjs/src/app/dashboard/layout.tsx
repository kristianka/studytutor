import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Dashboard - Study Tutor",
    description: "Track your progress progress"
};

export default function DashboardCardsLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="min-h-96">
            <div className="mx-auto mt-10 max-w-7xl">{children}</div>
        </div>
    );
}
