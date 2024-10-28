"use client";

import { resetPassword, updateProfile } from "@/app/settings/actions";
import { SubmitButton } from "@/components/SubmitButton";

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
