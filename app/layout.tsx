import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import localFont from "next/font/local";
import clsx from "clsx";
import { Navigation } from "@/app/components/Navigation";
import "@/app/globals.css";
import { Authenticated } from "./Authenticated";
import { Suspense } from "react";
import { Toaster } from "sonner";

const outfit = Outfit({
    subsets: ["latin"],
    variable: "--font-outfit",
});

const calSans = localFont({
    src: "./fonts/CalSans-SemiBold.woff2",
    variable: "--font-cal-sans",
});

export const metadata: Metadata = {
    title: "AwesomeMY",
    description: "Your all-in-one hub for exploring groundbreaking innovations, disruptive startups, exclusive insights, and dynamic events shaping the Malaysian tech scene.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={clsx(outfit.variable, calSans.variable, "bg-[#0C0C0C] font-sans text-white/80")}>
                <Suspense>
                    <Authenticated>
                        <Navigation />
                        <Toaster />
                        {children}
                    </Authenticated>
                </Suspense>
            </body>
        </html>
    );
}
