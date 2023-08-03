import AllProdAnim from "components/product/all-products-anim";
import { defaultSort, sorting } from "lib/constants";
import { getProducts } from "lib/shopify";

export const runtime = "nodejs";

export const metadata = {
  title: "Products",
  description: "All of our store's products",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { sort, q: searchValue } = searchParams as { [key: string]: string };
  const { sortKey, reverse } =
    sorting.find((item) => item.slug === sort) || defaultSort;

  const products = await getProducts({ sortKey, reverse, query: searchValue });
  const resultsText = products.length > 1 ? "results" : "result";

  return (
    <>
      {searchValue ? (
        <p>
          {products.length === 0
            ? "There are no products that match "
            : `Showing ${products.length} ${resultsText} for `}
          <span className="font-bold">&quot;{searchValue}&quot;</span>
        </p>
      ) : null}
      {products.length > 0 ? <AllProdAnim products={products} /> : null}
    </>
  );
}
