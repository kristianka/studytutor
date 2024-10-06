"use server";
import { createServiceRoleClient } from "@/utils/supabase/server";
import { OpenAI } from "openai";
import { NextResponse } from "next/server";

async function initClients() {
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

// retrieve thread history
async function getThreadHistory(
    supabase: ReturnType<typeof createServiceRoleClient>,
    cardId: string
) {
    const { data, error } = await supabase
        .from("messages")
        .select("*")
        .eq("id", cardId)
        .order("created_at", { ascending: true });

    if (error) {
        console.error("Error fetching thread history:", error);
        throw new Error("Failed to retrieve thread history");
    }

    return data.map((message) => ({
        role: message.sender,
        content: message.message_content
    }));
}

// delete thread history
async function deleteThreadHistory(
    supabase: ReturnType<typeof createServiceRoleClient>,
    cardId: string
) {
    const { data, error } = await supabase.from("messages").delete().eq("id", cardId);

    if (error) {
        console.error("Error deleting thread history:", error);
        throw new Error("Failed to delete thread history");
    }

    return data;
}

export async function POST(req: Request) {
    try {
        const { userId, cardId } = await req.json();

        if (!userId || !cardId) {
            return NextResponse.json({ error: "Missing userId or cardId" }, { status: 400 });
        }

        const { supabase } = await initClients();
        const card = await getThreadHistory(supabase, cardId);
        return NextResponse.json({ card });
    } catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const { userId, cardId } = await req.json();

        if (!userId || !cardId) {
            return NextResponse.json({ error: "Missing userId or cardId" }, { status: 400 });
        }

        const { supabase } = await initClients();
        const card = await deleteThreadHistory(supabase, cardId);
        console.log("DELETE CARD", card);
        return NextResponse.json({ card });
    } catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
