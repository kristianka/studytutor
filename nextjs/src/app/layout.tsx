import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Study Tutor",
    description: "Ace your exams with Study Tutor"
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <div className="min-h-screen flex flex-col">
                    <NavBar />
                    <div className="m-5">{children}</div>
                </div>
            </body>
        </html>
    );
}
