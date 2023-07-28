import HomeHero from "components/home/home-hero";
import ProductsOfTheDay from "components/home/products-of-the-day";
// import { Suspense } from "react";

export const runtime = "nodejs";

export const metadata = {
  description:
    "High-performance ecommerce store built with Next.js, Vercel, and Shopify.",
  openGraph: {
    type: "website",
  },
};

export default async function HomePage() {
  return (
    <>
      <HomeHero />
      <ProductsOfTheDay />
    </>
  );
}