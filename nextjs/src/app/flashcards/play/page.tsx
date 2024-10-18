import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

import { User } from "@/types";
import Choices from "@/components/flashcards/play/Choices";

export default async function Page({
    searchParams
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    const supabase = createClient();
    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) {
        redirect("/login");
    }
    const user = data.user as unknown as User;
    const session = searchParams.session as string;
    const body = { userId: user.id, cardId: session };

    return (
        <div>
            <Choices body={body} />
        </div>
    );
}
