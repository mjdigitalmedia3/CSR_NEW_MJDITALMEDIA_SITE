import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { name, email, phone, company, projectType, budgetRange, timeline, features, requirements } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: 'Name and email are required.' });
  }

  const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';

  try {
    await resend.emails.send({
      from: `MJ Digital Media <${fromEmail}>`,
      to: [process.env.ADMIN_EMAIL || 'admin@mjdigitalmedia.com'],
      replyTo: email,
      subject: `New Lead: ${name}${company ? ` (${company})` : ''}`,
      html: `
        <h2>New Lead Submission</h2>
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
          ${company ? `<tr>
            <td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #eee;">Company</td>
            <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${company}</td>
          </tr>` : ''}
          ${projectType ? `<tr>
            <td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #eee;">Project Type</td>
            <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${projectType}</td>
          </tr>` : ''}
          ${budgetRange ? `<tr>
            <td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #eee;">Budget Range</td>
            <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${budgetRange}</td>
          </tr>` : ''}
          ${timeline ? `<tr>
            <td style="padding: 8px 12px; font-weight: bold; border-bottom: 1px solid #eee;">Timeline</td>
            <td style="padding: 8px 12px; border-bottom: 1px solid #eee;">${timeline}</td>
          </tr>` : ''}
        </table>
        ${features && features.length > 0 ? `
          <h3 style="margin-top: 24px;">Desired Features</h3>
          <ul>
            ${features.map((f: string) => `<li>${f}</li>`).join('')}
          </ul>
        ` : ''}
        ${requirements ? `
          <h3 style="margin-top: 24px;">Additional Requirements</h3>
          <p style="white-space: pre-wrap; background: #f9f9f9; padding: 16px; border-radius: 8px;">${requirements}</p>
        ` : ''}
      `,
    });

    res.status(200).json({ message: 'Lead notification sent successfully' });
  } catch (error) {
    console.error('Error sending lead email:', error);
    res.status(500).json({ message: 'Failed to send notification email.' });
  }
}
