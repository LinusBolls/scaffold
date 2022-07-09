declare namespace NodeJS {
  export interface ProcessEnv {
    MAX_SESSION_DURATION_SECONDS: string;
    NEXT_PUBLIC_CLIENT_URL: string;
    JWT_SECRET: string;
    GOOGLE_ID: string;
    GOOGLE_SECRET: string;
  }
}
