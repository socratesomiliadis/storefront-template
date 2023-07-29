"use client";

import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { usePathname, useSearchParams } from "next/navigation";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function ChangeNavColor() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [navColor, setNavColor] = useState<"light" | "dark">("light");
  useEffect(() => {
    gsap.to(".inner-nav", {
      color: navColor === "light" ? "#F8F6F0" : "#392F2F",
      duration: 0.4,
      ease: "power3.out",
    });
  }, [navColor]);

  useEffect(() => {
    if (pathname === "/") {
      const lightSections = gsap.utils.toArray(".light-section");
      const darkSections = gsap.utils.toArray(".dark-section");
      lightSections.forEach((section) => {
        ScrollTrigger.create({
          trigger: section as HTMLElement,
          start: "top 5%",
          end: "bottom 5%",
          id: "light-st",
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

      darkSections.forEach((section) => {
        ScrollTrigger.create({
          trigger: section as HTMLElement,
          start: "top 5%",
          end: "bottom 5%",
          id: "dark-st",
          onEnter: () => {
            setNavColor("dark");
          },
          onEnterBack: () => {
            setNavColor("dark");
          },
          onLeave: () => {
            setNavColor("light");
          },
        });
      });

      return () => {
        const STs = ScrollTrigger.getAll();
        STs.forEach((st) => {
          st.kill();
        });
      };
    } else {
      setNavColor("dark");
    }
  }, [pathname, searchParams]);

  useEffect(() => {
    window.scrollTo(0, 0);
    ScrollTrigger.refresh();
  }, [pathname]);

  useEffect(() => {
    ScrollTrigger.refresh();
  }, [pathname, searchParams]);

  return null;
}
