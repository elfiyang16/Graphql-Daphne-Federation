import dotenv from "dotenv";
import express, {Application} from "express";
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
    resolvers: resolvers as any,
  }),
  context: (req, res) => ({ req, res }),
});

apolloServer.applyMiddleware({ app: app as Application, cors: false });

app.listen(parseInt(process.env.PRODUCT_PORT as string), () => {
  console.log(`Product server started at ${process.env.PRODUCT_DOMAIN}`);
});
