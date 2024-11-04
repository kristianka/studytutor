import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import { Container } from "@/components/landing_page/Container";
import heroImg from "../../../public/img/picture1.png";
import Link from "next/link";
import { User } from "@/types";

export const Hero = async () => {
    const supabase = createClient();
    const { data } = await supabase.auth.getUser();
    const user = data?.user as unknown as User | undefined;

    return (
        <>
            <Container className="flex flex-wrap">
                <div className="flex w-full items-center lg:w-1/2">
                    <div className="mb-8 max-w-2xl">
                        <h1 className="mb-4 text-4xl font-bold leading-snug tracking-tight text-gray-800 dark:text-white lg:text-4xl lg:leading-tight xl:text-6xl xl:leading-tight">
                            Study Tutor
                        </h1>
                        <h1 className="hanging-indent mb-4 text-3xl font-bold leading-snug tracking-tight text-gray-800 dark:text-white lg:text-3xl lg:leading-tight xl:text-4xl xl:leading-tight">
                            Your AI-Powered Study Companion
                        </h1>
                        <p className="py-5 text-xl leading-normal text-gray-500 dark:text-gray-300 lg:text-xl xl:text-2xl">
                            Unlock your full potential with Study Tutor. It is your personal
                            AI-powered study assistant designed to make learning more efficient and
                            enjoyable.
                        </p>
                        <p className="py-5 text-xl leading-normal text-gray-500 dark:text-gray-300 lg:text-xl xl:text-2xl">
                            Begin now and boost your learning!
                        </p>
                        {user ? (
                            <div className="flex flex-row items-start space-y-3 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0">
                                <Link
                                    href="/dashboard"
                                    id="dashboardButton"
                                    className="rounded-md bg-indigo-600 px-6 py-2 text-white md:ml-5"
                                >
                                    Dashboard
                                </Link>

                                <Link
                                    href="/flashcards"
                                    id="flashcardsButton"
                                    className="rounded-md bg-indigo-600 px-6 py-2 text-white md:ml-5"
                                >
                                    Flashcards
                                </Link>

                                <Link
                                    href="/chat"
                                    id="chatButton"
                                    className="rounded-md bg-indigo-600 px-6 py-2 text-white md:ml-5"
                                >
                                    Study Chat
                                </Link>
                            </div>
                        ) : (
                            <div className="flex flex-row items-start space-y-3 sm:flex-row sm:items-start sm:space-x-4 sm:space-y-0">
                                <Link
                                    href="/login"
                                    className="rounded-md bg-indigo-600 px-6 py-2 text-white md:ml-5"
                                >
                                    Log In
                                </Link>

                                <Link
                                    href="/register"
                                    className="rounded-md bg-indigo-600 px-6 py-2 text-white md:ml-5"
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex w-full items-center justify-center lg:w-1/2">
                    <div className="">
                        <Image
                            src={heroImg}
                            width="616"
                            height="617"
                            className={"object-cover"}
                            alt="Hero Illustration"
                            loading="eager"
                            placeholder="blur"
                        />
                    </div>
                </div>
            </Container>
        </>
    );
};
