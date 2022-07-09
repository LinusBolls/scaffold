/* <fill:env-zod> */
PORT: z.number(),
ALLOWED_ORIGINS: z.array(z.string().url()),
/* </fill:env-zod> */

/* <fill:parse-env> */
PORT: parseInt(env.PORT),
ALLOWED_ORIGINS: JSON.parse(env.ALLOWED_ORIGINS),
/* </fill:parse-env> */