const { Router } = require("express");
const {
  getAllMessages,
  createMessageGet,
  createMessagePost,
  deleteMessage,
} = require("../controllers/messagesController");
const { isAuthenticated } = require("../middleware/authMiddleware");
const messagesRouter = Router();

messagesRouter.get("/messages", getAllMessages);

messagesRouter.get("/messages/new", isAuthenticated, createMessageGet);

messagesRouter.post("/messages/new", createMessagePost);

messagesRouter.post("/messages/:id/delete", deleteMessage);

module.exports = messagesRouter;
