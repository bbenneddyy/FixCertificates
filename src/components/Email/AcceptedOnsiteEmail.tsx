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

interface IAcceptedOnsiteEmailProps {
  firstname: string;
  lastname: string;
  
}

const baseUrl = process.env.NEXTAUTH_URL;



export function AcceptedOnsiteEmail(props: IAcceptedOnsiteEmailProps) {
  
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
            เรียน คุณ {props.firstname} {props.lastname}{" "}
          </Text>
          <Text style={paragraph}>
            ขอส่งข้อมูลเข้าร่วมงานเสวนาเปิดรั้วหมอจุฬาฯ ครั้งที่ 34
            “งานที่คลายข้อสงสัย เจาะลึกประสบการณ์ในการเรียนแพทย์
            จากอาจารย์และรุ่นพี่คณะแพทยศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย” ในวันที่ 2
            พฤศจิกายน 2567 ในรูปแบบ Onsite ณ เวลา 09.00 น. ถึง 15.25 น.
            ห้องเฉลิมพรมมาส อาคารอปร. คณะแพทยศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย โดย
            Ticket code: 
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
