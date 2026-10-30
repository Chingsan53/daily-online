"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useCart } from "@/context/CartContext";
import OrderSummary from "@/components/OrderSummary";

export default function CheckoutPage() {
  const {
    cartItems,
    quantity,
    subtotal,
    orderType,
    setOrderType,
    customerName,
    setCustomerName,
    pickupTime,
    setPickupTime,
    placeOrder,
  } = useCart();

  if (!quantity) {
    return (
      <main className="mx-auto max-w-[1120px] px-4 pb-28 sm:px-5">
        <div className="page-heading">
          <Link href="/cart" className="back">
            <ArrowLeft />
          </Link>
          <h1 className="serif">Almost there.</h1>
        </div>
        <div>
          <h2 className="serif">Your bag is empty</h2>
          <Link href="/menu" className="primary">
            Explore the menu
          </Link>
        </div>
      </main>
    );
  }
  return (
    <main className="mx-auto w-full max-w-[1120px] px-4 pb-28 sm:px-5">
      <div className="page-heading">
        <Link href="/cart" className="back" aria-label="Back to bag">
          <ArrowLeft />
        </Link>
        <h1 className="serif">Almost there.</h1>
      </div>
      <form
        className="two-col grid grid-cols-[minmax(0,1fr)_330px] items-start gap-6"
        onSubmit={placeOrder}
      >
        <section className="panel">
          <h2 className="serif">Your details</h2>
          <label className="field">
            Name for your order
            <input
              required
              maxLength={60}
              autoComplete="name"
              placeholder="Your first name"
              value={customerName}
              onChange={(event) => setCustomerName(event.target.value)}
            />
          </label>
          <label className="field">
            Order type
            <select
              value={orderType}
              onChange={(event) => setOrderType(event.target.value)}
            >
              <option value="pickup">Pickup</option>
              <option value="delivery">Delivery (demo)</option>
            </select>
          </label>
          <label className="field">
            Preferred pickup time
            <select
              value={pickupTime}
              onChange={(event) => setPickupTime(event.target.value)}
            >
              <option>ASAP · about 20 minutes</option>
              <option>In about 30 minutes</option>
              <option>In about 45 minutes</option>
              <option>In about 1 hour</option>
            </select>
          </label>
          <div className="rounded-xl bg-[#faf0e9] p-4">
            <strong>Payment placeholder</strong>
            <p className="helper mb-0 mt-2">
              No payment is collected in this demo. You will not be charged.
            </p>
          </div>
        </section>
        <OrderSummary cartItems={cartItems} subtotal={subtotal}>
          <button className="primary w-full mt-3" type="submit">
            Place demo order
          </button>
          <p className="helper mt-3">
            This creates a sample confirmation only; the shop will not receive
            an order.
          </p>
        </OrderSummary>
      </form>
    </main>
  );
}
