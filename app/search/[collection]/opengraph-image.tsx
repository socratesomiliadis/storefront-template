import OpengraphImage from "components/opengraph-image";
import { getCollection } from "lib/shopify";

export const runtime =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "development" ? "nodejs" : "edge";

export default async function Image({
  params,
}: {
  params: { collection: string };
}) {
  const collection = await getCollection(params.collection);
  const title = collection?.seo?.title || collection?.title;

  return await OpengraphImage({ title });
}
