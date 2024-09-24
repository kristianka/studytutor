import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Flash cards - Study Tutor",
    description: "Flash cards for studying"
};

export default function FlashCardsLayout({
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
