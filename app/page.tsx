import HelpCTA from "components/help-cta";
import FeaturedProducts from "components/home/featured-products";
import HomeHero from "components/home/home-hero";
import ProductsOfTheDay from "components/home/products-of-the-day";
import QuickInfoSection from "components/home/quick-info-section";
// import { Suspense } from "react";

export const runtime = "nodejs";

export const metadata = {
  description:
    "High-performance ecommerce store built with Next.js, Vercel, and Shopify.",
  openGraph: {
    type: "website",
  },
};

export default async function HomePage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  return (
    <>
      <HomeHero />
      <ProductsOfTheDay />
      <FeaturedProducts searchParams={searchParams} />
      <QuickInfoSection />
      <HelpCTA />
    </>
  );
}
