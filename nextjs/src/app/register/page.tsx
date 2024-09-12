import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import RegisterCard from "@/components/login/RegisterCard";

export default async function Login() {
    const supabase = createClient();
    const { data } = await supabase.auth.getUser();
    const user = data?.user;

    if (user) {
        redirect("/");
    }

    return (
        <div className="flex items-center justify-center max-w-md mx-auto">
            <div className="mt-32 flex flex-col w-full justify-center gap-2 text-foreground">
                <RegisterCard />
            </div>
        </div>
    );
}
