import { useRouter } from "next/router"
import ProductsJson from "../../../../data/products.json"
import HomeHeader from "@/components/HomeHeader/homeHeader"

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

const Products: IProduct[] | {} = ProductsJson
 
export default function ProductPage() {

    const router = useRouter()
    const {id} = router.query
    const product = findProductById(id? id[0] : "")

    function findProductById(id: string): IProduct | undefined {
        if (Array.isArray(Products)) {
            return Products.filter((product) => product.id === id)[0];
          }
          return undefined;
    }

    return(
        <main>
            <HomeHeader 
                companyLogo="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/VTEX_Logo.svg/1280px-VTEX_Logo.svg.png"
                links={[{title: "Home", redirectUrl: "/"}]}/>
        </main>
    )
}