"use server";

import { createCustomerAccessToken } from "lib/shopify";
import { cookies } from "next/headers";

export const createAccessToken = async (
  email: string,
  password: string,
): Promise<Error | undefined> => {
  try {
    const accessToken = await createCustomerAccessToken(email, password);
    if (accessToken.customerAccessToken.accessToken)
      cookies().set({
        name: "accessToken",
        value: accessToken.customerAccessToken.accessToken,
        secure: true,
      });
    // else {
    //   console.log(accessToken?.customerUserErrors[0]?.message);
    //   return new Error("test", {
    //     cause: accessToken?.customerUserErrors[0]?.message,
    //   });
    // }
  } catch (e) {
    console.log(e);
    return new Error("Error creating access token", {
      cause: e,
    });
  }
};
