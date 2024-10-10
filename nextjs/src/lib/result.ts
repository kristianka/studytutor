interface GetCards {
    body: { userId: string; cardId: string; stats: string };
}

export const getResults = async () => {
    const res = await fetch(`/api/results`);
    if (!res.ok) {
        throw new Error("Failed to fetch results");
    }
    const json = await res.json();
    return json;
};

export const sendResults = async ({ body }: GetCards) => {
    const res = await fetch("/api/results", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });

    if (!res.ok) {
        throw new Error("Failed to post results");
    }
    const json = await res.json();
    return json;
};
