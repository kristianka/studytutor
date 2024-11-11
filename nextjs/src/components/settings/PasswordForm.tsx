import { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeNoneIcon, EyeOpenIcon } from "@radix-ui/react-icons";
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
import { User } from "@/types";

const FormSchema = z
    .object({
        currentPassword: z.string().min(1, "Current password is required!"),
        newPassword: z
            .string()
            .min(1, "New password is required!")
            .min(8, "Password must have at least 8 characters!"),
        confirmedPassword: z
            .string()
            .min(1, "Password confirmation is required!")
            .min(8, "Password must have at least 8 characters!")
    })
    .refine((data) => data.newPassword === data.confirmedPassword, {
        path: ["confirmPassword"],
        message: "Password do not match!"
    });

// Form to change the user password
export default function PasswordForm({ user }: { user: User }) {
    const [isCurrentPasswordTyping, setIsCurrentPasswordTyping] = useState(false);
    const [isNewPasswordTyping, setIsNewPasswordTyping] = useState(false);
    const [isConfirmPasswordTyping, setIsConfirmPasswordTyping] = useState(false);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmedPassword: ""
        }
    });

    const reset = () => {
        setShowCurrentPassword(false);
        setShowNewPassword(false);
        setShowConfirmPassword(false);
        form.reset();
    };

    const toggleCurrentPasswordVisibility = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setShowCurrentPassword((prev) => !prev);
    };

    const toggleNewPasswordVisibility = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setShowNewPassword((prev) => !prev);
    };

    const toggleConfirmPasswordVisibility = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setShowConfirmPassword((prev) => !prev);
    };

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
                                    <div className="flex flex-row">
                                        <Input
                                            placeholder="********"
                                            type={showCurrentPassword ? "text" : "password"}
                                            {...field}
                                            onChange={(e) => {
                                                field.onChange(e);
                                                setIsCurrentPasswordTyping(
                                                    e.target.value.length > 0
                                                );
                                                if (e.target.value.length === 0) {
                                                    setShowCurrentPassword(false);
                                                }
                                            }}
                                        />
                                        {isCurrentPasswordTyping && (
                                            <button
                                                onClick={toggleCurrentPasswordVisibility}
                                                className="ml-4 text-gray-700"
                                            >
                                                {showCurrentPassword ? (
                                                    <EyeOpenIcon />
                                                ) : (
                                                    <EyeNoneIcon />
                                                )}
                                            </button>
                                        )}
                                    </div>
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
                                    <div className="flex flex-row">
                                        <Input
                                            placeholder="********"
                                            type={showNewPassword ? "text" : "password"}
                                            {...field}
                                            onChange={(e) => {
                                                field.onChange(e);
                                                setIsNewPasswordTyping(e.target.value.length > 0);
                                                if (e.target.value.length === 0) {
                                                    setShowNewPassword(false);
                                                }
                                            }}
                                        />
                                        {isNewPasswordTyping && (
                                            <button
                                                onClick={toggleNewPasswordVisibility}
                                                className="ml-4 text-gray-700"
                                            >
                                                {showNewPassword ? (
                                                    <EyeOpenIcon />
                                                ) : (
                                                    <EyeNoneIcon />
                                                )}
                                            </button>
                                        )}
                                    </div>
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
                                    <div className="flex flex-row">
                                        <Input
                                            placeholder="********"
                                            type={showConfirmPassword ? "text" : "password"}
                                            {...field}
                                            onChange={(e) => {
                                                field.onChange(e);
                                                setIsConfirmPasswordTyping(
                                                    e.target.value.length > 0
                                                );
                                                if (e.target.value.length === 0) {
                                                    setShowConfirmPassword(false);
                                                }
                                            }}
                                        />
                                        {isConfirmPasswordTyping && (
                                            <button
                                                onClick={toggleConfirmPasswordVisibility}
                                                className="ml-4 text-gray-700"
                                            >
                                                {showConfirmPassword ? (
                                                    <EyeOpenIcon />
                                                ) : (
                                                    <EyeNoneIcon />
                                                )}
                                            </button>
                                        )}
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <ChangePasswordButton userEmail={user.user_metadata.email} reset={reset} />
                </div>
            </form>
        </Form>
    );
}
