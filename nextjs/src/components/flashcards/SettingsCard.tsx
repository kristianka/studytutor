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

export default function SettingsCard() {
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
                                type="number"
                                id="name"
                                placeholder="Card may have multiple tasks."
                            />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="difficulty">Difficulty</Label>
                            <Select>
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
