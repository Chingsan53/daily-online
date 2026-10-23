"use client";

import { useCart } from "@/context/CartContext";

export default function FeaturedProduct() {
  const { addItem } = useCart();

  return (
    <article className="feature">
      <div className="feature-copy">
        <span>THE SEASONAL FAVORITE</span>
        <h2 className="serif">Strawberry sprinkle</h2>
        <p>
          Berry-pink glaze, a shower of sprinkles, and pure happiness. $2.50
        </p>
        <button className="primary mt-4" onClick={() => addItem("strawberry")}>
          Add to bag · $4.25
        </button>
      </div>
      <img
        src="https://images.pexels.com/photos/23203365/pexels-photo-23203365.jpeg"
        alt="Pink glazed donut with sprinkles against a pink background"
      />
    </article>
  );
}
