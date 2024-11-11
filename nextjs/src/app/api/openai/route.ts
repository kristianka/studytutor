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

// retrieve assistant from database
async function getAssistant(supabase: ReturnType<typeof createServiceRoleClient>) {
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

// create thread and store it in database
async function getOrCreateThread(
    supabase: ReturnType<typeof createServiceRoleClient>,
    supabaseUserId: string,
    assistantId: string,
    threadId?: string
) {
    if (threadId) {
        return threadId;
    }

    const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("id, thread_id")
        .eq("id", supabaseUserId)
        .maybeSingle();

    // error fetching profile
    if (profileError) {
        console.error("Error fetching profile:", profileError);
        throw new Error("Error fetching profile data");
    }

    // no profile id found
    if (!profile) {
        console.error("Profile not found with Supabase User ID:", supabaseUserId);
        throw new Error("Profile not found");
    }

    // check if thread exists
    if (profile.thread_id) {
        const { data: existingThread, error: threadCheckError } = await supabase
            .from("threads")
            .select("id")
            .eq("id", profile.thread_id)
            .maybeSingle();

        if (threadCheckError) {
            console.error("Error checking thread existence:", threadCheckError);
            throw new Error("Error checking thread existence");
        }

        if (existingThread) {
            return profile.thread_id;
        } else {
            console.warn(
                "Thread ID in profile does not exist in threads table. Clearing invalid thread_id."
            );

            await supabase.from("profiles").update({ thread_id: null }).eq("id", profile.id);
        }
    }

    // create new thread
    const { data: newThread, error: threadError } = await supabase
        .from("threads")
        .insert([{ user_id: profile.id, assistant_id: assistantId }])
        .select()
        .single();

    if (threadError) {
        console.error("Error creating thread:", threadError);
        throw new Error("Failed to create new thread");
    }

    return newThread.id;
}

// insert message into thread
async function postMessage(
    supabase: ReturnType<typeof createServiceRoleClient>,
    threadId: string,
    sender: string,
    messageContent: string,
    messageType: string
) {
    const { data: thread, error: threadError } = await supabase
        .from("threads")
        .select("id")
        .eq("id", threadId)
        .single();

    if (threadError || !thread) {
        console.error("Thread does not exist. Cannot add message.");
        throw new Error("Thread does not exist");
    }

    const { data, error } = await supabase
        .from("messages")
        .insert([
            {
                thread_id: threadId,
                sender: sender,
                message_content: messageContent,
                message_type: messageType
            }
        ])
        .select();

    if (error) {
        console.error("Error adding message:", error);
        throw new Error("Failed to add message");
    }
    return data[0];
}

// retrieve thread history
async function getThreadHistory(
    supabase: ReturnType<typeof createServiceRoleClient>,
    threadId: string
) {
    const { data, error } = await supabase
        .from("messages")
        .select("sender, message_content")
        .eq("thread_id", threadId)
        .eq("message_type", "chat")
        .order("created_at", { ascending: true });

    if (error) {
        console.error("Error fetching thread history:", error);
        throw new Error("Failed to retrieve thread history");
    }

    return data.map((msg) => ({
        role: msg.sender,
        content: msg.message_content
    }));
}

async function createNewThread(
    supabase: ReturnType<typeof createServiceRoleClient>,
    supabaseUserId: string,
    assistantId: string
) {
    const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("id")
        .eq("id", supabaseUserId)
        .single();

    if (profileError) {
        console.error("Error fetching profile:", profileError);
        throw new Error("Error fetching profile data");
    }

    if (!profile) {
        console.error("Profile not found with Supabase User ID:", supabaseUserId);
        throw new Error("Profile not found");
    }

    const { data: newThread, error: threadError } = await supabase
        .from("threads")
        .insert([{ user_id: profile.id, assistant_id: assistantId }])
        .select()
        .single();

    if (threadError) {
        console.error("Error creating thread:", threadError);
        throw new Error("Failed to create new thread");
    }

    return newThread.id;
}

async function softDeleteThread(
    supabase: ReturnType<typeof createServiceRoleClient>,
    threadId: string
) {
    const { error } = await supabase.from("threads").update({ deleted: true }).eq("id", threadId);

    if (error) {
        console.error("Error soft deleting thread:", error);
        throw new Error("Failed to soft delete thread");
    }

    return { success: true };
}

export async function POST(req: Request) {
    const { userId, message, action, threadId } = await req.json();

    if (!userId) {
        return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    if (action === "delete-thread" && !threadId) {
        return NextResponse.json({ error: "Missing threadId" }, { status: 400 });
    }

    try {
        const { supabase, openai } = await initClients();
        const assistant = await getAssistant(supabase);

        if (action === "get-history") {
            const threadIdOrNew =
                threadId || (await getOrCreateThread(supabase, userId, assistant.id, threadId));
            const previousMessages = await getThreadHistory(supabase, threadIdOrNew);
            return NextResponse.json(previousMessages);
        }

        if (action === "create-thread") {
            const newThreadId = await createNewThread(supabase, userId, assistant.id);
            return NextResponse.json({ threadId: newThreadId });
        }

        if (action === "delete-thread") {
            await softDeleteThread(supabase, threadId);
            return NextResponse.json({ success: true });
        }

        if (!message) {
            return NextResponse.json({ error: "Missing message content" }, { status: 400 });
        }

        const threadIdOrNew =
            threadId || (await getOrCreateThread(supabase, userId, assistant.id, threadId));
        const previousMessages = await getThreadHistory(supabase, threadIdOrNew);

        await postMessage(supabase, threadIdOrNew, "user", message, "chat");

        const assistantResponse = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [...previousMessages, { role: "user", content: message }]
        });

        const assistantMessage = assistantResponse.choices[0].message.content as string;

        const insertedMessage = await postMessage(
            supabase,
            threadIdOrNew,
            "assistant",
            assistantMessage,
            "chat"
        );

        return NextResponse.json({ assistantMessage, cardId: insertedMessage.id });
    } catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
