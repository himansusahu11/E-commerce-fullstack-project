const express = require("express");
const ProductRouter = express.Router();

const {
  createProductHandler,
  getProductById,
  updateProductById,
  deleteProductById,
} = require("../controllers/ProductController");

const { checkInput } = require("../controllers/middleWares");
const ProductModel = require("../models/ProductModel");
const {
  protectRouteMiddleWare,
  isAuthorizedMiddleWare,
} = require("../controllers/AuthController");

const getProductCategories = async (req, res) => {
  // to create dynamic categories, persist the data in a file and read the content of that file and just set into data
  res.json({
    message: "Get categories successful",
    data: ["electronics", "men's clothing", "women's clothing", "jewelery"],
  });
};

/***********products***********/
ProductRouter.get("/categories", getProductCategories);
ProductRouter.post(
  "/",
  checkInput,
  protectRouteMiddleWare,
  isAuthorizedMiddleWare(["admin", "seller"]),
  createProductHandler
);

ProductRouter.get("/", getAllProductHandler);
ProductRouter.use(protectRouteMiddleWare);
ProductRouter.get("/:id", getProductById);
ProductRouter.put(
  "/:id",
  isAuthorizedMiddleWare(["admin", "seller"]),
  updateProductById
);
ProductRouter.delete(
  "/:id",
  isAuthorizedMiddleWare(["admin", "seller"]),
  deleteProductById
);

module.exports = ProductRouter;

// async function getAllProductHandler(req, res) {
//   try {
//     // are done on the level of DB
//     // -> find all the data
//     // -> sort
//     // -> select

//     let query = req.query;
//     let selectQuery = query.select;
//     let sortQuery = query.sort;
//     // console.log("selectParam", selectParam);
//     // console.log("sortParam", sortParam);
//     // make a find query -> searching for the product
//     let queryResPromise = ProductModel.find();
//     // sort the entries
//     if (sortQuery) {
//       // "price inc"
//       let order = sortQuery.split(" ")[1];
//       let sortParam = sortQuery.split(" ")[0];
//       // console.log("order",order,"sortParam",sortParam);
//       // applying this logic for inc and dec
//       if (order == "inc") {
//         queryResPromise = queryResPromise.sort(sortParam);
//       } else {
//         queryResPromise = queryResPromise.sort(-sortParam);
//       }
//     }
//     if (selectQuery) {
//       queryResPromise = queryResPromise.select(selectQuery);
//     }
//     // when find and sort both are done
//     const result = await queryResPromise;

//     res.status(200).json(result);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({
//       message: err.message,
//       status: "failure",
//     });
//   }

//   // sorting -> increarsing
//   // selecting -> (name,price)
// }

async function getAllProductHandler(req, res) {
  try {
    // Get query parameters
    let query = req.query;
    let selectQuery = query.select;
    let sortQuery = query.sort;
    let categoryQuery = query.category; // Get category from query parameters

    // Initialize query result promise
    let queryResPromise = ProductModel.find();

    // Filter by category if provided
    if (categoryQuery) {
      queryResPromise = ProductModel.find({ categories: categoryQuery });
    }

    // Sort the entries if a sort query is provided
    if (sortQuery) {
      let order = sortQuery.split(" ")[1];
      let sortParam = sortQuery.split(" ")[0];

      if (order === "inc") {
        queryResPromise = queryResPromise.sort(sortParam);
      } else {
        queryResPromise = queryResPromise.sort(`-${sortParam}`);
      }
    }

    // Select specific fields if a select query is provided
    if (selectQuery) {
      queryResPromise = queryResPromise.select(selectQuery);
    }

    // Execute the query and get the result
    const result = await queryResPromise;

    // Send response
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err.message,
      status: "failure",
    });
  }
}
