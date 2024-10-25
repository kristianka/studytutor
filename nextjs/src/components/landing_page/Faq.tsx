"use client";
import React from "react";
import { Container } from "@/components/landing_page/Container";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/24/solid";

export const Faq = () => {
    return (
        <Container className="!p-0">
            <div className="mx-auto w-full max-w-2xl rounded-2xl p-2">
                {faqdata.map((item) => (
                    <div key={item.question} className="mb-5">
                        <Disclosure>
                            {({ open }) => (
                                <>
                                    <DisclosureButton className="dark:bg-trueGray-800 flex w-full items-center justify-between rounded-lg bg-gray-50 px-4 py-4 text-left text-lg text-gray-800 hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-indigo-100 focus-visible:ring-opacity-75 dark:text-gray-200">
                                        <span>{item.question}</span>
                                        <ChevronUpIcon
                                            className={`${
                                                open ? "rotate-180 transform" : ""
                                            } h-5 w-5 text-indigo-500`}
                                        />
                                    </DisclosureButton>
                                    <DisclosurePanel className="px-4 pb-2 pt-4 text-gray-500 dark:text-gray-300">
                                        {item.answer}
                                    </DisclosurePanel>
                                </>
                            )}
                        </Disclosure>
                    </div>
                ))}
            </div>
        </Container>
    );
};

const faqdata = [
    {
        question: "Is this app free to use?",
        answer: "Yes, it is free."
    },
    {
        question: "Do you offer technical support? ",
        answer: "To be decided."
    }
];
