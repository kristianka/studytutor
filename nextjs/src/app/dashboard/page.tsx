import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Greeting from "@/components/dashboard/Greeting";
import ProgressCard from "@/components/dashboard/ProgressCard";
import { User } from "@/types";
import ChatCard from "@/components/dashboard/ChatCard";

export default async function Dashboard() {
    const supabase = createClient();
    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) {
        redirect("/login");
    }
    const user = data.user as unknown as User;
    const firstName = user?.user_metadata.first_name;

    return (
        <div className="my-20">
            <Greeting firstName={firstName} />
            <div className="my-20">
                <ProgressCard />
            </div>
            <ChatCard />
        </div>
    );
}
