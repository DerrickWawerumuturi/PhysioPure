import {
    Body,
    Button,
    Container,
    Head,
    Html,
    Img,
    Preview,
    Section,
    Text,
} from "@react-email/components";
import * as React from "react";

interface AdminRequestNotificationEmailProps {
    adminFirstname?: string;
    requesterName?: string;
    adminDashboardLink?: string;
}

const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "";

export const AdminRequestNotificationEmail = ({
    requesterName,
    adminDashboardLink,
}: AdminRequestNotificationEmailProps) => {
    return (
        <Html>
            <Head />
            <Preview>New Request for Blog Access on PhysioPure</Preview>
            <Body style={main}>
                <Container style={container}>
                    <Img
                        src={`${baseUrl}/static/physiopure-logo.png`}
                        width="40"
                        height="33"
                        alt="PhysioPure"
                    />
                    <Section>
                        <Text style={text}>Hi Simon,</Text>
                        <Text style={text}>
                            A new request has been submitted by <strong>{requesterName}</strong> for access to write blogs on PhysioPure.
                        </Text>
                        <Text style={text}>
                            To review and approve this request, please visit your admin dashboard.
                        </Text>
                        <Button style={button} href={adminDashboardLink}>
                            Review Request
                        </Button>
                        <Text style={text}>
                            If you have any questions or need assistance, feel free to reach out to the support team.
                        </Text>
                        <Text style={text}>Thank you for keeping the platform running smoothly!</Text>
                    </Section>
                </Container>
            </Body>
        </Html>
    );
};

AdminRequestNotificationEmail.PreviewProps = {
    adminFirstname: "Admin",
    requesterName: "John Doe",
    adminDashboardLink: "https://physiopure.com/admin-dashboard",
} as AdminRequestNotificationEmailProps;

export default AdminRequestNotificationEmail;

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
