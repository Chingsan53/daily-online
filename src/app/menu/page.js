"use client";

import { useMemo, useState } from "react";
import { MapPin } from "lucide-react";
import { products, categories } from "@/data/products";
import MenuSearch from "@/components/MenuSearch";
import CategoryFilter from "@/components/CategoryFilter";
import FeaturedProduct from "@/components/FeaturedProduct";
import ProductCard from "@/components/ProductCard";

export default function MenuPage() {
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(
    () =>
      products.filter(
        (product) =>
          (category === "all" || product.category === category) &&
          `${product.name} ${product.tags} ${product.desc}`
            .toLowerCase()
            .includes(query.trim().toLowerCase()),
      ),
    [category, query],
  );

  const showFeature =
    !query.trim() && (category === "all" || category === "classic");

  return (
    <main className="mx-auto w-full max-w-[1120px] px-4 pb-28 sm:px-5">
      <section className="pb-5 pt-[26px] sm:pt-[34px]">
        <span className="eyebrow muted">FRESHLY MADE, EVERY DAY</span>
        <h1 className="serif my-2 max-w-[650px] text-[clamp(37px,6vw,66px)] font-bold leading-[1.05] tracking-[-.045em]">
          A little joy in every bite.
        </h1>
        <p className="muted">
          Hand-finished donuts, buttery pastries, and really good coffee.
        </p>
        <div className="mt-[18px] flex flex-wrap items-center gap-3">
          <span className="status">Open today · 5am–8pm</span>
          <span className="muted flex items-center gap-1 text-sm">
            <MapPin size={14} /> 1908 Hillhust Ave, Los Angeles, CA 90027
          </span>
        </div>
      </section>
      <MenuSearch query={query} setQuery={setQuery} />
      <CategoryFilter
        categories={categories}
        category={category}
        setCategory={setCategory}
      />
      {showFeature && <FeaturedProduct />}

      <div className="section-head">
        <h2 className="serif">The good stuff</h2>
        <p aria-live="polite">{filtered.length} treats</p>
      </div>
      {filtered.length ? (
        <div className="grid grid-cols-2 gap-[11px] sm:gap-[17px] md:grid-cols-3 lg:grid-cols-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <div className="icon">🍩</div>
          <h2 className="serif">No treats found</h2>
          <p>Try another search or category.</p>
          <button
            className="primary"
            onClick={() => {
              setQuery("");
              setCategory("all");
            }}
          >
            Show all treats
          </button>
        </div>
      )}
    </main>
  );
}
