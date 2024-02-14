"use client";

import clsx from "clsx";
import Link from "next/link";
import { useEffect, useState } from "react";

export function Navigation() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        function handleScroll() {
            setScrolled(window.scrollY >= 25);
        }

        window.addEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav className={clsx(
            "border-b transition duration-500 ease-in-out sticky top-0 w-full h-14 flex flex-row items-center justify-between px-8",
            scrolled ? "border-white/10 bg-[#080808]/80 backdrop-blur-sm" : "bg-transparent border-transparent"
        )}>
            <Link href="/">
                <h1 className="text-2xl text-white">
                    AwesomeMY
                </h1>
            </Link>
            <div className="gap-4 flex flex-row">
                <Link href="https://github.com/awesome-my">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 16 16">
                        <path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59c.4.07.55-.17.55-.38c0-.19-.01-.82-.01-1.49c-2.01.37-2.53-.49-2.69-.94c-.09-.23-.48-.94-.82-1.13c-.28-.15-.68-.52-.01-.53c.63-.01 1.08.58 1.23.82c.72 1.21 1.87.87 2.33.66c.07-.52.28-.87.51-1.07c-1.78-.2-3.64-.89-3.64-3.95c0-.87.31-1.59.82-2.15c-.08-.2-.36-1.02.08-2.12c0 0 .67-.21 2.2.82c.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82c.44 1.1.16 1.92.08 2.12c.51.56.82 1.27.82 2.15c0 3.07-1.87 3.75-3.65 3.95c.29.25.54.73.54 1.48c0 1.07-.01 1.93-.01 2.2c0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8">
                        </path>
                    </svg>
                </Link>
            </div>
        </nav>
    );
}