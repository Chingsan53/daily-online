"use client";

import Link from "next/link";
import { ArrowLeft, Minus, Plus } from "lucide-react";
import { money } from "@/data/products";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const {
    cartItems,
    quantity,
    subtotal,
    addItem,
    removeItem,
    orderType,
    setOrderType,
  } = useCart();

  return (
    <main className="mx-auto w-full max-w-[1120px] px-4 pb-28 sm:px-5">
      <div className="page-heading">
        <Link href="/menu" className="back" aria-label="Back to menu">
          <ArrowLeft />
        </Link>
        <h1 className="serif">Your bag</h1>
      </div>

      {!quantity ? (
        <div className="empty">
          <div className="icon"></div>
          <h2 className="serif">Your bag is waiting</h2>
          <p>Let&apos;s find something delecious.</p>
          <Link className="primary" href="/menu">
            Explore the menu
          </Link>
        </div>
      ) : (
        <div className="">
          <section className="panel">
            <h2 className="serif">Your treats</h2>
            {cartItems.map((product) => (
              <div className="cart-row" key={product.id}>
                <img src={product.image} alt="" />
                <div className="cart-row-main">
                  <strong>{product.name}</strong>
                  <small>{money(product.price)} each</small>
                  <div className="row-actions">
                    <div className="stepper">
                      <button
                        onClick={() => addItem(product.id, -1)}
                        aria-label={`Remove one ${product.name}`}
                      >
                        <Minus size={14} />
                      </button>
                      <span>{product.qty}</span>
                      <button
                        onClick={() => addItem(product.id)}
                        aria-label={`Add one ${product.name}`}
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <button
                      className="remove"
                      onClick={() => removeItem(product.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </section>
          <aside className="panel">
            <h2 className="serif">How would you like it?</h2>
            <div className="choice-row">
              {["pickup", "delivery"].map((type) => (
                <button
                  key={type}
                  className={`choice ${orderType === type ? "selected" : ""}`}
                  aria-pressed={orderType === type}
                  onClick={() => setOrderType(type)}
                >
                  {type === "pickup" ? "Pickup" : "Delivery"}{" "}
                </button>
              ))}
            </div>
            <p className="helper mt-3">
              {orderType === "pickup"
                ? "Estimated Pickup: about 20 minutes."
                : "Delivery is a demo option; no address or delivery service is connected."}
            </p>
            <div className="summary-line total">
              <span>Subtotal</span>
              <span>{money(subtotal)}</span>
            </div>
            <Link className="primary w-full mt-3" href="/checkout">
              Continue to checkout
            </Link>
            <p className="helper mt-3">
              Demo ordering only. No payment or order will be sent.
            </p>
          </aside>
        </div>
      )}
    </main>
  );
}
