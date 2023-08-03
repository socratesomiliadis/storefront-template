import { getCart } from "lib/shopify";
import { cookies } from "next/headers";
import CartModal from "./modal";
import { getProductRecommendations } from "lib/shopify";

export default async function Cart() {
  const cartId = cookies().get("cartId")?.value;
  let cart;
  let recProduct;

  if (cartId) {
    cart = await getCart(cartId);
  }

  if (cart && cart.lines[0]) {
    const firstCartItemId = cart.lines[0].merchandise.product.id;
    const recProducts = await getProductRecommendations(firstCartItemId);
    recProduct = recProducts[0];
  }

  return <CartModal cart={cart} recommendedProduct={recProduct} />;
}
