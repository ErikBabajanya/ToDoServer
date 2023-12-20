const ListModel = require("./listSchema");

const createList = async (req, res) => {
  const { text, myTime, id, completed, archive } = req.body;

  const list = new ListModel({
    text,
    myTime,
    id,
    completed,
    archive,
  });
  try {
    const response = await list.save();
    console.log(response);
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const getList = async (req, res) => {
  try {
    const list = await ListModel.find();
    const currentDate = new Date();
    list.map((item) => {
      if (currentDate.getTime() > new Date(item.myTime).getTime()) {
        item.archive = true;
      }
    });

    res.status(200).json(list);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const deleteList = async (req, res) => {
  const { _id } = req.body;
  console.log(_id);
  try {
    const deletedItem = await ListModel.findByIdAndDelete(_id);
    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.json({ message: "Item deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const clearCompleted = async (req, res) => {
  const { completedIds } = req.body;

  try {
    const result = await ListModel.deleteMany({ _id: { $in: completedIds } });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "No items found for deletion" });
    }

    res.json({ message: "Completed items deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const editList = async (req, res) => {
  const { itemId, newText } = req.body;

  try {
    const updatedItem = await ListModel.findByIdAndUpdate(itemId, {
      text: newText,
    });

    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json({ message: "Item updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { createList, getList, deleteList, clearCompleted, editList };
