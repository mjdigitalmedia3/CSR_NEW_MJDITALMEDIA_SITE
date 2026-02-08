import type { NextApiRequest, NextApiResponse } from 'next';
import { storage } from '../../../server/storage';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  
  switch (req.method) {
    case 'GET':
      try {
        const client = await storage.getClient(id as string);
        if (!client) {
          return res.status(404).json({ message: 'Client not found' });
        }
        res.status(200).json(client);
      } catch (error) {
        console.error('Error fetching client:', error);
        res.status(500).json({ message: 'Failed to fetch client' });
      }
      break;
    case 'PATCH':
      try {
        const client = await storage.getClient(id as string);
        if (!client) {
          return res.status(404).json({ message: 'Client not found' });
        }
        const updatedClient = await storage.updateClient(id as string, req.body);
        res.status(200).json(updatedClient);
      } catch (error) {
        console.error('Error updating client:', error);
        res.status(500).json({ message: 'Failed to update client' });
      }
      break;
    case 'DELETE':
      try {
        const deleted = await storage.deleteClient(id as string);
        if (!deleted) {
          return res.status(404).json({ message: 'Client not found' });
        }
        res.status(204).send();
      } catch (error) {
        console.error('Error deleting client:', error);
        res.status(500).json({ message: 'Failed to delete client' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'PATCH', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
