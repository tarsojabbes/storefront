import Image from 'next/image'
import styles from './page.module.css'
import ProductCard from '@/components/ProductCard/productCard'
import HomeHeader from '@/components/HomeHeader/homeHeader'
import ProductsJson from "../../data/products.json"

export default function Home() {

  return (
    <main className={styles.main}>
      <HomeHeader 
        companyLogo='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/VTEX_Logo.svg/1280px-VTEX_Logo.svg.png'
        links={[{title: "Smartphones", redirectUrl:"/smartphones"}, 
                {title: "Computers", redirectUrl:"/computers"}, 
                {title: "Home care", redirectUrl:"/home-care"}]}/>
      <section className={styles.productList}>
        {ProductsJson.map(product => 
          <ProductCard
            key={product.id}
            id={`${product.id}`}
            name={product.name}
            price={product.price}
            imageUrl={product.imageUrl}
            currency={product.currency}/>)}
      </section>
      
    </main>
  )
}
