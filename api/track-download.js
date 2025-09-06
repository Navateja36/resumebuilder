// File: api/track-download.js
import { kv } from '@vercel/kv';

export default async function handler(request, response) {
  if (request.method !== 'POST') {
    return response.status(405).json({ message: 'Only POST requests are allowed' });
  }

  try {
    const downloads = await kv.incr('resumeDownloads');
    return response.status(200).json({ downloads: downloads });

  } catch (error) {
    console.error(error);
    return response.status(500).json({ message: 'Error updating download count' });
  }
}