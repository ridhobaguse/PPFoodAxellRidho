const nodemailer = require("nodemailer");

const html = `
        <h1>Hello World</h1>
        <p>Isn't NodeMailer useful?</p>
`;

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "ridhoekasanjaya3@gmail.com",
    pass: "stsu sply brof forp",
  },
});

async function main() {
  try {
    const info = await transporter.sendMail({
      from: "ridhoekasanjaya3@gmail.com",
      to: "salwazahramunir@gmail.com",
      subject: "succes register account",
      html: html,
    });

    console.log("mesage sent" + info.messageId);
  } catch (error) {
    console.log(error);
  }
}

module.exports = main;

// const transporter = nodemailer.createTransport({
//   service: "Gmail", // Or any other email service
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// const sendEmail = async (to, subject, text, html) => {
//   try {
//     const info = await transporter.sendMail({
//       from: process.env.EMAIL_USER,
//       to,
//       subject,
//       text,
//       html,
//     });
//     console.log("Email sent: " + info.response);
//   } catch (error) {
//     console.error("Error sending email:", error);
//   }
// };

// module.exports = {
//   sendEmail,
// };
