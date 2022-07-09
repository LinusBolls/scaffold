/* <fill:3rd-class-imports> */
import express from "express";
import cors from "cors";
import helmet from "helmet";
import "reflect-metadata";
import cookieParser from "cookie-parser";
import { ApolloServer } from "apollo-server-express";
import { buildSchema, Resolver, Query } from "type-graphql";
import type { Application } from "express";
/* </fill:3rd-class-imports> */

/* <fill:1st-class-imports> */
import resolvers from "./resolvers";
/* </fill:1st-class-imports> */

/* <fill:util> */
const corsOptions = {
  credentials: true,
  origin: env.ALLOWED_ORIGINS,
};

async function applyApolloMiddleware(app: Application) {
  const schema = await buildSchema({ resolvers });

  const apolloServer = new ApolloServer({ schema });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app });

  return app;
}
/* </fill:util> */

/* <fill:main> */
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
/* </fill:main> */
