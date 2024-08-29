import nodemailer from "nodemailer";
import { AcceptedOnsiteEmail } from "@/components/Email/AcceptedOnsiteEmail";
import { render } from '@react-email/render';

interface ISendMail {
  to: string;
  subject: string;
  firstname: string;
  lastname: string
}

export async function sendMail2({ to, subject, firstname, lastname }: ISendMail) {
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
    const emailHtml = render(<AcceptedOnsiteEmail firstname={firstname} lastname={lastname} />);
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
