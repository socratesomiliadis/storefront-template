import OpengraphImage from "components/opengraph-image";
import { getPage } from "lib/shopify";

export const runtime =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "development" ? "nodejs" : "edge";

export default async function Image({ params }: { params: { page: string } }) {
  const page = await getPage(params.page);
  const title = page.seo?.title || page.title;

  return await OpengraphImage({ title });
}
