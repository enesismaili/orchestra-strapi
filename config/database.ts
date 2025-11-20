import path from "path";

export default ({ env }) => {
  // Automatically use Postgres on Render (production), SQLite locally
  const client =
      env("DATABASE_CLIENT") ||
      (env("NODE_ENV") === "production" ? "postgres" : "sqlite");

  const connections = {
    // -----------------------------------------------------
    // POSTGRESQL (RENDER PRODUCTION)
    // -----------------------------------------------------
    postgres: {
      connection: {
        host: env("DATABASE_HOST"),
        port: env.int("DATABASE_PORT", 5432),
        database: env("DATABASE_NAME"),
        user: env("DATABASE_USERNAME"),
        password: env("DATABASE_PASSWORD"),
        schema: env("DATABASE_SCHEMA", "public"),
        ssl:
            env.bool("DATABASE_SSL", true) && {
              rejectUnauthorized: false,
            },
      },
      pool: {
        min: env.int("DATABASE_POOL_MIN", 2),
        max: env.int("DATABASE_POOL_MAX", 10),
      },
    },

    // -----------------------------------------------------
    // MYSQL (NOT USED BUT LEFT FOR FLEXIBILITY)
    // -----------------------------------------------------
    mysql: {
      connection: {
        host: env("DATABASE_HOST", "localhost"),
        port: env.int("DATABASE_PORT", 3306),
        database: env("DATABASE_NAME", "strapi"),
        user: env("DATABASE_USERNAME", "strapi"),
        password: env("DATABASE_PASSWORD", "strapi"),
        ssl:
            env.bool("DATABASE_SSL", false) && {
              rejectUnauthorized: env.bool(
                  "DATABASE_SSL_REJECT_UNAUTHORIZED",
                  true
              ),
            },
      },
      pool: {
        min: env.int("DATABASE_POOL_MIN", 2),
        max: env.int("DATABASE_POOL_MAX", 10),
      },
    },

    // -----------------------------------------------------
    // SQLITE (LOCAL DEVELOPMENT)
    // -----------------------------------------------------
    sqlite: {
      connection: {
        filename: path.join(
            __dirname,
            "..",
            "..",
            env("DATABASE_FILENAME", ".tmp/data.db")
        ),
      },
      useNullAsDefault: true,
    },
  };

  return {
    connection: {
      client,
      ...connections[client],
      acquireConnectionTimeout: env.int(
          "DATABASE_CONNECTION_TIMEOUT",
          60000
      ),
    },
  };
};
