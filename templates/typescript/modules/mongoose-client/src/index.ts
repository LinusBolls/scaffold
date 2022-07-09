/* <fill:3rd-class-imports> */
import { connect } from "mongoose";
/* </fill:3rd-class-imports> */

/* <fill:util> */
async function startDb() {
  console.info(`connecting to database at ${env.DB_CONNECTION_STRING}`);

  await connect(env.DB_CONNECTION_STRING);
}
/* </fill:util> */

/* <fill:main> */
await startDb();
/* </fill:main> */
