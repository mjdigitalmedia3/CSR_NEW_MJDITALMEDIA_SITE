import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-12-18.acacia',
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    // Build line items for Stripe
    const lineItems = items.flatMap((item: any) => {
      const lineItemsList = [];

      // Main product
      if (item.product.stripePriceId) {
        lineItemsList.push({
          price: item.product.stripePriceId,
          quantity: 1,
        });
      } else {
        // Fallback to custom price data
        lineItemsList.push({
          price_data: {
            currency: 'usd',
            product_data: {
              name: item.product.name,
              description: item.product.description,
            },
            unit_amount: item.product.price * 100, // Convert to cents
          },
          quantity: 1,
        });
      }

      // Upsells
      item.selectedUpsells?.forEach((upsell: any) => {
        if (upsell.stripePriceId) {
          lineItemsList.push({
            price: upsell.stripePriceId,
            quantity: 1,
          });
        } else {
          lineItemsList.push({
            price_data: {
              currency: 'usd',
              product_data: {
                name: `${upsell.name} (Add-on)`,
                description: upsell.description,
              },
              unit_amount: upsell.price * 100,
            },
            quantity: 1,
          });
        }
      });

      return lineItemsList;
    });

    // Create checkout session with BNPL options
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${req.headers.origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/checkout`,
      automatic_tax: { enabled: false },
      // Enable BNPL options through Stripe
      payment_method_options: {
        card: {
          request_three_d_secure: 'automatic',
        },
      },
      // Add metadata for tracking
      metadata: {
        items: JSON.stringify(items.map((i: any) => ({
          productId: i.productId,
          productName: i.product.name,
          upsells: i.selectedUpsells.map((u: any) => u.name),
          total: i.totalPrice,
        }))),
      },
    });

    res.status(200).json({ sessionId: session.id });
  } catch (error: any) {
    console.error('Checkout error:', error);
    res.status(500).json({ message: error.message || 'Failed to create checkout session' });
  }
}
