import ChatContainer from "@/components/chat/ChatContainer";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function ChatPage() {
    const supabase = createClient();
    const { data, error } = await supabase.auth.getUser();

    if (error || !data?.user) {
        redirect("/login");
    }

    const userId = data.user.id;

    const { data: threads, error: threadsError } = await supabase
        .from("threads")
        .select("id, created_at")
        .eq("user_id", userId)
        .eq("deleted", false)
        .order("created_at", { ascending: false });

    if (threadsError) {
        console.error("Error fetching threads:", threadsError);
    }

    return (
        <div className="h-flex bg-gray-100">
            <ChatContainer userId={userId} initialThreads={threads || []} />
        </div>
    );
}
