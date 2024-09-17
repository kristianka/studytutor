import { createClient } from "@supabase/supabase-js";
import { OpenAI } from "openai";
import dotenv from "dotenv";
import { NextResponse } from "next/server";

dotenv.config({ path: "../../../../.env" });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// retrieve assistant from database
async function getAssistant() {
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
async function getOrCreateThread(supabaseUserId, assistantId) {

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
      console.log("Found existing thread:", profile.thread_id);
      return profile.thread_id;
    } else {
      console.warn("Thread ID in profile does not exist in threads table. Clearing invalid thread_id.");
    
      await supabase
        .from("profiles")
        .update({ thread_id: null })
        .eq("id", profile.id);
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

  const { error: updateError } = await supabase
    .from("profiles")
    .update({ thread_id: newThread.id })
    .eq("id", profile.id);

  if (updateError) {
    console.error("Error updating profile's thread_id:", updateError);
    throw new Error("Failed to associate profile with new thread");
  }

  return newThread.id;
}

// insert message into thread
async function postMessage(threadId, sender, messageContent) {
  console.log(`Inserting message into thread ${threadId} from ${sender}: ${messageContent}`);
  
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
    .insert([{ thread_id: threadId, sender: sender, message_content: messageContent }])
    .select();

  if (error) {
    console.error("Error adding message:", error);
    throw new Error("Failed to add message");
  }

  console.log("Inserted message:", data[0]);
  return data[0];
}

// retrieve thread history
async function getThreadHistory(threadId) {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("thread_id", threadId)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Error fetching thread history:", error);
    throw new Error("Failed to retrieve thread history");
  }

  return data.map(message => ({
    role: message.sender,
    content: message.message_content
  }));
}

export async function POST(req) {
  const { userId, message } = await req.json();

  if (!userId || !message) {
    return NextResponse.json({ error: "Missing userId or message" }, { status: 400 });
  }

  try {
    const assistant = await getAssistant();

    const threadId = await getOrCreateThread(userId, assistant.id);

    const previousMessages = await getThreadHistory(threadId);

    await postMessage(threadId, "user", message);

    const assistantResponse = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [...previousMessages, { role: "user", content: message }],
    });

    const assistantMessage = assistantResponse.choices[0].message.content;

    await postMessage(threadId, "assistant", assistantMessage);

    return NextResponse.json({ assistantMessage });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}