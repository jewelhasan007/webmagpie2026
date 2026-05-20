// import nodemailer from "nodemailer";

// export const sendEmail = async ({ to, subject, text, html }) => {
//   // 1️⃣ Create transporter
// //   const transporter = nodemailer.createTransport({
// //     host: process.env.SMTP_HOST,
// //     port: process.env.SMTP_PORT,
// //     secure: process.env.SMTP_SECURE === "true", // true for 465, false for 587
// //     auth: {
// //       user: process.env.SMTP_USER,
// //       pass: process.env.SMTP_PASS,
// //     },
// //   });
//   const transporter = nodemailer.createTransport({
//     service: "gmail", // or use host/port
//     auth: {

//       user: process.env.SMTP_USER,
//       pass: process.env.SMTP_PASS, // app password
//     },
//   });
//   // 2️⃣ Send email
//   const info = await transporter.sendMail({
//     from: `"ZoZoTECH" <${process.env.SMTP_USER}>`,
//     to,       // string or array of emails
//     subject,
//     text,
//     html,
//   });

//   console.log("📨 Email sent:", info.messageId);
// };

// import nodemailer from "nodemailer";

//  const sendEmail = async ({ to, subject, text, html }) => {
//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.SMTP_USER,
//       pass: process.env.SMTP_PASS,
//     },
//   });

//   const info = await transporter.sendMail({
//     from: `"ZoZoTECH" <${process.env.SMTP_USER}>`,
//     to,
//     subject,
//     text,
//     html,
//   });

//   console.log("📨 Email sent:", info.messageId);
// };

// export default sendEmail;

import nodemailer from "nodemailer";

const sendEmail = async ({ to, subject, text, html }) => {

console.log("EMAIL:", process.env.SMTP_USER);
console.log("PASS:", process.env.SMTP_PASS);
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // important
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
 await transporter.verify(); // 🔥 add this line
  console.log("✅ SMTP Ready");
  
  const info = await transporter.sendMail({
    from: `"ZoZoTECH" <${process.env.SMTP_USER}>`,
    to,
    subject,
    text,
    html,
  });

  console.log("📨 Email sent:", info.messageId);
};

export default sendEmail;