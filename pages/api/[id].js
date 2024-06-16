import fs from 'fs-extra';
import path from 'path';

export default async (req, res) => {
  const { id } = req.query;
  const dbPath = path.join(process.cwd(), 'data', 'urls.json');
  const urls = await fs.readJSON(dbPath);

  const entry = urls.find(entry => entry.id === id);

  if (entry) {
    res.writeHead(302, { Location: entry.url });
    res.end();
  } else {
    res.status(404).json({ message: 'URL not found' });
  }
};
