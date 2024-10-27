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

async function getProfile(supabase: ReturnType<typeof createServiceRoleClient>, userId: string) {
    console.log("getting profile", userId);
    const { data, error } = await supabase.from("profiles").select("*").eq("id", userId);

    if (error) {
        console.error("Error fetching stats:", error);
        throw new Error("Failed to fetch stats");
    }

    return data;
}
async function updateProfile(
    supabase: ReturnType<typeof createServiceRoleClient>,
    userId: string,
    cards_default_amount: number,
    cards_default_difficulty: "easy" | "medium" | "hard"
) {
    const { data, error } = await supabase
        .from("profiles")
        .update({
            cards_default_amount,
            cards_default_difficulty
        })
        .eq("id", userId);

    if (error) {
        console.error("Error updating stats:", error);
        throw new Error("Failed to update stats");
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
        const profile = await getProfile(supabase, userId);

        return NextResponse.json({ profile });
    } catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        const { cards_default_amount, cards_default_difficulty } = await req.json();

        if (!cards_default_amount || !cards_default_difficulty) {
            return NextResponse.json(
                { error: "Missing cards_default_amount or cards_default_difficulty" },
                { status: 400 }
            );
        }

        const { supabase } = await initClients();
        const user = await supabase.auth.getUser();
        if (!user) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
        }

        const userId = user.data.user?.id;
        if (!userId) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const profile = await updateProfile(
            supabase,
            userId,
            cards_default_amount,
            cards_default_difficulty
        );
        return NextResponse.json({ profile });
    } catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
