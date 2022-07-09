import env from "./env";

import { connect } from "mongoose";

import express from "express";
import cors from "cors";
import helmet from "helmet";
import "reflect-metadata";
import cookieParser from "cookie-parser";
import { ApolloServer } from "apollo-server-express";
import { buildSchema, Resolver, Query } from "type-graphql";
import type { Application } from "express";

/* <slot:3rd-class-imports/> */

/* <slot:2nd-class-imports/> */

/* <slot:1st-class-imports/> */

async function startMongo() {
  console.info(`connecting to mongodb at ${env.MONGO_CONNECTION_STRING}`);

  await connect(env.MONGO_CONNECTION_STRING);
}

@Resolver()
class HelloResolver {
  @Query(() => String)
  async hello() {
    return "hello world";
  }
}

const corsOptions = {
  credentials: true,
  origin: env.ALLOWED_ORIGINS,
};

async function applyApolloMiddleware(app: Application) {
  const schema = await buildSchema({
    resolvers: [HelloResolver],
  });
  const apolloServer = new ApolloServer({ schema });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app });

  return app;
}

/* <slot:util/> */

async function main() {
  await startMongo();

  const app = await applyApolloMiddleware(express());

  app.use(cors(corsOptions));
  app.use(cookieParser());
  app.use(helmet());

  app.listen(env.PORT, () => {
    console.log(
      `api listening on http://localhost:${env.PORT}/graphql/ in ${env.NODE_ENV} mode`
    );
    console.log(`allowed origins: ${env.ALLOWED_ORIGINS.join(", ")}`);
  });

  /* <slot:main/> */
}
main();
