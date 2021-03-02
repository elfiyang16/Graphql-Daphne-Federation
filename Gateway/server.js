import dotenv from "dotenv";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { ApolloGateway } from "@apollo/gateway";
import AuthDataSource from "./authDataSource";

dotenv.config();
console.log("aut", `${process.env.AUTH_DOMAIN}/${process.env.GRAPHQL_PATH}`);
const gateway = new ApolloGateway({
  debug: process.env.ENV !== "prod",
  serviceList: [
    {
      name: "auth",
      url: `${process.env.AUTH_DOMAIN}/${process.env.GRAPHQL_PATH}`,
    },
    {
      name: "product",
      url: `${process.env.PRODUCT_DOMAIN}/${process.env.GRAPHQL_PATH}`,
    },
    {
      name: "user",
      url: `${process.env.USER_DOMAIN}/${process.env.GRAPHQL_PATH}`,
    },
  ],
  buildService({ url }) {
    return new AuthDataSource({ url });
  },
});

const apolloServer = new ApolloServer({
  gateway,
  subscriptions: false,
  context: ({ req }) => ({ req, res: req.res }),
});

const app = express();

apolloServer.applyMiddleware({ app, cors: false });

app.listen(process.env.GATEWAY_PORT, () => {
  console.log(`Gateway server started at ${process.env.GATEWAY_DOMAIN}`);
});
