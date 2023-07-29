import { getCollectionProducts } from "lib/shopify";
import FeaProdAnim from "./fea-prod-anim";
import { defaultSort, sorting } from "lib/constants";

export default async function FeaturedProducts({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { featured_sort } = searchParams as {
    [key: string]: string;
  };
  const { sortKey, reverse } =
    sorting.find((item) => item.slug === featured_sort) || defaultSort;

  const products = await getCollectionProducts({
    collection: "hidden-featured-products",
    sortKey,
    reverse,
  });

  return <FeaProdAnim products={products} />;
}
