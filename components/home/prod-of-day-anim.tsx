"use client";

import { Product } from "lib/shopify/types";
import ProductItem from "components/product-item";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import SplitType from "split-type";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function ProdOfDayAnim({ products }: { products: Product[] }) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const title = titleRef.current as HTMLHeadingElement;
    const section = sectionRef.current as HTMLDivElement;
    const label = labelRef.current as HTMLSpanElement;
    const productItems = section.querySelectorAll(
      ".product-item",
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
    tl.to(label, {
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
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-offWhite min-h-screen pt-16 justify-evenly gap-16 relative z-10 w-screen flex flex-col items-center"
    >
      <div className="flex flex-col gap-4 items-center">
        <span
          ref={labelRef}
          className="border-[1px] opacity-0 font-medium border-darkGray rounded-full py-2 px-8"
        >
          Featured
        </span>
        <h3
          ref={titleRef}
          className="font-medium flex flex-row items-center gap-4 opacity-0 text-darkGray tracking-tight text-4xl lg:text-7xl"
        >
          Products of the day
        </h3>
      </div>
      <div className="flex flex-col lg:flex-row w-full justify-center gap-8 lg:gap-[1vw] px-6 lg:px-[6vw]">
        {products.map((product) => (
          <ProductItem
            product={product}
            key={product.id}
            className="basis-1/3 opacity-0"
          />
        ))}
      </div>
    </section>
  );
}
