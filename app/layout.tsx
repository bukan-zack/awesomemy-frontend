import type { Metadata } from "next";
import { Gabarito } from "next/font/google";
import localFont from "next/font/local";
import clsx from "clsx";
import { Navigation } from "@/app/components/Navigation";
import "@/app/globals.css";
import { Suspense } from "react";
import { Toaster } from "sonner";
import { Footer } from "@/app/components/Footer";

const gabarito = Gabarito({
  subsets: ["latin"],
  variable: "--font-gabarito",
});

export const metadata: Metadata = {
  title: "Tech in Malaysia",
  description:
    "Tech in Malaysia is a dynamic community dedicated to empowering and connecting Malaysian professionals in the technology sector.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={clsx(gabarito.variable, "bg-black font-sans text-white/80")}
      >
        <Suspense>
          <div className="bg-dark-orange">
            <div className="max-w-6xl px-8 py-3 mx-auto">
              [INFO] AwesomeMY has merged with DeveloperMY to form Tech in
              Malaysia.
            </div>
          </div>
          <Navigation />
          <Toaster />
          {children}
          <Footer />
        </Suspense>
      </body>
    </html>
  );
}
