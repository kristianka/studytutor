import { User } from "@/types";

interface GreetingProps {
    user: User;
}

// temporary since we don't have user name yet
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Greeting({ user }: GreetingProps) {
    return (
        <div className="flex justify-between items-center">
            <div className="">
                {/* to do change to name. needs to be asked during registration */}
                <h1 className="text-3xl font-bold">Hi, Developer!</h1>
                <h2 className="text-xl font-bold">
                    What do you want to learn about today? 😊
                </h2>
            </div>
            <h2 className="text-2xl font-bold">🔥21</h2>
        </div>
    );
}
