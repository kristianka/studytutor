import * as React from "react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

interface SettingsCardProps {
    amount: number;
    setAmount: (amount: number) => void;
    difficulty: string;
    setDifficulty: (difficulty: string) => void;
}

export default function SettingsCard({
    amount,
    setAmount,
    difficulty,
    setDifficulty
}: SettingsCardProps) {
    return (
        <Card className="w-auto">
            <CardHeader>
                <CardTitle>Settings</CardTitle>
                <CardDescription>Customize your learning experience.</CardDescription>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Cards</Label>
                            <Input
                                value={amount}
                                onChange={(e) => setAmount(parseInt(e.target.value))}
                                type="number"
                                id="name"
                                name="flashcardsAmount"
                                min={1}
                                max={9}
                                placeholder="Card may have multiple tasks."
                            />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="difficulty">Difficulty</Label>
                            <Select
                                value={difficulty}
                                onValueChange={setDifficulty}
                                name="flashcardsDifficulty"
                            >
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
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
