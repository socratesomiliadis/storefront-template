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
  const softGray = tailwindConfig.theme?.extend?.colors["softGray"] as string;
  const darkGray = tailwindConfig.theme?.extend?.colors["darkGray"] as string;

  const currentDate = new Date();
  const startDate = new Date(product.createdAt);
  const difference = currentDate.getTime() - startDate.getTime();
  const daysDifference = Math.floor(difference / 1000 / 60 / 60 / 24);
  const isNew = daysDifference < 30;

  return (
    <div
      className={clsx("product-item flex group flex-col relative", className)}
    >
      {!product.availableForSale && (
        <span className="bg-softGray z-10 select-none text-sm block px-4 lg:px-6 py-1 lg:py-2 rounded-md text-darkGray absolute right-4 bottom-4 lg:bottom-auto lg:top-6">
          Out of stock
        </span>
      )}

      {product.availableForSale && isNew && (
        <span className="bg-offWhite z-10 select-none text-sm hidden lg:block px-12 py-2 rounded-md text-darkGray absolute right-6 top-6">
          New
        </span>
      )}

      <div
        style={{
          backgroundColor: product.availableForSale ? softGray : darkGray,
        }}
        className="w-full overflow-hidden relative z-0 bg-softGray aspect-[1/1] h-auto"
      >
        {!!product.availableForSale && (
          <div className="absolute hidden lg:block scale-[0.8] group-hover:scale-100 lg:translate-y-[150%] lg:group-hover:translate-y-0 transition-transform duration-300 ease-out z-10 w-full px-6 lg:px-12 bottom-4 lg:bottom-6">
            <AddToCart
              variants={product.variants}
              availableForSale={product.availableForSale}
            />
          </div>
        )}
        <span
          style={{
            color: product.availableForSale ? darkGray : softGray,
          }}
          className="top-4 left-4 lg:top-6 lg:left-6 font-medium absolute flex flex-col"
        >
          <span className="text-sm lg:text-base">{product.title}</span>
          <span className="mt-2 flex flex-row pointer-events-none items-center gap-2">
            {product.options.map((option) => {
              return option.values.map((value, index) => {
                return (
                  <span key={index} className="uppercase text-gray text-xs">
                    {value}
                  </span>
                );
              });
            })}
          </span>
        </span>
        <h4 className="absolute left-4 bottom-4 flex lg:hidden flex-row w-full text-darkGray text-xl justify-between items-start">
          <span>
            <Price
              className="text-base flex flex-row items-center gap-3"
              compareAmount={
                product.compareAtPriceRange?.maxVariantPrice.amount
              }
              amount={product.priceRange.maxVariantPrice.amount}
              currencyCode={product.priceRange.maxVariantPrice.currencyCode}
            />
          </span>
        </h4>
        <Link
          href={`/product/${product.handle}`}
          className="w-full h-full relative flex items-center justify-center"
        >
          <Image
            alt={product.title}
            src={product.featuredImage?.url}
            blurDataURL={product.featuredImage?.url}
            placeholder="blur"
            width={600}
            height={600}
            className="object-contain -mb-[15%] lg:mb-0 group-hover:scale-105 transition-transform duration-300 ease-out h-[50%] w-[40%]"
          />
        </Link>
      </div>
      <h4 className="hidden lg:flex mt-3 flex-row w-full text-darkGray text-xl justify-between items-start">
        <span>
          <Price
            className="text-base flex flex-row items-center gap-3"
            compareAmount={product.compareAtPriceRange?.maxVariantPrice.amount}
            amount={product.priceRange.maxVariantPrice.amount}
            currencyCode={product.priceRange.maxVariantPrice.currencyCode}
          />
        </span>
      </h4>
      {!!product.availableForSale && (
        <div className="lg:hidden text-xs mt-3 z-10 w-full">
          <AddToCart
            variants={product.variants}
            availableForSale={product.availableForSale}
          />
        </div>
      )}
    </div>
  );
}
