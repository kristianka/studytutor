import React, { useState } from "react";
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
import { Button } from "@/components/ui/button";
import { User } from "@/types";

const FormSchema = z.object({
    firstName: z.string().min(1, "Firstname is required!"),
    lastName: z.string().min(1, "Firstname is required!"),
    email: z.string().min(1, "Email is required!").email("Invalid email!"),
    flashcards: z.number().int().min(0, "Amount of cards cannot be negative.")
});

export default function ProfileForm({ user }: { user: User }) {
    console.log(user);
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            firstName: user.user_metadata.first_name,
            lastName: user.user_metadata.last_name,
            email: "",
            flashcards: 5
        }
    });

    const onSubmit = async (values: z.infer<typeof FormSchema>) => {
        console.log(values);
        // Handle form submission, update user profile
    };

    const [amountOfCards, setAmountOfCards] = useState(5);

    const handleIncrement = () => {
        setAmountOfCards((prev) => prev + 1);
    };

    const handleDecrement = () => {
        setAmountOfCards((prev) => Math.max(0, prev - 1));
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value, 10);
        setAmountOfCards(isNaN(value) ? 0 : Math.max(0, value));
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
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

                    <div className="my-10">
                        <FormField
                            control={form.control}
                            name="flashcards"
                            render={() => (
                                <FormItem>
                                    <FormLabel>Default Amount of Flashcards</FormLabel>
                                    <FormControl>
                                        <div className="flex items-center space-x-4">
                                            <Button
                                                onClick={handleDecrement}
                                                aria-label="Decrease amount of cards"
                                            >
                                                -
                                            </Button>
                                            <Input
                                                type="number"
                                                value={amountOfCards}
                                                onChange={handleInputChange}
                                                className="w-20 text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                                                min="0"
                                                aria-label="Amount of cards"
                                            />
                                            <Button
                                                onClick={handleIncrement}
                                                aria-label="Increase amount of cards"
                                            >
                                                +
                                            </Button>
                                        </div>
                                    </FormControl>
                                    <FormMessage>
                                        {amountOfCards < 0 && "Amount of cards cannot be negative."}
                                    </FormMessage>
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button className="w-2/5 min-w-[120px] sm:min-w-[160px]" type="submit">
                        Save Changes
                    </Button>
                </div>
            </form>
        </Form>
    );
}
