"use client";

import { updateCards } from "@/lib/profile";
import { resetPassword } from "@/app/settings/actions";
import { updateProfile } from "@/lib/profile";
import { SubmitButton } from "@/components/SubmitButton";
import { CardsDifficulty, CardsDifficultyKey } from "@/types";
import { UseFormReset } from "react-hook-form";

interface ChangePasswordButtonProps {
    reset: UseFormReset<{
        currentPassword: string;
        newPassword: string;
        confirmedPassword: string;
    }>;
}

export function ChangePasswordButton({ reset }: ChangePasswordButtonProps) {
    // attempt to change password
    const changePasswordHandler = async (formData: FormData) => {
        try {
            await resetPassword(formData);
        } catch (error) {
            console.error(error);
        }
        reset();
    };

    return (
        <div className="space-x-3 space-y-5">
            <SubmitButton formAction={changePasswordHandler}>Change Password</SubmitButton>
        </div>
    );
}

export function UpdateProfileButton({ userId }: { userId: string }) {
    // attempt to update user profile
    const updateProfileHandler = async (formData: FormData) => {
        const body = {
            userId,
            first_name: formData.get("firstName") as string,
            last_name: formData.get("lastName") as string,
            email: formData.get("email") as string
        };
        try {
            await updateProfile(body);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="space-x-3 space-y-5">
            <SubmitButton formAction={updateProfileHandler}>Update Profile</SubmitButton>
        </div>
    );
}

export function UpdateCardsButton({ userId }: { userId: string }) {
    // attempt to update default amount and default difficulty of flashcards
    const updateCardsHandler = async (formData: FormData) => {
        const body = {
            userId,
            cardsDefaultAmount: parseInt(formData.get("cardsAmount") as string),
            cardsDefaultDifficulty:
                CardsDifficulty[formData.get("difficulty") as CardsDifficultyKey]
        };
        try {
            await updateCards(body);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="space-x-3 space-y-5">
            <SubmitButton formAction={updateCardsHandler}>Update Cards</SubmitButton>
        </div>
    );
}
