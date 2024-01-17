'use client'
import style from "./orderSummary.module.css"
interface OrderSummary {
    currency: string,
    totalItems: number,
    totalPrice: number
}

export default function OrderSummary(props: OrderSummary) {
    return (
        <section className={style.card}>
            <b>Total price</b>
            <p className={style.totalPrice}>{props.currency} {props.totalPrice}</p>
            <p>Total items: {props.totalItems}</p>
            <button className={style.purchaseButton}>
                Purchase
            </button>
        </section>
    )
}