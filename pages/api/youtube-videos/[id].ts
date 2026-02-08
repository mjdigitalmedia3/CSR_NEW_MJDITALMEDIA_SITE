import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

const YOUTUBE_JSON_PATH = path.resolve(process.cwd(), 'data/youtube-videos.json');

function readYouTubeVideos() {
  if (fs.existsSync(YOUTUBE_JSON_PATH)) {
    return JSON.parse(fs.readFileSync(YOUTUBE_JSON_PATH, 'utf-8'));
  }
  return [];
}

function writeYouTubeVideos(videos: any[]) {
  fs.writeFileSync(YOUTUBE_JSON_PATH, JSON.stringify(videos, null, 2));
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  
  switch (req.method) {
    case 'PATCH':
      try {
        const videos = readYouTubeVideos();
        const index = videos.findIndex((v: any) => v.id === id);
        if (index === -1) {
          return res.status(404).json({ message: 'Video not found' });
        }
        const { isVisible } = req.body;
        if (typeof isVisible === 'boolean') {
          videos[index].isVisible = isVisible;
        }
        writeYouTubeVideos(videos);
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
