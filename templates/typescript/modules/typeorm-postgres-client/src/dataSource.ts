import "reflect-metadata";
import { DataSource } from "typeorm";

import env from "./env";

const AppDataSource = new DataSource({
  type: "postgres",
  url: env.DB_CONNECTION_STRING,
  synchronize: true,
  logging: false,
  entities: ["src/entity/**/*.ts"],
  migrations: ["src/migration/**/*.ts"],
  subscribers: ["src/subscriber/**/*.ts"],
  cli: {
    entitiesDir: "src/entity",
    migrationsDir: "src/migration",
    subscribersDir: "src/subscriber",
  },
});
export default AppDataSource;
