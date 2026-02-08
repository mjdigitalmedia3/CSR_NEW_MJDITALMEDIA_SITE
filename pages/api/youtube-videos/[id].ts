import type { NextApiRequest, NextApiResponse } from 'next';
import allVideos from '../../../data/youtube-videos.json';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  
  switch (req.method) {
    case 'PATCH':
      try {
        const videos = [...allVideos] as any[];
        const index = videos.findIndex((v: any) => v.id === id);
        if (index === -1) {
          return res.status(404).json({ message: 'Video not found' });
        }
        const { isVisible } = req.body;
        if (typeof isVisible === 'boolean') {
          videos[index] = { ...videos[index], isVisible };
        }
        // Note: changes are not persisted on serverless — a database is needed for persistent visibility toggling
        res.status(200).json(videos[index]);
      } catch (error) {
        console.error('Error updating YouTube video:', error);
        res.status(500).json({ message: 'Failed to update video' });
      }
      break;
    default:
      res.setHeader('Allow', ['PATCH']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
