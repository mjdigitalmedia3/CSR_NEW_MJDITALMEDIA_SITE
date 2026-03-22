import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-12-18.acacia',
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { session_id } = req.query;

  if (!session_id || typeof session_id !== 'string') {
    return res.status(400).json({ message: 'Session ID is required' });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);

    res.status(200).json({
      status: session.status,
      customer_details: session.customer_details,
      amount_total: session.amount_total,
      payment_status: session.payment_status,
    });
  } catch (error: any) {
    console.error('Verification error:', error);
    res.status(500).json({ message: error.message || 'Failed to verify session' });
  }
}
