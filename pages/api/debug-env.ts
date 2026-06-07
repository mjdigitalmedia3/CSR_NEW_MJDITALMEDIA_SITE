import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const resendKey = process.env.RESEND_API_KEY;
  const nextauthSecret = process.env.NEXTAUTH_SECRET;
  const nextauthUrl = process.env.NEXTAUTH_URL;
  const adminEmail = process.env.ADMIN_EMAIL;

  res.status(200).json({
    resendApiKey: resendKey ? `${resendKey.substring(0, 8)}...${resendKey.substring(Math.max(0, resendKey.length - 4))} (length: ${resendKey.length})` : 'NOT SET',
    nextauthSecret: nextauthSecret ? `SET (length: ${nextauthSecret.length})` : 'NOT SET',
    nextauthUrl: nextauthUrl || 'NOT SET',
    adminEmail: adminEmail || 'NOT SET',
  });
}
