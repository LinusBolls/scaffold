/* <fill:3rd-class-imports> */
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import helmet from "helmet";
/* </fill:3rd-class-imports> */

/* <fill:1st-class-imports> */
import userRouter from "./routers/user.router";
/* </fill:1st-class-imports> */

/* <fill:util> */
const corsOptions = {
  credentials: true,
  origin: env.ALLOWED_ORIGINS,
};
/* </fill:util> */

/* <fill:main> */
const app = express();

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(helmet());

app.use("/api/v1/users", userRouter);

app.listen(env.PORT, () => {
  console.log(
    `api listening on http://localhost:${env.PORT}/api/v1/ in ${env.NODE_ENV} mode`
  );
  console.log(`allowed origins: ${env.ALLOWED_ORIGINS.join(", ")}`);
});
/* </fill:main> */
