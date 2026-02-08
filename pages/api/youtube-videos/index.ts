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

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      res.status(200).json(readYouTubeVideos());
      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
