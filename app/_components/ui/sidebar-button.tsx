"use client";
import { Button } from "./button";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
  children: React.ReactNode;
  href: string;
}

const SidebarButton = ({ children, href }: SidebarProps) => {
  const pathname = usePathname();
  return (
    <Button
      variant={pathname === href ? "secondary" : "ghost"}
      className="justify-start gap-2"
      asChild
    >
      <Link href={href}>{children}</Link>
    </Button>
  );
};

export default SidebarButton;
