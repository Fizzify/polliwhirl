import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import Button from "./elements/button";

const NavBar: React.FC = () => {
  const { data: session } = useSession();
  return (
    <nav className="container z-[999] mx-auto py-2">
      <div className="flex items-center justify-between">
        <Link href="/">
          <img src="/full-logo.svg" alt="Polliwhirl." />
        </Link>
        <Link href="/sign-in">
          <Button>{!session ? "Sign In" : "Dashboard"}</Button>
        </Link>
      </div>
    </nav>
  );
};

interface INavItem {
  children: React.ReactNode;
  href: string;
}

const NavItem: React.FC<INavItem> = ({ children, href }: INavItem) => {
  return (
    <li className="text-white">
      <Link href={href}>{children}</Link>
    </li>
  );
};

export default NavBar;
