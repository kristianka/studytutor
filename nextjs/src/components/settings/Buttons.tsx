"use client";

import { updateCards } from "@/lib/profile";
import { resetPassword, updateProfile } from "@/app/settings/actions";
import { SubmitButton } from "@/components/SubmitButton";
import { CardsDifficulty, CardsDifficultyKey } from "@/types";

export function ChangePasswordButton() {
    // attempt to change password
    const changePasswordHandler = async (formData: FormData) => {
        try {
            await resetPassword(formData);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="space-x-3 space-y-5">
            <SubmitButton formAction={changePasswordHandler}>Change Password</SubmitButton>
        </div>
    );
}

export function UpdateProfileButton() {
    // attempt to update user profile
    const updateProfileHandler = async (formData: FormData) => {
        try {
            await updateProfile(formData);
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
