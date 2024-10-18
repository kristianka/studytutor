"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { User } from "@/types";
import ProfileForm from "./ProfileForm";
import ProfilePicture from "./ProfilePicture";
import PasswordForm from "./PasswordForm";

export default function SettingsCard({ user }: { user: User }) {
    return (
        <div className="container mx-auto p-6">
            <h1 className="mb-6 text-3xl font-bold">Settings</h1>

            <Card className="mb-4">
                <CardHeader className="text-xl font-semibold">Profile</CardHeader>
                <CardContent>
                    <div className="flex flex-col md:flex-row">
                        <div className="basis-3/5 p-8">
                            <ProfileForm user={user} />
                        </div>
                        <div className="basis-2/5 p-8">
                            <div className="">
                                <div className="ml-40 sm:my-10 md:my-2">
                                    <ProfilePicture />
                                </div>
                                <div className="ml-20 sm:my-10 md:my-10">
                                    <PasswordForm />
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}