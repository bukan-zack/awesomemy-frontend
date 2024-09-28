"use client";

import clsx from "clsx";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useUserStore } from "@/app/lib/stores/user";
import { logoutUser } from "@/app/lib/http/user";

export function Navigation() {
    const [scrolled, setScrolled] = useState(false);
    const { user, setUser } = useUserStore();

    function handleLogout() {
        logoutUser()
            .then(() => setUser(null));
    }

    useEffect(() => {
        function handleScroll() {
            setScrolled(window.scrollY >= 25);
        }

        window.addEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav className={clsx(
            "uppercase z-10 border-b transition duration-500 ease-in-out sticky top-0 w-full h-14 flex flex-row items-center justify-between px-8 md:px-20",
            scrolled ? "border-white/10 bg-main-navy/70 backdrop-blur-sm" : "bg-transparent border-transparent"
        )}>
            <Link href="/">
                <img src="./logo.svg" className="w-20"/>
            </Link>
            <div className="gap-6 flex flex-row">
                <Link href="/directory">
                    Directory
                </Link>
            </div>
        </nav>
    );
}