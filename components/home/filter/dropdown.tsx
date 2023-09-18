"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { ListItem } from ".";
import { FilterItem } from "./item";

export default function FilterItemDropdown({ list }: { list: ListItem[] }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [active, setActive] = useState("");
  const [openSelect, setOpenSelect] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpenSelect(false);
      }
    };

    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  const longestTitle = list.reduce((a, b) =>
    a.title.length > b.title.length ? a : b,
  );

  useEffect(() => {
    list.forEach((listItem: ListItem) => {
      if (
        ("path" in listItem && pathname === listItem.path) ||
        ("slug" in listItem &&
          searchParams.get("featured_sort") === listItem.slug)
      ) {
        setActive(listItem.title);
      }
    });
  }, [pathname, list, searchParams]);

  return (
    <motion.div layout className="flex flex-row items-center gap-4">
      {" "}
      <span className="block whitespace-nowrap">Sort by</span>
      <div className="relative" ref={ref}>
        <div
          onClick={() => {
            setOpenSelect(!openSelect);
          }}
          className="flex w-full cursor-pointer items-center justify-between rounded bg-accentGray px-16 py-2 text-sm"
        >
          <div className="pointer-events-none flex items-center justify-center select-none mr-1 relative">
            <span className="absolute flex flex-row items-center gap-2 whitespace-nowrap">
              {active}
              <span className="w-[0.4rem]">
                <svg
                  width="100%"
                  viewBox="0 0 9 7"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.50009 6.51296C4.23656 6.51296 4.00069 6.40204 3.86919 6.21627L0.0984239 0.887792C0.0329227 0.795183 0.000168779 0.693762 0.000168783 0.592267C0.000168786 0.490432 0.0330896 0.388594 0.0990152 0.29586C0.230781 0.110568 0.466299 -6.29714e-08 0.729332 -4.62764e-08L8.27107 4.32408e-07C8.53411 4.49103e-07 8.76963 0.110575 8.90122 0.29579C9.03298 0.481082 9.03307 0.702359 8.90198 0.887722L5.13122 6.21638C4.9997 6.40215 4.76362 6.51296 4.50009 6.51296Z"
                    fill="currentColor"
                  />
                </svg>
              </span>
            </span>
            <span className="opacity-0 pointer-events-none">
              {longestTitle.title}
            </span>
          </div>
        </div>
        <AnimatePresence>
          {openSelect && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => {
                setOpenSelect(false);
              }}
              className="absolute overflow-hidden select-none z-40 w-full rounded-b-md bg-accentGray -mt-1  shadow-md dark:bg-black"
            >
              <div className="p-4">
                {list.map((item: ListItem, i) => (
                  <FilterItem key={i} item={item} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
