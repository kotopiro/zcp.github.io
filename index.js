import express from 'express';
import path from 'path';
import compression from 'compression';
import fetch from 'node-fetch';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 10000;

app.use(compression());
app.use(express.static(path.join(__dirname, 'public')));

// 個人用プロキシ
app.get('/proxy', async (req, res) => {
  const target = req.query.url;
  if(!target) return res.status(400).send('Missing URL');
  try {
    const response = await fetch(target);
    const body = await response.text();
    res.send(body);
  } catch(err) {
    res.status(500).send(err.toString());
  }
});

// それ以外は index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => console.log(`ZCP Render Server running on port ${PORT}`));
