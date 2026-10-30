"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function ConfirmationPage() {
  const { confirmation, orderNumber, resetOrder } = useCart();

  return (
    <main className="mx-auto w-ful max-w-[1120px] px-4 pb-28 sm:px-5">
      <div className="panel confirmation">
        <div className="big-icon">🍩</div>
        <span className="eyebrow muted">DEMO CONFIRMATION</span>
        <h1 className="serif text-4xl mt-3">Sweet choice!</h1>
        <p aria-live="polite">
          {confirmation ||
            "Tis is a demo confirmation. Place a sample order to see your order details here."}
        </p>
        {orderNumber && (
          <p>
            <strong>Sample order number: {orderNumber}</strong>
          </p>
        )}
        <div className="timeline">
          <div>
            <strong>Order drafted</strong>
            <br />
            <small>Your sample order is ready to review.</small>
          </div>
          <div>
            <strong>Preparing</strong>
            <br />
            <small>A real shop has not received this order.</small>
          </div>
          <div>
            <strong>Read for pickup</strong>
            <br />
            <small>In a live app, you&apos;d get a pickup notification.</small>
          </div>
          <p className="helper">
            For a real pickup, visit the shop only after receiving an actual
            order confirmation. This is a sample experience.
          </p>
          <Link href="/menu" className="primary" onClick={resetOrder}>
            Back to the menu
          </Link>
        </div>
      </div>
    </main>
  );
}
