"use client";
import { useState, useRef, useEffect } from "react";
import { ChatBubble, ChatBubbleMessage } from "@/components/ui/chat/chat-bubble";
import { ChatMessageList } from "@/components/ui/chat/chat-message-list";
import { ChatInput } from "@/components/ui/chat/chat-input";

interface Message {
    sender: string;
    message_content: string;
}

interface ChatProps {
    userId: string;
    threadId: string | null;
    onNewThread: () => void;
    onSelectThread: (id: string) => void;
}

export default function Chat({
    userId,
    threadId,
    onNewThread: _onNewThread,
    onSelectThread: _onSelectThread
}: ChatProps) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const messageListRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const fetchChatHistory = async () => {
            if (!threadId) return;

            try {
                const response = await fetch("/api/openai", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        userId,
                        threadId,
                        action: "get-history"
                    })
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch chat history");
                }

                const data = await response.json();
                const formattedMessages = data.map((msg: { role: string; content: string }) => ({
                    sender: msg.role,
                    message_content: msg.content
                }));

                setMessages(formattedMessages);
            } catch (error) {
                console.error("Error fetching chat history:", error);
            }
        };

        void fetchChatHistory();
    }, [userId, threadId]);

    useEffect(() => {
        if (messageListRef.current) {
            messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
        }
    }, [messages]);

    const sendMessage = async () => {
        if (!input.trim() || !threadId) return;

        const userMessage = { sender: "user", message_content: input };
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
                    threadId,
                    message: input
                })
            });

            if (!response.ok) {
                throw new Error("Failed to fetch assistant response");
            }

            const data = await response.json();

            const assistantMessage = {
                sender: "assistant",
                message_content: data.assistantMessage
            };
            setMessages((prev) => [...prev, assistantMessage]);
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    return (
        <div className="chat-container mx-auto my-auto max-w-[1200px] overflow-hidden rounded-lg border-2 border-gray-300 bg-white p-4 shadow-md sm:p-6">
            <ChatMessageList
                ref={messageListRef}
                className="max-h-[600px] min-h-[600px] overflow-y-auto"
            >
                {messages.map((msg, index) => (
                    <ChatBubble key={index} variant={msg.sender === "user" ? "sent" : "received"}>
                        <ChatBubbleMessage>{msg.message_content}</ChatBubbleMessage>
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
                onSend={sendMessage}
                className="w-full"
            />
        </div>
    );
}
