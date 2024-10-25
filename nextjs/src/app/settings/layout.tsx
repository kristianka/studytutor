import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Settings - Study Tutor",
    description: "User settings"
};

export default function SettingsLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="min-h-96">
            <div className="mx-auto mt-10 max-w-7xl">{children}</div>
        </div>
    );
}
