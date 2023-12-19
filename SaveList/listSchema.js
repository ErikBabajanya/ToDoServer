const mongoose = require("mongoose");

const listSchema = new mongoose.Schema(
  {
    text: String,
    myTime: String,
    id: Number,
    completed: Boolean,
    archive: Boolean,
  },
  {
    timestamps: true,
  }
);

const ListModel = mongoose.model("list", listSchema);

module.exports = ListModel;
