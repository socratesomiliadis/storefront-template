import customerFragment from "../fragments/customer";

export const customerAccessTokenCreateMutation = /* GraphQL */ `
  mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
      customerAccessToken {
        accessToken
        expiresAt
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

export const customerAccessTokenDeleteMutation = /* GraphQL */ `
  mutation customerAccessTokenDelete($customerAccessToken: String!) {
    customerAccessTokenDelete(customerAccessToken: $customerAccessToken) {
      deletedAccessToken
      deletedCustomerAccessTokenId
      userErrors {
        field
        message
      }
    }
  }
`;

export const customerActivateMutation = /* GraphQL */ `
  mutation customerActivate($id: ID!, $input: CustomerActivateInput!) {
    customerActivate(id: $id, input: $input) {
      customer {
        ...customer
      }
      customerAccessToken {
        accessToken
        expiresAt
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
  ${customerFragment}
`;

export const customerActivateByUrlMutation = /* GraphQL */ `
  mutation customerActivateByUrl($activationUrl: URL!, $password: String!) {
    customerActivateByUrl(activationUrl: $activationUrl, password: $password) {
      customer {
        ...customer
      }
      customerAccessToken {
        accessToken
        expiresAt
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
  ${customerFragment}
`;

export const customerCreateMutation = /* GraphQL */ `
  mutation customerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customerUserErrors {
        code
        field
        message
      }
      customer {
        ...customer
      }
    }
  }
  ${customerFragment}
`;
