const express = require("express");
const { createList, getList } = require("./listControl");

const router = express.Router();

router.post("/updateToDoList", createList);
router.get("/", getList);

module.exports = router;
