import NotFoundPage from "@/app/not-found"
import PriceTag from "@/components/PriceTag"
import { prisma } from "@/lib/db/prisma"
import { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import { cache } from "react"
import AddToCartButton from "./AddToCartButton"
import { incrementProductQuantity } from "./actions"

interface ProductPageProps{
    params:{
        id:string
    }
}

const getProduct = cache (async(id:string)=>{
    const product = await prisma.product.findUnique({where:{id}})
    if (!product) return notFound()
    return product
})

export async function generateMeatadata({params:{id}}:ProductPageProps):Promise<Metadata> {
    const product = await getProduct(id);
    return {
        title:product.name + "- Flowmazon",
        description:product.description,
        openGraph:{
            images:[{url:product.imageUrl}]
        }
}

}

export default async  function ProductPage ({params:{id}}:ProductPageProps)  {
    const product = await getProduct(id)
  return (
    <div className="flex gap-4 lg:items-center flex-col lg:flex-row">
      <Image
      src={product.imageUrl} 
      alt={product.name} 
      width={500} 
      height={500}
       className="rounded-lg"
       priority/>
       <div>
        <h1 className="text-5xl font-bold">
            {product.name}
        </h1>
        <PriceTag className="mt-4" price={product.price}/>
        <p className="py-6">
            {product.description}
        </p>
        <AddToCartButton productId={product.id} incrementProductQuentity={incrementProductQuantity}/>
       </div>
        
    </div>
  )
}


