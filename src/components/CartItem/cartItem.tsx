'use client'
import Image from "next/image"
import style from "./cartItem.module.css"
import { useEffect, useState } from "react"

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



export default function CartItem(props: ICartItem) {

    const [productQuantity, setProductQuantity] = useState<number>(props.quantity)

    const handleQuantityChange = (type: string, product: IProduct) => {
        if (typeof window !== undefined) {
            let cartItems: ICartItem[] = JSON.parse(
                localStorage.getItem("cartItems") || '[]'
            )

            const foundItem = cartItems.filter((item) => item.product.id == product.id)

            if (foundItem.length > 0) {
                if (type == "increase") {
                    foundItem[0].quantity++
                    setProductQuantity(foundItem[0].quantity)
                }
                else if (type == "decrease" && foundItem[0].quantity > 0) {
                    if (foundItem[0].quantity == 1) {
                        cartItems = cartItems.filter((item) => item.product.id != product.id)
                    } else {
                        foundItem[0].quantity--
                        setProductQuantity(foundItem[0].quantity)
                    }
                    
                }
            }
            localStorage.setItem("cartItems", JSON.stringify(cartItems))
            window.dispatchEvent(new Event('storage'))
        }   
    }

    return (
        <section className={style.cartItem}>
            <Image
                src={props.product.imageUrl}
                alt={"Image of " + props.product.name}
                width={200}
                height={200}
                style={{objectFit: "contain"}}
                />

            <h1>
                {props.product.name}
            </h1>

            <p className={style.price}>
                <b>{props.product.currency} {props.product.price}</b>/unit
            </p>
            <div>
                <h4>Quantity: </h4>
                <div className={style.quantitySelector}>
                    <button onClick={() => handleQuantityChange("decrease", props.product)}>-</button>
                    <p>{productQuantity}</p>
                    <button onClick={() => handleQuantityChange("increase", props.product)}>+</button>
                </div>
            </div>
        </section>
    )
}