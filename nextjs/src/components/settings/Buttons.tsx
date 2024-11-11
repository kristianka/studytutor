"use client";

import { updateCards } from "@/lib/profile";
import { resetPassword } from "@/app/settings/actions";
import { updateProfile } from "@/lib/profile";
import { SubmitButton } from "@/components/SubmitButton";
import { CardsDifficulty, CardsDifficultyKey } from "@/types";
import { UseFormReset } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";

interface ChangePasswordButtonProps {
    userEmail: string;
    reset: UseFormReset<{
        currentPassword: string;
        newPassword: string;
        confirmedPassword: string;
    }>;
}

export function ChangePasswordButton({ userEmail, reset }: ChangePasswordButtonProps) {
    const { toast } = useToast();
    // attempt to change password
    const changePasswordHandler = async (formData: FormData) => {
        try {
            await resetPassword(userEmail, formData);
            toast({
                title: "Password Changed",
                description: "Password changed successfully"
            });
        } catch (error) {
            console.error(error);
            toast({
                variant: "destructive",
                title: "Error",
                description: String(error)
            });
        }
        reset();
    };

    return (
        <div className="space-x-3 space-y-5">
            <SubmitButton formAction={changePasswordHandler}>Change Password</SubmitButton>
        </div>
    );
}

//Updates the user name and email
export function UpdateProfileButton({ userId }: { userId: string }) {
    const { toast } = useToast();

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
            toast({
                title: "Profile Updated",
                description: "Profile updated successfully"
            });
        } catch (error) {
            console.error(error);
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to update profile"
            });
        }
    };

    return (
        <div className="space-x-3 space-y-5">
            <SubmitButton formAction={updateProfileHandler}>Update Profile</SubmitButton>
        </div>
    );
}

//Updates the default amount and difficulty of flashcards
export function UpdateCardsButton({ userId }: { userId: string }) {
    const { toast } = useToast();

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
            toast({
                title: "Flashcards Updated",
                description: "Default flashcards settings updated"
            });
        } catch (error) {
            console.error(error);
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to update default flashcards settings"
            });
        }
    };

    return (
        <div className="space-x-3 space-y-5">
            <SubmitButton formAction={updateCardsHandler}>Update Cards</SubmitButton>
        </div>
    );
}
