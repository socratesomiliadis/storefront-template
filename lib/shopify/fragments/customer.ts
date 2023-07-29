const customerFragment = /* GraphQL */ `
  fragment customer on Customer {
    id
    firstName
    lastName
    displayName
    email
    phone
    acceptsMarketing
    createdAt
    orders(first: 100) {
      edges {
        node {
          id
          currentTotalPrice
          currentTotalTax
          email
          orderNumber
        }
      }
    }
  }
`;

export default customerFragment;
