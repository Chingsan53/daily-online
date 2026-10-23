"use client";

export default function CategoryFilter({ categories, category, setCategory }) {
  return (
    <nav
      className="flex gap-[9px] overflow-x-auto py-5 [scrollbar-width:none]"
      aria-label="Menu categories"
    >
      {categories.map((item) => (
        <button
          key={item.id}
          type="button"
          className={`chip ${category === item.id ? "active" : ""}`}
          aria-pressed={category === item.id}
          onClick={() => setCategory(item.id)}
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
}
