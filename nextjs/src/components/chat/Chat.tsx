"use client";
import { useState, useRef } from "react";
import { ChatBubble, ChatBubbleMessage } from "@/components/ui/chat/chat-bubble";
import { ChatMessageList } from "@/components/ui/chat/chat-message-list";
import { ChatInput } from "@/components/ui/chat/chat-input";

interface ChatProps {
    userId: string;
}

export default function Chat({ userId }: ChatProps) {
    const [messages, setMessages] = useState<{ sender: string; content: string }[]>([]);
    const [input, setInput] = useState("");
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = { sender: "user", content: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");

        try {
            const response = await fetch("/api/openai", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userId,
                    message: input
                })
            });

            if (!response.ok) {
                throw new Error("Failed to fetch assistant response");
            }

            const data = await response.json();
            const assistantMessage = { sender: "assistant", content: data.assistantMessage };
            setMessages((prev) => [...prev, assistantMessage]);
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    return (
        <div className="chat-container mx-auto my-auto max-w-[1200px] overflow-hidden rounded-lg border-2 border-black p-4 shadow-md sm:p-6">
            <ChatMessageList className="max-h-[600px] min-h-[600px] overflow-y-auto">
                {messages.map((msg, index) => (
                    <ChatBubble key={index} variant={msg.sender === "user" ? "sent" : "received"}>
                        <ChatBubbleMessage>{msg.content}</ChatBubbleMessage>
                    </ChatBubble>
                ))}
                <div ref={messagesEndRef} />
            </ChatMessageList>
            <ChatInput
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        void sendMessage();
                    }
                }}
                className="w-full"
            />
        </div>
    );
}
