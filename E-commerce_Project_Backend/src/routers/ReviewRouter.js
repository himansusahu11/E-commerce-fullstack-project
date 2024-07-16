const express = require("express");
const ReviewRouter = express.Router();
const ReviewModel = require("../models/ReviewModel");
const { protectRouteMiddleWare } = require("../controllers/AuthController");
const UserModel = require("../models/UserModel");
const ProductModel = require("../models/ProductModel");

const createReviewController = async (req, res) => {
  try {
    // do implementation
    // give a particular rating to a product with review
    // calculate avg rating as well
    // push that review data in the productModel

    const { review, rating } = req.body;
    const { productId } = req.params;
    const userId = req.userId;

    const reviewObject = await ReviewModel.create({
      review,
      rating,
      product: productId,
      user: userId,
    });

    const productObject = await ProductModel.findById(productId);
    const averageRating = productObject.averageRating;

    if (averageRating) {
      let sum = averageRating * productObject.reviews.length;

      let finalAvgRating =
        (sum + reviewObject.rating) / (productObject.reviews.length + 1); // (sum of all the ratings including average rating)/ number of reviews

      productObject.averageRating = finalAvgRating;
    } else {
      productObject.averageRating = reviewObject.rating;
    }

    productObject.reviews.push(reviewObject["_id"]);
    await productObject.save();

    res.status(201).json({
      satus: "success",
      data: reviewObject,
    });
  } catch (err) {
    res.status(500).json({
      status: "failure",
      message: err.message,
    });
  }
};

// const getAllReviewForAProductController = async function (req, res) {
//   try {
//     const { productId } = req.params;
//     console.log(productId);
//     const allReview = await ReviewModel.find({ product: productId });
//     res.status(200).json({
//       status: "success",
//       message: "all review han been fetched sucessfully",
//       data: {
//         allReview,
//       },
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({
//       status: "failure",
//       message: err.message,
//     });
//   }
// };

const getAllReviewForAProductController = async function (req, res) {
  try {
    // Extract productId from request parameters
    const { productId } = req.params;

    // Query the database for reviews associated with the productId
    const allReviews = await ReviewModel.find({ product: productId });

    // If there are no reviews found, handle the case
    if (!allReviews || allReviews.length === 0) {
      return res.status(404).json({
        status: "failure",
        message: "No reviews found for the provided product ID.",
      });
    }

    // If reviews are found, return them in the response
    res.status(200).json({
      status: "success",
      message: "All reviews have been fetched successfully",
      data: {
        reviews: allReviews,
      },
    });
  } catch (err) {
    // Handle any errors that occur during the process
    console.error(err);
    res.status(500).json({
      status: "failure",
      message: "Internal server error",
    });
  }
};

ReviewRouter.post(
  "/:productId",
  protectRouteMiddleWare,
  createReviewController
);

ReviewRouter.get("/:productId", getAllReviewForAProductController);
// ReviewRouter.get("/", getAllReviewForAProductController);

module.exports = ReviewRouter;
