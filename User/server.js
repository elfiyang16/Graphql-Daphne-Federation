import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import { ApolloServer } from "apollo-server-express";
import { buildFederatedSchema } from "@apollo/federation";
import { typeDefs } from "./schema";
import { resolvers } from "./resolver";
import { authCheck } from "../Auth/utils";

dotenv.config();

const app = express();

app.use(cookieParser());
app.use(authCheck());

const apolloServer = new ApolloServer({
  schema: buildFederatedSchema({
    typeDefs,
    resolvers,
  }),
  context: (req, res) => ({ req, res }),
});

apolloServer.applyMiddleware({ app, cors: false });

app.listen(parseInt(process.env.USER_PORT), () => {
  console.log(`User server started at ${process.env.USER_DOMAIN}`);
});
