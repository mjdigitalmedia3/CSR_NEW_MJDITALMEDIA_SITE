import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';
import nodemailer from 'nodemailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { name, email, phone, company, projectType, budgetRange, timeline, features, requirements } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: 'Name and email are required.' });
  }

  const fromEmail = process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER || 'onboarding@resend.dev';
  const fromName = process.env.SMTP_FROM_NAME || process.env.RESEND_FROM_NAME || 'MJ Digital Media';
  const toEmail = process.env.ADMIN_EMAIL || 'admin@mjdigitalmedia.com';

  // Try Resend first
  if (process.env.RESEND_API_KEY) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const { data, error: sendError } = await resend.emails.send({
        from: `${fromName} <${fromEmail}>`,
        to: [toEmail],
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

      if (!sendError) {
        console.log('Lead email sent via Resend:', data);
        return res.status(200).json({ message: 'Lead notification sent successfully', id: data?.id, provider: 'resend' });
      }
      console.log('Resend failed, will try SMTP fallback:', sendError);
    } catch (resendError) {
      console.log('Resend error, trying SMTP fallback:', resendError);
    }
  }

  // Fallback to Gmail SMTP
  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      const info = await transporter.sendMail({
        from: `"${fromName}" <${fromEmail}>`,
        to: toEmail,
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

      console.log('Lead email sent via SMTP:', info.messageId);
      return res.status(200).json({ message: 'Lead notification sent successfully', id: info.messageId, provider: 'smtp' });
    } catch (smtpError) {
      console.error('SMTP fallback failed:', smtpError);
    }
  }

  return res.status(500).json({ message: 'Failed to send notification email.' });
}
