import Cart from "components/cart";
import OpenCart from "components/cart/open-cart";
import LogoFull from "components/icons/logo-full";
import { getCollectionProducts } from "lib/shopify";
import Link from "next/link";
import { Suspense } from "react";
import Fullmenu from "./full-menu";
import ChangeNavColor from "./change-colors";

export default async function Navbar() {
  const newProds = await getCollectionProducts({
    collection: "new",
  });
  const bestProds = await getCollectionProducts({
    collection: "best",
  });
  const menProds = await getCollectionProducts({
    collection: "men",
  });
  const womenProds = await getCollectionProducts({
    collection: "women",
  });

  const menu = [
    {
      path: "/products/new",
      title: "New",
      quantity: newProds.length,
      product: newProds[0],
    },
    {
      path: "/products/best",
      title: "Best Sellers",
      quantity: bestProds.length,
      product: bestProds[0],
    },
    {
      path: "/products/men",
      title: "Men",
      quantity: menProds.length,
      product: menProds[0],
    },

    {
      path: "/products/women",
      title: "Women",
      quantity: womenProds.length,
      product: womenProds[0],
    },
  ];

  return (
    <nav className="fixed left-0 w-full top-0 z-[997]">
      <ChangeNavColor />
      <div className="flex inner-nav w-full text-darkGray items-center justify-between p-4 lg:px-6 lg:py-6">
        <Link
          href="/"
          aria-label="Go back home"
          className="flex lg:items-center lg:justify-center lg:mr-6"
        >
          <LogoFull className="fill-[currentColor]" />
        </Link>

        <div className="flex flex-row items-center tracking-tight gap-4 lg:gap-8 text-lg">
          <Link href="/products" className="hidden lg:block">
            Shop
          </Link>
          <Link href="/about" className="hidden lg:block">
            About
          </Link>
          <Suspense fallback={<OpenCart className="h-6" />}>
            <Cart />
          </Suspense>
          <Fullmenu menuInfo={menu} />
        </div>
      </div>
    </nav>
  );
}
