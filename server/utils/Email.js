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
      from: "ScribbleBoost",
      to: email,
      subject:
        "Please verify your email address to complete your ScribbleBoost registration",
      html: `
        <div style="background-color: #f5f5f5; padding: 20px; font-family: Arial, sans-serif;">
          <h1 style="color: #007bff; font-size: 24px; margin-bottom: 20px; text-align: left">Hello, ${name}</h1>
          <p style="font-size: 16px; margin-bottom: 10px; text-align: left">Thank you for signing up for ScribbleBoost</p>
          <p style="font-size: 16px; margin-bottom: 10px; text-align: left">To complete your registration, please enter the following code</p>
          <div style="background-color: #ffffff; border: 1px solid #dddddd; padding: 10px; font-size: 18px; text-align: left">
            <strong>${verificationCode}</strong>
          </div>
          <p style="font-size: 16px; margin-top: 10px; text-align: left">If you did not sign up for ScribbleBoost, please ignore this email</p>
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
    await sendMail({
      from: "ScribbleBoost",
      to: email,
      subject: "ScibbleBoost - Reset your password",
      html: `
      <div style="background-color: #f5f5f5; padding: 20px; font-family: Arial, sans-serif;">
        <h1 style="color: #007bff; font-size: 24px; margin-bottom: 20px; text-align: left">Hello, ${name}</h1>
        <p style="font-size: 16px; margin-bottom: 10px; text-align: left">Please reset your password by submitting the following code</p>
        <div style="background-color: #ffffff; border: 1px solid #dddddd; padding: 10px; font-size: 18px; text-align: left">
          <strong>${verificationCode}</strong>
        </div>
        <p style="font-size: 16px; margin-top: 10px; text-align: left">If you did not sign up for ScribbleBoost, please ignore this email</p>
      </div>
    `,
    });
  } catch (err) {
    console.log(`Error sendResetPasswordEmail email.js: ${err}`);
    throw Error(err);
  }
};

module.exports = { sendWelcomeEmail, sendResetPasswordEmail };
