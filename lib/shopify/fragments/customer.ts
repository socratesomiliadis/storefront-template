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
  }
`;

export default customerFragment;
