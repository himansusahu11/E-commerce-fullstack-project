const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
// including env variables
dotenv.config();
const { PORT, DB_PASSWORD, DB_USER } = process.env;
/**********************connection to our DB********************************/

console.log(PORT);

const dbURL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.chngyod.mongodb.net/?retryWrites=true&w=majority`;

// once
mongoose
  .connect(dbURL)
  .then(function (connection) {
    console.log("connected to db");
  })
  .catch((err) => console.log(err));

// with this your creating simple app -> api
const app = express();

const UserRouter = require("./routers/UserRouter");
const ProductRouter = require("./routers/ProductRouter");
const AuthRouter = require("./routers/AuthRouter");
const BookingRouter = require("./routers/BookingRouter");
const ReviewRouter = require("./routers/ReviewRouter");

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");

//   next();
// });

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/user", UserRouter);
app.use("/api/product", ProductRouter);
app.use("/api/auth", AuthRouter);
app.use("/api/booking", BookingRouter);
app.use("/api/review", ReviewRouter);

/******************handler functions ***************/
// 404 route not found
app.use(function cb(req, res) {
  // console.log("");
  // response
  res.status(404).json({
    status: "failure",
    message: " route not found",
  });
});

const port = PORT;
const hostname = "localhost";
app.listen(port, () => {
  console.log(`Server is running on http://${hostname}:${port}`);
});
