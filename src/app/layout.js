import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/Header";
import BottomNav from "@/components/BottomNav";

export const metadata = {
  title: "Dough & Co.",
  description:
    "Hand-finished donuts, buttery pastries, and really good coffee.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Header />
          {children}
          <BottomNav />
        </CartProvider>
      </body>
    </html>
  );
}
