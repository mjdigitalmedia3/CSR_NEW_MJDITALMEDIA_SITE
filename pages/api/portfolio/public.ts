import type { NextApiRequest, NextApiResponse } from 'next';
import { storage } from '../../../server/storage';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      try {
        const projects = await storage.getVisiblePortfolioProjects();
        res.status(200).json(projects);
      } catch (error) {
        console.error('Error fetching public portfolio:', error);
        res.status(500).json({ message: 'Failed to fetch portfolio' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
