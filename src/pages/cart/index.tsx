import HomeHeader from "@/components/HomeHeader/homeHeader";
import "../../app/globals.css"
import styles from "./index.module.css"
import { useEffect, useState } from "react";
import CartItem from "@/components/CartItem/cartItem";

interface IProductColor {
    name: string,
    hexCode: string,
    available: boolean
}

interface IProductSize {
    name: string,
    available: boolean
}

interface IProduct {
    id: string,
    name: string,
    price: number,
    imageUrl: string,
    description: string,
    currency: string,
    onStock: boolean,
    colors: IProductColor[],
    sizes: IProductSize[]
}

interface ICartItem {
    product: IProduct,
    quantity: number
}

export default function CartPage() {

    const [cartItems, setCartItems] = useState<ICartItem[]>([])

    const getCartItems = (): ICartItem[] => {
        if (typeof window !== undefined) {
            const cartItems: ICartItem[] = JSON.parse(
                localStorage.getItem("cartItems") || '[]'
            )
            return cartItems
        }
        return []
    }

    useEffect(() => {
        setCartItems(getCartItems())
    }, [cartItems])

    return (
        <main className={styles.main}>
            <HomeHeader 
                companyLogo="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/VTEX_Logo.svg/1280px-VTEX_Logo.svg.png"
                links={[{"title": "Go back shopping", "redirectUrl": "/"}]}/>

            <section className={styles.content}>
                {cartItems.map((item) => (
                    <CartItem 
                        product={item.product}
                        quantity={item.quantity}
                        key={item.product.id}/>
                ))}
            </section>
        </main>
    )
}