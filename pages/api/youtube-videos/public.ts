import type { NextApiRequest, NextApiResponse } from 'next';
import allVideos from '../../../data/youtube-videos.json';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      const visible = allVideos.filter((v: any) => v.isVisible !== false);
      res.status(200).json(visible);
      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
