// factory functions that will take Model as input and return the same async function that defined earlier.

const createFactory = (ElementModel) => {
  return async function (req, res) {
    try {
      const elementDetails = req.body;
      console.log(elementDetails);
      // adding element to the file
      const element = await ElementModel.create(elementDetails);

      res.status(200).json({
        status: "successfull",
        message: `added  the element `,
        element: element,
      });
    } catch (err) {
      res.status(500).json({
        status: "failure",
        message: err.message,
      });
    }
  };
};

const getAllFactory = (ElementModel) => {
  return async function (req, res) {
    try {
      console.log("I am inside  get method");
      const elementDataStore = await ElementModel.find();
      if (elementDataStore.length == 0) {
        throw new Error("No elements are present");
      }
      res.status(200).json(elementDataStore);
    } catch (err) {
      res.status(404).json({
        status: "failure",
        message: err.message,
      });
    }
  };
};

const getByIdFactory = (ElementModel) => {
  return async function (req, res) {
    try {
      const id = req.params.id;

      const elementDetails = await ElementModel.findById(id);

      if (elementDetails == "no element found") {
        throw new Error(`element with ${id} not found`);
      } else {
        res.status(200).json(elementDetails);
      }
    } catch (err) {
      res.status(404).json({
        status: "failure",
        message: err.message,
      });
    }
  };
};
const updateByIdFactory = (Model) => {
  return async (req, res) => {
    try {
      const id = req.params.id;
      const elementDetails = await Model.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (!elementDetails) {
        res.status(404).json({ message: "Data not found!!" });
      }
      res.status(200).json({
        message: "Data has been updated successfully!!",
        data: elementDetails,
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
};

const deleteByIdFactory = (ElementModel) => {
  return async function (req, res) {
    let { id } = req.params;
    try {
      let element = await ElementModel.findByIdAndDelete(id);
      res.status(200).json({
        status: "successfull element deleted",
        message: element,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        status: "failure",
        message: err.message,
      });
    }
  };
};

module.exports = {
  createFactory,
  getAllFactory,
  getByIdFactory,
  updateByIdFactory,
  deleteByIdFactory,
};
