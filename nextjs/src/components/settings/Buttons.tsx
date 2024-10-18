"use client";

import { SubmitButton } from "@/components/ui/SubmitButton";
//import { resetPassword, updateProfile } from "@/app/settings/actions";

export function ChangePasswordButton() {
    // attempt to change password
    const changePasswordHandler = async (formData: FormData) => {
        console.log("change password");
        try {
            // const err = await resetPassword(formData);
            console.log(formData);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="space-x-3 space-y-5">
            <SubmitButton pendingText="Please wait..." formAction={changePasswordHandler}>
                Change Password
            </SubmitButton>
        </div>
    );
}

export function UpdateProfileButton() {
    // attempt to change password
    const updateProfileHandler = async (formData: FormData) => {
        console.log("change password");
        try {
            // const err = await resetPassword(formData);
            console.log(formData);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="space-x-3 space-y-5">
            <SubmitButton pendingText="Please wait..." formAction={updateProfileHandler}>
                ChangePassword
            </SubmitButton>
        </div>
    );
}
