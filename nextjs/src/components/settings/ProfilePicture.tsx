import { useState, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ProfilePicture() {
    const [avatarUrl, setAvatarUrl] = useState("/placeholder.svg?height=100&width=100");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setAvatarUrl(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <>
            <Avatar className="h-32 w-32">
                <AvatarImage src={avatarUrl} alt="Profile picture" />
                <AvatarFallback>User</AvatarFallback>
            </Avatar>
            <div className="mt-8">
                <Button onClick={handleButtonClick}>Change Picture</Button>
                <Input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                />
            </div>
        </>
    );
}
