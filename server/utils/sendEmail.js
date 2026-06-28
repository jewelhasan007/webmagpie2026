
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
    from: `"WebMagpie" <${process.env.SMTP_USER}>`,
    to,
    subject,
    text,
    html,
  });

  console.log("📨 Email sent:", info.messageId);
};

export default sendEmail;