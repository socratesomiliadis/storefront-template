"use client";

import type { Product } from "lib/shopify/types";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

function MenuLink({
  title,
  path,
  quantity,
}: {
  title: string;
  path: string;
  quantity: number;
}) {
  return (
    <Link href={path} className="w-full flex flex-col gap-8 pt-8">
      <div className="flex flex-row items-center gap-10">
        <span className="text-gray text-3xl">{quantity}</span>
        <span className="text-7xl text-darkGray">{title}</span>
      </div>
      <span className="w-full h-[1px] bg-gray"></span>
    </Link>
  );
}

export default function Fullmenu({
  menuCollections,
  menuProduct,
}: {
  menuCollections: any[];
  menuProduct: Product;
}) {
  useEffect(() => {
    console.log(menuCollections);
  }, [menuCollections]);
  return (
    <>
      <div className="fixed left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[90%] h-[85%] z-[999] flex flex-row">
        <div className="basis-1/2 flex flex-col bg-softGray p-6 justify-between">
          <div className="flex flex-col p-12 basis-[80%]">
            {menuCollections.map((collection) => {
              const title: string = collection.title.replace("menu", "");
              return (
                <MenuLink
                  key={collection.id}
                  title={title}
                  path={collection.path}
                  quantity={collection.quantity}
                />
              );
            })}
          </div>
          <Link href="/products" className="ml-12 flex flex-row items-center">
            <span className="text-lg underline text-gray">See all</span>
          </Link>
        </div>
        <div className="basis-1/2 bg-accentGray">
          <Image
            className="relative h-full w-full object-contain"
            height={600}
            width={600}
            alt={menuProduct.images[0]?.altText as string}
            src={menuProduct.images[0]?.url as string}
            priority={true}
          />
        </div>
      </div>
      <div className="fixed inset-0 w-full h-full z-[998] bg-black/60 backdrop-blur-sm"></div>
    </>
  );
}
