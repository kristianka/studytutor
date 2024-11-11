"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LoadingSpinner } from "./LoadingSpinner";
import { fetchAvatar, useProfile } from "@/lib/profile";
import { useEffect, useState } from "react";

export interface ProfilePictureProps {
    size?: number;
}

// Fetches the user's profile picture and displays it. Used in the navbar
// and in the settings page.
export function ProfileAvatar({ size = 24 }: ProfilePictureProps) {
    const { data: profile, isLoading, isError } = useProfile();
    const [firstLetter, setFirstLetter] = useState<string>();
    const [lastLetter, setLastLetter] = useState<string>();
    const [avatarUrl, setAvatarUrl] = useState<string>();

    useEffect(() => {
        const updateAvatar = async () => {
            const currentFirstLetter = profile?.first_name.at(0);
            const currentLastLetter = profile?.last_name.at(0);

            //Only update the avatar if the first or last name has changed
            if (!currentFirstLetter || !currentLastLetter) return;

            const res = await fetchAvatar(currentFirstLetter, currentLastLetter);
            if (res.ok) {
                const blob = await res.blob();
                const url = URL.createObjectURL(blob);
                setAvatarUrl(url);
            }
        };

        if (profile) {
            const currentFirstLetter = profile.first_name.at(0);
            const currentLastLetter = profile.last_name.at(0);

            if (firstLetter !== currentFirstLetter || lastLetter !== currentLastLetter) {
                void updateAvatar();
                setFirstLetter(currentFirstLetter);
                setLastLetter(currentLastLetter);
            }
        }
    }, [profile, firstLetter, lastLetter]);

    if (isLoading) return <LoadingSpinner size={size} />;
    if (isError) return <div>Error loading Avatar</div>;

    return (
        <Avatar
            className={`h-${size} w-${size} rounded-full border-2 border-black hover:border-indigo-600`}
        >
            <AvatarImage src={avatarUrl} alt="Profile picture" />
            <AvatarFallback>User</AvatarFallback>
        </Avatar>
    );
}
