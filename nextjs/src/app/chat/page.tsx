import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Chat() {
    const supabase = createClient();
    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) {
        redirect("/chat");
    }

    return <div className="my-20"></div>;
}
