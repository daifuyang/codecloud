import http from 'node:http';
import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import app from './dist/server/server.js';

const port = Number(process.env.PORT || 3000);
const publicDir = path.join(path.dirname(fileURLToPath(import.meta.url)), 'dist/client');
const canonicalHost = 'www.codecloud.ltd';
const rootHost = 'codecloud.ltd';
const mimeTypes = new Map([
  ['.css', 'text/css; charset=utf-8'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.ico', 'image/x-icon'],
  ['.png', 'image/png'],
  ['.svg', 'image/svg+xml'],
  ['.txt', 'text/plain; charset=utf-8'],
  ['.webmanifest', 'application/manifest+json; charset=utf-8'],
]);

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

function getHost(req) {
  return String(req.headers['x-forwarded-host'] ?? req.headers.host ?? '').split(':')[0].toLowerCase();
}

function redirectToCanonical(req, res) {
  if (getHost(req) !== rootHost) return false;

  const forwardedProto = req.headers['x-forwarded-proto'];
  const protocol = Array.isArray(forwardedProto) ? forwardedProto[0] : forwardedProto;
  const url = new URL(req.url ?? '/', `${protocol || 'https'}://${canonicalHost}`);

  res.statusCode = 308;
  res.setHeader('Location', url.toString());
  res.setHeader('Cache-Control', 'public, max-age=3600');
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.setHeader('Content-Length', '0');
  res.end();
  return true;
}

function resolvePublicFile(urlPath) {
  let pathname;

  try {
    pathname = decodeURIComponent(new URL(urlPath, 'https://localhost').pathname);
  } catch {
    return undefined;
  }

  const safePath = path.normalize(pathname).replace(/^(\.\.[/\\])+/, '');
  const filePath = path.join(publicDir, safePath);

  if (!filePath.startsWith(publicDir + path.sep)) return undefined;
  return filePath;
}

async function serveStatic(req, res) {
  if (req.method !== 'GET' && req.method !== 'HEAD') return false;

  const filePath = resolvePublicFile(req.url ?? '/');
  if (!filePath) return false;

  try {
    const fileStat = await stat(filePath);
    if (!fileStat.isFile()) return false;

    const ext = path.extname(filePath);
    res.statusCode = 200;
    res.setHeader('Content-Length', fileStat.size);
    res.setHeader('Content-Type', mimeTypes.get(ext) ?? 'application/octet-stream');

    if (filePath.includes(`${path.sep}assets${path.sep}`)) {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    } else {
      res.setHeader('Cache-Control', 'public, max-age=300');
    }

    if (req.method === 'HEAD') {
      res.end();
    } else {
      createReadStream(filePath).pipe(res);
    }

    return true;
  } catch {
    return false;
  }
}

const server = http.createServer(async (req, res) => {
  try {
    if (redirectToCanonical(req, res)) return;
    if (await serveStatic(req, res)) return;

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
