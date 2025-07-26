const { Pool } = require("pg");
const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    "postgres://postgres:roottree@localhost:5432/members_only",
});

module.exports = pool;
