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

interface Results {
    result: string;
}

async function saveResults(
    supabase: ReturnType<typeof createServiceRoleClient>,
    userId: string,
    messageId: string,
    results: Results
) {
    const { data, error } = await supabase.from("results").insert([
        {
            user_id: userId,
            message_id: messageId,
            time_taken: results
        }
    ]);

    if (error) {
        console.error("Error saving stats:", error);
        throw new Error("Failed to save stats");
    }

    return data;
}

async function updateProfileStats(
    supabase: ReturnType<typeof createServiceRoleClient>,
    userId: string
) {
    const { data, error } = await supabase
        .from("profiles")
        .select("card_sets_completed_amount")
        .eq("id", userId);

    if (!data) {
        console.error("Error getting profile:", error);
        return;
    }

    if (error) {
        console.error("Error getting profile:", error);
        throw new Error("Failed to update profile stats");
    }

    const cardSetsCompletedAmount = data[0].card_sets_completed_amount + 1;
    // update the user's profile with the new card sets completed amount
    const { data: updatedData, error: updateError } = await supabase
        .from("profiles")
        .update({
            card_sets_completed_amount: cardSetsCompletedAmount
        })
        .eq("id", userId);

    if (updateError) {
        console.error("Error updating profile:", updateError);
        throw new Error("Failed to update profile stats");
    }

    return updatedData;
}

async function getResults(supabase: ReturnType<typeof createServiceRoleClient>, userId: string) {
    const { data, error } = await supabase.from("results").select("*").eq("user_id", userId);

    if (error) {
        console.error("Error fetching stats:", error);
        throw new Error("Failed to fetch stats");
    }

    return data;
}

export async function GET() {
    try {
        const { supabase } = await initClients();
        const user = await supabase.auth.getUser();
        if (!user) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
        }
        const userId = user.data.user?.id;
        if (!userId) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        const results = await getResults(supabase, userId);

        return NextResponse.json({ results });
    } catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const { userId, cardId, stats } = await req.json();

        if (!userId || !cardId || !stats) {
            return NextResponse.json({ error: "Missing userId, cardId or stats" }, { status: 400 });
        }

        const { supabase } = await initClients();
        const results = await saveResults(supabase, userId, cardId, stats);
        await updateProfileStats(supabase, userId);

        return NextResponse.json({ results });
    } catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
