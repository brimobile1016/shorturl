import fs from 'fs-extra';
import path from 'path';

export default async (req, res) => {
  if (req.method === 'POST') {
    const { url } = req.body;
    const dbPath = path.join(process.cwd(), 'data', 'urls.json');
    const urls = await fs.readJSON(dbPath);

    const id = Math.random().toString(36).substr(2, 8);
    urls.push({ id, url });

    await fs.writeJSON(dbPath, urls);

    res.status(201).json({ id });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};
