const dotenv = require("dotenv");
const nodemailer = require("nodemailer");

dotenv.config();

const { BREVO_PASS, SENDER_EMAIL } = process.env;

// console.log(BREVO_PASS);

// 1. entering the details of your smtp server and client -> create transporter
const techDetails = {
  host: "smtp-relay.brevo.com",
  port: 465,
  secure: true,
  auth: {
    user: "himansu.sahu11@gmail.com",
    pass: BREVO_PASS,
  },
};
const transporter = nodemailer.createTransport(techDetails);

//to get the html template
const fs = require("fs");

/*************************************************/
async function emailSender(to, subject, html, text) {
  try {
    // entering details required to send your Email
    // console.log(process.env.SENDER_EMAIL, "subject", subject, "text", text);

    let emailObject = {
      to: to, // Change to your recipient
      from: process.env.SENDER_EMAIL, // Change to your verified sender
      subject: subject,
      text: text, // it is shown to end client when
      // SMTP server  is not able to parser HTML
      html: html,
    };
    await transporter.sendMail(emailObject);
  } catch (err) {
    console.log(err);
    throw new Error(err.message);
  }
}

//2. enter the details required to send the email

async function sendEmailHelper(otp, htmlTemplate, userName, to) {
  // 2 write the template
  // template -> final -> replace placeholders with actual data
  const nameUpdatedHtml = htmlTemplate.replace("#{USER_NAME}", userName);
  const finalHTMLCode = nameUpdatedHtml.replace("#{OTP}", otp);
  const text = `
  Hi ${userName}
  Your otp to reset your password is ${otp}`;
  const subject = "RESET PASSWORD Verification OTP";
  await emailSender(to, subject, finalHTMLCode, text);
}

// sendEmailHelper(123456, "Himansu sahu", "himansusahu459@gmail.com");
module.exports = sendEmailHelper;
