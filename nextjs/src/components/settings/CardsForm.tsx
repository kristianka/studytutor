import React, { useState, useEffect } from "react";
import { CardsDifficultyLabels } from "@/types";
import { Input } from "@/components/ui/input";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { UpdateCardsButton } from "./Buttons";
import { useProfile } from "@/lib/profile";
import { Label } from "../ui/label";

// Form to update the default amount of flashcards and the default difficulty of flashcards
export default function CardsForm({ userId }: { userId: string }) {
    const { data: profile } = useProfile();
    const [difficulty, setDifficulty] = useState<string>("medium");
    const [amountOfCards, setAmountOfCards] = useState<number>(5);

    useEffect(() => {
        if (profile) {
            setDifficulty(CardsDifficultyLabels[profile.cards_default_difficulty]);
            setAmountOfCards(profile.cards_default_amount);
        }
    }, [profile]);

    const handleIncrement = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setAmountOfCards((prev) => (prev !== undefined ? prev + 1 : 1));
    };

    const handleDecrement = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setAmountOfCards((prev = 0) => Math.max(0, prev - 1));
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value, 10);
        setAmountOfCards(isNaN(value) ? 0 : Math.max(0, value));
    };

    return (
        <form>
            <div className="grid w-full items-center gap-6">
                <div className="flex flex-col space-y-4">
                    <Label>Default Amount of Flashcards</Label>
                    <div className="flex items-center space-x-4">
                        <Button onClick={handleDecrement} aria-label="Decrease amount of cards">
                            -
                        </Button>
                        <Input
                            aria-label="Amount of cards"
                            type="number"
                            name="cardsAmount"
                            id="cardsAmount"
                            value={amountOfCards}
                            onChange={handleInputChange}
                            className="w-20 text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                        />
                        <Button onClick={handleIncrement} aria-label="Increase amount of cards">
                            +
                        </Button>
                    </div>
                </div>
                <div className="flex flex-col space-y-4">
                    <Label htmlFor="difficulty">Default Difficulty of Flashcards</Label>
                    <Select name="difficulty" value={difficulty} onValueChange={setDifficulty}>
                        <SelectTrigger id="difficulty">
                            <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                            <SelectItem value="easy">Easy</SelectItem>
                            <SelectItem value="normal">Normal</SelectItem>
                            <SelectItem value="hard">Hard</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <UpdateCardsButton userId={userId} />
            </div>
        </form>
    );
}
