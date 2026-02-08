import type { NextApiRequest, NextApiResponse } from 'next';
import { storage } from '../../../server/storage';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      try {
        const clients = await storage.getClients();
        res.status(200).json(clients);
      } catch (error) {
        console.error('Error fetching clients:', error);
        res.status(500).json({ message: 'Failed to fetch clients' });
      }
      break;
    case 'POST':
      try {
        const client = await storage.createClient(req.body);
        res.status(201).json(client);
      } catch (error) {
        console.error('Error creating client:', error);
        res.status(500).json({ message: 'Failed to create client' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
