export const products = [
  {
    id: "glazed",
    name: "Original Glazed",
    price: 1.95,
    category: "classic",
    desc: "Pillowy dough, delicate vanilla glaze.",
    image:
      "https://www.pexels.com/photo/delicious-assortment-of-fresh-glazed-donuts-30512881/",
    alt: "Fresh doughnuts stacked on a wooden board",
    tags: "original glazed classic vanilla donut",
  },
  {
    id: "chocolate",
    name: "Chocolate Frosted",
    price: 1.95,
    category: "classic",
    desc: "Rich chocolate icing on a soft ring.",
    image:
      "https://www.pexels.com/photo/delicious-assortment-of-fresh-glazed-donuts-30512881/",
    alt: "Glossy chocolate-covered donut",
    tags: "chocolate frosted classic donut",
  },
];

export const categories = [
  { id: "all", label: "All treats" },
  { id: "classic", label: "Classic Donuts" },
  { id: "specialty", label: "Drinks & Combos" },
  { id: "pastries", label: "Pastries" },
];

export const money = (amount) => `$${amount.toFixed(2)}`;
