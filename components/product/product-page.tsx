import { AddToCart } from "components/cart/add-to-cart";
import Price from "components/price";
import { Product } from "lib/shopify/types";
import Image from "next/image";

export default function ProductPage({ product }: { product: Product }) {
  const firstTwoImages = product.images.slice(0, 2);
  return (
    <div className="w-full grid grid-cols-2 place-items-start gap-16 px-8">
      <div className="w-full relative flex flex-col pt-12 gap-8">
        {firstTwoImages.map((image, index) => {
          return (
            <div
              key={index}
              className="w-full relative aspect-square h-auto flex items-center justify-center bg-softGray"
            >
              <Image
                src={image.url}
                alt={image.altText}
                width={800}
                height={800}
                priority
                className="w-1/2 object-contain"
              />
            </div>
          );
        })}
      </div>
      <div className="sticky top-0 mt-32 w-full flex flex-col px-8">
        <h1 className=" text-4xl text-darkGray font-medium">{product.title}</h1>
        <p className="text-3xl mt-10 w-2/3 text-darkGray">
          {product.description}
        </p>
        <div className="text-gray mt-24 text-lg flex flex-col">
          <div className="w-full h-[1px] bg-gray/40"></div>
          <div className="w-full py-5 flex flex-row items-center justify-between">
            <span>Price</span>
            <Price
              className="flex flex-row items-center gap-3"
              compareAmount={
                product.compareAtPriceRange?.maxVariantPrice.amount
              }
              amount={product.priceRange.maxVariantPrice.amount}
              currencyCode={product.priceRange.maxVariantPrice.currencyCode}
            />
          </div>
          <div className="w-full h-[1px] bg-gray/40"></div>
          <div className="w-full py-5 flex flex-row items-center justify-between">
            <span>Delivery Time</span>
            <span>3-10 Days</span>
          </div>
          <div className="w-full h-[1px] bg-gray/40"></div>
        </div>
        <AddToCart
          variants={product.variants}
          availableForSale={product.availableForSale}
        />
      </div>
    </div>
  );
}
