const express = require("express");
const {
  createList,
  getList,
  deleteList,
  clearCompleted,
  editList,
} = require("./listControl");

const router = express.Router();

router.post("/updateToDoList", createList);
router.get("/", getList);
router.delete("/delete", deleteList);
router.delete("/clearCompleted", clearCompleted);
router.put("/editList", editList);

module.exports = router;
