import Image from "next/image"
import styles from "./homeHeader.module.css"
import CartIcon from "../../../public/cart-icon.png"

interface IHomeHeader {
    links: IHomeHeaderLink[],
    companyLogo: string
}

interface IHomeHeaderLink {
    title: string,
    redirectUrl: string
}

export default function HomeHeader(props: IHomeHeader) {
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
                                <a  className={styles.headerLink}
                                    href={link.redirectUrl}
                                    key={link.redirectUrl}>
                                    {link.title}
                                </a>)}
            </div>

            <div className={styles.utils}>
                <a className={styles.cart}
                    href='/cart'>
                    <Image
                        src={CartIcon}
                        alt="Cart icon"
                        width={24}
                        height={24}
                        />
                    <p>Cart</p>
                </a>
                <a href="/auth">
                    Register or Log In
                </a>
            </div>
        </header>
    )
}