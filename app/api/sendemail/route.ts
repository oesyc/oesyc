import { NextRequest, NextResponse } from 'next/server';
import * as nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
    try {
        const { email } = await req.json();

        // Validate the email input
        if (!email) {
            return NextResponse.json({ error: 'Email address is required' }, { status: 400 });
        }

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
            subject: 'Invitation to Join Our Platform',
            html: `
                <p>You have been invited to join our platform.</p>
                <p>Please follow the link below to sign up and join.</p>
                <p><a href="http://localhost:3000/register">Sign Up Here</a></p>
            `,
        });

        return NextResponse.json({ message: 'Invitation sent successfully!' }, { status: 200 });
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json({ error: 'Failed to send the invitation' }, { status: 500 });
    }
}