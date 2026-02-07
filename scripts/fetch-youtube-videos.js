import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CHANNEL_URL = 'https://www.youtube.com/@marioj773/videos';
const OUTPUT_PATH = path.join(__dirname, '..', 'data', 'youtube-videos.json');

function httpsGet(url) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

function getOembed(videoId) {
  const url = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch {
          resolve(null);
        }
      });
    }).on('error', () => resolve(null));
  });
}

async function main() {
  console.log(`Fetching channel page: ${CHANNEL_URL}`);
  const html = await httpsGet(CHANNEL_URL);

  // Extract video IDs from the page HTML
  // YouTube embeds video data in the page as JSON inside ytInitialData
  const videoIds = new Set();

  // Method 1: Find videoId in JSON data embedded in the page
  const videoIdRegex = /"videoId"\s*:\s*"([a-zA-Z0-9_-]{11})"/g;
  let match;
  while ((match = videoIdRegex.exec(html)) !== null) {
    videoIds.add(match[1]);
  }

  // Method 2: Find /watch?v= links
  const watchRegex = /\/watch\?v=([a-zA-Z0-9_-]{11})/g;
  while ((match = watchRegex.exec(html)) !== null) {
    videoIds.add(match[1]);
  }

  const uniqueIds = [...videoIds];
  console.log(`Found ${uniqueIds.length} unique video IDs`);

  if (uniqueIds.length === 0) {
    console.error('No video IDs found. The channel page may not have loaded properly.');
    console.log('HTML length:', html.length);
    // Write a snippet of the HTML for debugging
    fs.writeFileSync(path.join(__dirname, 'debug-html.txt'), html.substring(0, 5000));
    console.log('Wrote first 5000 chars of HTML to scripts/debug-html.txt for debugging');
    process.exit(1);
  }

  // Fetch metadata for each video using oEmbed
  const videos = [];
  for (const videoId of uniqueIds) {
    console.log(`Fetching metadata for video: ${videoId}`);
    const oembed = await getOembed(videoId);

    if (oembed && oembed.title) {
      videos.push({
        id: videoId,
        title: oembed.title,
        description: oembed.author_name ? `By ${oembed.author_name}` : '',
        thumbnail: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
        url: `https://www.youtube.com/watch?v=${videoId}`,
        publishedAt: '',
        channelName: oembed.author_name || '',
        channelUrl: oembed.author_url || '',
        isVisible: true,
      });
      console.log(`  -> "${oembed.title}"`);
    } else {
      console.log(`  -> Skipped (no oembed data)`);
    }
  }

  console.log(`\nSuccessfully fetched metadata for ${videos.length} videos`);

  // Write to JSON file
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(videos, null, 2));
  console.log(`Wrote ${videos.length} videos to ${OUTPUT_PATH}`);
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
