import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { User } from "@/types";
import SettingsCard from "@/components/settings/SettingsCard";

export default async function SettingsPage() {
    const supabase = createClient();
    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) {
        redirect("/login");
    }
    const user = data.user as unknown as User;

    return (
        <div className="my-10">
            <SettingsCard user={user} />
        </div>
    );
}
