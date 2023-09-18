import LoadingDots from "components/loading-dots";
import { useRouter } from "next/navigation";

import clsx from "clsx";
import { removeItem } from "components/cart/actions";
import type { CartItem } from "lib/shopify/types";
import { useTransition } from "react";

export default function DeleteItemButton({ item }: { item: CartItem }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <button
      aria-label="Remove cart item"
      onClick={() => {
        startTransition(async () => {
          const error = await removeItem(item.id);

          if (error) {
            alert(error);
            return;
          }

          router.refresh();
        });
      }}
      disabled={isPending}
      className={clsx(
        "ease flex h-[17px] w-[17px] items-center justify-center rounded-full transition-all duration-200",
        {
          "cursor-not-allowed px-0": isPending,
        },
      )}
    >
      {isPending ? (
        <LoadingDots color="rgb(0 0 0)" className="bg-black" />
      ) : (
        <span className="w-4">
          <svg
            width="100%"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.94595 13L2.44698 13.0322C2.46396 13.2953 2.6823 13.5 2.94595 13.5V13ZM11.0541 13V13.5C11.3177 13.5 11.536 13.2953 11.553 13.0322L11.0541 13ZM1 2.44595C0.723858 2.44595 0.5 2.6698 0.5 2.94595C0.5 3.22209 0.723858 3.44595 1 3.44595V2.44595ZM13 3.44595C13.2761 3.44595 13.5 3.22209 13.5 2.94595C13.5 2.6698 13.2761 2.44595 13 2.44595V3.44595ZM6.04054 6.18919C6.04054 5.91305 5.81668 5.68919 5.54054 5.68919C5.2644 5.68919 5.04054 5.91305 5.04054 6.18919H6.04054ZM5.04054 9.75676C5.04054 10.0329 5.2644 10.2568 5.54054 10.2568C5.81668 10.2568 6.04054 10.0329 6.04054 9.75676H5.04054ZM8.95946 6.18919C8.95946 5.91305 8.7356 5.68919 8.45946 5.68919C8.18332 5.68919 7.95946 5.91305 7.95946 6.18919H8.95946ZM7.95946 9.75676C7.95946 10.0329 8.18332 10.2568 8.45946 10.2568C8.7356 10.2568 8.95946 10.0329 8.95946 9.75676H7.95946ZM9.02865 3.07058C9.09748 3.338 9.37007 3.499 9.6375 3.43016C9.90492 3.36133 10.0659 3.08874 9.99708 2.82132L9.02865 3.07058ZM1.79833 2.97814L2.44698 13.0322L3.44491 12.9678L2.79626 2.91375L1.79833 2.97814ZM2.94595 13.5H11.0541V12.5H2.94595V13.5ZM11.553 13.0322L12.2017 2.97814L11.2037 2.91375L10.5551 12.9678L11.553 13.0322ZM11.7027 2.44595H2.2973V3.44595H11.7027V2.44595ZM1 3.44595H2.2973V2.44595H1V3.44595ZM11.7027 3.44595H13V2.44595H11.7027V3.44595ZM5.04054 6.18919V9.75676H6.04054V6.18919H5.04054ZM7.95946 6.18919V9.75676H8.95946V6.18919H7.95946ZM7.00001 1.5C7.97532 1.5 8.7961 2.16705 9.02865 3.07058L9.99708 2.82132C9.65358 1.4867 8.44266 0.5 7.00001 0.5V1.5ZM4.97138 3.07058C5.20393 2.16705 6.0247 1.5 7.00001 1.5V0.5C5.55737 0.5 4.34645 1.4867 4.00294 2.82132L4.97138 3.07058Z"
              fill="black"
            />
          </svg>
        </span>
      )}
    </button>
  );
}
