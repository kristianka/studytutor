import { UserMetadata } from "@supabase/supabase-js";

export interface User extends UserMetadata {
    user_metadata: {
        first_name: string;
        last_name: string;
        email: string;
    };
}

export interface History {
    id: string;
    content: string;
    role: string;
}

export interface HistoryContent {
    id: string;
    topic: string;
    answers: string[];
    correctAnswer: string;
    question: string;
}
