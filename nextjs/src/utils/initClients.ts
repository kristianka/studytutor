import { createServiceRoleClient } from "@/utils/supabase/server";
import { OpenAI } from "openai";

export async function initClients() {
    try {
        const supabase = createServiceRoleClient();
        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY
        });
        return { supabase, openai };
    } catch (error) {
        console.error("Error initializing clients:", error);
        throw new Error("Failed to initialize clients");
    }
}

// retrieve assistant from database
export async function getAssistant(supabase: ReturnType<typeof createServiceRoleClient>) {
    const { data, error } = await supabase
        .from("assistants")
        .select("*")
        .eq("name", "StudyHelper")
        .single();

    if (error) {
        console.error("Error fetching assistant:", error);
        throw new Error("Assistant not found");
    }

    return data;
}
