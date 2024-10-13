import Link from "next/link";

export function Footer() {
  return (
    <footer className="max-w-6xl py-12 px-12 mx-auto grid md:grid-cols-3">
      <div className="flex flex-col gap-4">
        <Link href="/">
          <img src="./logo.svg" className="w-20" />
        </Link>
        <p className="text-sm">
          Copyright &copy; {new Date().getFullYear()} Zackry Rosli. All rights
          reserved.
        </p>
      </div>
      <div className="flex flex-col gap-4 mx-auto">
        <p className="uppercase text-sm">Discover</p>
        <Link href="/directory">User Directory</Link>
        <Link href="/about">About Us</Link>
        <Link href="/">Contact Us</Link>
      </div>
      <div className="flex flex-col gap-4 mx-auto">
        <p className="uppercase text-sm">Partners</p>
        <Link href="https://devtalk.my">DevTalk MY</Link>
      </div>
    </footer>
  );
}
