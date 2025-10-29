import nodemailer from "nodemailer";
import User from "../models/userModel";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgetpasswordToken: hashedToken,
        forgetpasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    // ✅ Create transporter
    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.USER_MAILTRAP || "281f73ea78c234",
        pass: process.env.USER_MAILTRAP_PASSWORD || "4ced0ffddbf83d",
      },
    });

    // ✅ Dynamic link depending on email type
    const redirectUrl =
      emailType === "VERIFY"
        ? `${process.env.DOMAIN}/verifyEmail?token=${hashedToken}`
        : `${process.env.DOMAIN}/resetpassword?token=${hashedToken}`;

    // ✅ Email message
    const mailOptions = {
      from: "kakababawasim12345@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `
        <p>
          Click <a href="${redirectUrl}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      }.<br/>
          Or copy and paste this link in your browser: ${redirectUrl}
        </p>
      `,
    };

    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
