"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { products } from "@/data/products";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const router = useRouter();
  const [cart, setCart] = useState({});
  const [orderType, setOrderType] = useState("pickup");
  const [customerName, setCustomerName] = useState("");
  const [pickupTime, setPickupTime] = useState("ASAP · about 20 minutes");
  const [orderNumber, setOrderNumber] = useState("");
  const [confirmation, setConfirmation] = useState("");

  const cartItems = useMemo(
    () =>
      products
        .filter((product) => cart[product.id])
        .map((product) => ({ ...product, qty: cart[product.id] })),
    [cart],
  );
  const quantity = cartItems.reduce((sum, product) => sum + product.qty, 0);
  const subtotal = cartItems.reduce(
    (sum, product) => sum + product.price * product.qty,
    0,
  );

  function addItem(id, delta = 1) {
    setCart((old) => {
      const next = { ...old };
      const count = (next[id] || 0) + delta;
      if (count <= 0) delete next[id];
      else next[id] = count;
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
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}
