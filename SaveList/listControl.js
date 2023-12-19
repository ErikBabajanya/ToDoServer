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

module.exports = { createList, getList };
