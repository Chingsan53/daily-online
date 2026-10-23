export const products = [
  {
    id: "glazed",
    name: "Original Glazed",
    price: 1.95,
    category: "classic",
    desc: "Pillowy dough, delicate vanilla glaze.",
    image:
      "https://images.pexels.com/photos/30512881/pexels-photo-30512881.jpeg",
    alt: "Fresh doughnuts stacked on a wooden board",
    tags: "original glazed classic vanilla donut",
  },
  {
    id: "sprinkle",
    name: "Fancy Donuts",
    price: 2.5,
    category: "classic",
    desc: "Rich chocolate icing on a soft ring.",
    image: "https://images.pexels.com/photos/4686959/pexels-photo-4686959.jpeg",
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
