const pool = require("../../config/db-config");

async function getAllMessages() {
  const { rows } = await pool.query(
    "SELECT messages.*, users.username, users.membershipstatus FROM messages JOIN users ON users.id = messages.user_id"
  );
  return rows;
}

async function insertMessage(userId, message) {
  await pool.query(
    "INSERT INTO messages (title, created_date, content, user_id) VALUES ($1, $2, $3, $4)",
    [message.title, new Date(), message.content, userId]
  );
}

async function deleteMessage(id) {
  await pool.query("DELETE FROM messages WHERE id = $1", [id]);
}

module.exports = {
  getAllMessages,
  insertMessage,
  deleteMessage,
};
