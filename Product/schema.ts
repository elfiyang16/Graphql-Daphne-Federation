import { gql } from "apollo-server-express";

export const typeDefs = gql`
  extend type Query {
    product(id: Int!): Product
    products: [Product]
  }

  type Product @key(fields: "id") {
    id: Int!
    name: String!
    users: [User]
  }

  extend type User @key(fields: "id") {
    id: Int! @external
  }
`;

export interface IProduct {
  id: number;
  name: string;
  users? :IUser[]
}

export interface IUser {
  id: number;
}