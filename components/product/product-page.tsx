"use client";

import { AddToCart } from "components/cart/add-to-cart";
import Price from "components/price";
import { Product } from "lib/shopify/types";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { gsap } from "gsap";
import ProductItem from "components/product-item";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function ProductPage({
  product,
  recProds,
}: {
  product: Product;
  recProds: Product[];
}) {
  const firstTwoImages = product.images.slice(0, 2);

  useEffect(() => {
    ScrollTrigger.refresh();
  }, []);

  return (
    <div className="flex flex-col">
      <motion.div
        initial={{
          opacity: 0,
          y: 100,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.4,
          ease: "easeOut",
        }}
        className="w-full bg-offWhite dark-section pt-12 pb-32 grid grid-cols-2 place-items-start gap-16 px-8"
      >
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
                  className="w-1/2 h-2/3 object-contain"
                />
              </div>
            );
          })}
        </div>
        <div className="sticky top-0 mt-32 w-full flex flex-col px-8">
          <h1 className=" text-4xl text-darkGray font-medium">
            {product.title}
          </h1>
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
      </motion.div>
      <section className="rounded-b-lg pt-64 pb-32 bg-offWhite gap-20 flex flex-col items-center w-full">
        <h3 className="font-medium flex flex-row items-center gap-4 text-darkGray tracking-tight text-4xl lg:text-7xl">
          Recommended Products
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-y-16 gap-x-8 lg:gap-x-[1vw] px-[16vw]">
          {recProds.map((product) => (
            <div key={product.id} className="w-full">
              <ProductItem product={product} className="w-full" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
