"use client";

import { resetPassword, updateProfile } from "@/app/settings/actions";
import { SubmitButton } from "@/components/SubmitButton";

export function ChangePasswordButton() {
    // attempt to change password
    const changePasswordHandler = async (formData: FormData) => {
        console.log("change password");
        try {
            const err = await resetPassword(formData);
            console.log("Error: ", err);
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
    // attempt to change password
    const updateProfileHandler = async (formData: FormData) => {
        console.log("update profile");
        try {
            const err = await updateProfile(formData);
            console.log("Error: ", err);
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
