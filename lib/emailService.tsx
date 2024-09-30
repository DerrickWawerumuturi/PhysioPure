

import nodemailer from 'nodemailer';


interface EmailServiceProps {
    to: string;
    subject: string;
    html: string;
}
export const sendEmail = async ({ to, subject, html }: EmailServiceProps) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject,
            html,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ', info.messageId);
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Email failed to send');
    }
};
