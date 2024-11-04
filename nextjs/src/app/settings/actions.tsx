"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export async function updateProfile(formData: FormData) {
    const supabase = createClient();

    const dataObj = {
        first_name: formData.get("firstName") as string,
        last_name: formData.get("lastName") as string,
        email: formData.get("email") as string
    };

    if (!dataObj.email || !dataObj.first_name || !dataObj.last_name) {
        return "Please fill in all the fields.";
    }

    try {
        const { error } = await supabase.auth.updateUser({
            data: dataObj
        });

        if (error) {
            throw error;
        }
    } catch (error) {
        console.error("Error updating user:", error);
        return (error as Error).message;
    }

    revalidatePath("/settings", "layout");
    redirect("/settings");
}

export async function resetPassword(formData: FormData) {
    const supabase = createClient();

    const dataObj = {
        password: formData.get("newPassword") as string
    };

    if (!dataObj.password) {
        return "Please fill in all the fields.";
    }

    const { error } = await supabase.auth.updateUser(dataObj);

    if (error) {
        return error.message;
    }

    revalidatePath("/settings", "layout");
    redirect("/settings");
}
