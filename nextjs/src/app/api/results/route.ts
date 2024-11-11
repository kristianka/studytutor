"use server";
import { createServiceRoleClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import initClients from "@/lib/initClient";

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
    const { data, error } = await supabase.from("profiles").select("*").eq("id", userId);

    if (!data) {
        console.error("Error getting profile:", error);
        return;
    }

    if (error) {
        console.error("Error getting profile:", error);
        throw new Error("Failed to update profile stats");
    }

    // update the user's profile with the new card sets completed amount
    const cardSetsCompletedAmount = data[0].card_sets_completed_amount + 1;
    let streak = data[0].streak_length;
    let longestStreak = data[0].longest_streak_length;
    const streakUpdatedDate = data[0].streak_updated;

    // check if the user's streak is still active
    const now = new Date();
    let streakUpdatedChanged = false;
    const streakUpdated = new Date(streakUpdatedDate);

    // reset the time part to 00:00:00 to compare only the dates
    streakUpdated.setHours(0, 0, 0, 0);
    now.setHours(0, 0, 0, 0);

    const diffDays = Math.floor((now.getTime() - streakUpdated.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
        // new day - streak continues
        streak += 1;
        streakUpdatedChanged = true;
    } else if (diffDays > 1) {
        // womp womp - streak broken
        streak = 1;
        streakUpdatedChanged = true;
    }

    if (streak > longestStreak || !longestStreak) {
        longestStreak = streak;
    }

    const updateData: {
        card_sets_completed_amount: number;
        streak_length: number;
        longest_streak_length: number;
        streak_updated?: Date;
    } = {
        card_sets_completed_amount: cardSetsCompletedAmount,
        streak_length: streak,
        longest_streak_length: longestStreak
    };

    if (streakUpdatedChanged) {
        updateData.streak_updated = new Date();
    }

    // update the user's profile with the new stats
    const { data: updatedData, error: updateError } = await supabase
        .from("profiles")
        .update(updateData)
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
