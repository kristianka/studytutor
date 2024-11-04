import React from "react";
import { Container } from "@/components/landing_page/Container";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

export function Footer() {
    return (
        <div className="relative mt-auto border-t-2 border-gray-100">
            <Container>
                <div className="my-2 text-center text-sm text-gray-600 dark:text-gray-400">
                    <a
                        href="https://github.com/kristianka/studytutor"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-gray-600"
                    >
                        {" "}
                        <GitHubLogoIcon className="inline-block h-6 w-6" aria-hidden="true" />{" "}
                        <span className="ml-2">GitHub</span>{" "}
                    </a>
                </div>
            </Container>
        </div>
    );
}
