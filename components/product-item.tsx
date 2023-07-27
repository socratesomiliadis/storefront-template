import clsx from "clsx";
import { Product } from "lib/shopify/types";
import Image from "next/image";
import tailwindConfig from "tailwind.config.js";
import Price from "./price";
import Link from "next/link";
import { AddToCart } from "./cart/add-to-cart";

export default function ProductItem({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) {
  //@ts-expect-error
  const softGray = tailwindConfig.theme?.extend?.colors["softGray"] as string;
  //@ts-expect-error
  const darkGray = tailwindConfig.theme?.extend?.colors["darkGray"] as string;

  const currentDate = new Date();
  const startDate = new Date(product.createdAt);
  const difference = currentDate.getTime() - startDate.getTime();
  const daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24);
  const isNew = daysDifference < 30;

  return (
    <div className={clsx("flex group flex-col relative", className)}>
      {!product.availableForSale && (
        <span className="bg-softGray z-10 select-none text-sm block px-6 py-2 rounded-md text-darkGray absolute right-4 top-4">
          Out of stock
        </span>
      )}

      {product.availableForSale && isNew && (
        <span className="bg-offWhite z-10 select-none text-sm block px-12 py-2 rounded-md text-darkGray absolute right-4 top-4">
          New
        </span>
      )}

      <div
        style={{
          backgroundColor: product.availableForSale ? softGray : darkGray,
        }}
        className="w-full overflow-hidden relative z-0 bg-softGray aspect-[1/1.35] h-auto"
      >
        {!!product.availableForSale && (
          <div className="absolute translate-y-[150%] group-hover:translate-y-0 transition-transform duration-300 ease-out z-10 w-full px-12 bottom-6">
            <AddToCart
              variants={product.variants}
              availableForSale={product.availableForSale}
            />
          </div>
        )}
        <Link
          href={`/product/${product.handle}`}
          className="w-full h-full relative flex items-center justify-center"
        >
          <Image
            alt={product.title}
            src={product.featuredImage?.url}
            width={600}
            height={600}
            className="object-contain group-hover:scale-105 group-hover:rotate-[-3deg] transition-transform duration-300 ease-out h-[50%] w-[40%]"
          />
        </Link>
      </div>
      <h4 className="flex mt-3 flex-row w-full text-darkGray text-xl justify-between items-start">
        <span className="flex flex-col">
          <span>{product.title}</span>
          <span className="mt-2 flex flex-row pointer-events-none items-center gap-2">
            {product.options.map((option) => {
              return option.values.map((value, index) => {
                return (
                  <span
                    key={index}
                    className="bg-softGray py-1 px-2 rounded-full text-darkGray text-xs"
                  >
                    {value}
                  </span>
                );
              });
            })}
          </span>
        </span>
        <span>
          <Price
            className="text-base"
            compareAmount={product.compareAtPriceRange?.maxVariantPrice.amount}
            amount={product.priceRange.maxVariantPrice.amount}
            currencyCode={product.priceRange.maxVariantPrice.currencyCode}
          />
        </span>
      </h4>
    </div>
  );
}
