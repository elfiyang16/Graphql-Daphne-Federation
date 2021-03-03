import { gql } from "apollo-server-express";

export const typeDefs = gql`
  extend type Mutation {
    login(email: String!, password: String!): AccessToken
  }

  type AccessToken {
    accessToken: ID
  }
`;
