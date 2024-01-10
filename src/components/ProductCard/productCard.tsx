import Image from 'next/image'
import styles from './productCard.module.css'

interface IProductCard {
    name: string,
    price: number,
    imageUrl: string,
    currency: string
}

export default function ProductCard(props: IProductCard) {
    return (
        <div className={styles.productCard}>
            <Image
                className={styles.productImage}
                src={props.imageUrl}
                alt="Product Image"
                width={150}
                height={120}
            />
            <h4 className={styles.productName}>
                {props.name}
            </h4>
            <p className={styles.productPrice}>
                {props.currency}{props.price}
            </p>
            <button className={styles.productButton}>
                <a href='/product'>Know more</a>
            </button>
        </div>
    )
}