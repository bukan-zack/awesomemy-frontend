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
    logoutUser().then(() => setUser(null));
  }

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY >= 25);
    }

    window.addEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={clsx(
        "uppercase z-10 border-b transition duration-500 ease-in-out sticky top-0 w-full h-20",
        scrolled
          ? "border-white/10 bg-black/70 backdrop-blur-sm"
          : "bg-transparent border-transparent",
      )}
    >
      <div className="flex flex-row items-center gap-12 max-w-6xl h-full px-12 mx-auto">
        <Link href="/">
          <img src="./logo.svg" className="w-20" />
        </Link>
        <div className="flex flex-row gap-12">
          <Link href="/about">About</Link>
          <Link href="/directory">Directory</Link>
        </div>
      </div>
    </nav>
  );
}
