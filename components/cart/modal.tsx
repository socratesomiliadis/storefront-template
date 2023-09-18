"use client";

import { Dialog, Transition } from "@headlessui/react";
import Price from "components/price";
import { DEFAULT_OPTION } from "lib/constants";
import type { Cart, Product } from "lib/shopify/types";
import { createUrl } from "lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import CloseCart from "./close-cart";
import DeleteItemButton from "./delete-item-button";
import EditItemQuantityButton from "./edit-item-quantity-button";
import OpenCart from "./open-cart";
import { AddToCart } from "./add-to-cart";

type MerchandiseSearchParams = {
  [key: string]: string;
};

export default function CartModal({
  cart,
  recommendedProduct,
}: {
  cart: Cart | undefined;
  recommendedProduct: Product | undefined;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const quantityRef = useRef(cart?.totalQuantity);
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  const pathname = usePathname();

  useEffect(() => {
    // Open cart modal when when quantity changes.
    if (cart?.totalQuantity !== quantityRef.current) {
      // But only if it's not already open (quantity also changes when editing items in cart).
      if (!isOpen) {
        setIsOpen(true);
      }

      // Always update the quantity reference
      quantityRef.current = cart?.totalQuantity;
    }
  }, [isOpen, cart?.totalQuantity, quantityRef, recommendedProduct]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      <button aria-label="Open cart" onClick={openCart}>
        <OpenCart quantity={cart?.totalQuantity} />
      </button>
      <Transition show={isOpen}>
        <Dialog onClose={closeCart} className="cart-modal relative z-[1003]">
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="opacity-0 backdrop-blur-none"
            enterTo="opacity-100 backdrop-blur-[.5px]"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="opacity-100 backdrop-blur-[.5px]"
            leaveTo="opacity-0 backdrop-blur-none"
          >
            <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="fixed bottom-0 right-0 top-0 flex h-full w-full flex-col border-l border-neutral-200 bg-softGray py-6 px-12 text-black backdrop-blur-xl md:w-[45vw]">
              <div className="flex items-center justify-between">
                <p className="text-lg">My Cart</p>

                <button aria-label="Close cart" onClick={closeCart}>
                  <CloseCart />
                </button>
              </div>

              {!cart || cart.lines.length === 0 ? (
                <div className="mt-8 flex w-full flex-col">
                  <p className="text-left font-medium text-5xl text-darkGray">
                    Your cart is empty.
                  </p>
                </div>
              ) : (
                <div className="flex h-full flex-col justify-between overflow-hidden">
                  <ul className="flex-grow overflow-auto pr-4 py-4">
                    {cart.lines.map((item, i) => {
                      const merchandiseSearchParams =
                        {} as MerchandiseSearchParams;

                      item.merchandise.selectedOptions.forEach(
                        ({ name, value }) => {
                          if (value !== DEFAULT_OPTION) {
                            merchandiseSearchParams[name.toLowerCase()] = value;
                          }
                        },
                      );

                      const merchandiseUrl = createUrl(
                        `/product/${item.merchandise.product.handle}`,
                        new URLSearchParams(merchandiseSearchParams),
                      );

                      return (
                        <li key={i} className="flex w-full flex-col">
                          <div className="relative flex w-full flex-row justify-between px-1 py-4">
                            <Link
                              href={merchandiseUrl}
                              onClick={closeCart}
                              className="z-30 flex flex-row gap-4 items-center space-x-4"
                            >
                              <div className="relative h-40 w-40 cursor-pointer overflow-hidden rounded-md flex items-center justify-center bg-accentGray">
                                <Image
                                  className="w-[55%] h-[55%] object-contain"
                                  width={120}
                                  height={120}
                                  alt={
                                    item.merchandise.product.featuredImage
                                      .altText || item.merchandise.product.title
                                  }
                                  src={
                                    item.merchandise.product.featuredImage.url
                                  }
                                />
                              </div>

                              <div className="flex flex-col items-start gap-6">
                                <div className="flex flex-row items-center gap-3 text-base">
                                  <span className="leading-tight text-2xl">
                                    {item.merchandise.product.title}
                                  </span>
                                  {item.merchandise.title !== DEFAULT_OPTION ? (
                                    <p className="bg-accentGray/50 py-1 px-2 rounded-full text-darkGray text-xs">
                                      {item.merchandise.title}
                                    </p>
                                  ) : null}
                                </div>
                                <Price
                                  className="text-base text-darkGray/90"
                                  amount={item.cost.totalAmount.amount}
                                  currencyCode={
                                    item.cost.totalAmount.currencyCode
                                  }
                                />
                              </div>
                            </Link>
                            <div className="flex flex-row items-start mt-10 gap-12">
                              <div className="ml-auto flex flex-row items-center rounded-full border border-neutral-200 dark:border-neutral-700">
                                <EditItemQuantityButton
                                  item={item}
                                  type="minus"
                                />
                                <p className="w-6 text-center ">
                                  <span className="w-full text-sm">
                                    {item.quantity}
                                  </span>
                                </p>
                                <EditItemQuantityButton
                                  item={item}
                                  type="plus"
                                />
                              </div>
                              <div className="z-40 mt-1 mr-3">
                                <DeleteItemButton item={item} />
                              </div>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                  {recommendedProduct && (
                    <div className="flex mb-16 flex-col w-full">
                      <span className="text-2xl text-darkGray">
                        You might like
                      </span>
                      <div className="mt-6 w-full flex flex-row">
                        <Link
                          href={`/product/${recommendedProduct.handle}`}
                          className="w-1/5 aspect-square flex items-center justify-center h-auto bg-accentGray"
                        >
                          <Image
                            className="w-1/3 object-contain"
                            src={recommendedProduct.featuredImage.url}
                            width={1920}
                            height={1080}
                            alt="Cart background"
                          />
                        </Link>
                        <div className="w-4/5 bg-[#1E1E1E] h-full p-6 flex flex-col justify-between">
                          <h3 className="text-offWhite text-2xl">
                            {recommendedProduct.title}
                          </h3>
                          <p className="text-gray mt-3 w-2/3 text-lg">
                            {recommendedProduct.description}
                          </p>
                          <div className="flex flex-row mt-2 items-center justify-between w-full">
                            <div className="w-1/3">
                              {recommendedProduct.variants && (
                                <AddToCart
                                  dotsColor="rgb(30 30 30 / 0.6)"
                                  variants={recommendedProduct.variants}
                                  availableForSale={
                                    recommendedProduct.availableForSale
                                  }
                                  className="bg-offWhite text-darkGray py-2"
                                />
                              )}
                            </div>
                            <Price
                              className="text-lg text-offWhite -mb-2 mr-8 flex flex-row items-center gap-3"
                              compareAmount={
                                recommendedProduct.compareAtPriceRange
                                  ?.maxVariantPrice.amount
                              }
                              amount={
                                recommendedProduct.priceRange.maxVariantPrice
                                  .amount
                              }
                              currencyCode={
                                recommendedProduct.priceRange.maxVariantPrice
                                  .currencyCode
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="py-4text-xl text-darkGray">
                    <div className="mb-3 flex items-end justify-between">
                      <p>Subtotal</p>
                      <Price
                        className="text-right text-black dark:text-white"
                        amount={cart.cost.totalAmount.amount}
                        currencyCode={cart.cost.totalAmount.currencyCode}
                      />
                    </div>
                  </div>
                  <a
                    href={cart.checkoutUrl}
                    className="block w-full rounded-md bg-darkGray py-4 text-center text-xl text-white opacity-90 hover:opacity-100"
                  >
                    CHECK OUT
                  </a>
                </div>
              )}
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}
