"use client";

import { useEffect } from "react";
import { useUserStore } from "@/app/lib/stores/user";
import { redirect } from "next/navigation";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { user } = useUserStore();

    useEffect(() => {
        if (!user) {
            return redirect("/");
        };
    }, []);

    return children;
}