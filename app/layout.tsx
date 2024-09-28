import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import clsx from "clsx";
import { Navigation } from "@/app/components/Navigation";
import "@/app/globals.css";
import { Suspense } from "react";
import { Toaster } from "sonner";

const jetbrainsMono = JetBrains_Mono({
    subsets: ["latin"],
    variable: "--font-jetbrains-mono",
});

const mattoneBold = localFont({
    src: "./fonts/Mattone-Bold.woff2",
    variable: "--font-mattone-bold",
});

const mattone = localFont({
    src: "./fonts/Mattone-Bold.woff2",
    variable: "--font-mattone-regular",
});

export const metadata: Metadata = {
    title: "Tech in Malaysia",
    description: "Tech in Malaysia is a dynamic community dedicated to empowering and connecting Malaysian professionals in the technology sector.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={clsx(jetbrainsMono.variable, mattoneBold.variable, mattone.variable, "bg-main-navy font-sans text-white/80")}>
                <Suspense>
                    <Navigation />
                    <Toaster />
                    {children}
                </Suspense>
            </body>
        </html>
    );
}
