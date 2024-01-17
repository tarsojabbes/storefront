'use client'
import Image from "next/image"
import styles from "./homeHeader.module.css"
import CartIcon from "../../../public/cart-icon.png"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface IHomeHeader {
    links: IHomeHeaderLink[],
    companyLogo: string
}

interface IHomeHeaderLink {
    title: string,
    redirectUrl: string
}

export default function HomeHeader(props: IHomeHeader) {

    const router = useRouter()

    return(
        <header className={styles.homeHeader}>
            <Image 
                src={props.companyLogo}
                alt="Company's Logo"
                width={100}
                height={50}
                style={{objectFit: "contain"}}

            />

            <div className={styles.linkSection}>
            {props.links.map(link => 
                                <Link
                                    onClick={() => router.push(`/${link.redirectUrl}`)}
                                    className={styles.headerLink}
                                    href={link.redirectUrl}
                                    key={link.redirectUrl}>
                                    {link.title}
                                </Link>)}
            </div>

            <div className={styles.utils}>
                <Link className={styles.cart}
                    href='/cart'>
                    <Image
                        src={CartIcon}
                        alt="Cart icon"
                        width={24}
                        height={24}
                        />
                    <p>Cart</p>
                </Link>
                <Link href="/auth">
                    Register or Log In
                </Link>
            </div>
        </header>
    )
}