"use client"

import { CartItemWithProduct } from "@/lib/db/cart"
import { FormatPrice } from "@/lib/format";
import { Product } from "@prisma/client";
import { Smokum } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useTransition } from "react";

interface cartIntryProps {
    cartItem: CartItemWithProduct;
    setProductQuantity:(productId:string, quantity:number)=>Promise<void>
}

export default function CartEntry({ cartItem: { product, quantity },setProductQuantity, }: cartIntryProps) {
    const [isPending, startTransition] = useTransition();
    const quentityOptions:JSX.Element[]=[];
    for (let i = 1; i <99; i++) {
        quentityOptions.push(
            <option value={i} key={i}>
                {i}
            </option>
        )
    }
    return (
        <div>
            <div className="flex flex-wrap items-center gap-3">
                <Image src={product.imageUrl} alt={product.name} width={200} height={200} className="rounded-lg" />
                <div>
                    <Link href={"/products/" + product.id} className="font-bold">
                        {product.name}
                    </Link>
                <div >price: {FormatPrice(product.price)} </div>
                <div className="my-1 flex items-center gap2">
                    Quentity:
                    <select className="select select-bordered w-full max-w-[80px]" defaultValue={quantity}
                    onChange={e=> {
                        const newQuantity = parseInt(e.currentTarget.value)
                        startTransition(async ()=>{
                            await setProductQuantity(product.id, newQuantity)
                        })

                    }}>
                        <option value={0}> 0 (Remove)</option>
                        {quentityOptions}
                    </select>
                </div>
                <div className="flex items-center gap-3" >Total: {FormatPrice(product.price * quantity)} </div>
                {isPending && <span className=" loading loading-spinner loading-sm"></span>}
                </div>

            </div>
            <div className="divider"></div>
        </div>
    )
}