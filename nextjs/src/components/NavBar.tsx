import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export default async function NavBar() {
    const supabase = createClient();
    const { data } = await supabase.auth.getUser();
    const user = data?.user;

    return (
        <header className="flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-white text-sm py-3 dark:bg-neutral-800">
            <nav className="max-w-7xl w-full mx-auto sm:flex sm:items-center sm:justify-between">
                <Link
                    className="flex-none font-semibold text-xl text-black focus:outline-none focus:opacity-80 dark:text-white"
                    href="/"
                    aria-label="Brand"
                >
                    Study tutor
                </Link>
                <div className="flex flex-row items-center gap-5 mt-5 sm:justify-end sm:mt-0 sm:ps-5">
                    <Link
                        className="font-medium text-gray-600 hover:text-gray-400 focus:outline-none focus:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500 dark:focus:text-neutral-500"
                        href="/"
                        aria-current="page"
                    >
                        Home
                    </Link>
                    <Link
                        className="font-medium text-gray-600 hover:text-gray-400 focus:outline-none focus:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500 dark:focus:text-neutral-500"
                        href="/flashcards"
                    >
                        Flash cards
                    </Link>
                    <a
                        className="font-medium text-gray-600 hover:text-gray-400 focus:outline-none focus:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500 dark:focus:text-neutral-500"
                        href="/"
                    >
                        Your studies
                    </a>
                    {user ? (
                        <Link
                            className="font-medium text-gray-600 hover:text-gray-400 focus:outline-none focus:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500 dark:focus:text-neutral-500"
                            href="/logout"
                        >
                            Logout
                        </Link>
                    ) : (
                        <>
                            <Link
                                className="font-medium text-gray-600 hover:text-gray-400 focus:outline-none focus:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500 dark:focus:text-neutral-500"
                                href="/register"
                            >
                                Register
                            </Link>
                            <Link
                                className="font-medium text-gray-600 hover:text-gray-400 focus:outline-none focus:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500 dark:focus:text-neutral-500"
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
