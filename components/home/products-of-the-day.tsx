import { getCollectionProducts } from "lib/shopify";
import ProdOfDayAnim from "./prod-of-day-anim";

export default async function ProductsOfTheDay() {
  const products = await getCollectionProducts({
    collection: "hidden-products-of-the-day",
  });

  return <ProdOfDayAnim products={products} />;
}
