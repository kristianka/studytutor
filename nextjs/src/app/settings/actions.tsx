"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export async function updateProfile(formData: FormData) {
    const supabase = createClient();

    const dataObj = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
        options: {
            data: {
                first_name: formData.get("firstName") as string,
                last_name: formData.get("lastName") as string
            }
        }
    };

    if (
        !dataObj.email ||
        !dataObj.password ||
        !dataObj.options.data.first_name ||
        !dataObj.options.data.last_name
    ) {
        return "Please fill in all the fields.";
    }

    const { error } = await supabase.auth.signUp(dataObj);

    if (error) {
        return error.message;
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
