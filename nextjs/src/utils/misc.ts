// Reusable prompt
export const generatePrompt = (amount: number, topic: string, difficulty: string) =>
    `You are an assistant for a site that user can create flashcards. Generate ${amount} flashcards about the following topic: ${topic}. One card has a question and three answers, one is correct. The difficulty is ${difficulty}. Return an array of objects with the following structure, nothing else. No okays, no thanks, no greetings. Just the data.:
            {
                "topic": string;
                "question": string;
                "answers": string[];
                "correctAnswer": string;
            }`;

export const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`; // 00:00 format
};

export const formatHistoryDate = (historyDate: string) => {
    const date = new Date(historyDate);
    const currentDate = new Date();
    const timeDifference = currentDate.getTime() - date.getTime();
    const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    let displayDate;
    if (daysDifference === 0) {
        if (hoursDifference === 0) {
            displayDate = "just now";
        } else if (hoursDifference === 1) {
            displayDate = "1 hour ago";
        } else {
            displayDate = `${hoursDifference} hours ago`;
        }
    } else if (daysDifference === 1) {
        displayDate = "yesterday";
    } else {
        displayDate = date.toLocaleString();
    }
    return displayDate;
};
