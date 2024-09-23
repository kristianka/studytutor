import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

import HistoryCard from "@/components/flashcards/HistoryCard";
import Greeting from "@/components/flashcards/Greeting";
import NewFlashCard from "@/components/flashcards/NewFlashCard";
import { User } from "@/types";

export default async function Home() {
    const supabase = createClient();
    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) {
        redirect("/login");
    }
    const user = data.user as User;
    const firstName = user?.user_metadata.first_name;

    return (
        <div className="">
            <Greeting firstName={firstName} />
            <div className="mt-20 grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 sm:gap-y-0 md:grid-cols-5">
                <div className="max-w-2xl md:col-span-3">
                    <NewFlashCard user={user} />
                </div>
                <div className="md:col-span-2">
                    <HistoryCard user={user} />
                </div>
            </div>
        </div>
    );
}
