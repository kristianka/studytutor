"use server";
import { createServiceRoleClient } from "@/utils/supabase/server";
import { OpenAI } from "openai";
import { NextResponse } from "next/server";

async function listUserIds(supabase: ReturnType<typeof createServiceRoleClient>) {
    try {
        const { data, error } = await supabase.auth.admin.listUsers();
        if (error) {
            throw new Error(`Failed to list users: ${error.message}`);
        }

        const userIds = data.users.map((user) => user.id);
        return userIds;
    } catch (error) {
        console.error("Failed to list user IDs:", error);
        return [];
    }
}

// Define a function to truncate or delete data from specific tables
async function resetDatabase(supabase: ReturnType<typeof createServiceRoleClient>) {
    try {
        const userIds = await listUserIds(supabase);
        if (userIds.length > 0) {
            const { error } = await supabase.auth.admin.deleteUser(userIds[0]);
            if (error) {
                throw new Error(`Failed to delete users: ${error.message}`);
            }
        }

        console.log("Database reset successfully");
    } catch (error) {
        console.error("Failed to reset database:", error);
    }
}

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

export async function GET() {
    try {
        if (process.env.RESET_ALLOWED !== "TRUE") {
            return NextResponse.json({ message: "Nothing for you here" });
        }

        const { supabase } = await initClients();
        await resetDatabase(supabase);

        return NextResponse.json({ message: "Database reset successfully" });
    } catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
