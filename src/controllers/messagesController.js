const db = require("../models/messagesModel");

async function getAllMessages(req, res) {
  const messages = await db.getAllMessages();
  res.render("messages", { messages: messages });
}

async function createMessageGet(req, res) {
  res.render("message-form");
}

async function createMessagePost(req, res) {
  const { id } = res.locals.currentUser;
  await db.insertMessage(id, req.body);
  res.redirect("/messages");
}

async function deleteMessage(req, res) {
  const id = parseInt(req.params.id);
  await db.deleteMessage(id);
  res.redirect("/messages");
}

module.exports = {
  getAllMessages,
  createMessageGet,
  createMessagePost,
  deleteMessage,
};
