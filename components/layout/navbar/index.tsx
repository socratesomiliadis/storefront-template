import Cart from "components/cart";
import OpenCart from "components/cart/open-cart";
import LogoFull from "components/icons/logo-full";
import { getCollectionProducts, getMenuCollections } from "lib/shopify";
// import { getMenu } from "lib/shopify";
// import { Menu } from "lib/shopify/types";
import { Product } from "lib/shopify/types";
import Link from "next/link";
import { Suspense } from "react";
import Fullmenu from "./full-menu";

export default async function Navbar() {
  // const menu = await getMenu("next-js-frontend-header-menu");
  const menuCollections = await getMenuCollections();
  const collectionsWithQuantity = [...menuCollections] as any[];
  for (let i = 0; i < menuCollections.length; i++) {
    const collection = collectionsWithQuantity[i];
    const quant = await getCollectionProducts({
      collection: collection!.handle,
    }).then((products) => products.length);
    collectionsWithQuantity[i] = {
      ...collection,
      quantity: quant,
    };
  }
  const menuProduct = (
    await getCollectionProducts({
      collection: menuCollections[0]!.handle,
    })
  )?.[0] as Product;

  return (
    <nav className="relative flex items-center justify-between p-4 lg:px-6">
      <div className="flex w-full items-center justify-between">
        <div className="flex ">
          <Link
            href="/"
            aria-label="Go back home"
            className="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6"
          >
            <LogoFull />
          </Link>
        </div>
        <Suspense>
          <Fullmenu
            menuCollections={collectionsWithQuantity}
            menuProduct={menuProduct}
          />
        </Suspense>

        <div className="flex flex-row items-center tracking-tight gap-8 text-darkGray text-lg">
          <Link href="/products">Shop</Link>
          <Link href="/about">About</Link>
          <Suspense fallback={<OpenCart className="h-6" />}>
            <Cart />
          </Suspense>
        </div>
      </div>
    </nav>
  );
}
