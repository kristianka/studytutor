import React from "react";
import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems
} from "@headlessui/react";

import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import Link from "next/link";
import { User } from "@/types";
import { ProfileAvatar } from "./ProfileAvatar";

const navigation = [
    { name: "Dashboard", href: "/dashboard", current: false },
    { name: "Flashcards", href: "/flashcards", current: false },
    { name: "Study Chat", href: "/chat", current: false }
];
const userNavigation = [
    { name: "Log in", href: "/login" },
    { name: "Register", href: "/register" }
];

const userLoggedInNavigation = [{ name: "Log out", href: "/logout" }];

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

export default async function Navbar() {
    const supabase = createClient();
    const { data } = await supabase.auth.getUser();
    const user = data?.user as unknown as User | undefined;

    return (
        <>
            <div className="top-0 mb-10">
                <Disclosure
                    as="nav"
                    className="fixed left-0 top-0 z-50 w-full border-b-2 border-gray-100 bg-white"
                >
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 items-center justify-between">
                            <div className="flex items-center">
                                <Link href="/">
                                    <div className="flex items-center space-x-2 text-2xl font-medium text-indigo-600 dark:text-gray-100">
                                        <Image
                                            alt="Study Tutor"
                                            src="/img/logo.png"
                                            width="32"
                                            height="32"
                                            className="h-8 w-8"
                                        />
                                        <span>Study Tutor</span>
                                    </div>
                                </Link>
                                <div className="hidden md:block">
                                    <div className="ml-10 inline flex items-baseline space-x-4">
                                        {navigation.map((item) => (
                                            <a
                                                key={item.name}
                                                href={item.href}
                                                aria-current={item.current ? "page" : undefined}
                                                className={classNames(
                                                    item.current
                                                        ? "rounded-none border-b border-gray-300 px-4 pb-1 pt-2 text-base text-indigo-500 dark:text-gray-100"
                                                        : "rounded-none px-4 py-2 text-base font-normal text-gray-800 no-underline hover:text-indigo-500 focus:text-lg focus:text-indigo-500 dark:text-gray-100"
                                                )}
                                            >
                                                {item.name}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="hidden md:block">
                                {user ? (
                                    <div className="ml-auto mr-2 gap-3 lg:order-2 lg:ml-0 lg:flex">
                                        <Menu as="div" className="relative ml-3">
                                            <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-800">
                                                <span className="absolute -inset-1.5" />
                                                <span className="sr-only">Open user menu</span>
                                                <ProfileAvatar size={10} />
                                            </MenuButton>
                                            <MenuItems
                                                transition
                                                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                                            >
                                                <MenuItem>
                                                    <a
                                                        href="/settings"
                                                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-indigo-600 data-[focus]:text-white"
                                                    >
                                                        Settings
                                                    </a>
                                                </MenuItem>
                                                <MenuItem>
                                                    <a
                                                        href="/logout"
                                                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-indigo-600 data-[focus]:text-white"
                                                    >
                                                        Log out
                                                    </a>
                                                </MenuItem>
                                            </MenuItems>
                                        </Menu>
                                    </div>
                                ) : (
                                    <div className="ml-auto mr-2 gap-3 lg:order-2 lg:ml-0 lg:flex">
                                        <div className="nav__item mr-3 hidden lg:flex">
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
                                    </div>
                                )}
                            </div>
                            <div className="-mr-2 flex md:hidden">
                                {/* Mobile menu button */}
                                <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-gray-100 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                    <span className="absolute -inset-0.5" />
                                    <span className="sr-only">Open main menu</span>
                                    <Bars3Icon
                                        aria-hidden="true"
                                        className="block h-6 w-6 group-data-[open]:hidden"
                                    />
                                    <XMarkIcon
                                        aria-hidden="true"
                                        className="hidden h-6 w-6 group-data-[open]:block"
                                    />
                                </DisclosureButton>
                            </div>
                        </div>
                    </div>

                    <DisclosurePanel className="md:hidden">
                        <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                            {navigation.map((item) => (
                                <DisclosureButton
                                    key={item.name}
                                    as="a"
                                    href={item.href}
                                    aria-current={item.current ? "page" : undefined}
                                    className={classNames(
                                        item.current
                                            ? "bg-gray-900 text-white"
                                            : "text-gray-800 hover:bg-indigo-600 hover:text-white",
                                        "block rounded-md px-3 py-2 text-base font-medium"
                                    )}
                                >
                                    {item.name}
                                </DisclosureButton>
                            ))}
                        </div>
                        <div className="border-t border-gray-700 pb-3 pt-4">
                            <div className="mt-3 space-y-1 px-2">
                                {user
                                    ? userLoggedInNavigation.map((item) => (
                                          <DisclosureButton
                                              key={item.name}
                                              as="a"
                                              href={item.href}
                                              className="block rounded-md px-3 py-2 text-base font-medium text-gray-800 hover:bg-indigo-600 hover:text-white"
                                          >
                                              {item.name}
                                          </DisclosureButton>
                                      ))
                                    : userNavigation.map((item) => (
                                          <DisclosureButton
                                              key={item.name}
                                              as="a"
                                              href={item.href}
                                              className="block rounded-md px-3 py-2 text-base font-medium text-gray-800 hover:bg-indigo-600 hover:text-white"
                                          >
                                              {item.name}
                                          </DisclosureButton>
                                      ))}
                            </div>
                        </div>
                    </DisclosurePanel>
                </Disclosure>
            </div>
        </>
    );
}
