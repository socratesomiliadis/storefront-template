import ProductItem from "components/product-item";
import { getCollectionProducts } from "lib/shopify";

export default async function ProductsOfTheDay() {
  const products = await getCollectionProducts({
    collection: "hidden-products-of-the-day",
  });

  return (
    <section className="bg-offWhite min-h-screen pt-16 justify-evenly gap-16 relative z-10 w-screen flex flex-col items-center">
      <div className="flex flex-col gap-4 items-center">
        <span className="border-[1px] font-medium border-darkGray rounded-full py-2 px-8">
          Featured
        </span>
        <h3 className="font-medium text-darkGray tracking-tight text-7xl">
          Products of the day
        </h3>
      </div>
      <div className="flex flex-row w-full justify-center gap-[1vw] px-[6vw]">
        {products.map((product) => (
          <ProductItem
            product={product}
            key={product.id}
            className="basis-1/3"
          />
        ))}
      </div>
    </section>
  );
}
