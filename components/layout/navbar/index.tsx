import Cart from "components/cart";
import OpenCart from "components/cart/open-cart";
import LogoFull from "components/icons/logo-full";
import { getCollectionProducts } from "lib/shopify";
import { getMenu } from "lib/shopify";
import Link from "next/link";
import { Suspense } from "react";
import Fullmenu from "./full-menu";
import ChangeNavColor from "./change-colors";

export default async function Navbar() {
  const menu = await getMenu("main-menu");
  const menuLinksWithQuantityAndProduct = [] as any[];
  menu.forEach((item) => {
    const handle = item.path.split("/search/").pop();
    if (handle) {
      getCollectionProducts({ collection: handle }).then((products) => {
        menuLinksWithQuantityAndProduct.push({
          ...item,
          quantity: products.length,
          product: products[0],
        });
      });
    }
  });

  return (
    <nav className="fixed left-0 w-full top-0 z-[997]">
      <ChangeNavColor />
      <div className="flex inner-nav w-full text-offWhite items-center justify-between  p-4 lg:px-6 lg:py-6">
        <Link
          href="/"
          aria-label="Go back home"
          className="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6"
        >
          <LogoFull className="fill-[currentColor]" />
        </Link>

        <div className="flex flex-row items-center tracking-tight gap-8  text-lg">
          <Link href="/products">Shop</Link>
          <Link href="/about">About</Link>
          <Suspense fallback={<OpenCart className="h-6" />}>
            <Cart />
          </Suspense>

          <Suspense>
            <Fullmenu menuInfo={menuLinksWithQuantityAndProduct} />
          </Suspense>
        </div>
      </div>
    </nav>
  );
}
