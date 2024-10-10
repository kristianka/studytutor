import { HistoryContent } from "@/types";

interface GetCards {
    body: { userId: string; cardId: string };
    index: number;
}

export const getCards = async ({ body, index }: GetCards) => {
    const res = await fetch("/api/cards", {
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
    const data = json.card[0];
    const parse = JSON.parse(data.content) as HistoryContent[];
    const i = index ? index : 0;
    const totalCards = parse.length;
    return { card: parse[i], totalCards };
};

export const deleteCard = async ({ body }: { body: { userId: string; cardId: string } }) => {
    const res = await fetch("/api/cards", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });

    if (!res.ok) {
        throw new Error("Failed to delete card");
    }
    return res.json();
};
