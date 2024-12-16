import { NextRequest, NextResponse } from 'next/server';
import * as nodemailer from 'nodemailer';
function generateOtp(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let otp = '';
    for (let i = 0; i < 6; i++) {
      otp += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return otp;
  }
export async function POST(req: NextRequest) {
    try {
        const { email } = await req.json();

        // Validate the email input
        if (!email) {
            return NextResponse.json({ error: 'Email address is required' }, { status: 400 });
        }
        const otp = generateOtp();
        // Create a transporter using nodemailer (recommended over raw net sockets)
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT || '465', 10),
            secure: true, // Use SSL/TLS
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        // Send email
        await transporter.sendMail({
            from: process.env.SMTP_USER,
            to: email,
            subject: 'OESYC',
            html: `
                <p>Your 6-digit OTP code is: ${otp}</p>
            `,
        });

        return NextResponse.json({otp});
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json({ error: 'Failed to send the invitation' }, { status: 500 });
    }
}