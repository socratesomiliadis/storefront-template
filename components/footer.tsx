"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const footer = footerRef.current as HTMLDivElement;
    const footerTl = gsap.timeline({
      scrollTrigger: {
        trigger: footer,
        start: "top bottom",
        end: "bottom bottom",
        scrub: true,
      },
    });
    footerTl.set("main", {
      overflow: "hidden",
    });
    footerTl.fromTo(
      "main",
      {
        scale: 1,
        borderRadius: 0,
      },
      {
        scale: 0.95,
        borderRadius: "0.75rem",
      },
      0,
    );

    return () => {
      footerTl.kill();
    };
  }, []);

  return (
    <footer
      ref={footerRef}
      className="w-screen h-[40vh] bg-softGray relative z-10"
    ></footer>
  );
}
