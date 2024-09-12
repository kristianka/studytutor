"use client";

import { useState } from "react";
import { AlertDestructive } from "./AlertDestructive";
import { SubmitButton } from "./SubmitButton";
import { signIn } from "@/app/login/actions";

export default function Buttons({ text }: { text: string }) {
    const [error, setError] = useState<string | null>(null);

    // attempt to sign in. if there's an error, set it in state
    const login = async (formData: FormData) => {
        try {
            const err = await signIn(formData);
            if (err) throw err;
            setError(null);
        } catch (error) {
            setError(error);
            console.error(error);
        }
    };

    return (
        <div className="space-y-5">
            {error && <AlertDestructive error={error} />}
            <div className="space-x-3">
                <SubmitButton pendingText="Signing in..." formAction={login}>
                    {text}
                </SubmitButton>
            </div>
        </div>
    );
}
