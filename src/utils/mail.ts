import nodemailer from "nodemailer";

interface ISendMail {
  to: string;
  subject: string;
  body: string;
}

export async function sendMail({ to, subject, body }: ISendMail) {
  const { SMTP_EMAIL, SMTP_PASSWORD } = process.env;
  const transport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_PASSWORD,
    },
  });
  try {
    await transport.verify();
  } catch (error) {
    console.error("Unable to verify email ", error);
    return;
  }

  try {
    const result = await transport.sendMail({
      from: SMTP_EMAIL,
      to,
      subject,
      html: body,
    });
    console.log("Email sent: ", result.response)
  } catch (error) {
    console.error("Unable to send email ", error);
  }
}
