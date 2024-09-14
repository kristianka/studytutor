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
async function getOrCreateThread(userId, assistantId) {
  // check for existing user thread
  const { data: user, error: userError } = await supabase
    .from("users")
    .select("thread_id")
    .eq("id", userId)
    .maybeSingle();

  if (userError) {
    console.error("Error fetching user:", userError);
    throw new Error("Error fetching user data");
  }

  // check for if user is found
  if (!user) {
    console.error("User not found with ID:", userId);
    throw new Error("User not found");
  }

  // return id for existing user thread
  if (user.thread_id) {
    return user.thread_id;
  }

  // create new thread if one doesnt exist
  const { data: newThread, error: threadError } = await supabase
    .from("threads")
    .insert([{ user_id: userId, assistant_id: assistantId }])
    .select()
    .single();

  if (threadError) {
    console.error("Error creating thread:", threadError);
    throw new Error("Failed to create new thread");
  }

  const { error: updateError } = await supabase
    .from("users")
    .update({ thread_id: newThread.id })
    .eq("id", userId);

  if (updateError) {
    console.error("Error updating user's thread_id:", updateError);
    throw new Error("Failed to associate user with new thread");
  }

  return newThread.id;
}

async function postMessage(threadId, sender, messageContent) {
  console.log(`Inserting message into thread ${threadId} from ${sender}: ${messageContent}`);
  
  const { data, error } = await supabase
    .from("messages")
    .insert([{ thread_id: threadId, sender: sender, message_content: messageContent }])
    .select();

  if (error) {
    console.error("Error adding message:", error);
    throw new Error("Failed to add message");
  }

  if (!data || data.length === 0) {
    console.error("No data returned from Supabase after insert");
    throw new Error("No message data returned");
  }

  console.log("Inserted message:", data[0]);
  return data[0];
}

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
      model: "gpt-4-turbo",
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