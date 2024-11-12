"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export async function resetPassword(userEmail: string, formData: FormData) {
    const supabase = createClient();

    const currentPassword = formData.get("currentPassword") as string;
    // Attempt to log in with the email and current password
    const { error: loginError } = await supabase.auth.signInWithPassword({
        email: userEmail,
        password: currentPassword
    });
    if (loginError) {
        throw new Error("Invalid current password");
    }

    const newPassword = formData.get("newPassword") as string;
    const confirmedPassword = formData.get("confirmedPassword") as string;

    if (newPassword == currentPassword) {
        throw new Error("New password cannot be the same as the old password");
    }

    if (newPassword !== confirmedPassword) {
        throw new Error("Passwords do not match");
    }

    if (newPassword.length < 8) {
        throw new Error("Password must be at least 8 characters long");
    }
    const dataObj = {
        password: newPassword
    };

    const { error } = await supabase.auth.updateUser(dataObj);

    if (error) {
        console.error(error);
        throw new Error("Error updating password");
    }

    revalidatePath("/settings", "layout");
    redirect("/settings");
}
