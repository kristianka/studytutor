import Image from "next/image";
import { Container } from "@/components/ui/Container";
import heroImg from "../../../public/img/picture1.png";

export const Hero = () => {
    return (
        <>
            <Container className="flex flex-wrap">
                <div className="flex w-full items-center lg:w-1/2">
                    <div className="mb-8 max-w-2xl">
                        <h1 className="text-4xl font-bold leading-snug tracking-tight text-gray-800 dark:text-white lg:text-4xl lg:leading-tight xl:text-6xl xl:leading-tight">
                            Study Tutor
                        </h1>
                        <h1 className="text-4xl font-bold leading-snug tracking-tight text-gray-800 dark:text-white lg:text-4xl lg:leading-tight xl:text-6xl xl:leading-tight">
                            - Your AI-Powered Study Companion
                        </h1>
                        <p className="py-5 text-xl leading-normal text-gray-500 dark:text-gray-300 lg:text-xl xl:text-2xl">
                            Unlock your full potential with Study Tutor. Study Tutor is your
                            personal AI-powered study assistant designed to make learning more
                            efficient and enjoyable.
                        </p>
                        <p className="py-5 text-xl leading-normal text-gray-500 dark:text-gray-300 lg:text-xl xl:text-2xl">
                            Get started now and transform your learning experience!
                        </p>
                        <div className="flex flex-col items-start space-y-3 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0">
                            <a
                                href="https://web3templates.com/templates/nextly-landing-page-template-for-startups"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-md bg-indigo-600 px-8 py-4 text-center text-lg font-medium text-white"
                            >
                                Log In
                            </a>
                            <a
                                href="https://web3templates.com/templates/nextly-landing-page-template-for-startups"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded-md bg-indigo-600 px-8 py-4 text-center text-lg font-medium text-white"
                            >
                                Sing Up
                            </a>
                        </div>
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
