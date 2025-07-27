const pool = require("../../config/db-config");

async function getAllMessages() {
  const { rows } = await pool.query("SELECT * FROM messages");
  return rows;
}

async function insertMessage(userId, message) {
  await pool.query(
    "INSERT INTO messages (title, created_date, content, user_id) VALUES ($1, $2, $3, $4)",
    [message.title, new Date(), message.content, userId]
  );
}

module.exports = {
  getAllMessages,
  insertMessage,
};
