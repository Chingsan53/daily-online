"use client";

import { money } from "@/data/products";

export default function OrderSummary({ cartItems, subtotal, children }) {
  return (
    <aside className="panel">
      <h2 className="serif">Order summary</h2>
      {cartItems.map((product) => (
        <div className="summary-line" key={product.id}>
          <span>
            {product.qty} × {product.name}
          </span>
          <strong>{money(product.qty * product.price)}</strong>
        </div>
      ))}
      <div className="summary-line total">
        <span>Subtotal</span>
        <span>{money(subtotal)}</span>
      </div>
      {children}
    </aside>
  );
}
