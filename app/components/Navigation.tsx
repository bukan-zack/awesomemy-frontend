"use client";

import clsx from "clsx";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useUserStore } from "@/app/lib/stores/user";
import { logoutUser } from "@/app/lib/http/user";
import { Dialog, DialogPanel } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
    <>
      <nav
        className={clsx(
          "uppercase z-10 border-b transition duration-500 ease-in-out sticky top-0 w-full h-20",
          scrolled
            ? "border-white/10 bg-black/70 backdrop-blur-sm"
            : "bg-transparent border-transparent",
        )}
      >
        <div className="flex flex-row items-center justify-between gap-12 max-w-6xl h-full px-8 mx-auto">
          <Link href="/">
            <img src="./logo.svg" className="w-20" />
          </Link>
          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20"><path fill="currentColor" fillRule="evenodd" d="M2 4.75A.75.75 0 0 1 2.75 4h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 4.75M2 10a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 10m0 5.25a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75" clipRule="evenodd"></path></svg>
          </button>
          </div>
      </nav>
      <AnimatePresence>
        {mobileMenuOpen && (
          <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="md:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { ease: "easeOut", delay: 0.6, duration: 0.6 } }}
              transition={{ when: "before_children", duration: 0.6, ease: "easeIn" }}
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
            />
            <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto px-8 py-6">
              <div className="flex flex-row justify-between items-center">
                <Link href="/">
                  <motion.img 
                    src="./logo.svg"
                    className="w-20" 
                    initial={{ opacity: 0, translateX: -20 }}
                    animate={{ opacity: 1, translateX: 0 }}
                    exit={{ opacity: 0, translateY: 20 }}
                    transition={{ when: "after_children", duration: 0.6, ease: "easeInOut" }}
                  />
                </Link>
                <motion.button
                  initial={{ opacity: 0, translateX: 20 }}
                  animate={{ opacity: 1, translateX: 0 }}
                  exit={{ opacity: 0, translateX: 0, translateY: 20 }}
                  transition={{ when: "after_children", duration: 0.6, ease: "easeInOut" }}
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12"></path></svg>
                </motion.button>
              </div>
              <motion.div 
                initial={{ opacity: 0, translateY: -20 }}
                animate={{ opacity: 1, translateY: 0 }}
                exit={{ opacity: 0, translateY: 20 }}
                transition={{ when: "before_children", duration: 0.6, ease: "easeInOut" }}
                className="mt-5"
              >
                <Link href="/showcase">Community Showcase</Link>
              </motion.div>
            </DialogPanel>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  );
}
