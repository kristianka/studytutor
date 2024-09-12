import * as React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "../ui/input";
import Buttons from "./Buttons";

export default function RegisterCard() {
    return (
        <Card className="w-auto">
            <CardHeader>
                <CardTitle>Register</CardTitle>
            </CardHeader>
            {/* remember to sort by newest first */}
            <form>
                <CardContent className="space-y-6">
                    <div>
                        <Label htmlFor="name">Name</Label>
                        <Input
                            name="name"
                            id="name"
                            type="name"
                            className="w-full border border-foreground/20 rounded-md px-4 py-2 text-foreground"
                        />
                    </div>
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            name="email"
                            id="email"
                            type="email"
                            className="w-full border border-foreground/20 rounded-md px-4 py-2 text-foreground"
                        />
                    </div>
                    <div>
                        <Label htmlFor="password">Password</Label>
                        <Input
                            name="password"
                            id="password"
                            type="password"
                            className="w-full border border-foreground/20 rounded-md px-4 py-2 text-foreground"
                        />
                    </div>
                    <Buttons type="register" />
                </CardContent>
            </form>
        </Card>
    );
}
