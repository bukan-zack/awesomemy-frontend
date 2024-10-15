import Link from "next/link";

export function Footer() {
  return (
    <footer className="max-w-6xl py-12 px-8 mx-auto grid md:grid-cols-4 gap-6">
      <div className="flex flex-col gap-4">
        <Link href="/">
          <img src="./logo.svg" className="w-20" />
        </Link>
        <p className="text-sm">
          Copyright &copy; {new Date().getFullYear()} Zackry Rosli. All rights
          reserved.
        </p>
        <div className="flex flex-row gap-4">
          <Link href="https://x.com/techinmalaysia">
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m3 21l7.548-7.548M21 3l-7.548 7.548m0 0L8 3H3l7.548 10.452m2.904-2.904L21 21h-5l-5.452-7.548" color="currentColor"></path></svg>
          </Link>
          <Link href="https://linkedin.com/company/techinmy">
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512"><path fill="currentColor" d="M444.17 32H70.28C49.85 32 32 46.7 32 66.89v374.72C32 461.91 49.85 480 70.28 480h373.78c20.54 0 35.94-18.21 35.94-38.39V66.89C480.12 46.7 464.6 32 444.17 32m-273.3 373.43h-64.18V205.88h64.18ZM141 175.54h-.46c-20.54 0-33.84-15.29-33.84-34.43c0-19.49 13.65-34.42 34.65-34.42s33.85 14.82 34.31 34.42c-.01 19.14-13.31 34.43-34.66 34.43m264.43 229.89h-64.18V296.32c0-26.14-9.34-44-32.56-44c-17.74 0-28.24 12-32.91 23.69c-1.75 4.2-2.22 9.92-2.22 15.76v113.66h-64.18V205.88h64.18v27.77c9.34-13.3 23.93-32.44 57.88-32.44c42.13 0 74 27.77 74 87.64Z"></path></svg>
          </Link>
          <Link href="https://github.com/techinmy">
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2"></path></svg>
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-2 md:mx-auto">
        <p className="uppercase text-sm">Discover TechMY</p>
        <Link href="/who-we-are">Who We Are</Link>
        <Link href="/governing-board">Governing Board</Link>
      </div>
      <div className="flex flex-col gap-2 md:mx-auto">
        <p className="uppercase text-sm">Community</p>
        <Link href="/showcase">Showcase</Link>
        <Link href="/showcase">Code of Conduct</Link>
      </div>
      <div className="flex flex-col gap-2 md:mx-auto">
        <p className="uppercase text-sm">Partners</p>
        <Link href="https://devtalk.my">DevTalk MY</Link>
      </div>
    </footer>
  );
}
