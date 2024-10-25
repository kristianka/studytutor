import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage
} from "@/components/ui/form";
import { ChangePasswordButton } from "./Buttons";

const FormSchema = z
    .object({
        currentPassword: z.string().min(1, "Current password is required!"),
        newPassword: z
            .string()
            .min(1, "New password is required!")
            .min(8, "Password must have than 8 characters!"),
        confirmedPassword: z.string().min(1, "Password confirmation is required!")
    })
    .refine((data) => data.newPassword === data.confirmedPassword, {
        path: ["confirmPassword"],
        message: "Password do not match!"
    });

export default function PasswordForm() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmedPassword: ""
        }
    });

    return (
        <Form {...form}>
            <form>
                <div className="grid w-full items-center gap-6">
                    <FormField
                        control={form.control}
                        name="currentPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Current Password</FormLabel>
                                <FormControl>
                                    <Input placeholder="" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="newPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>New Password</FormLabel>
                                <FormControl>
                                    <Input placeholder="" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="confirmedPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                    <Input placeholder="" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <ChangePasswordButton />
                </div>
            </form>
        </Form>
    );
}
