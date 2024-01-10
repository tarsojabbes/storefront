import Image from 'next/image'
import styles from './page.module.css'
import ProductCard from '@/components/ProductCard/productCard'

export default function Home() {
  return (
    <main className={styles.main}>
      <ProductCard 
        name='Radiador' 
        price={199.9} 
        imageUrl='https://www.green.earth/hubfs/The%20top%2010%20green%20cities%20in%20the%20world-1.jpg#keepProtocol'
        currency='R$'/>
    </main>
  )
}
