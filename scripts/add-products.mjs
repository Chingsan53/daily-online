import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore, FieldValue } from "firebase-admin/firestore";
import fs from "node:fs";

const serviceAccount = JSON.parse(
  fs.readFileSync(new URL("./serviceAccountKey.json", import.meta.url), "utf8"),
);

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

// ==========================================
// DRINK MENU
// ==========================================

const newProducts = [
  // ----------------------------------------
  // HOT COFFEE
  // ----------------------------------------
  {
    id: "hot_coffee",
    name: "Hot Coffee",
    price: 2.0,
    category: "coffee",
    desc: "Freshly brewed hot coffee.",
    image:
      "https://images.unsplash.com/photo-1518057111178-44a106bad636?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=60&w=3000",
    alt: "Hot Coffee",
    tags: "hot coffee",
    active: true,
    sortOrder: 1,

    modifierGroups: [
      {
        id: "size",
        name: "Choose Size",
        selectionType: "single",
        required: true,
        options: [
          { id: "small", name: "Small", priceDelta: 0 },
          { id: "medium", name: "Medium", priceDelta: 0.5 },
          { id: "large", name: "Large", priceDelta: 1.0 },
        ],
      },
    ],
  },

  // ----------------------------------------
  // ICED COFFEE
  // ----------------------------------------
  {
    id: "iced_coffee",
    name: "Iced Coffee",
    price: 2.5,
    category: "coffee",
    desc: "Freshly brewed coffee served over ice.",
    image:
      "https://images.unsplash.com/photo-1752216581594-a235ddcbfa9f?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=60&w=3000",
    alt: "Iced Coffee",
    tags: "iced coffee",
    active: true,
    sortOrder: 2,

    modifierGroups: [
      {
        id: "size",
        name: "Choose Size",
        selectionType: "single",
        required: true,
        options: [
          { id: "small", name: "Small", priceDelta: 0 },
          { id: "medium", name: "Medium", priceDelta: 0.5 },
          { id: "large", name: "Large", priceDelta: 1.0 },
        ],
      },
      {
        id: "flavor",
        name: "Choose Flavor",
        selectionType: "single",
        required: false,
        options: [
          { id: "vanilla", name: "Vanilla", priceDelta: 0.5 },
          { id: "hazelnut", name: "Hazelnut", priceDelta: 0.5 },
        ],
      },
      {
        id: "coffee_style",
        name: "Coffee Style",
        selectionType: "single",
        required: false,
        options: [
          { id: "black", name: "Black", priceDelta: 0 },
          { id: "half_half", name: "Half & Half", priceDelta: 0 },
        ],
      },
    ],
  },

  // ----------------------------------------
  // ESPRESSO
  // ----------------------------------------
  {
    id: "espresso",
    name: "Espresso",
    price: 2.0,
    category: "espresso",
    desc: "Rich, concentrated espresso.",
    image:
      "https://images.unsplash.com/photo-1646257861487-60fa89bef25f?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=60&w=3000",
    alt: "Espresso",
    tags: "espresso",
    active: true,
    sortOrder: 3,

    modifierGroups: [
      {
        id: "shots",
        name: "Choose Shots",
        selectionType: "single",
        required: true,
        options: [
          { id: "single", name: "Single", priceDelta: 0 },
          { id: "double", name: "Double", priceDelta: 1.0 },
        ],
      },
    ],
  },

  // ----------------------------------------
  // CAPPUCCINO
  // ----------------------------------------
  {
    id: "cappuccino",
    name: "Cappuccino",
    price: 3.5,
    category: "espresso",
    desc: "Espresso with steamed milk and creamy foam.",
    image:
      "https://images.unsplash.com/photo-1564327367919-cb377ea6a88f?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=60&w=3000",
    alt: "Cappuccino",
    tags: "cappuccino",
    active: true,
    sortOrder: 4,

    modifierGroups: [
      {
        id: "shots",
        name: "Choose Shots",
        selectionType: "single",
        required: true,
        options: [
          { id: "single", name: "Single", priceDelta: 0 },
          { id: "double", name: "Double", priceDelta: 0.75 },
        ],
      },
    ],
  },

  // ----------------------------------------
  // AMERICANO
  // ----------------------------------------
  {
    id: "americano",
    name: "Americano",
    price: 2.5,
    category: "espresso",
    desc: "Espresso balanced with hot water.",
    image:
      "https://images.unsplash.com/photo-1669872484166-e11b9638b50e?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=60&w=3000",
    alt: "Americano",
    tags: "americano",
    active: true,
    sortOrder: 5,

    modifierGroups: [
      {
        id: "shots",
        name: "Choose Shots",
        selectionType: "single",
        required: true,
        options: [
          { id: "single", name: "Single", priceDelta: 0 },
          { id: "double", name: "Double", priceDelta: 0.75 },
        ],
      },
    ],
  },

  // ----------------------------------------
  // CAFE LATTE
  // ----------------------------------------
  {
    id: "cafe_latte",
    name: "Cafe Latte",
    price: 3.5,
    category: "espresso",
    desc: "Espresso blended with smooth steamed milk.",
    image:
      "https://images.unsplash.com/photo-1565210339691-46c2d66d0ac8?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=60&w=3000",
    alt: "Cafe Latte",
    tags: "cafe latte latte",
    active: true,
    sortOrder: 6,

    modifierGroups: [
      {
        id: "shots",
        name: "Choose Shots",
        selectionType: "single",
        required: true,
        options: [
          { id: "single", name: "Single", priceDelta: 0 },
          { id: "double", name: "Double", priceDelta: 0.75 },
        ],
      },
    ],
  },

  // ----------------------------------------
  // ICED CAFE LATTE
  // ----------------------------------------
  {
    id: "iced_cafe_latte",
    name: "Iced Cafe Latte",
    price: 4.0,
    category: "espresso",
    desc: "Espresso and chilled milk served over ice.",
    image:
      "https://images.unsplash.com/photo-1777620817565-1f0802f12b3f?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=60&w=3000",
    alt: "Iced Cafe Latte",
    tags: "iced cafe latte",
    active: true,
    sortOrder: 7,

    modifierGroups: [
      {
        id: "flavor",
        name: "Choose Flavor",
        selectionType: "single",
        required: true,
        options: [
          { id: "regular", name: "Regular", priceDelta: 0 },
          { id: "vanilla", name: "Vanilla", priceDelta: 0.5 },
        ],
      },
    ],
  },
];

// ==========================================
// ADD PRODUCTS TO FIRESTORE
// ==========================================

async function addProducts() {
  const batch = db.batch();

  for (const product of newProducts) {
    const { id, ...data } = product;

    const ref = db.collection("products").doc(id);

    batch.create(ref, {
      ...data,
      updatedAt: FieldValue.serverTimestamp(),
      createdAt: FieldValue.serverTimestamp(),
    });
  }

  await batch.commit();

  console.log(`${newProducts.length} drinks added successfully!`);
}

addProducts().catch(console.error);
