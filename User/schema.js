import { gql } from "apollo-server-express";

export const typeDefs = gql`
  extend type Query {
    user(id: Int!): User
    users: [User]
  }

  type User @key(fields: "id") {
    id: Int!
    name: String!
    products: [Product]
  }
  extend type Product @key(fields: "id") {
    id: Int! @external
  }
`;
