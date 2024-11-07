import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage
} from "@/components/ui/form";
import { User } from "@/types";
import { UpdateProfileButton } from "./Buttons";

const FormSchema = z.object({
    firstName: z.string().min(1, "Firstname is required!"),
    lastName: z.string().min(1, "Firstname is required!"),
    email: z.string().min(1, "Email is required!").email("Invalid email!"),
    flashcards: z.number().int().min(0, "Amount of cards cannot be negative.")
});

export default function ProfileForm({ user }: { user: User }) {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            firstName: user.user_metadata.first_name,
            lastName: user.user_metadata.last_name,
            email: user.user_metadata.email,
            flashcards: 5
        }
    });

    return (
        <Form {...form}>
            <form>
                <div className="grid w-full items-center gap-6">
                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="First" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Last Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Last" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="Email" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <UpdateProfileButton userId={user.id} />
                </div>
            </form>
        </Form>
    );
}
