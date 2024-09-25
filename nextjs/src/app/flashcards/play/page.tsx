import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

import { Progress } from "@/components/ui/progress";
import { User } from "@/types";
import Choises from "@/components/flashcards/play/Choices";

const answers = [
    { id: 1, text: "To perform side effects" },
    { id: 2, text: "To manage component state" },
    { id: 3, text: "To handle component lifecycle methods" }
];

const correctAnswer = "To manage component state";

export default async function Home() {
    const supabase = createClient();
    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) {
        redirect("/login");
    }
    const user = data.user as unknown as User;
    const firstName = user?.user_metadata.first_name;

    return (
        <div>
            <Progress className="" value={33} />
            <div className="mt-16 flex items-center justify-between">
                <h2 className="text-2xl font-bold">
                    What is the purpose of the useState hook in React?
                </h2>
                <h2 className="">Question 1 / 3</h2>
            </div>
            <Choises answers={answers} correctAnswer={correctAnswer} />
        </div>
    );
}
