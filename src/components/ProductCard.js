"use client";

import { Plus } from "lucide-react";
import { money } from "@/data/products";
import { useCart } from "@/context/CartContext";

export default function ProductCard({ product }) {
  const { addItem } = useCart();

  return (
    <article className="product">
      <img loading="lazy" src={product.image} alt={product.alt} />
      <div className="product-info">
        <h3>{product.name}</h3>
        <p>{product.desc}</p>
        <div className="product-bottom">
          <span className="price">{money(product.price)}</span>
          <button
            className="add"
            type="button"
            onClick={() => addItem(product.id)}
            aria-label={`Add ${product.name}`}
          >
            <Plus size={21} />
          </button>
        </div>
      </div>
    </article>
  );
}
