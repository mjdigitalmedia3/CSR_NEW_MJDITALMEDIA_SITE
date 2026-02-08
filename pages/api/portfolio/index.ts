import type { NextApiRequest, NextApiResponse } from 'next';
import { storage } from '../../../server/storage';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      try {
        const projects = await storage.getPortfolioProjects();
        res.status(200).json(projects);
      } catch (error) {
        console.error('Error fetching portfolio projects:', error);
        res.status(500).json({ message: 'Failed to fetch portfolio projects' });
      }
      break;
    case 'POST':
      try {
        const project = await storage.createPortfolioProject(req.body);
        res.status(201).json(project);
      } catch (error) {
        console.error('Error creating portfolio project:', error);
        res.status(500).json({ message: 'Failed to create project' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
