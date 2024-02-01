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
        id='config-hotjar-script'
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            console.log("I'm here");
            window.smartlook||(function(d) {
              var o=smartlook=function(){ o.api.push(arguments)},h=d.getElementsByTagName('head')[0];
              var c=d.createElement('script');o.api=new Array();c.async=true;c.type='text/javascript';
              c.charset='utf-8';c.src='https://web-sdk.smartlook.com/recorder.js';h.appendChild(c);
              })(document);
              smartlook('init', 'cac6239e2de7625af4b8698f5a1f44841e517997', { region: 'eu' });
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
