"use client";

import clsx from "clsx";
import { addItem } from "components/cart/actions";
import LoadingDots from "components/loading-dots";
import { ProductVariant } from "lib/shopify/types";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "lib/utils";
import { useEffect, useState, useTransition } from "react";

export function AddToCart({
  variants,
  availableForSale,
  className,
  dotsColor = "rgb(255 255 255 / 0.6)",
}: {
  variants: ProductVariant[];
  availableForSale: boolean;
  className?: string;
  dotsColor?: string;
}) {
  const [selectedVariantId, setSelectedVariantId] = useState(variants[0]?.id);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const variant = variants.find((variant: ProductVariant) =>
      variant.selectedOptions.every(
        (option) =>
          option.value === searchParams.get(option.name.toLowerCase()),
      ),
    );

    if (variant) {
      setSelectedVariantId(variant.id);
    }
  }, [searchParams, variants, setSelectedVariantId]);

  return (
    <button
      aria-label="Add item to cart"
      disabled={isPending}
      onClick={() => {
        if (!availableForSale) return;
        startTransition(async () => {
          const error = await addItem(selectedVariantId, 1);

          if (error) {
            alert(error);
            return;
          }

          router.refresh();
        });
      }}
      className={clsx(
        cn(
          "relative flex w-full items-center overflow-hidden justify-center rounded-md bg-darkGray p-3 lg:p-4 text-white hover:opacity-90",
          className,
        ),
        {
          "cursor-not-allowed opacity-60": !availableForSale,
          "cursor-not-allowed": isPending,
        },
      )}
    >
      <span
        style={{
          transform: !isPending ? "translateY(0px)" : "translateY(-150%)",
        }}
        className="transition-transform duration-300 ease-out"
      >
        {availableForSale ? "Add to cart" : "Out Of Stock"}
      </span>
      <div
        style={{
          transform: isPending
            ? "translateY(0px) translateX(-50%)"
            : "translateY(120%) translateX(-50%)",
        }}
        className="absolute transition-transform duration-300 ease-out left-1/2"
      >
        <LoadingDots
          color={dotsColor}
          className={`mb-3 w-[0.4rem] h-[0.4rem] bg-[${dotsColor}]`}
        />
      </div>
    </button>
  );
}
