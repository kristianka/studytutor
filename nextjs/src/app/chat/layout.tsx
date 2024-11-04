import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Chat - Study Tutor"
};

export default function ChatLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
            <div className="w-full max-w-6xl rounded-lg bg-white p-4 shadow-lg">{children}</div>
        </div>
    );
}
