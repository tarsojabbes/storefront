'use client'
import { useEffect, useState } from "react";
import style from "./orderSummary.module.css"

interface OrderSummary {
    currency: string,
    totalItems: number,
    totalPrice: number
}

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

export default function OrderSummary() {

    const [cartItems, setCartItems] = useState<ICartItem[]>([]);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [totalPrice, setTotalPrice] = useState<number>(0);

    const getCartItems = (): ICartItem[] => {
        if (typeof window !== undefined) {
          const cartItems: ICartItem[] = JSON.parse(
            localStorage.getItem("cartItems") || "[]"
          );
          setCartItems(cartItems);
          calculateTotalItemsAndPrice(cartItems)
          return cartItems;
        }
        return [];
      };

    const calculateTotalItemsAndPrice = (cartItems: ICartItem[]) => {
        let totalItems = 0;
        let totalPrice = 0;
        for (let i = 0; i < cartItems.length; i++) {
          totalItems += cartItems[i].quantity;
          totalPrice += cartItems[i].product.price * cartItems[i].quantity;
        }
        setTotalItems(totalItems);
        setTotalPrice(totalPrice);
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
          <section className={style.card}>
              <b>Total price</b>
              <p 
                  className={style.totalPrice}>
                  {cartItems.length > 0 ? cartItems[0].product.currency : "R$"} {totalPrice}
              </p>
              <p>Total items: {totalItems}</p>
              <button 
                  className={style.purchaseButton}>
                  Purchase
              </button>
          </section>
    )
}