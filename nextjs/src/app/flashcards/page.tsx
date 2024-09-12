import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import HistoryCard from "@/components/flashcards/HistoryCard";
import SettingsCard from "@/components/flashcards/SettingsCard";
import Greeting from "@/components/flashcards/Greeting";
import { User } from "@/types";

export default async function Home() {
    const supabase = createClient();
    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) {
        redirect("/login");
    }

    // needs to be done like this, because Supabase User type is not public
    // the custom User has all the important fields
    const user = data.user as User;

    return (
        <div className="">
            <Greeting user={user} />
            <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-y-10 sm:gap-y-0 gap-x-10">
                <div className="md:col-span-3 max-w-2xl">
                    <Label htmlFor="topic">Please enter a topic</Label>
                    <Input type="topic" id="topic" placeholder="React hooks" />
                    <div className="my-5">
                        <SettingsCard />
                    </div>
                    <p className="block md:hidden mx-3 text-sm text-muted-foreground">
                        Tip: Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem
                        numquam molestiae sequi.
                    </p>
                    <div className="flex justify-end gap-x-5">
                        <p className="hidden md:block mx-3 text-sm text-muted-foreground">
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
