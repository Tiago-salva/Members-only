const pool = require("../../config/db-config");

async function insertUser(user, hashedPassword) {
  await pool.query(
    `INSERT INTO users (firstname, lastname, username, password, membershipstatus)
        VALUES ($1, $2, $3, $4, $5)`,
    [user.firstName, user.lastName, user.username, hashedPassword, "none"]
  );
}

async function getUserBy(column, value) {
  const { rows } = await pool.query(
    `SELECT * FROM users WHERE ${column} = $1`,
    [value]
  );
  return rows[0];
}

async function changeMembershipStatus(value, id) {
  await pool.query("UPDATE users SET membershipstatus = $1 WHERE id = $2", [
    value,
    id,
  ]);
}

module.exports = { insertUser, getUserBy, changeMembershipStatus };
