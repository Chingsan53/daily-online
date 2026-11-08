"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { products } from "@/data/products";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const router = useRouter();

  // Regular items are stored as quantities.
  // Customized items are stored as complete product objects.
  const [cart, setCart] = useState({});
  const [orderType, setOrderType] = useState("pickup");
  const [customerName, setCustomerName] = useState("");
  const [pickupTime, setPickupTime] = useState("ASAP · about 20 minutes");
  const [orderNumber, setOrderNumber] = useState("");
  const [confirmation, setConfirmation] = useState("");

  const cartItems = useMemo(() => {
    const regularItems = products
      .filter(
        (product) =>
          typeof cart[product.id] === "number" && cart[product.id] > 0,
      )
      .map((product) => ({
        ...product,
        qty: cart[product.id],
      }));

    const customizedItems = Object.entries(cart)
      .filter(([, item]) => typeof item === "object" && item !== null)
      .map(([key, item]) => ({
        ...item,
        id: key,
      }));

    return [...regularItems, ...customizedItems];
  }, [cart]);

  const quantity = cartItems.reduce((sum, item) => sum + item.qty, 0);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0,
  );

  // Add regular products OR update an existing customized cart line.
  function addItem(id, delta = 1) {
    setCart((old) => {
      const next = { ...old };
      const existing = next[id];

      if (typeof existing === "object" && existing !== null) {
        const newQty = existing.qty + delta;

        if (newQty <= 0) {
          delete next[id];
        } else {
          next[id] = { ...existing, qty: newQty };
        }
      } else {
        const count = (existing || 0) + delta;

        if (count <= 0) {
          delete next[id];
        } else {
          next[id] = count;
        }
      }

      return next;
    });
  }

  // Add a customized drink as its own cart line.
  function addCustomizedItem(item) {
    const modifiers = item.selectedModifiers || [];

    // Same drink + same selections = same cart line.
    // Different selections = separate cart lines.
    const cartId = `custom:${item.productId}:${JSON.stringify(modifiers)}`;

    setCart((old) => {
      const next = { ...old };
      const existing = next[cartId];
      const qtyToAdd = item.quantity || 1;

      if (existing) {
        next[cartId] = {
          ...existing,
          qty: existing.qty + qtyToAdd,
        };
      } else {
        next[cartId] = {
          ...item,
          id: cartId,
          price: item.unitPrice ?? item.price ?? 0,
          qty: qtyToAdd,
        };
      }

      return next;
    });
  }

  function removeItem(id) {
    setCart((old) => {
      const next = { ...old };
      delete next[id];
      return next;
    });
  }

  function placeOrder(event) {
    event.preventDefault();

    if (!customerName.trim() || !quantity) return;

    setConfirmation(
      `${customerName.trim()}, your ${orderType} demo is ready. ${
        orderType === "pickup"
          ? `Selected time: ${pickupTime}.`
          : "No delivery is actually scheduled."
      }`,
    );

    setOrderNumber(`DCO-${Math.floor(1000 + Math.random() * 9000)}`);
    router.push("/confirmation");
  }

  function resetOrder() {
    setCart({});
    setCustomerName("");
    setPickupTime("ASAP · about 20 minutes");
    setOrderType("pickup");
    setOrderNumber("");
    setConfirmation("");
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        cartItems,
        quantity,
        subtotal,
        addItem,
        addCustomizedItem,
        removeItem,
        orderType,
        setOrderType,
        customerName,
        setCustomerName,
        pickupTime,
        setPickupTime,
        orderNumber,
        confirmation,
        placeOrder,
        resetOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}
