"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Link from "next/link";
gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const footer = footerRef.current as HTMLDivElement;
    const footerST = ScrollTrigger.create({
      trigger: footer,
      start: "center bottom",
      end: "bottom bottom",
      onEnter: () => {
        gsap.to("main", {
          scale: 0.95,
          duration: 0.4,
          ease: "power4.out",
        });
      },
      onLeaveBack: () => {
        gsap.to("main", {
          scale: 1,
          duration: 0.4,
          ease: "power4.out",
        });
      },
    });

    return () => {
      footerST.kill();
    };
  }, []);

  return (
    <footer
      ref={footerRef}
      className="w-screen h-[45vh] bg-softGray relative z-10 flex flex-row py-16 px-[2.5%]"
    >
      <div className="w-2/3 h-full flex flex-col justify-between">
        <p className="text-3xl w-2/3">
          Get updates on products you probably want to know about in your inbox.
        </p>
        <span className="text-lg">
          Copyright © {new Date().getFullYear()} by SOHub for Marmapipis
        </span>
      </div>
      <div className="flex flex-col items-end justify-between pr-32 w-1/3 text-darkGray text-base">
        <div className="flex flex-col">
          <span>Support</span>
          <ul className="flex flex-col mt-12">
            <Link href="/">Shipping & Returns</Link>
            <Link href="/">Help & FAQ</Link>
            <Link href="/">Terms & Conditions</Link>
            <Link href="/">Privacy Policy</Link>
            <Link href="/">Contact</Link>
            <Link href="/">Login</Link>
          </ul>
        </div>
        <div className="flex flex-row items-center text-offWhite gap-3">
          <Link
            href="https://instagram.com"
            target="_blank"
            className="flex items-center justify-center w-10 h-10 bg-darkGray rounded-full"
          >
            <svg
              width="40%"
              viewBox="0 0 21 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.33052 21C3.91631 20.9962 2.56125 20.4321 1.56213 19.4312C0.563017 18.4303 0.00129435 17.0743 0 15.6601L0 5.33052C0.00151662 3.91724 0.56361 2.56229 1.56295 1.56295C2.56229 0.56361 3.91724 0.00151662 5.33052 0H15.6601C17.0743 0.00107856 18.4305 0.562732 19.4315 1.5619C20.4324 2.56106 20.9964 3.91625 21 5.33052V15.6601C20.9968 17.0753 20.4331 18.4317 19.4324 19.4324C18.4317 20.4331 17.0753 20.9968 15.6601 21H5.33052ZM4.23413 10.4998C4.23405 11.7597 4.60758 12.9913 5.30748 14.0389C6.00737 15.0865 7.00221 15.903 8.16617 16.3852C9.33013 16.8674 10.6109 16.9936 11.8466 16.7479C13.0823 16.5021 14.2174 15.8955 15.1083 15.0046C15.9992 14.1138 16.6059 12.9788 16.8518 11.7431C17.0976 10.5074 16.9714 9.22659 16.4893 8.0626C16.0072 6.8986 15.1907 5.90372 14.1432 5.20375C13.0956 4.50379 11.864 4.13018 10.6042 4.13018C8.91549 4.13246 7.29663 4.80425 6.10252 5.99828C4.90842 7.19232 4.23651 8.81113 4.23413 10.4998ZM15.8303 3.69555C15.8298 3.99585 15.9183 4.28956 16.0848 4.53949C16.2513 4.78941 16.4882 4.98431 16.7655 5.09949C17.0429 5.21467 17.3481 5.24495 17.6427 5.18651C17.9372 5.12806 18.2078 4.98351 18.4202 4.77117C18.6325 4.55883 18.7771 4.28824 18.8355 3.99369C18.894 3.69913 18.8637 3.39386 18.7485 3.11653C18.6333 2.8392 18.4384 2.60229 18.1885 2.4358C17.9386 2.26932 17.6448 2.18075 17.3446 2.18132C16.9433 2.18251 16.5589 2.34242 16.2751 2.62614C15.9914 2.90986 15.8315 3.29432 15.8303 3.69555ZM6.24356 10.4998C6.2417 9.69193 6.47955 8.90167 6.92702 8.22905C7.37448 7.55642 8.01143 7.03167 8.75726 6.7212C9.50309 6.41073 10.3243 6.32851 11.1168 6.48495C11.9094 6.64138 12.6378 7.02944 13.2097 7.6C13.7816 8.17056 14.1714 8.89797 14.3298 9.69017C14.4881 10.4824 14.4079 11.3037 14.0992 12.0503C13.7905 12.7969 13.2673 13.4351 12.5958 13.8842C11.9242 14.3333 11.1345 14.573 10.3267 14.5731C9.24603 14.5713 8.21002 14.1418 7.44497 13.3786C6.67992 12.6154 6.248 11.5804 6.24356 10.4998Z"
                fill="currentColor"
              />
            </svg>
          </Link>
          <Link
            href="https://twitter.com"
            target="_blank"
            className="flex items-center justify-center w-10 h-10 bg-darkGray rounded-full"
          >
            <svg
              width="40%"
              viewBox="0 0 24 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24 2.71464C23.117 3.12431 22.168 3.40107 21.1721 3.52557C22.1886 2.88823 22.9694 1.87899 23.337 0.676341C22.3855 1.26662 21.3318 1.69511 20.2102 1.92606C19.3121 0.925102 18.0324 0.299805 16.6161 0.299805C13.8969 0.299805 11.6922 2.60557 11.6922 5.44966C11.6922 5.85331 11.7357 6.24641 11.8197 6.62332C7.72749 6.40857 4.09941 4.35822 1.67084 1.24239C1.247 2.00299 1.00412 2.8876 1.00412 3.83145C1.00412 5.61823 1.8734 7.19452 3.1946 8.11803C2.38748 8.0913 1.62824 7.85961 0.964401 7.47391C0.963841 7.49537 0.963841 7.51696 0.963841 7.53868C0.963841 10.0338 2.66113 12.1152 4.91365 12.5886C4.50049 12.7064 4.06549 12.7692 3.61644 12.7692C3.29916 12.7692 2.99077 12.7369 2.69005 12.6769C3.31669 14.7228 5.13505 16.2118 7.28977 16.2532C5.60461 17.6346 3.48157 18.4579 1.17456 18.4579C0.777121 18.4579 0.385201 18.4334 0 18.3859C2.17908 19.8472 4.76725 20.6998 7.54789 20.6998C16.6047 20.6998 21.5574 12.8525 21.5574 6.04672C21.5574 5.82343 21.5526 5.6014 21.5432 5.38038C22.5051 4.65442 23.3399 3.74748 24 2.71464Z"
                fill="currentColor"
              />
            </svg>
          </Link>
          <Link
            href="https://facebook.com"
            target="_blank"
            className="flex items-center justify-center w-10 h-10 bg-darkGray rounded-full"
          >
            <svg
              width="30%"
              viewBox="0 0 14 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.57876 4.63149C3.57876 4.48188 3.59953 4.15878 3.64109 3.66426C3.68576 3.16869 3.87277 2.65027 4.20834 2.10588C4.54079 1.56357 5.07999 1.07632 5.83009 0.645167C6.57707 0.216095 7.6565 0 9.06527 0H13.0339V4.32501H10.1281C9.8403 4.32501 9.57226 4.43306 9.3302 4.64603C9.09021 4.85901 8.96657 5.0616 8.96657 5.24964V7.94044H13.0329C12.9903 8.46717 12.9435 8.97935 12.8895 9.47388L12.7285 10.7808C12.6641 11.2224 12.5986 11.6317 12.5342 12.0088H8.93749V24H3.57876V12.0078H0.964844V7.94044H3.57876V4.63149Z"
                fill="currentColor"
              />
            </svg>
          </Link>
        </div>
      </div>
    </footer>
  );
}
