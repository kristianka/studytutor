import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Chat from "@/components/chat/Chat";

export default async function ChatPage() {
    const supabase = createClient();
    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) {
        redirect("/login");
    }

    return (
        <div className="my-1">
            <Chat userId={data.user.id} />
        </div>
    );
}
