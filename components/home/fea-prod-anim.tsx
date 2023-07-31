"use client";

import { Product } from "lib/shopify/types";
import ProductItem from "components/product-item";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import SplitType from "split-type";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import FilterList from "./filter";
import { motion } from "framer-motion";
import { sorting } from "lib/constants";
import Link from "next/link";
gsap.registerPlugin(ScrollTrigger);

export default function FeaProdAnim({ products }: { products: Product[] }) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const title = titleRef.current as HTMLHeadingElement;
    const section = sectionRef.current as HTMLDivElement;
    const productItems = section.querySelectorAll(
      ".product-item",
    ) as NodeListOf<HTMLDivElement>;
    const filterList = section.querySelector(".filter-list") as HTMLDivElement;
    const productsNum = section.querySelector(
      ".products-num",
    ) as HTMLSpanElement;
    const seeAllBtn = section.querySelector(".see-all-btn") as HTMLDivElement;

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
      wrapper.style.height = `${wordEl.offsetHeight + 10}px`;
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
    tl.fromTo(
      filterList,
      {
        opacity: 0,
      },
      {
        opacity: 1,
      },
      0.1,
    );
    tl.fromTo(
      productsNum,
      {
        opacity: 0,
      },
      {
        opacity: 1,
      },
      0.1,
    );
    tl.fromTo(
      seeAllBtn,
      {
        opacity: 0,
      },
      {
        opacity: 1,
      },
      0.1,
    );
    tl.fromTo(
      productItems,
      {
        y: 50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.1,
      },
      0.1,
    );

    return () => {
      splitTitle?.revert();
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-offWhite py-64 min-h-screen justify-evenly gap-16 relative z-10 w-screen flex flex-col items-center px-6 lg:px-[6vw]"
    >
      <div className="w-full flex flex-row items-center justify-between">
        <div className="flex flex-row gap-4 items-start">
          <h3
            ref={titleRef}
            className="font-medium flex flex-row items-center gap-4 opacity-0 text-darkGray tracking-tight text-4xl lg:text-7xl"
          >
            Featured Products
          </h3>
          <span className="text-4xl products-num text-gray">
            {products.length}
          </span>
        </div>
        <FilterList list={sorting} />
      </div>
      <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-8 lg:gap-[1vw] ">
        {products.map((product) => (
          <motion.div
            layout
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            key={product.id}
            className="w-full"
          >
            <ProductItem product={product} className="w-full opacity-0" />
          </motion.div>
        ))}
      </div>
      <Link
        href="/products"
        className="see-all-btn mt-16 flex flex-row items-center"
      >
        <span className="text-lg underline text-gray">See all</span>
      </Link>
    </section>
  );
}
