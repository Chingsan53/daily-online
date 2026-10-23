"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const { quantity } = useCart();

  return (
    <header className="border-b border-[var(--line)] bg-[#fffaf3]">
      <div>
        <Link href="/menu" className="text-left">
          <span className="serif block text-[25px] font-bold leading-none">
            Daily Donuts
          </span>
          <span className="eyebrow muted mt-1 block">GOOD DAYS START HERE</span>
        </Link>
        <Link href="/cart" className="cart-button" aria-label="View Bag">
          <ShoppingBag size={17} />
          <span>Your Bag</span>
          <span className="count" aria-live="polite">
            {quantity}
          </span>
        </Link>
      </div>
    </header>
  );
}
