import { UserMetadata } from "@supabase/supabase-js";

export interface User extends UserMetadata {
    user_metadata: {
        first_name: string;
        last_name: string;
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
