"use server";
import { createServiceRoleClient } from "@/utils/supabase/server";

import { NextResponse } from "next/server";

async function initClients() {
    try {
        const supabase = createServiceRoleClient();
        return { supabase };
    } catch (error) {
        console.error("Error initializing clients:", error);
        throw new Error("Failed to initialize clients");
    }
}

async function getProfilePicture() {
    const res = await fetch(`https://ui-avatars.com/api/?name=John+Doe`, {
        method: "GET",
        headers: {
            "Content-Type": "image/*"
        }
    });
    console.log(res);
    //if (!res) {
    //    throw new Error("Failed to get public URL");
    //}
    return res;
}
async function updateProfilePicture(
    supabase: ReturnType<typeof createServiceRoleClient>,
    userId: string,
    file: string
) {
    const fileName = `profile-picture-${userId}`;
    const { data, error } = await supabase.storage.from("profile_picture").upload(fileName, file);

    if (error) {
        console.error("Error uploading file:", error);
        throw new Error("Failed to upload file");
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
        const profile = await getProfilePicture();

        return NextResponse.json({ profile });
    } catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        const { file } = await req.json();

        if (!file) {
            return NextResponse.json({ error: "Missing file" }, { status: 400 });
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

        const profile = await updateProfilePicture(supabase, userId, file);
        return NextResponse.json({ profile });
    } catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
