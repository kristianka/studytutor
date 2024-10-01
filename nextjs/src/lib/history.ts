import { History } from "@/types";

interface CreateTopicBody {
    userId: string;
    message: string;
}

export const createTopic = async (body: CreateTopicBody) => {
    const res = await fetch("/api/openai", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });

    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }

    const json = await res.json();
    const parsed = JSON.parse(json.assistantMessage);
    const id = json.cardId;
    return { parsed, id };
};

interface GetHistoryBody {
    userId: string;
}

export const getHistory = async (body: GetHistoryBody) => {
    const res = await fetch("/api/history", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });

    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }
    const json = await res.json();
    const data: History[] = json.previousMessages;
    return data;
};
