import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";

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
                <div className="flex min-h-screen flex-col">
                    <Navbar />
                    <div className="m-5">{children}</div>
                    <Footer />
                </div>
            </body>
        </html>
    );
}
