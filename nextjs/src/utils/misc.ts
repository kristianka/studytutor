// Reusable prompt
export const generatePrompt = (amount: number, topic: string, difficulty: string) =>
    `You are an assistant for a site that user can create flashcards. Generate ${amount} flashcards about the following topic: ${topic}. One card has a question and three answers, one is correct. The difficulty is ${difficulty}. Return an array of objects with the following structure, nothing else. No okays, no thanks, no greetings. Just the data.:
            {
                "topic": string;
                "question": string;
                "answers": string[];
                "correctAnswer": string;
            }`;
