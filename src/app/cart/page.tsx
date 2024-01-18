"use client";

import HomeHeader from "@/components/HomeHeader/homeHeader";
import "../../app/globals.css";
import style from "./page.module.css";
import { useEffect, useState } from "react";
import CartItem from "@/components/CartItem/cartItem";
import OrderSummary from "@/components/OrderSummary/orderSummary";

interface IProductColor {
  name: string;
  hexCode: string;
  available: boolean;
}

interface IProductSize {
  name: string;
  available: boolean;
}

interface IProduct {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  currency: string;
  onStock: boolean;
  colors: IProductColor[];
  sizes: IProductSize[];
}

interface ICartItem {
  product: IProduct;
  quantity: number;
}

interface OrderSummary {
  currency: string;
  totalItems: number;
  totalPrice: number;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<ICartItem[]>([]);

  const getCartItems = (): ICartItem[] => {
    if (typeof window !== undefined) {
      const cartItems: ICartItem[] = JSON.parse(
        localStorage.getItem("cartItems") || "[]"
      );
      setCartItems(cartItems);
      return cartItems;
    }
    return [];
  };

  useEffect(() => {
    getCartItems();
        const handleStorage = (event: StorageEvent) => {
            getCartItems();
          };
        window.addEventListener('storage', handleStorage)
        return () => window.removeEventListener('storage', handleStorage)
  }, []);

  return (
    <main className={style.main}>
      <HomeHeader
        companyLogo="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/VTEX_Logo.svg/1280px-VTEX_Logo.svg.png"
        links={[{ title: "Go back shopping", redirectUrl: "/" }]}
      />

      <section className={style.content}>
        <div className={style.cartItems}>
          {cartItems.map((item) => (
            <CartItem
              product={item.product}
              quantity={item.quantity}
              key={item.product.id}
            />
          ))}
        </div>

        <OrderSummary/>
      </section>
    </main>
  );
}
