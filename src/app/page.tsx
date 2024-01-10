import Image from 'next/image'
import styles from './page.module.css'
import ProductCard from '@/components/ProductCard/productCard'
import HomeHeader from '@/components/HomeHeader/homeHeader'

export default function Home() {
  return (
    <main className={styles.main}>
      <HomeHeader 
        companyLogo='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/VTEX_Logo.svg/1280px-VTEX_Logo.svg.png'
        links={[{title: "Smartphones", redirectUrl:"/smartphones"}, 
                {title: "Computers", redirectUrl:"/computers"}, 
                {title: "Home care", redirectUrl:"/home-care"}]}/>
      <ProductCard 
        name='Radiador' 
        price={199.9} 
        imageUrl='https://www.green.earth/hubfs/The%20top%2010%20green%20cities%20in%20the%20world-1.jpg#keepProtocol'
        currency='R$'/>
    </main>
  )
}
