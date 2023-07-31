"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
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
          <div className="pointer-events-none flex items-center justify-center select-none mr-3 relative">
            <span className="absolute whitespace-nowrap">{active}</span>
            <span className="opacity-0 pointer-events-none">
              {longestTitle.title}
            </span>
          </div>
          <ChevronDownIcon className="h-4 " />
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
