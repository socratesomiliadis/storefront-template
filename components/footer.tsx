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
        start: "center bottom",
        end: "bottom bottom",
        onLeaveBack: () => {
          footerTl.reverse();
        },
      },
    });
    footerTl.fromTo(
      "main",
      {
        scale: 1,
        duration: 0.6,
        ease: "power4.out",
      },
      {
        scale: 0.95,
        duration: 0.6,
        ease: "power4.out",
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
