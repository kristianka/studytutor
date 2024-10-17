import useSWR, { mutate } from "swr";
import { History } from "@/types";

interface CreateTopicBody {
    userId: string;
    message: string;
}

interface GetHistoryBody {
    userId: string;
}

// fetcher function for use with SWR
const fetcher = async (url: string, body: CreateTopicBody | GetHistoryBody) => {
    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });

    const json = await res.json();

    if (!res.ok) {
        throw new Error(json.error || "Failed to fetch data");
    }

    return json;
};

// SWR hook for getting history
export const useHistory = () => {
    const { data, error, isLoading } = useSWR(`/api/history/`, fetcher, {});

    return {
        data: data?.previousMessages as History[],
        isLoading,
        isError: error
    };
};

export const createTopic = async (body: CreateTopicBody) => {
    const res = await fetch("/api/flashcards", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });

    const json = await res.json();

    if (!res.ok) {
        throw new Error(json.error || "Failed to create topic");
    }

    const parsed = JSON.parse(json.assistantMessage);
    const id = json.cardId;

    await mutate(["/api/history", { userId: body.userId }]);

    return { parsed, id };
};
