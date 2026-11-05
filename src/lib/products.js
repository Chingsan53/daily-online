import { collection, getDocs, query, where, orderBy } from "firebase/firestore";

import { db } from "./firebase";

export async function getProducts() {
  const productsRef = collection(db, "products");

  const q = query(
    productsRef,
    where("active", "==", true),
    orderBy("sortOrder", "asc"),
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}
