"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function HomeHero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const section = sectionRef.current as HTMLDivElement;

    const heroST = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "bottom top",
      onEnter: () => {
        gsap.set(section, {
          padding: 0,
        });
      },
      onLeave: () => {
        gsap.set(section, {
          padding: "0.5rem",
        });
      },
      onEnterBack: () => {
        gsap.set(section, {
          padding: 0,
        });
      },
    });

    return () => {
      heroST.kill();
    };
  }, []);

  return (
    <section
      style={{
        clipPath: "inset(0 0 0 0)",
      }}
      ref={sectionRef}
      className="w-screen relative light-section h-screen z-[5]"
    >
      <video
        poster="/static/images/heroVidThumb.png"
        src="/static/videos/heroVid.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="w-full fixed top-0 h-full object-cover"
      />
    </section>
  );
}
