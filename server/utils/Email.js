const nodemailer = require("nodemailer");

const sendMail = async (mailOptions) => {
  nodemailer
    .createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_ADDRESS,
        pass: process.env.MAIL_KEY,
      },
    })
    .sendMail(mailOptions, function (error, info) {
      if (error) return "error";
      else return "OK";
    });
};

const sendWelcomeEmail = async (email, name, verificationCode) => {
  try {
    sendMail({
      from: "ScribbleBoost>",
      to: email,
      subject:
        "Please verify your email address to complete your ScribbleBoost registration",
      html: `
        <div style="background-color: #f5f5f5; padding: 20px;">
          <h1 style="color: #007bff; font-size: 36px; margin-bottom: 20px;">Hello, ${name}!</h1>
          <p style="font-size: 18px;">Thank you for signing up for ScribbleBoost!</p>
          <p style="font-size: 18px;">To complete your registration, please Enter the following code while login: ${verificationCode}</p>
          <p style="font-size: 18px;">If you did not sign up for ScribbleBoost, please ignore this email.</p>
        </div>
      `,
    });
  } catch (err) {
    console.log(`Error sendWelcomeEmail email.js: ${err}`);
    throw Error(err);
  }
};

const sendResetPasswordEmail = async (email, name, verificationCode) => {
  try {
    sendMail({
      from: "ScribbleBoost",
      to: email,
      subject: "Reset your password",
      text: `Hello, ${name}!!
      Please reset your password by sumbitting the following code: ${verificationCode}
      Thank you for joining us!`,
    });
  } catch (err) {
    console.log(`Error sendResetPasswordEmail email.js: ${err}`);
    throw Error(err);
  }
};

module.exports = { sendWelcomeEmail, sendResetPasswordEmail };
