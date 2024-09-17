import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export default async function NavBar() {
    const supabase = createClient();
    const { data } = await supabase.auth.getUser();
    const user = data?.user;

    return (
        <header className="flex w-full flex-wrap bg-white px-5 py-3 text-sm dark:bg-neutral-800 sm:flex-nowrap sm:justify-start">
            <nav className="mx-auto w-full max-w-7xl sm:flex sm:items-center sm:justify-between">
                <Link
                    className="flex-none text-xl font-semibold text-black focus:opacity-80 focus:outline-none dark:text-white"
                    href="/"
                    aria-label="Brand"
                >
                    Study tutor
                </Link>
                <div className="mt-5 flex flex-row items-center gap-5 sm:mt-0 sm:justify-end sm:ps-5">
                    <Link
                        className="font-medium text-gray-600 hover:text-gray-400 focus:text-gray-400 focus:outline-none dark:text-neutral-400 dark:hover:text-neutral-500 dark:focus:text-neutral-500"
                        href="/"
                        aria-current="page"
                    >
                        Home
                    </Link>
                    <Link
                        className="font-medium text-gray-600 hover:text-gray-400 focus:text-gray-400 focus:outline-none dark:text-neutral-400 dark:hover:text-neutral-500 dark:focus:text-neutral-500"
                        href="/flashcards"
                    >
                        Flash cards
                    </Link>
                    <a
                        className="font-medium text-gray-600 hover:text-gray-400 focus:text-gray-400 focus:outline-none dark:text-neutral-400 dark:hover:text-neutral-500 dark:focus:text-neutral-500"
                        href="/"
                    >
                        Your studies
                    </a>
                    {user ? (
                        <Link
                            className="font-medium text-gray-600 hover:text-gray-400 focus:text-gray-400 focus:outline-none dark:text-neutral-400 dark:hover:text-neutral-500 dark:focus:text-neutral-500"
                            href="/logout"
                        >
                            Logout
                        </Link>
                    ) : (
                        <>
                            <Link
                                className="font-medium text-gray-600 hover:text-gray-400 focus:text-gray-400 focus:outline-none dark:text-neutral-400 dark:hover:text-neutral-500 dark:focus:text-neutral-500"
                                href="/register"
                            >
                                Register
                            </Link>
                            <Link
                                className="font-medium text-gray-600 hover:text-gray-400 focus:text-gray-400 focus:outline-none dark:text-neutral-400 dark:hover:text-neutral-500 dark:focus:text-neutral-500"
                                href="/login"
                            >
                                Login
                            </Link>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
}
