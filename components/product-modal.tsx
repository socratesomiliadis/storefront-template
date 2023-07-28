"use client";
import { useCallback, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";

export default function Modal({ children }: { children: React.ReactNode }) {
  const overlay = useRef<HTMLDivElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);
  const blackOverlay = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const onDismiss = useCallback(() => {
    const htmlDOM = document.querySelector("html") as HTMLHtmlElement;
    htmlDOM.classList.remove("locked");
    const overlayDOM = overlay.current as HTMLDivElement;
    const blackOverlayDOM = blackOverlay.current as HTMLDivElement;
    gsap.to(blackOverlayDOM, {
      opacity: 0,
      duration: 0.6,
      ease: "power4.out",
    });
    gsap.to(overlayDOM, {
      width: 0,
      duration: 0.6,
      ease: "power4.out",
      onComplete: () => router.back(),
    });
  }, [router]);

  useEffect(() => {
    const htmlDOM = document.querySelector("html") as HTMLHtmlElement;
    htmlDOM.classList.add("locked");
    const blackOverlayDOM = blackOverlay.current as HTMLDivElement;
    const overlayDOM = overlay.current as HTMLDivElement;
    gsap.to(overlayDOM, {
      width: "95vw",
      duration: 0.8,
      ease: "power4.out",
    });
    gsap.to(blackOverlayDOM, {
      opacity: 1,
      duration: 0.8,
      ease: "power4.out",
    });
  }, []);

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onDismiss();
    },
    [onDismiss],
  );

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  return (
    <>
      <div
        ref={overlay}
        className="fixed h-screen w-0 overflow-hidden z-[1001] right-0 top-0"
      >
        <div
          ref={wrapper}
          className="absolute w-[95vw] h-screen overflow-scroll  z-20 top-0 right-0 bg-offWhite p-6"
        >
          {children}
        </div>
      </div>
      <div
        ref={blackOverlay}
        onClick={() => onDismiss()}
        className="bg-black/60 opacity-0 fixed z-[1000] h-full w-full left-0 top-0"
      ></div>
    </>
  );
}
