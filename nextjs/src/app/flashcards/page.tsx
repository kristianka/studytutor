import FlashCard from "@/components/flashcard";
import Link from "next/link";

export default function Home() {
    return (
        <div>
            <h1 className="text-center text-3xl mt-10">Flash cards</h1>
            <div className="text-center mb-10">
                <Link href="/" className="font-bold">
                    Home
                </Link>
            </div>
            <FlashCard />
        </div>
    );
}
