import { getCart } from "@/lib/db/cart"
import CartEntry from "./CartEntry"
import { setProductQuentity } from "./action"
import { FormatPrice } from "@/lib/format"

export const metadata = {
    title: "Your Cart -flowazon"
}

export default async function CartPage() {
    const cart = await getCart()
    return (
        <div>
            <h1 className="text-3xl font-bold">
                Shopping Cart
            </h1>
            {cart?.items.map(cartItems => (
                <CartEntry cartItem={cartItems} key={cartItems.id} setProductQuantity={setProductQuentity} />


            ))}{!cart?.items.length && <p>Your Cart is empty</p>}
            <div className="flex flex-col items-end sm:items-center">
                <p className="mb-3 font-bold">
                    Total: {FormatPrice(cart?.subtotal || 0)}
                </p>
                <button className="btn btn-primary sm:w-[200px]">Checkout</button>
            </div>
        </div>
    )
}