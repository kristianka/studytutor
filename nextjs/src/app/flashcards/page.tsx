import FlashCard from "@/components/flashcard";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Home() {
    const supabase = createClient();

    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) {
        redirect("/login");
    }

    return (
        <div>
            <FlashCard />
            <p>hello world from flashcards</p>
        </div>
    );
}
