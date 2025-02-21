import indexTemplate from './templates/index.html.js';
import listTemplate from './templates/list.html.js';
import notFoundTemplate from './templates/404.html.js';
import { generateRandomString } from './utils.js';

const manifest = JSON.stringify({
  name: 'Twin-Url - URL Shortener',
  short_name: 'Twin-Url',
  start_url: '/',
  display: 'standalone',
  background_color: '#0d1117',
  theme_color: '#8b5cf6',
  icons: [
    { src: 'https://assets.2tw.in/twin-url-logo.webp', sizes: '192x192', type: 'image/png' },
    { src: 'https://assets.2tw.in/twin-url-logo.webp', sizes: '512x512', type: 'image/png' },
  ],
});

export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url);
    const headers = { 'X-Robots-Tag': 'noindex, nofollow' };
    const secretCode = env.SECRET_CODE || 'default-secret'; // Fallback if not set

    if (request.method === 'GET' && pathname === '/') {
      return new Response(indexTemplate, { headers: { 'Content-Type': 'text/html' } });
    }

    if (request.method === 'POST' && pathname === '/api/redirects') {
      return handleCreateRedirect(request, env, secretCode);
    }

    if (request.method === 'GET' && pathname === '/list') {
      return serveListPage(env);
    }

    if (request.method === 'GET' && pathname === '/manifest.json') {
      return new Response(manifest, { headers: { 'Content-Type': 'application/manifest+json' } });
    }

    if (request.method === 'PUT' && pathname === '/api/redirects') {
      const formData = await request.formData();
      const path = formData.get('path');
      const url = formData.get('url');
      const providedSecret = formData.get('secretCode');

      if (providedSecret !== secretCode) {
        return new Response('Unauthorized', { status: 401 });
      }

      if (!path || !url) {
        return new Response('Invalid request: path and url required', { status: 400 });
      }

      const existingUrl = await env.KV.get(path);
      if (!existingUrl) {
        return new Response('Path not found', { status: 404 });
      }

      await env.KV.put(path, url);
      return new Response('Link updated successfully', { status: 200 });
    }

    if (request.method === 'DELETE' && pathname === '/api/redirects') {
      const formData = await request.formData();
      const path = formData.get('path');
      const providedSecret = formData.get('secretCode');

      if (providedSecret !== secretCode) {
        return new Response('Unauthorized', { status: 401 });
      }

      if (!path) {
        return new Response('No path provided', { status: 400 });
      }

      const existingUrl = await env.KV.get(path);
      if (!existingUrl) {
        return new Response('Path not found', { status: 404 });
      }

      await env.KV.delete(path);
      return new Response('Link deleted successfully', { status: 200 });
    }

    const key = pathname.split('/')[1];

    if (!key) {
      return new Response('Welcome to Twin-Url', { status: 200 });
    }

    if (key === 'robots.txt') {
      return new Response('User-agent: *\nDisallow: /', { status: 200, headers: { 'Content-Type': 'text/plain' } });
    }

    const dest = await env.KV.get(key);

    if (dest) {
      return new Response('Redirecting...', { status: 302, headers: { 'Location': dest } });
    }

    return new Response(notFoundTemplate, { status: 404, headers: { 'Content-Type': 'text/html' } });
  },
};

async function handleCreateRedirect(request, env, secretCode) {
  const formData = await request.formData();
  let path = formData.get('path');
  const url = formData.get('url');
  const providedSecret = formData.get('secretCode');

  if (providedSecret !== secretCode) {
    return new Response('Unauthorized', { status: 401 });
  }

  if (!url) {
    return new Response('Invalid request', { status: 400 });
  }

  if (!path) {
    const timestamp = Math.floor(Date.now() / 1000).toString(36).slice(-4);
    const randomString = generateRandomString(4);
    path = `${randomString}${timestamp}`;
  }

  const existingUrl = await env.KV.get(path);
  if (existingUrl) {
    return new Response('Path already exists!', { status: 200 });
  }

  await env.KV.put(path, url);
  return new Response(`Success! Your short URL is: ${new URL(request.url).origin}/${path}`, { status: 200 });
}

async function serveListPage(env) {
  const listResult = await env.KV.list();
  const keys = await Promise.all(listResult.keys.map(async ({ name }) => ({
    name,
    value: await env.KV.get(name),
  })));

  return new Response(listTemplate(keys), { headers: { 'Content-Type': 'text/html' } });
}
