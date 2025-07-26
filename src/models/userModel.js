const pool = require("../../config/db-config");

async function insertUser(user, hashedPassword) {
  await pool.query(
    `INSERT INTO users (firstname, lastname, email, password, membershipstatus)
        VALUES ($1, $2, $3, $4, $5)`,
    [user.firstName, user.lastName, user.email, hashedPassword, true]
  );
}

async function getUserBy(column, value) {
  const { rows } = await pool.query(
    `SELECT * FROM users WHERE ${column} = $1`,
    [value]
  );
  return rows[0];
}

module.exports = { insertUser, getUserBy };
