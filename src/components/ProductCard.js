"use client";

import { Plus, SlidersHorizontal } from "lucide-react";
import { money } from "@/data/products";
import { useCart } from "@/context/CartContext";

export default function ProductCard({ product, onCustomize }) {
  const { addItem } = useCart();

  const hasModifiers = product.modifierGroups?.length > 0;

  const price = product.basePrice ?? product.price ?? 0;

  function handleAdd() {
    if (hasModifiers) {
      onCustomize?.();
    } else {
      addItem(product.id);
    }
  }

  return (
    <article className="product">
      <img
        loading="lazy"
        src={product.image}
        alt={product.alt || product.name}
      />
      <div className="product-info">
        <h3>{product.name}</h3>
        <p>{product.desc}</p>
        <div className="product-bottom">
          <span className="price">
            {hasModifiers ? `From ${money(product.price)}` : money(price)}
          </span>
          <button
            className="add"
            type="button"
            onClick={handleAdd}
            aria-label={
              hasModifiers ? `Customize ${product.name}` : `Add ${product.name}`
            }
          >
            {hasModifiers ? (
              <SlidersHorizontal size={19} />
            ) : (
              <Plus size={21} />
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
