import { Metadata } from "next";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
    title: "Chat - Study Tutor"
};

export default function ChatLayout({ children }: { children: React.ReactNode }) {
    return (
        <Container className="h-200px flex max-w-6xl flex-col rounded-lg p-2 sm:p-4">
            {children}
        </Container>
    );
}
