'use client'

import styles from './page.module.css'
import ProductCard from '@/components/ProductCard/productCard'
import HomeHeader from '@/components/HomeHeader/homeHeader'
import ProductsJson from "../../data/products.json"
import Script from 'next/script'

export default function Home() {
  const siteId = 3842274
  const hotjarVersion = 6

  return (
    <>
    <Script
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            console.log("I'm here");
            (function(h,o,t,j,a,r){
              h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
              h._hjSettings={hjid:${siteId},hjsv:${hotjarVersion}};
              a=o.getElementsByTagName('head')[0];
              r=o.createElement('script');r.async=1;
              r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
              a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
          `,
        }}
      />
      
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
      </>
  )
}
