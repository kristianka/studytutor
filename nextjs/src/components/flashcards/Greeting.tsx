"use client";
import { useProfile } from "@/lib/profile";
import { LoadingSpinner } from "../LoadingSpinner";

export default function Greeting({ firstName }: { firstName: string }) {
    const { data: profile, isLoading } = useProfile();

    return (
        <div className="flex items-center justify-between">
            <div className="">
                <h1 className="text-3xl font-bold">Hi, {firstName}!</h1>
                <h2 className="text-xl font-bold">What do you want to learn about today? 😊</h2>
            </div>
            {isLoading ? (
                <LoadingSpinner />
            ) : (
                <h2 className="text-2xl font-bold">🔥{profile?.streak_length}</h2>
            )}
        </div>
    );
}
