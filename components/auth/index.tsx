import { getCustomer } from "lib/shopify";
import AuthModal from "./modal";
import { cookies } from "next/headers";

export default async function Auth() {
  const accessToken = cookies().get("accessToken")?.value;
  let customer;
  console.log("got here");
  if (accessToken) {
    console.log("accessToken", accessToken);
    customer = await getCustomer(accessToken);
  }

  return <AuthModal customer={customer} />;
}
