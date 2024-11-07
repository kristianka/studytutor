"use server";
import { createServiceRoleClient } from "@/utils/supabase/server";
import { OpenAI } from "openai";
import { NextResponse } from "next/server";
import { CardsDifficultyType } from "@/types";

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

async function updateCards(
    supabase: ReturnType<typeof createServiceRoleClient>,
    userId: string,
    cardsDefaultAmount: number,
    cardsDefaultDifficulty: CardsDifficultyType
) {
    const { data, error } = await supabase
        .from("profiles")
        .update({
            cards_default_amount: cardsDefaultAmount,
            cards_default_difficulty: cardsDefaultDifficulty
        })
        .eq("id", userId);

    if (error) {
        console.error("Error updating cards:", error);
        throw new Error("Failed to update cards");
    }

    if (!data) {
        return { status: 200 };
    } else {
        throw new Error("Failed to update cards");
    }
}

export async function PUT(req: Request) {
    try {
        const { cardsDefaultAmount, cardsDefaultDifficulty } = await req.json();

        if (!cardsDefaultAmount || !cardsDefaultDifficulty) {
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

        const profile = await updateCards(
            supabase,
            userId,
            cardsDefaultAmount,
            cardsDefaultDifficulty
        );
        return NextResponse.json({ profile });
    } catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
