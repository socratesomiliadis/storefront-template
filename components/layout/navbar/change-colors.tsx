"use client";

import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function ChangeNavColor() {
  const [navColor, setNavColor] = useState<"light" | "dark">("light");
  useEffect(() => {
    gsap.to(".inner-nav", {
      color: navColor === "light" ? "#F8F6F0" : "#392F2F",
      duration: 0.4,
      ease: "power3.out",
    });
  }, [navColor]);

  useEffect(() => {
    const lightSections = gsap.utils.toArray(".light-section");
    lightSections.forEach((section) => {
      ScrollTrigger.create({
        trigger: section as HTMLElement,
        start: "top top",
        end: "bottom top",
        onEnter: () => {
          setNavColor("light");
        },
        onEnterBack: () => {
          setNavColor("light");
        },
        onLeave: () => {
          setNavColor("dark");
        },
      });
    });
  }, []);
  return null;
}
