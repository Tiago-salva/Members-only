const { Router } = require("express");
const {
  getAllMessages,
  createMessageGet,
  createMessagePost,
} = require("../controllers/messagesController");
const { isAuthenticated } = require("../middleware/authMiddleware");
const messagesRouter = Router();

messagesRouter.get("/", getAllMessages);

messagesRouter.get("/new", isAuthenticated, createMessageGet);

messagesRouter.post("/new", createMessagePost);

module.exports = messagesRouter;
