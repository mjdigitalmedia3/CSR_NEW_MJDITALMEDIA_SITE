import type { NextApiRequest, NextApiResponse } from 'next';
import { createJunkCollection } from '@/lib/firebase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const results = await createJunkCollection();
    res.status(200).json({ 
      success: true, 
      message: `Created ${results.length} documents in junk collection`,
      documents: results 
    });
  } catch (error) {
    console.error('Error creating junk collection:', error);
    res.status(500).json({ 
      error: 'Failed to create junk collection',
      details: error instanceof Error ? error.message : String(error)
    });
  }
}
