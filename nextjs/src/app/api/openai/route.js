import { OpenAI } from "openai"; 
import dotenv from "dotenv";
import { NextResponse } from "next/server";

dotenv.config({ path: "../../../../.env" });

const { OPENAI_API_KEY, ASSISTANT_ID } = process.env;

const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
});

const assistantId = ASSISTANT_ID;
let pollingInterval;

async function createThread(message) {
    console.log("Creating a new thread with message:", message);
    const response = await openai.chat.completions.create({
        model: "gpt-4-turbo",
        messages: [
            {
                role: "user",
                content: message
            }
        ]
    });
    return response;
}

async function runAssistant(threadId) {
    console.log("Running assistant with thread:", threadId);
    const response = await openai.chat.completions.create({
        model: "gpt-4-turbo",
        messages: [
            {
                role: "system",
                content: `You are an assistant. Continue the conversation in thread ${threadId}.`
            }
        ]
    });
    return response;
}

async function checkingStatus(res, threadId, runId) {
    const runObject = await openai.chat.completions.retrieve({ id: runId });
    const status = runObject.status;
    console.log("Current status:", status);

    if (status === 'completed') {
        clearInterval(pollingInterval);

        const messageList = await openai.chat.completions.list({ id: threadId });
        const messages = messageList.data.map(message => message.content);

        return res.json({ messages });
    } else if (status === 'requires_action') {
        console.log("requires_action.. looking for a function");

        if (runObject.required_action?.type === "submit_tool_outputs") {
            console.log("submit_tool_outputs");
            const toolCalls = runObject.required_action.submit_tool_outputs.tool_calls;

            if (toolCalls.length > 0) {
                const parsedArgs = JSON.parse(toolCalls[0].function.arguments);
                console.log("Query to search for:", parsedArgs.query);
            }
        }
    }
}

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const message = searchParams.get('message');

    if (!message) {
        return NextResponse.json({ error: "Missing 'message' parameter" }, { status: 400 });
    }

    try {
        const thread = await createThread(message);
        return NextResponse.json({ threadId: thread.id });
    } catch (error) {
        console.error("Error creating thread:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function POST(req) {
    const { threadId, message } = await req.json();

    if (!threadId || !message) {
        return NextResponse.json({ error: "Missing 'threadId' or 'message' parameter" }, { status: 400 });
    }

    try {
        const thread = await createThread(message);
        
        const messages = thread.choices.map(choice => choice.message.content);

        return NextResponse.json({ messages });
    } catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}