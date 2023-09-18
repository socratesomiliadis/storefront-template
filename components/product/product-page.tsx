"use client";

import { AddToCart } from "components/cart/add-to-cart";
import Price from "components/price";
import { Product } from "lib/shopify/types";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import SplitType from "split-type";
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

  const titleRef = useRef<HTMLHeadingElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const title = titleRef.current as HTMLHeadingElement;
    const section = sectionRef.current as HTMLDivElement;
    const paragraph = section.querySelector(
      ".product-description",
    ) as HTMLParagraphElement;
    const animInItems = section.querySelectorAll(
      ".anim-in",
    ) as NodeListOf<HTMLDivElement>;

    const splitTitle = SplitType.create(title, {
      types: ["words"],
      wordClass: "title-word",
    });
    splitTitle?.words?.forEach((word) => {
      const wordEl = word as HTMLSpanElement;
      const wrapper = document.createElement("div");
      wrapper.classList.add("word-wrapper");
      wrapper.appendChild(wordEl);
      title.appendChild(wrapper);
      wrapper.style.overflow = "hidden";
      wordEl.style.transform = "translateY(100%)";
      wordEl.style.display = "inline-flex";
      wrapper.style.height = `${wordEl.offsetHeight + 10}px`;
    });

    const splitDesc = SplitType.create(paragraph, {
      types: ["lines"],
      lineClass: "desc-line",
    });
    splitDesc?.lines?.forEach((line) => {
      const lineEl = line as HTMLSpanElement;
      const wrapper = document.createElement("div");
      wrapper.classList.add("line-wrapper");
      wrapper.appendChild(lineEl);
      paragraph.appendChild(wrapper);
      wrapper.style.overflow = "hidden";
      lineEl.style.transform = "translateY(100%)";
      wrapper.style.height = `${lineEl.offsetHeight + 10}px`;
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 50%",
      },
      defaults: {
        duration: 1,
        ease: "power4.out",
      },
    });
    tl.set(title, {
      opacity: 1,
    });
    tl.to(
      splitTitle?.words,
      {
        y: 0,
        stagger: 0.05,
      },
      0,
    );
    tl.to(
      splitDesc?.lines,
      {
        y: 0,
        stagger: 0.05,
      },
      0,
    );
    tl.fromTo(
      animInItems,
      {
        opacity: 0,
        y: 50,
        stagger: 0.05,
      },
      {
        opacity: 1,
        y: 0,
        stagger: 0.05,
      },
      0,
    );

    return () => {
      splitTitle?.revert();
      tl.kill();
    };
  }, []);

  return (
    <div className="flex flex-col">
      <div
        ref={sectionRef}
        className="w-full bg-offWhite dark-section pt-12 pb-32 grid grid-cols-1 lg:grid-cols-2 place-items-start gap-16 px-4 lg:px-8"
      >
        <div className="order-2 lg:order-1 w-full relative flex flex-col pt-12 gap-8">
          {firstTwoImages.map((image, index) => {
            return (
              <div
                key={index}
                className="w-full anim-in relative aspect-square h-auto flex items-center justify-center bg-softGray"
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
        <div className="order-1 lg:order-2 lg:sticky top-24 mt-32 w-full flex flex-col px-4 lg:px-8">
          <h1
            ref={titleRef}
            className="text-3xl flex flex-row gap-2 w-full opacity-0 lg:text-4xl text-darkGray font-medium"
          >
            {product.title}
          </h1>
          <p className="text-xl tracking-tight product-description lg:text-3xl mt-4 lg:mt-10 w-full lg:w-2/3 text-darkGray">
            {product.description}
          </p>
          <div className="text-gray mt-16 lg:mt-24 text-lg flex flex-col">
            <div className="w-full anim-in h-[1px] bg-gray/40"></div>
            <div className="w-full anim-in py-5 flex flex-row items-center justify-between">
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
            <div className="w-full anim-in h-[1px] bg-gray/40"></div>
            <div className="w-full anim-in py-5 flex flex-row items-center justify-between">
              <span>Delivery Time</span>
              <span>3-10 Days</span>
            </div>
            <div className="w-full anim-in h-[1px] bg-gray/40"></div>
          </div>
          <AddToCart
            className="anim-in mt-8"
            variants={product.variants}
            availableForSale={product.availableForSale}
          />
        </div>
      </div>
      <section className="rounded-b-lg pt-0 px-4 lg:px-0 lg:pt-64 pb-32 bg-offWhite gap-20 flex flex-col items-center w-full">
        <h3 className="font-medium flex flex-row items-center gap-4 text-darkGray tracking-tight text-2xl md:text-4xl lg:text-7xl">
          Recommended Products
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-y-16 gap-x-8 lg:gap-x-[1vw] px-0 lg:px-[16vw]">
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
