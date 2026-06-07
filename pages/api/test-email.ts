import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ message: 'RESEND_API_KEY is not configured' });
  }

  try {
    const resend = new Resend(apiKey);
    const fromEmail = 'noreply@mjdigitalmedia3.com';
    const fromName = process.env.SMTP_FROM_NAME || process.env.RESEND_FROM_NAME || 'MJ Digital Media';

    const { data, error } = await resend.emails.send({
      from: `${fromName} <${fromEmail}>`,
      to: ['brianestittsr@outlook.com'],
      subject: 'Test Email - MJ Digital Media',
      html: `
        <h2>Test Email</h2>
        <p>This is a test email to confirm that the Resend API integration is working correctly.</p>
        <p><strong>Sent at:</strong> ${new Date().toLocaleString()}</p>
        <p>If you received this, your email configuration is working! 🎉</p>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(500).json({ message: 'Failed to send test email', error });
    }

    console.log('Test email sent successfully:', data);
    return res.status(200).json({ message: 'Test email sent successfully to brianstittsr@gmail.com', id: data?.id });
  } catch (err: any) {
    console.error('Test email error:', err);
    return res.status(500).json({ message: 'Error sending test email', error: err.message });
  }
}
