import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface RequestAccessEmailProps {
  userFirstname?: string;
  requestAccessLink?: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

export const RequestAccessEmail = ({
  userFirstname,
  requestAccessLink,
}: RequestAccessEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Request access to write blogs on PhysioPure</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src={`${baseUrl}/static/physiopure-logo.png`}
            width="40"
            height="33"
            alt="PhysioPure"
          />
          <Section>
            <Text style={text}>Hi {userFirstname},</Text>
            <Text style={text}>
              We are thrilled that you want to contribute to our platform! To request access to write blogs on PhysioPure, please follow the link below:
            </Text>
            <Button style={button} href={requestAccessLink}>
              Request Access
            </Button>
            <Text style={text}>
              If you didn&apos;t request this, simply ignore this email.
            </Text>
            <Text style={text}>
              For more information on our content guidelines, please visit our{" "}
              <Link style={anchor} href="https://physiopure.com/guidelines">
                blog guidelines page.
              </Link>
            </Text>
            <Text style={text}>Looking forward to your amazing content!</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

RequestAccessEmail.PreviewProps = {
  userFirstname: "Admin",
  requestAccessLink: "https://physiopure.com/request-access",
} as RequestAccessEmailProps;

export default RequestAccessEmail;

const main = {
  backgroundColor: "#f6f9fc",
  padding: "10px 0",
};

const container = {
  backgroundColor: "#ffffff",
  border: "1px solid #f0f0f0",
  padding: "45px",
};

const text = {
  fontSize: "16px",
  fontFamily:
    "'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
  fontWeight: "300",
  color: "#404040",
  lineHeight: "26px",
};

const button = {
  backgroundColor: "#007ee6",
  borderRadius: "4px",
  color: "#fff",
  fontFamily: "'Open Sans', 'Helvetica Neue', Arial",
  fontSize: "15px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  width: "210px",
  padding: "14px 7px",
};

const anchor = {
  textDecoration: "underline",
};
