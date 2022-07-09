/* <fill:1st-class-imports> */
import DataSource from "./dataSource";
/* </fill:1st-class-imports> */

/* <fill:util> */
async function startDb() {
  console.info(`connecting to database at ${env.DB_CONNECTION_STRING}`);

  await DataSource.initialize();
}
/* </fill:util> */

/* <fill:main> */
await startDb();
/* </fill:main> */

// const user = new User();

// user.firstName = "Timber";
// user.lastName = "Saw";
// user.age = 25;

// await AppDataSource.manager.save(user);

// const users = await AppDataSource.manager.find(User);

// console.log(users);
