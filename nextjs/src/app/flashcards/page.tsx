import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import HistoryCard from "@/components/flashcards/HistoryCard";
import SettingsCard from "@/components/flashcards/SettingsCard";
import Greeting from "@/components/flashcards/Greeting";

export default async function Home() {
    const supabase = createClient();
    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) {
        redirect("/login");
    }
    const user = data.user;
    const firstName = user?.user_metadata.first_name;

    return (
        <div className="">
            <Greeting firstName={firstName} />
            <div className="mt-20 grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 sm:gap-y-0 md:grid-cols-5">
                <div className="max-w-2xl md:col-span-3">
                    <Label htmlFor="topic">Please enter a topic</Label>
                    <Input type="topic" id="topic" placeholder="React hooks" />
                    <div className="my-5">
                        <SettingsCard />
                    </div>
                    <p className="mx-3 block text-sm text-muted-foreground md:hidden">
                        Tip: Lorem ipsum dolor sit amet consectetur adipisicing numquam molestiae
                        sequi.
                    </p>
                    <div className="flex justify-end gap-x-5">
                        <p className="mx-3 hidden text-sm text-muted-foreground md:block">
                            Tip: Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
                            numquam molestiae sequi.
                        </p>
                        <Button className="items-end">Reset</Button>
                        <Button className="items-end">Start</Button>
                    </div>
                </div>
                <div className="md:col-span-2">
                    <HistoryCard />
                </div>
            </div>
        </div>
    );
}
