"use client";

import { Search, X } from "lucide-react";

export default function MenuSearch({ query, setQuery }) {
  return (
    <>
      <label htmlFor="menu-search" className="sr-only">
        Search the menu
      </label>
      <div className="search-wrap">
        <Search size={19} className="shrink-0 text-[var(--muted)]" />
        <input
          id="menu-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search donuts, coffee, pastries..."
          autoComplete="off"
        />
        {query && (
          <button aria-label="Clear search" onClick={() => setQuery("")}>
            <X size={17} />
          </button>
        )}
      </div>
    </>
  );
}
