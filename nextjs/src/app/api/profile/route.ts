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
    first_name: string,
    last_name: string
) {
    const { data, error } = await supabase
        .from("profiles")
        .update({
            first_name: first_name,
            last_name: last_name
        })
        .eq("id", userId);

    if (error) {
        console.error("Error updating profile:", error);
        throw new Error("Failed to update profile");
    }

    if (!data) {
        return { status: 200 };
    } else {
        throw new Error("Failed to update profile");
    }
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
        const { first_name, last_name, email } = await req.json();

        if (!first_name || !last_name || !email) {
            return NextResponse.json(
                { error: "Missing first_name, last_name or email" },
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

        const dataObj = {
            first_name: first_name,
            last_name: last_name,
            email: email
        };
        const { data, error } = await supabase.auth.updateUser({ data: dataObj });
        if (error) {
            throw new Error("Failed to update email");
        }

        console.log("auth.updateUser data", data);
        const profile = await updateProfile(supabase, userId, first_name, last_name);
        return NextResponse.json({ profile });
    } catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
