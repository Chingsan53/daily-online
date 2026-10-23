"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";

export default function BottomNav() {
  const pathname = usePathname();
  const { quantity } = useCart();

  return (
    <nav className="bottom-nav" aria-label="Quick navigation">
      <Link
        className={pathname === "/menu" || pathname === "/" ? "current" : ""}
        href="/menu"
      >
        ⌂ &nbsp;Menu
      </Link>
      <Link
        className={["/cart", "/checkout"].includes(pathname) ? "current" : ""}
        href="/cart"
      >
        ◫ &nbsp;Bag <span>{quantity}</span>
      </Link>
    </nav>
  );
}
