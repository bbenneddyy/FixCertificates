import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Text,
} from "@react-email/components";

interface IConfirmationEmailProps {
  name: string
}

const baseUrl = process.env.NEXTAUTH_URL

export function ConfirmationEmail(props: IConfirmationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>
        ยืนยันการส่งข้อมูลเข้าร่วมงานเสวนาเปิดรั้วหมอจุฬาฯ ครั้งที่ 34
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src={`${baseUrl}/images/chulalogo.png`}
            alt="Chula Logo"
            width="50"
            height="50"
            style={logo}
          />
          <Text style={paragraph}>เรียน คุณ{props.name}</Text>
          <Text style={paragraph}>
            ทางนิสิตผู้จัดงานขอขอบคุณที่ท่านได้สมัครเข้าร่วมงานเสวนาเปิดรั้วหมอจุฬาฯ ครั้งที่ 34 ประจำปีการศึกษา 2567 โดยทางทีมงาน ขอความร่วมมือกรุณารออีเมลยืนยันการตรวจสอบหลักฐานการชำระเงิน และจะส่งอีเมลยืนยันไปให้ท่านอีกครั้งหนึ่ง
          </Text>
          <Text style={paragraph}>
            ขอแสดงความนับถือ
            <br />
            สโมสรนิสิตคณะแพทยศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย
          </Text>
          <Hr style={hr} />
          <Text style={footer}>
            คณะแพทยศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย 1873 ถนนพระราม4 แขวงปทุมวัน เขตปทุมวัน กรุงเทพฯ 10330
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
};

const logo = {
  margin: "0 auto",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
};

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
};