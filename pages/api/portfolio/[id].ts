import type { NextApiRequest, NextApiResponse } from 'next';
import { storage } from '../../../server/storage';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  
  switch (req.method) {
    case 'GET':
      try {
        const project = await storage.getPortfolioProject(id as string);
        if (!project) {
          return res.status(404).json({ message: 'Project not found' });
        }
        res.status(200).json(project);
      } catch (error) {
        console.error('Error fetching portfolio project:', error);
        res.status(500).json({ message: 'Failed to fetch project' });
      }
      break;
    case 'PATCH':
      try {
        const project = await storage.getPortfolioProject(id as string);
        if (!project) {
          return res.status(404).json({ message: 'Project not found' });
        }
        const updatedProject = await storage.updatePortfolioProject(id as string, req.body);
        res.status(200).json(updatedProject);
      } catch (error) {
        console.error('Error updating portfolio project:', error);
        res.status(500).json({ message: 'Failed to update project' });
      }
      break;
    case 'DELETE':
      try {
        const deleted = await storage.deletePortfolioProject(id as string);
        if (!deleted) {
          return res.status(404).json({ message: 'Project not found' });
        }
        res.status(204).end();
      } catch (error) {
        console.error('Error deleting portfolio project:', error);
        res.status(500).json({ message: 'Failed to delete project' });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'PATCH', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
