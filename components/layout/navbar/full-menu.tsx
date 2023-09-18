"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { Cross as Hamburger } from "hamburger-react";
import { usePathname } from "next/navigation";

function MenuLink({
  title,
  path,
  quantity,
  index,
  setActiveImage,
}: {
  title: string;
  path: string;
  quantity: number;
  index: number;
  setActiveImage: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <Link
      href={path}
      onMouseOver={() => setActiveImage(index)}
      className="w-full group relative overflow-hidden flex flex-col gap-10 pt-10"
    >
      <div className="group-hover:ml-6 translate-y-[200%] menu-link-item transition-[margin-left] duration-200 ease-out flex flex-row items-center gap-10">
        <span className="text-gray text-xl lg:text-3xl">{quantity}</span>
        <span className="text-4xl lg:text-7xl text-darkGray">{title}</span>
        <span className="w-0 group-hover:w-12 transition-[width] duration-200 ease-out">
          <svg
            width="100%"
            viewBox="0 0 49 42"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M26.8333 40.1668L46.0001 21.0001L26.8333 1.83335M-7.09467e-05 21.0001H44.0834"
              stroke="#131313"
              stroke-width="4"
            />
          </svg>
        </span>
      </div>
      <span className="w-0 menu-link-line h-[1px] bg-gray"></span>
    </Link>
  );
}

export default function Fullmenu({ menuInfo }: { menuInfo: any[] }) {
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const fullMenuImages = gsap.utils.toArray(".full-menu-image");
    const fullMenuImage = fullMenuImages[activeImage] as HTMLElement;
    const changeTl = gsap.timeline({ paused: true });
    changeTl.to(fullMenuImages, {
      opacity: 0,
      duration: 0.4,
      ease: "linear",
    });
    changeTl.to(
      fullMenuImage,
      {
        opacity: 1,
        duration: 0.4,
        ease: "linear",
      },
      0.05,
    );

    changeTl.restart();

    return () => {
      changeTl.kill();
    };
  }, [activeImage]);

  useEffect(() => {
    if (isOpen) {
      const openTl = gsap.timeline({ paused: true });
      openTl.to(
        ".full-menu-left",
        {
          maxHeight: "100%",
          duration: 0.8,
          ease: "power3.out",
        },
        0,
      );
      openTl.to(
        ".full-menu-right",
        {
          maxHeight: "100%",
          duration: 0.8,
          ease: "power3.out",
        },
        0,
      );
      openTl.to(
        ".full-menu-right-image",
        {
          opacity: 1,
          duration: 0.4,
          ease: "linear",
        },
        0,
      );
      openTl.set(".full-menu", {
        backgroundColor: "rgb(232 228 221)",
      });
      openTl.to(
        ".full-menu-overlay",
        {
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
        },
        0,
      );
      openTl.to(
        ".menu-link-item",
        {
          y: 0,
          duration: 0.6,
          stagger: 0.05,
          ease: "power3.out",
        },
        0.4,
      );
      openTl.to(
        ".menu-link-line",
        {
          width: "100%",
          duration: 0.6,
          stagger: 0.05,
          ease: "power3.out",
        },
        0.4,
      );
      openTl.set(
        ".full-menu-overlay",
        {
          pointerEvents: "all",
        },
        0.4,
      );

      openTl.restart();

      return () => {
        openTl.kill();
      };
    } else {
      const closeTl = gsap.timeline({
        paused: true,
      });
      closeTl.to(".full-menu-left", {
        maxHeight: "0%",
        duration: 0.8,
        ease: "power3.out",
      });
      closeTl.to(
        ".full-menu-right",
        {
          maxHeight: "0%",
          duration: 0.8,
          ease: "power3.out",
        },
        0,
      );
      closeTl.set(
        ".full-menu-overlay",
        {
          pointerEvents: "none",
        },
        0,
      );
      closeTl.to(
        ".menu-link-item",
        {
          y: "200%",
          duration: 0.6,
          stagger: 0.05,
          ease: "power3.out",
        },
        0,
      );
      closeTl.to(
        ".menu-link-line",
        {
          width: 0,
          duration: 0.6,
          stagger: 0.05,
          ease: "power3.out",
        },
        0,
      );
      closeTl.to(
        ".full-menu-right-image",
        {
          opacity: 0,
          duration: 0.4,
          ease: "linear",
        },
        0,
      );

      closeTl.set(
        ".full-menu",
        {
          backgroundColor: "transparent",
        },
        0,
      );
      closeTl.to(
        ".full-menu-overlay",
        {
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        0,
      );

      closeTl.restart();

      return () => {
        closeTl.kill();
      };
    }
  }, [isOpen]);

  return (
    <>
      <div
        onClick={() => {
          setIsOpen(true);
        }}
        className="p-0 bg-darkGray rounded-full flex items-center justify-center"
      >
        <Hamburger size={16} color="#F8F6F0" toggled={false} />
      </div>
      <div className="select-none pointer-events-none fixed left-1/2 full-menu -translate-x-1/2 top-1/2 -translate-y-1/2 bg-transparent w-[90%] h-[95%] lg:h-[85%] z-[999] flex flex-row">
        <div className="basis-full relative lg:basis-1/2 pointer-events-auto full-menu-left max-h-0 overflow-hidden flex flex-col bg-softGray justify-between">
          <div
            onClick={() => {
              setIsOpen(false);
            }}
            className="p-0 bg-darkGray absolute right-6 top-6 rounded-full flex lg:hidden items-center justify-center"
          >
            <Hamburger size={16} color="#F8F6F0" toggled={true} />
          </div>
          <div className="mt-8 lg:mt-0 flex flex-col p-6 lg:p-16 basis-[90%] lg:basis-[80%]">
            {menuInfo.map((item, index) => {
              return (
                <MenuLink
                  key={index}
                  title={item.title}
                  path={item.path}
                  quantity={item.quantity}
                  index={index}
                  setActiveImage={setActiveImage}
                />
              );
            })}
          </div>
          <Link
            href="/products"
            className="ml-6 lg:ml-16 mb-6 flex flex-row items-center"
          >
            <span className="text-lg underline text-gray">See all</span>
          </Link>
        </div>

        <div className="basis-1/2 relative pointer-events-auto full-menu-right max-h-0 overflow-hidden bg-accentGray hidden lg:flex items-center justify-center">
          <div
            onClick={() => {
              setIsOpen(false);
            }}
            className="p-0 bg-darkGray absolute right-6 top-6 rounded-full flex items-center justify-center"
          >
            <Hamburger size={16} color="#F8F6F0" toggled={true} />
          </div>
          <div className="relative full-menu-right-image opacity-0 w-1/3 h-1/2">
            {menuInfo.map((item, index) => {
              return (
                <Image
                  key={index}
                  id={`fullMenuImage${index}`}
                  className="absolute full-menu-image opacity-0 w-full h-full object-center object-contain"
                  height={800}
                  width={800}
                  alt={item.product?.images[0]?.altText as string}
                  src={item.product?.images[0]?.url as string}
                  priority={true}
                />
              );
            })}
          </div>
          {/* <Image
            className="relative full-menu-right-image opacity-0 w-1/3 object-contain"
            height={800}
            width={800}
            alt={menuProduct.images[0]?.altText as string}
            src={menuProduct.images[0]?.url as string}
            priority={true}
          /> */}
        </div>
      </div>
      <div
        onClick={() => {
          setIsOpen(false);
        }}
        className="full-menu-overlay opacity-0 fixed inset-0 w-full h-full z-[998] bg-black/60 backdrop-blur-sm pointer-events-none"
      ></div>
    </>
  );
}
