import AuthDataSource from "./authDataSource";
import dotenv from "dotenv";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { ApolloGateway } from "@apollo/gateway";
import path from "path";
import logger from "morgan";

dotenv.config();
console.log("aut", `${process.env.AUTH_DOMAIN}/${process.env.GRAPHQL_PATH}`);
const gateway = new ApolloGateway({
  debug: process.env.ENV !== "prod",
  serviceList: [
    {
      name: "user",
      url: `${process.env.USER_DOMAIN}/${process.env.GRAPHQL_PATH}`,
    },
    {
      name: "product",
      url: `${process.env.PRODUCT_DOMAIN}/${process.env.GRAPHQL_PATH}`,
    },
    {
      name: "auth",
      url: `${process.env.AUTH_DOMAIN}/${process.env.GRAPHQL_PATH}`,
    }

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

app.use(logger("dev"));

// app.use(express.json());

app.use("/public", express.static(path.join(__dirname, "public")));

// app.get("/", (req, res) => {
//   res.redirect(301, "public/index.html")
// })

// app.post("/", (req, res) => {
//   res.redirect(308, "/graphql");
// });

app.get("/health", (req, res) => {
  res.send("Ok");
});


apolloServer.applyMiddleware({ app, cors: false });

app.listen(process.env.GATEWAY_PORT, () => {
  console.log(`Gateway server started at ${process.env.GATEWAY_DOMAIN}`);
});
