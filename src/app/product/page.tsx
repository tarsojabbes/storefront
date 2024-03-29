'use client'

import { ReadonlyURLSearchParams, useRouter, useSearchParams } from "next/navigation"
import ProductsJson from "../../../data/products.json"
import HomeHeader from "@/components/HomeHeader/homeHeader"
import styles from "./page.module.css"
import Image from "next/image"
import { useEffect, useState } from "react"
import WhiteCartIcon from "../../../public/white-cart-icon.png"
import "../../app/globals.css"


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
const Products: IProduct[] | {} = ProductsJson
 
export default function ProductPage() {

    const router = useRouter()
    const searchParams: ReadonlyURLSearchParams | null = useSearchParams()

    const addToCart = (product: IProduct) => {
        if (typeof window !== undefined) {
            const cartItems: ICartItem[] = JSON.parse(
                localStorage.getItem("cartItems") || '[]'
            )

            const foundItem = cartItems.filter((item) => item.product.id == product.id)

            if (foundItem.length > 0) {
                foundItem[0].quantity++
            } else {
                cartItems.push({
                    product: product,
                    quantity: 1
                })
            }
            localStorage.setItem("cartItems", JSON.stringify(cartItems))
            window.dispatchEvent(new Event('storage'))
        }   
    }
    
    const [product, setProduct] = useState<IProduct>({
        id: "",
        name: "",
        price: 0,
        imageUrl: "",
        description: "",
        currency: "",
        onStock: false,
        colors: [],
        sizes: [],
      });
    
      useEffect(() => {
        const foundProduct = findProductById(searchParams ? searchParams.get("id") : "");
        setProduct(foundProduct);
      }, [searchParams]);

    function findProductById(id: string | null): IProduct{
        if (Array.isArray(Products)) {
            return Products.filter((product) => product.id === id)[0] || product;
          }
          return product;
    }

    return(
        <main className={styles.main}>
            <HomeHeader 
                companyLogo="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/VTEX_Logo.svg/1280px-VTEX_Logo.svg.png"
                links={[{title: "Home", redirectUrl: "/"}]}/>
            
            <section className={styles.content}>
                <section className={styles.productSection}>
                    <article className={styles.productImage}>
                        <Image
                            src={product?.imageUrl}
                            alt={"Image of " + `${product?.name}`}
                            width={600}
                            height={600}
                            style={{objectFit:"contain"}}
                            priority={true}
                        />
                    </article>
                    <article className={styles.productInfo}>
                        <h1>{product.name}</h1>
                        <p>Reference: {product.id}</p>
                        <h2>{product.currency} {product.price}</h2>

                        
                        {product.colors.length > 0 && 
                            <div className={styles.colorsSelector}>
                                <h4>Colors</h4>
                                {product.colors.map(color => 
                                <button
                                    key={color.name}
                                    aria-label={`${color.name} color selector`}
                                    disabled={!color.available}
                                    style={{backgroundColor:color.hexCode,
                                            width:"2.5rem",
                                            height:"2.5rem",
                                            borderRadius:"100%",
                                            border:"2px solid black",
                                            margin: "0 0.05rem",
                                            cursor: color.available ? "pointer" : "not-allowed"
                                            }}>
                                </button>)}
                            </div>
                        }

                        {product.sizes.length > 0 &&
                            <div className={styles.sizesSelector}>  
                                <h4>Sizes</h4>
                                {product.sizes.map(size => 
                                <button
                                    key={size.name}
                                    aria-label={`${size.name} size selector`}
                                    disabled={!size.available}
                                    style={{backgroundColor: "transparent",
                                            minWidth: "2.5rem",
                                            width: "fit-content",
                                            height: "2.5rem",
                                            borderRadius: "7px",
                                            border: "2px solid black",
                                            margin: "0 0.05rem",
                                            cursor: size.available ? "pointer" : "not-allowed"}}>
                                    {size.name}
                                </button>)}
                            </div>
                        }

                        {product.onStock ? 
                            <a className={styles.addToCartButton}
                                onClick={() => addToCart(product)}>
                                <Image 
                                    src={WhiteCartIcon}
                                    width={20}
                                    height={20}
                                    alt="Add to cart icon"/>
                                Add to Cart
                            </a> : 
                            <p className={styles.outOfStockButton}>Out of Stock</p>}
                    </article>
                </section>
                <section className={styles.productDescription}>
                    <h1>Description</h1>
                    <p>{product.description}</p>
                </section>
            </section>
        </main>
    )
}