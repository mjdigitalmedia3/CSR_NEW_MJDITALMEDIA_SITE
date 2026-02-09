import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { name, email, phone, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Name, email, and message are required.' });
  }

  const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';

  try {
    await resend.emails.send({
      from: `MJ Digital Media <${fromEmail}>`,
      to: [process.env.ADMIN_EMAIL || 'admin@mjdigitalmedia.com'],
      replyTo: email,
      subject: `Contact Form: ${subject || 'New Message'}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
          <tr>
            <td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #eee;">Name</td>
            <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #eee;">Email</td>
            <td style="padding: 8px 12px; border-bottom: 1px solid #eee;"><a href="mailto:${email}">${email}</a></td>
          </tr>
          ${phone ? `<tr>
            <td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #eee;">Phone</td>
            <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${phone}</td>
          </tr>` : ''}
          <tr>
            <td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #eee;">Subject</td>
            <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${subject || 'N/A'}</td>
          </tr>
        </table>
        <h3 style="margin-top: 24px;">Message</h3>
        <p style="white-space: pre-wrap; background: #f9f9f9; padding: 16px; border-radius: 8px;">${message}</p>
      `,
    });

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending contact email:', error);
    res.status(500).json({ message: 'Failed to send email. Please try again later.' });
  }
}
