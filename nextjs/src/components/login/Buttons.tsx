"use client";

import { useState } from "react";
import { AlertDestructive } from "./AlertDestructive";
import { SubmitButton } from "./SubmitButton";
import { signIn } from "@/app/login/actions";
import { signUp } from "@/app/register/actions";

interface ButtonProps {
    type: "login" | "register";
}

export default function Buttons({ type }: ButtonProps) {
    const [error, setError] = useState<string | null>(null);

    // attempt to sign in. if there's an error, set it in state
    const login = async (formData: FormData) => {
        try {
            const err = await signIn(formData);
            if (err) throw err;
            setError(null);
        } catch (error) {
            setError(error as string);
            console.error(error);
        }
    };

    // attempt to sign up. if there's an error, set it in state
    const register = async (formData: FormData) => {
        try {
            const err = await signUp(formData);
            if (err) throw err;
            setError(null);
        } catch (error) {
            setError(error as string);
            console.error(error);
        }
    };

    return (
        <div className="space-y-5">
            {error && <AlertDestructive error={error} />}
            <div className="space-x-3">
                {type === "register" && (
                    <SubmitButton pendingText="Please wait..." formAction={register}>
                        Create an account
                    </SubmitButton>
                )}
                {type === "login" && (
                    <SubmitButton pendingText="Please wait..." formAction={login}>
                        Sign in
                    </SubmitButton>
                )}
            </div>
        </div>
    );
}
