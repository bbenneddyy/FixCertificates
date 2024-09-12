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

interface IEventOnlineEmailProps {
  firstname: string;
  lastname: string;
}

const baseUrl = process.env.NEXTAUTH_URL;

export function EventOnlineEmail(props: IEventOnlineEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>ยืนยันการสมัคร</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src={`${baseUrl}/images/chulalogo.png`}
            alt="Chula Logo"
            width="50"
            height="50"
            style={logo}
          />
          <Text style={paragraph}>
            เรียน คุณ {props.firstname} {props.lastname}
          </Text>
          <Text style={paragraph}>
            ขอขอบคุณที่ท่านสมัครลงทะเบียนงานค่ายเสวนาเปิดรั้วหมอจุฬาฯ ครั้งที่
            34 ประจำปีการศึกษา 2567 โดยท่านสามารถเข้าร่วมงานได้ทาง MS team
            Townhall. ในวันที่ 2 พฤศจิกายน 2567 ได้ตั้งแต่ 8.30 น. เป็นต้นไป
            (โดยขอความร่วมมือเข้าร่วมงานไม่เกิน 8.45 น.
            เพื่อลดปัญหาการขัดข้องทาง Internet) โดย URL สำหรับเข้าร่วมงานคือ
            https:
          </Text>
          <Text style={paragraph}>
            ขอแสดงความนับถือ
            <br />
            สโมสรนิสิตคณะแพทยศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย
          </Text>
          <Hr style={hr} />
          <Text style={footer}>
            คณะแพทยศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย 1873 ถนนพระราม4 แขวงปทุมวัน
            เขตปทุมวัน กรุงเทพฯ 10330
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
