import { Metadata } from "next";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
    title: "Chat - Study Tutor"
};

export default function ChatLayout({ children }: { children: React.ReactNode }) {
    return <Container className="h-[100vh] max-w-6xl rounded-lg p-2">{children}</Container>;
}
