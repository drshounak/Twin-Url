const html = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Serverless Link Shortener and Organizer</title>
    <link rel="manifest" href="manifest.json"/>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f9f9f9;
        }

        header {
            background-color: #3d1887;
            color: #fff;
            padding: 20px 0;
            text-align: center;
        }

        h1 {
            margin: 0;
        }

        .container {
            max-width: 800px;
            margin: 20px auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        form {
            margin-bottom: 20px;
        }

        label {
            display: block;
            margin-bottom: 5px;
        }

        input[type="text"],
        input[type="url"] {
            width: calc(100% - 10px);
            padding: 8px;
            margin-bottom: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
            box-sizing: border-box;
        }

        button {
            padding: 10px 20px;
            color: #fff;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }

        button:hover {
            background-color: #555;
        }
       .primary-button {
        background-color: #007bff;
    }

    .primary-button:hover {
        background-color: #0056b3;
    }

    .secondary-button {
        background-color: #28a745;
    }

    .secondary-button:hover {
        background-color: #218838;
    }

        table {
            width: 100%;
            border-collapse: collapse;
        }

        th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }

        th {
            background-color: #f2f2f2;
        }

        tr:nth-child(even) {
            background-color: #f9f9f9;
        }
    </style>
  </head>
  <body>
    <header>
      <h1>Link Shortener</h1>
      <p>Ofcource it is serverless, Trespassers will be prosecuted</p>
    </header>
    <div class="container">
      <form id="add-redirect-form">
        <label for="path">Path: (If no path is specified, a random path will be generated</label>
        <input type="text" id="path" name="path" >
        <label for="url">URL:</label>
        <input type="url" id="url" name="url" required>
        <label for="secretCode">Secret Code:</label>
        <input type="text" id="secretCode" name="secretCode" required>
        <button type="submit" class="primary-button">Add Redirect</button>
      </form>
      <form action="/list" method="get">
       <button type="submit" class="secondary-button">List All Links</button>
      </form>
      <p id="message"></p>
      <h2>Redirects</h2>
      <table id="redirects-table">
        <thead>
          <tr>
            <th>Path</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>
    <script>
      const form = document.getElementById('add-redirect-form');
      const table = document.getElementById('redirects-table').getElementsByTagName('tbody')[0];
      const messageEl = document.getElementById('message');

      async function loadRedirects() {
        table.innerHTML = '';
      }

      form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const path = form.elements.path.value;
        const url = form.elements.url.value;
        const secretCode = form.elements.secretCode.value; 

        const response = await fetch('/api/redirects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({ path, url, secretCode }), 
        });
        const message = await response.text();
        messageEl.textContent = message;
        form.reset();
        loadRedirects();
      });

      loadRedirects();
    </script>
  </body>
</html>
`;
const SECRET_CODE = 'Buddy_Replace_With_Your_Own_Secret_Code';

const manifest = JSON.stringify({
  name: 'General Link shortener',
  short_name: 'General Link shortener',
  start_url: '/',
  display: 'standalone',
  background_color: '#f9f9f9',
  theme_color: '#850538',
  icons: [
    {
      src: 'https://cdn-cloudflare.smartgoat.me/link-shortener.png',
      sizes: '192x192',
      type: 'image/png',
    },
    {
      src: 'https://cdn-cloudflare.smartgoat.me/link-shortener.png',
      sizes: '512x512',
      type: 'image/png',
    },
  ],
});

export default {
  async fetch(request, env) {
    const { pathname } = new URL(request.url);

    const headers = {
      'X-Robots-Tag': 'noindex, nofollow',
    }

    if (request.method === 'GET' && pathname === '/') {
      return serveIndexPage(env);
    }

    if (request.method === 'POST' && pathname === '/api/redirects') {
      return handleCreateRedirect(request, env);
    }

    if (request.method === 'GET' && pathname === '/list') {
      return serveListPage(env);
    }

    if (request.method === 'GET' && pathname === '/manifest.json') {
      return new Response(manifest, { headers: { 'Content-Type': 'application/manifest+json' } });
    }

    const key = pathname.split('/')[1];

    if (!key) {
      return new Response('Welcome to my redirector', { status: 200 });
    }

    if (key === 'robots.txt') {
      return new Response('User-agent: *\nDisallow: /', { status: 200, headers: { 'Content-Type': 'text/plain' } });
    }

    const dest = await env.kv.get(key);

    if (dest) {
      return new Response('Redirecting...', { status: 302, headers: { 'Location': dest } });
    }

    return new Response('Not found', { status: 404 });
  },
};

async function serveIndexPage(env) {
  return new Response(html, { headers: { 'Content-Type': 'text/html' } });
}

async function handleCreateRedirect(request, env) {
  const formData = await request.formData();
  let path = formData.get('path');
  const url = formData.get('url');
  const secretCode = formData.get('secretCode');

  if (secretCode !== SECRET_CODE) {
    return new Response('Unauthorized', { status: 401 });
  }

  if (!url) {
    return new Response('Invalid request', { status: 400 });
  }

  if (!path) {
    // Generate a unique path if not provided
    const timestamp = Math.floor(Date.now() / 1000).toString(36).slice(-4);
    const randomString = generateRandomString(4);
    path = `${randomString}${timestamp}`;
  }

  const existingUrl = await env.kv.get(path);

  if (existingUrl) {
    return new Response('Ooh, already exists', { status: 200 });
  }

  await env.kv.put(path, url);
  return new Response(`Yaah, it is a success. Your short URL is: ${new URL(request.url).origin}/${path}`, { status: 200 });
}

function generateRandomString(length) {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

async function serveListPage(env) {
  const listResult = await env.kv.list();
  const keys = await Promise.all(listResult.keys.map(async ({ name, expiration, metadata }) => ({
    name,
    expiration: new Date(expiration * 1000).toLocaleString(),
    metadata,
    value: await env.kv.get(name),
  })));

  const listHTML = `
  <!DOCTYPE html>
   <html>
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Serverless Link Redirector</title>
    <style>
    body {
            margin: 5;
            padding: 0;
            font-family: 'Roboto', Arial, Helvetica, sans-serif;
            color: #525000;
            background-color: #f5f5f5; /* Changed background color */
        }

        #container {
            max-width: 800px;
            margin: 0 auto;
            padding: 1.5rem;
            box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1);
        }

        h2 {
            margin: 0;
            font-size: 1.5rem;
            line-height: 1.5rem;
            text-align: center;
            color: #333; /* Changed text color */
            padding-bottom: 1rem; /* Added padding */
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 1rem; /* Added margin */
        }

        th,
        td {
            padding: 12px; /* Increased padding */
            text-align: left;
            word-break: break-word;
        }

        th {
            background-color: #ffca28; /* Changed background color */
            color: #333; /* Changed text color */
            min-width: 130px;
        }

        tbody tr:nth-child(even) {
            background-color: #fff; /* Changed background color */
        }

        tbody tr:nth-child(odd) {
            background-color: #f9f9f9; /* Changed background color */
        }

        @media (min-width: 600px) {
            body {
                font-size: 1rem;
            }

            td:nth-child(1),
            th:nth-child(1) {
                max-width: 45%;

            }
        }
      .back-button {
            display: block;
            
            margin-bottom: 1rem;
        }

        .back-button a {
            background-color: #007bff;
            color: #fff;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
        }

        .back-button a:hover {
            background-color: #0056b3;
        }
        /* ... (CSS styles for the list page remain the same) */
    </style>
    </head>
    <body>
    <h2>List of Keys and Values</h2>
    <div class="back-button">
        <a id="back-button" href="/">Back</a>
    </div>
    <table>
      <thead>
        <tr>
          <th>Key</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        ${keys.map(({ name, value, expiration, metadata }) => `
          <tr>
            <td class="copy-key" data-key="${name}">${name}</td>
            <td>${value}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
    <script>
  const keyCells = document.querySelectorAll(".copy-key");

  keyCells.forEach(cell => {
    cell.addEventListener("click", () => {
      const key = cell.getAttribute("data-key");
      const url = location.origin + "/" + key; // Using location.origin to get the current domain
      navigator.clipboard.writeText(url)
        .then(() => {
          alert(\`Copied: \${url}\`);
        })
        .catch((err) => {
          console.error("Failed to copy text: ", err);
        });
    });
  });
</script>

    </body>
    </html>
  `;

  return new Response(listHTML, { headers: { 'Content-Type': 'text/html' } });
}
