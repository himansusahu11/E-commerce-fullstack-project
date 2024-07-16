/******all the required imports are in the same file***/
const UserModel = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const promisify = require("util").promisify;
const promisifiedJWTSign = promisify(jwt.sign);
const promisifiedJWTVerify = promisify(jwt.verify);
const otpGenerator = require("../utils/generateOtp");
const sendEmailHelper = require("../utils/dynamicMailSender");
const { SECRET_KEY } = process.env;
const { encryptPassword, decryptPassword } = require("../utils/passwordUtil");
// never -> sync in your server
const fs = require("fs");
const path = require("path");

const pathToOtpHTML = path.join(__dirname, "../", "templates", "otp.html");
const HtmlTemplateString = fs.readFileSync(pathToOtpHTML, "utf-8");

const signupController = async function (req, res) {
  try {
    // add it to the db
    const userObject = req.body;
    //   data -> req.body
    //   data -> req.body
    // implement the security for pwd
    //Encrypt your pwd and then persist into the db

    const encryptPwd = encryptPassword(userObject.password);
    const encryptConfirmPwd = encryptPassword(userObject.confirmPassword);
    console.log(encryptPwd, encryptConfirmPwd);

    let newUser = await UserModel.create({
      ...userObject,
      password: encryptPwd,
      confirmPassword: encryptConfirmPwd,
    });
    // send a response
    res.status(201).json({
      message: "user created successfully",
      user: newUser,
      status: "success",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err.message,
      status: "success",
    });
  }
};
// const loginController = async function (req, res) {
//   try {
//     /***
//      * 1. enable login -> tell the client that user is logged In
//      *      a. email and password
//      **/

//     let { email, password } = req.body;

//     const encryptPwd = encryptPassword(password);
//     const decryptedPwd = decryptPassword(encryptPwd);

//     console.log(decryptedPwd);

//     let user = await UserModel.findOne({ email });
//     if (user) {
//       let areEqual = decryptedPwd == decryptPassword(user.password);
//       if (areEqual) {
//         // user is authenticated
//         /* 2. Sending the token -> people remember them
//          * */
//         // payload : id of that user
//         let token = await promisifiedJWTSign({ id: user["_id"] }, SECRET_KEY);
//         console.log("sendning token");
//         res.cookie("JWT", token, {
//           maxAge: 90000000,
//           httpOnly: true,
//           path: "/",
//         });
//         res.status(200).json({
//           status: "success",
//           message: "user logged In",
//         });
//       } else {
//         // console.log("err", err);
//         res.status(404).json({
//           status: "failure",
//           message: "email or password is incorrect",
//         });
//       }
//     } else {
//       res.status(404).json({
//         status: "failure",
//         message: "user not found with creds",
//       });
//     }
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({
//       status: "failure",
//       message: err.message,
//     });
//   }
// };

const loginController = async function (req, res) {
  try {
    /***
     * 1. enable login -> tell the client that user is logged In
     *      a. email and password
     **/

    let { email, password } = req.body;

    const encryptPwd = encryptPassword(password);
    const decryptedPwd = decryptPassword(encryptPwd);

    console.log(decryptedPwd);

    let user = await UserModel.findOne({ email });
    if (user) {
      let areEqual = decryptedPwd == decryptPassword(user.password);
      if (areEqual) {
        // user is authenticated
        /* 2. Sending the token -> people remember them
         * */
        // payload : id of that user
        let token = await promisifiedJWTSign({ id: user["_id"] }, SECRET_KEY);
        console.log("sendning token");
        res.cookie("JWT", token, {
          maxAge: 90000000,
          httpOnly: true,
          path: "/",
        });
        res.status(200).json({
          message: "success",
          JWT: token,
        });
      } else {
        // console.log("err", err);
        res.status(404).json({
          status: "failure",
          message: "email or password is incorrect",
        });
      }
    } else {
      res.status(404).json({
        status: "failure",
        message: "user not found with creds",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "failure",
      message: err.message,
    });
  }
};
const forgetPasswordController = async (req, res) => {
  try {
    //needs user's email address

    const { email } = req.body;
    console.log(email);

    //verify email exists or not into DB

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        status: "failure",
        message: "User not found",
      });
    }

    // generate a token and send that token and dynamic user from DB in the email template
    const otp = otpGenerator();
    console.log(otp);

    await sendEmailHelper(otp, user.name, HtmlTemplateString, email); //generating dynamic email template
    //have to save the otp and otpExpiry
    user.otp = otp;
    user.otpExpiry = Date.now() + 1000 * 60 * 5;
    console.log(user.otp);

    await user.save();
    //send that email
    return res.status(200).json({
      status: "Success",
      message: "Send the OTP to your email",
      otp: otp,
      userId: user.id,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "failure",
      message: "Internel Server Error",
    });
  }
};
const resetPasswordController = async (req, res) => {
  try {
    const { password, confirmPassword, otp } = req.body;

    const { userId } = req.params;
    console.log(userId);
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        status: "failure",
        message: "User not found",
      });
    }
    //exists

    if (otp && user.otp === otp) {
      //check the otp expiry
      const currentTime = Date.now();

      if (currentTime < user.otpExpiry) {
        user.password = password;
        user.confirmPassword = confirmPassword;
        //when we update the pass the not need to have otp and otpExpiry
        user.otp = null;
        user.otpExpiry = null;

        // console.log(user);

        await user.save();

        return res.status(200).json({
          status: "Success",
          message: "Your password has been reset successfully",
        });
      } else {
        return res.status(400).json({
          status: "Failure",
          message: "OTP has been expired",
        });
      }
    } else {
      return res.status(404).json({
        status: "Failure",
        message: "Entered a wrong OTP",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "failure",
      message: "Internel Server Error",
    });
  }
};

/*****************middleware**********************/

const protectRouteMiddleWare = async function (req, res, next) {
  try {
    let jwttoken = req.cookies.JWT;
    let decryptedToken = await promisifiedJWTVerify(jwttoken, SECRET_KEY);
    console.log(decryptedToken);
    if (decryptedToken) {
      let userId = decryptedToken.id;
      console.log(userId);
      // adding the userId to the req object
      req.userId = userId;
      console.log("authenticated");
      next();
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
      status: "failure",
    });
  }
};
const isAdminMiddleWare = async function (req, res, next) {
  // has to check whether the role of user is admin or not
  try {
    let id = req.userId;
    console.log(id);
    let user = await UserModel.findById(id);
    console.log(user);
    if (user.role == "admin") {
      console.log("authorized admin");

      next();
    } else {
      console.log("returning back ");
      res.status(401).json({
        status: "failure",
        message: "You are not authorized to do this action ",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
      status: "failure",
    });
  }
};

const isAuthorizedMiddleWare = function (allowedRoles) {
  return async function (req, res, next) {
    try {
      let id = req.userId;
      console.log(id);
      let user = await UserModel.findById(id);
      let isAuthorized = allowedRoles.includes(user.role);
      if (isAuthorized) {
        console.log("authorized user");
        next();
      } else {
        console.log("returning back ");
        res.status(401).json({
          status: "failure",
          message: "You are not authorized to do this action ",
        });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: err.message,
        status: "failure",
      });
    }
  };
};

const logoutController = function (req, res) {
  res.cookie("JWT", "dsjfbmdjbhsf", {
    maxAge: Date.now(),
    httpOnly: true,
    path: "/",
  });

  res.status(200).json({
    status: "success",
    message: "user logged out ",
  });
};

module.exports = {
  signupController,
  loginController,
  forgetPasswordController,
  resetPasswordController,
  protectRouteMiddleWare,
  isAdminMiddleWare,
  isAuthorizedMiddleWare,
  logoutController,
};
