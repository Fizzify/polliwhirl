import Link from "next/link";
import { useSession } from "next-auth/react";
import Button from "./elements/button";
import Image from "next/image";

const NavBar: React.FC = () => {
  const { data: session } = useSession();
  return (
    <nav className="container z-[999] mx-auto py-2">
      <div className="flex items-center justify-between">
        <Link href="/">
          <Image
            src="/full-logo.svg"
            alt="Polliwhirl."
            width={307}
            height={100}
          />
        </Link>
        <div className="flex space-x-6">
          <Link href="/sign-in">
            <Button>{!session ? "Sign In" : "Dashboard"}</Button>
          </Link>
          <Link href="https://github.com/Fizzify/polliwhirl" target="_blank">
            <Image
              className="invert transition hover:scale-110"
              src="/providers/github.svg"
              alt="Polliwhirl GitHub."
              width={50}
              height={50}
            ></Image>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
