"use client";

import { useRef } from "react";

export default function Banner({
  text = "FREE SHIPPING ON ALL ORDERS OVER $80",
}: {
  text?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      className="banner overflow-hidden max-h-14 transition-[max-height] will-change-[height] duration-300 ease-out w-full relative bg-darkGray flex flex-row items-center justify-center gap-6"
    >
      <span className="text-offWhite text-sm py-3">{text}</span>
      <button
        onClick={() => {
          ref.current!.style.maxHeight = "0px";
        }}
        className="w-5"
      >
        <svg
          width="100%"
          viewBox="0 0 20 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M3.66382 3.20026C7.34415 -0.224047 13.3111 -0.224047 16.9915 3.20026C20.6718 6.62458 20.6718 12.1765 16.9915 15.6008C13.3111 19.0251 7.34415 19.0251 3.66382 15.6008C-0.0164988 12.1765 -0.0164992 6.62458 3.66382 3.20026ZM13.6543 7.23528C13.9304 6.97846 13.9304 6.56206 13.6543 6.30524C13.3783 6.04842 12.9308 6.04842 12.6548 6.30524L10.3273 8.47077L7.9999 6.30524C7.72388 6.04842 7.27636 6.04842 7.00033 6.30524C6.72431 6.56206 6.72431 6.97846 7.00033 7.23528L9.32776 9.40081L7.00033 11.5663C6.72431 11.8232 6.72431 12.2396 7.00033 12.4964C7.27636 12.7532 7.72388 12.7532 7.9999 12.4964L10.3273 10.3308L12.6548 12.4964C12.9308 12.7532 13.3783 12.7532 13.6543 12.4964C13.9304 12.2396 13.9304 11.8232 13.6543 11.5663L11.3269 9.40081L13.6543 7.23528Z"
            fill="#F8F6F0"
          />
        </svg>
      </button>
    </div>
  );
}
