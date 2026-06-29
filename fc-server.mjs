import http from 'node:http';
import app from './dist/server/server.js';

const port = Number(process.env.PORT || 3000);

function readBody(req) {
  if (req.method === 'GET' || req.method === 'HEAD') return undefined;

  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (chunk) => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

function toWebHeaders(nodeHeaders) {
  const headers = new Headers();

  for (const [key, value] of Object.entries(nodeHeaders)) {
    if (Array.isArray(value)) {
      value.forEach((item) => headers.append(key, item));
    } else if (value !== undefined) {
      headers.set(key, value);
    }
  }

  return headers;
}

const server = http.createServer(async (req, res) => {
  try {
    const host = req.headers.host ?? `localhost:${port}`;
    const protocol = req.headers['x-forwarded-proto'] ?? 'https';
    const url = `${protocol}://${host}${req.url ?? '/'}`;
    const body = await readBody(req);
    const request = new Request(url, {
      method: req.method,
      headers: toWebHeaders(req.headers),
      body,
    });
    const response = await app.fetch(request);
    const responseBody = Buffer.from(await response.arrayBuffer());

    res.statusCode = response.status;
    response.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });
    res.end(responseBody);
  } catch (error) {
    console.error(error);
    res.statusCode = 500;
    res.end('Internal Server Error');
  }
});

server.listen(port, '0.0.0.0', () => {
  console.log(`CodeCloud site listening on ${port}`);
});
