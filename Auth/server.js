import dotenv from "dotenv";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildFederatedSchema } from "@apollo/federation";
import { typeDefs } from "./schema";
import { resolvers } from "./resolver";

dotenv.config();

const app = express();
app.use(express.json());

const apolloServer = new ApolloServer({
  schema: buildFederatedSchema({ typeDefs, resolvers }),
  context: ({ req, res }) => ({ req, res }),
});
// TODO: resolve cors
apolloServer.applyMiddleware({ app, cors: false });

app.listen(parseInt(process.env.AUTH_PORT), () => {
  console.log(`Auth server started at ${process.env.AUTH_DOMAIN}`);
});
