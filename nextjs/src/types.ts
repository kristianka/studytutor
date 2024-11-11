import { UserMetadata } from "@supabase/supabase-js";

export interface User extends UserMetadata {
    user_metadata: {
        first_name: string;
        last_name: string;
        email: string;
        cards: number;
    };
}

export interface History {
    id: string;
    content: string;
    role: string;
    created_at: string;
}

export interface HistoryContent {
    id: string;
    topic: string;
    answers: string[];
    correctAnswer: string;
    question: string;
}

export const CardsDifficulty = { easy: 1, normal: 2, hard: 3 } as const;
export type CardsDifficultyType = (typeof CardsDifficulty)[keyof typeof CardsDifficulty];
export type CardsDifficultyKey = keyof typeof CardsDifficulty;
export const CardsDifficultyLabels = Object.keys(CardsDifficulty).reduce(
    (acc, key) => {
        const value = CardsDifficulty[key as keyof typeof CardsDifficulty];
        acc[value] = key as keyof typeof CardsDifficulty;
        return acc;
    },
    {} as Record<number, keyof typeof CardsDifficulty>
);
