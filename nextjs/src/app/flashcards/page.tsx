import FlashCard from "@/components/flashcard";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CardOptions from "@/components/flashcards/Card";
import History from "@/components/flashcards/History";
import { Button } from "@/components/ui/button";

export default async function Home() {
    const supabase = createClient();

    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) {
        redirect("/login");
    }

    return (
        <div className="">
            <div className="flex justify-between items-center">
                <div className="">
                    <h1 className="text-3xl font-bold">Hi, Einari Nari!</h1>
                    <h2 className="text-xl font-bold">What do you want to learn about today? 😊</h2>
                </div>
                <h2 className="text-2xl font-bold">🔥21</h2>
            </div>
            <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-y-10 sm:gap-y-0 gap-x-10">
                <div className="md:col-span-3 max-w-2xl">
                    <Label htmlFor="topic">Please enter a topic</Label>
                    <Input type="topic" id="topic" placeholder="React hooks" />
                    <div className="my-5">
                        <CardOptions />
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
                    <History />
                </div>
            </div>
        </div>
    );
}
