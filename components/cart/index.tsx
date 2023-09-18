import { getCart } from "lib/shopify";
import { cookies } from "next/headers";
import CartModal from "./modal";
import { getProductRecommendations } from "lib/shopify";
import { Cart, Product } from "lib/shopify/types";

export default async function Cart() {
  const cartId = cookies().get("cartId")?.value;
  let cart: Cart | undefined;
  let recProduct: Product | undefined;
  let isRecProductInCart = false;
  if (cartId) {
    cart = await getCart(cartId);
  }

  if (cart && cart.lines[0]) {
    const firstCartItemId = cart.lines[0].merchandise.product.id;
    const recProducts = await getProductRecommendations(firstCartItemId);
    recProduct = recProducts[0];
    isRecProductInCart = cart.lines.some(
      (line) => line.merchandise.product.id === recProduct?.id,
    );
    if (isRecProductInCart) {
      recProduct = undefined;
    }
  }

  return <CartModal cart={cart} recommendedProduct={recProduct} />;
}
