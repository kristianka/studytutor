import * as React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "../ui/input";
import Buttons from "./Buttons";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function LoginCard() {
    return (
        <div>
            <Card className="w-auto">
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                </CardHeader>
                <form>
                    <CardContent className="space-y-5">
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
                        <Buttons type="login" />
                    </CardContent>
                </form>
            </Card>
            <div className="mt-5 text-center text-sm text-gray-700">
                <div>
                    <Link href="/reset-password">
                        Forgot your password? Reset
                        <ChevronRight size={16} className="ml-1 inline" />
                    </Link>
                </div>
                <div className="mt-1">
                    <Link href="/register">
                        Don&apos;t have an account? Sign up
                        <ChevronRight size={16} className="ml-1 inline" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
