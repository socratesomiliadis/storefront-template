"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import OpenAuth from "./open-auth";
import { Customer } from "lib/shopify/types";
import { LoginForm } from "./login-form";

export default function AuthModal({
  customer,
}: {
  customer: Customer | undefined;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const openAuth = () => setIsOpen(true);
  const closeAuth = () => setIsOpen(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      <button aria-label="Open Auth" onClick={openAuth}>
        <OpenAuth />
      </button>
      <Transition show={isOpen}>
        <Dialog onClose={closeAuth} className="cart-modal relative z-[1003]">
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
                <p className="text-lg">Login</p>

                <button aria-label="Close cart" onClick={closeAuth}>
                  Close
                </button>
              </div>
              <div className="mt-16">
                {!customer && <LoginForm />}
                {!!customer && <div>{customer.displayName}</div>}
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}
