import { useState, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getProfilePicture } from "@/lib/profile";

export default function ProfilePicture() {
    const [avatar, setAvatar] = useState();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const data = await getProfilePicture();
        const file = e.target.files?.[0];
        if (file) {
            console.log(data);
            //const reader = new FileReader();
            //reader.onload = (e) => {
            //    setAvatarUrl(e.target?.result as string);
            //};
            //reader.readAsDataURL(file);
        }
    };

    const handleButtonClick = async () => {
        const response = await getProfilePicture();
        const data = await response.json();
        setAvatar(data);
    };

    return (
        <>
            <Avatar className="h-32 w-32">
                <AvatarImage src={avatar} alt="Profile picture" />
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
