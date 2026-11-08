"use client";

import { useEffect, useMemo, useState } from "react";
import { MapPin } from "lucide-react";
import { getProducts } from "@/lib/products";
import { categories } from "@/data/products";
// import { products, categories } from "@/data/products";
// import { products, categories } from "@/lib";
import MenuSearch from "@/components/MenuSearch";
import CategoryFilter from "@/components/CategoryFilter";
import FeaturedProduct from "@/components/FeaturedProduct";
import ProductCard from "@/components/ProductCard";
import ProductCustomizationModal from "@/components/ProductCustomizationModal";
import { useCart } from "@/context/CartContext";

export default function MenuPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");

  const [selectedProduct, setSelectedProduct] = useState(null);

  const { addCustomizedItem } = useCart();

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Failed to laod products:", error);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  const filtered = useMemo(() => {
    const search = query.trim().toLowerCase();

    return products.filter((product) => {
      const matchesCategory =
        category === "all" || product.category === category;

      const modifierText = (product.modifierGroups || [])
        .flatMap((group) => [
          group.name,
          ...(group.options || []).map((option) => option.name),
        ])
        .join(" ");

      const searchableText = [
        product.name,
        product.tags,
        product.desc,
        modifierText,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return matchesCategory && searchableText.includes(search);
    });
  }, [products, category, query]);

  const showFeature =
    !query.trim() && (category === "all" || category === "classic");

  const groupedProducts = useMemo(() => {
    return categories
      .filter((cat) => cat.id !== "all")
      .filter((cat) => category === "all" || cat.id === category)
      .map((cat) => ({
        ...cat,
        products: filtered.filter((product) => product.category === cat.id),
      }))
      .filter((cat) => cat.products.length > 0);
  }, [category, filtered]);

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

      {/* <div className="section-head">
        <h2 className="serif">The good stuff</h2>
        <p aria-live="polite">{filtered.length} treats</p>
      </div> */}
      {loading ? (
        <p className="py-10 text-center">Loading menu...</p>
      ) : groupedProducts.length > 0 ? (
        <div className="space-y-7">
          {groupedProducts.map((group, index) => (
            <section key={group.id}>
              {index > 0 && <div className="mb-6 border-t border-stone-200" />}

              <div className="mb-4 flex items-center justify-between">
                <h3 className="serif text-2xl">{group.label}</h3>

                <span className="muted text-sm">
                  {group.products.length} items
                </span>
              </div>

              <div className="grid grid-cols-2 gap-[11px] sm:gap-[17px] md:grid-cols-3 lg:grid-cols-4">
                {group.products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onCustomize={() => setSelectedProduct(product)}
                  />
                ))}
              </div>
            </section>
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

      {selectedProduct && (
        <ProductCustomizationModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={addCustomizedItem}
        />
      )}
    </main>
  );
}
