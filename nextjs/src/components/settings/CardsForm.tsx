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

const FormSchema = z.object({
    flashcards: z.number().int().min(0, "Amount of cards cannot be negative.")
});

export default function CardsForm() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
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
                <div className="my-6">
                    <Button type="submit">Update</Button>
                </div>
            </form>
        </Form>
    );
}
