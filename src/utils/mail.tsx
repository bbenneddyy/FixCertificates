import nodemailer from "nodemailer";
import { ConfirmationEmail } from "@/components/Email/ConfirmationEmail";
import { render } from '@react-email/render';

interface ISendMail {
  to: string;
  subject: string;
  name: string;
}

export async function sendMail({ to, subject, name }: ISendMail) {
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
    const emailHtml = render(<ConfirmationEmail name={name} />);
    const result = await transport.sendMail({
      from: `MDCU Converse <${SMTP_EMAIL}>`,
      to,
      subject,
      html: emailHtml,
    });
    console.log("Email sent: ", result.response)
  } catch (error) {
    console.error("Unable to send email ", error);
  }
}
