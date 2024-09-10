import Link from "next/link";

export default function Home() {
    return (
        <main className="">
            <h1 className="text-center text-3xl mt-10">Home</h1>
            <div className="text-center mb-10">
                <Link href="/flashcards" className="font-bold">
                    Flash cards
                </Link>
            </div>
        </main>
    );
}
