import * as React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "../ui/input";
import Buttons from "./Buttons";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function RegisterCard() {
    return (
        <div>
            <Card className="w-auto">
                <CardHeader>
                    <CardTitle>Register</CardTitle>
                </CardHeader>
                <form>
                    <CardContent className="space-y-5">
                        <div className="grid grid-cols-2 gap-x-5">
                            <div className="col-span-1">
                                <Label htmlFor="firstName">First name</Label>
                                <Input
                                    name="firstName"
                                    id="firstName"
                                    type="text"
                                    className="w-full rounded-md border border-foreground/20 px-4 py-2 text-foreground"
                                />
                            </div>
                            <div className="col-span-1">
                                <Label htmlFor="lastName">Last name</Label>
                                <Input
                                    name="lastName"
                                    id="lastName"
                                    type="text"
                                    className="w-full rounded-md border border-foreground/20 px-4 py-2 text-foreground"
                                />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                                name="email"
                                id="email"
                                type="email"
                                className="w-full rounded-md border border-foreground/20 px-4 py-2 text-foreground"
                            />
                        </div>
                        <div>
                            <Label htmlFor="password">Password</Label>
                            <Input
                                name="password"
                                id="password"
                                type="password"
                                className="w-full rounded-md border border-foreground/20 px-4 py-2 text-foreground"
                            />
                        </div>
                        <Buttons type="register" />
                    </CardContent>
                </form>
            </Card>
            <div className="mt-5 text-center text-sm text-gray-700">
                <div className="mt-1">
                    <Link href="/login">
                        Already have an account? Sign in
                        <ChevronRight size={16} className="ml-1 inline" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
