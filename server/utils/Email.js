const nodeMailer = require("nodemailer");
const config = require("../env");

const transporter = nodeMailer.createTransport({
  service: "gmail",
  auth: {
    user: config.email,
    pass: config.password,
  },
});

const sendEmail = (email, subject, text) => {
  const mailOptions = {
    from: config.email,
    to: email,
    subject: subject,
    text: text,
  };

  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Email sent successfully");
    }
  });
};

module.exports = sendEmail;
