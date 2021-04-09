import { Pool } from "pg";
import { secrets } from "./app";
export let pool: Pool;
if (secrets.DOCKERBUILD) {
  pool = new Pool({
    connectionString: `postgres://${secrets.USER}:${secrets.PASSWORD}@${
      !secrets.NODE_ENV
        ? `${secrets.DATABASE_CONTAINER}:${secrets.DATABASE_PORT}`
        : `${secrets.TEST_DATABASE_CONTAINER}:${secrets.TEST_DATABASE_PORT}`
    }/${secrets.DATABASE}`,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  });
} else {
  pool = new Pool({
    connectionString: `postgres://${secrets.USER}:${secrets.PASSWORD}@${
      !secrets.NODE_ENV
        ? `localhost:5400/SocialMedia`
        : `localhost:5400/SocialMediaTest`
    }`,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  });
}
