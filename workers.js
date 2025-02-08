const html = `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Simple URL Shortener</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/water.css@2/out/water.css">
  <link rel="manifest" href="/manifest.json">
  <style>
    body {
      max-width: 800px;
      margin: 20px auto;
      padding: 20px;
    }

    input[type="text"],
    input[type="url"] {
      width: 100%;
      padding: 0.5em;
      margin-bottom: 1em;
      border: 1px solid #ccc;
      border-radius: 0.25em;
    }

    button {
      padding: 0.5em 1em;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 0.25em;
      cursor: pointer;
    }

    button:hover {
      background-color: #0056b3;
    }

    a {
      color: #007bff;
      text-decoration: none;
    }

    a:hover {
      text-decoration: underline;
    }

    table {
      width: 100%;
      border-collapse: collapse;
    }

    th,
    td {
      padding: 0.5em;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }

    th {
      background-color: #f2f2f2;
    }

    .error {
      color: red;
    }

    .success {
      color: green;
    }
  </style>
</head>

<body>
  <h1>URL Shortener</h1>

  <section>
    <h2>Create Short URL</h2>
    <form id="add-redirect-form">
      <label for="path">Path (optional):</label>
      <input type="text" id="path" name="path" placeholder="Custom path">

      <label for="url">URL:</label>
      <input type="url" id="url" name="url" required placeholder="https://example.com">

      <label for="secretCode">Secret Code:</label>
      <input type="text" id="secretCode" name="secretCode" required>

      <button type="submit">Shorten URL</button>
    </form>
    <p id="message"></p>
  </section>

  <section>
    <h2>Manage URLs</h2>
    <p><a href="/list">List All URLs</a> | <a href="/delete">Delete URL</a></p>
  </section>

  <script>
    const form = document.getElementById('add-redirect-form');
    const messageEl = document.getElementById('message');

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const path = form.elements.path.value;
      const url = form.elements.url.value;
      const secretCode = form.elements.secretCode.value;

      const response = await fetch('/api/redirects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          path,
          url,
          secretCode
        }),
      });

      const result = await response.text();
      messageEl.textContent = result;
      form.reset();
    });
  </script>
</body>

</html>
`;
const SECRET_CODE = 'Buddy Replace It With Your own Secret Code';

const manifest = JSON.stringify({
  name: 'Serverless Link shortener',
  short_name: 'Link shortener',
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

    if (request.method === 'GET' && pathname === '/delete') {
      return serveDeletePage(env);
    }

    if (request.method === 'DELETE' && pathname === '/api/redirects') {
      return handleDeleteRedirect(request, env);
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

    const notFoundHtmlContent = `
      <!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>404 - Page Not Found</title>
<style>
body {
font-family: Arial, sans-serif;
margin: 7px;
padding: 0;
background-color: #f9f9f9;
}
header {
background-color: #045dd1;
color: #fff;
padding: 10px 0;
margin: 10px auto;
margin-bottom: 20px;
max-width: 650px;
border-radius: 7px;
text-align: center;
}
.container {
max-width: 600px;
margin: 20px auto;
padding: 20px;
background-color: #fff;
border-radius: 8px;
box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
text-align: center;
}
h1 {
margin: 0;
color: #fff;
}
h2 {
color: #333;
margin-bottom: 20px;
font-size: 2em;
}
.primary-button {
background-color: #393939;
color: #fff;
padding: 10px 20px;
text-decoration: none;
border-radius: 5px;
margin-top: 20px;
display: inline-block;
}
.primary-button:hover {
background-color: #03469e;
}
img {
max-width: 150px;
height: auto;
margin-bottom: 20px;
border-radius: 7px;
}
p {
color: #333;
line-height: 1.4;
font-size: 1.1rem;
}
</style>
</head>
<body>
<header>
<h1>URL Shortener</h1>
</header>
<div class="container">
<h2>Oh Noooo. 404 Not Found!</h2>
   <figure>
      <img src="https://raw.githubusercontent.com/drshounak/Really-Simple-Url-Shortner-with-cloudflare-workers/main/images/grumpy-cat-olga-shvartsur.jpg" alt="Grumpy Cat" title="This is Mr. Grumpy">
     <figcaption><b>👆 This is Mr. Grumpy</b></figcaption>

  <p>Uh-oh, it seems like the page you're trying to reach has gone on a little adventure of its own! <b>It usually happens when the short URL is wrong or not live yet.</b></p>
<p>But don't worry, if it is a problem at our end then my team of unpaid coding kittens is working hard to track it down. <b>But in most cases I recommend you to poke the person who sent you the link</b></p>
  <p><em>In the meantime, why not try petting this grumpy feline? It might just cheer them up!</em></p>
<a href="/" class="primary-button">Pet the Grumpy Cat 😾</a>
</div>
<div>
<p style="text-align: center;">Running on Cloudflare Workers. <a href="https://2tw.in/GBnNcmic" style="color: #3d02ab; text-decoration: none; font-weight: bold;">Fork The repo at Github</a></p>
</div>
</body>
</html>
    `;

    return new Response(notFoundHtmlContent, { status: 404, headers: { 'Content-Type': 'text/html' } });
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
    return new Response('Ooh, already exists buddy', { status: 200 });
  }

  await env.kv.put(path, url);
  return new Response(`Yaay, it is a success. Your short URL is: ${new URL(request.url).origin}/${path}`, { status: 200 });
}

function generateRandomString(length) {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

async function serveDeletePage(env) {
  return new Response(`
     <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>Delete Redirect</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 7px;
            padding: 0;
            background-color: #f9f9f9;
        }
          
          header {
            background-color: #045dd1;
            color: #fff;
            padding: 10px 0;
            margin: 10px auto;
            margin-bottom: 20px;
            max-width: 650px;
            border-radius: 7px;
            text-align: center;
        }

        h1 {
            margin: 0;
            color: #fff;
        }

         .container {
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

          h2 {
            color: #333;
          }

          form {
            display: flex;
            flex-direction: column;
          }

          label {
            font-weight: bold;
            margin-top: 10px;
          }

          input {
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
          }

          button {
            margin-top: 20px;
            padding: 10px;
            background-color: #007bff;
            color: #fff;
            border: none;
            border-radius: 4px;
            cursor: pointer;
          }

          button:hover {
            background-color: #0056b3;
          }

          #message {
            margin-top: 20px;
            text-align: center;
            font-weight: bold;
          }
        </style>
      </head>
      <body>
        <header>
        <h1>URL Shortener</h1>
        </header>
        <div class="container">
          <h2>Delete Redirect</h2>
          <form id="delete-redirect-form">
            <label for="path">Path:</label>
            <input type="text" id="path" name="path" required>
            <label for="secretCode">Secret Code:</label>
            <input type="text" id="secretCode" name="secretCode" required>
            <button type="submit">Delete Redirect</button>
          </form>     
          <p id="message"></p>

          <div class="button">
           <a id="back-button" style="color: #b36007; font-weight: bold; margin-right: 5px;" href="/">Back</a>
           <a id="back-button" style="color: #057a28; font-weight: bold;" href="/list">List Page</a>
        </div>
        </div>
        <p style="text-align: center;">Running on Cloudflare Workers. <a href="https://2tw.in/GBnNcmic" style="color: #3d02ab; text-decoration: none; font-weight: bold;">Fork The repo at Github</a></p>
    </div>
        <script>
          const form = document.getElementById('delete-redirect-form');
          const messageEl = document.getElementById('message');

          form.addEventListener('submit', async (event) => {
            event.preventDefault();
            const path = form.elements.path.value;
            const secretCode = form.elements.secretCode.value;

            const response = await fetch('/api/redirects', {
              method: 'DELETE',
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
              body: new URLSearchParams({ path, secretCode }),
            });
            const message = await response.text();
            messageEl.textContent = message;
            form.reset();
          });
        </script>
      </body>
    </html>
  `, { headers: { 'Content-Type': 'text/html' } });
}

async function handleDeleteRedirect(request, env) {
  const formData = await request.formData();
  const path = formData.get('path');
  const secretCode = formData.get('secretCode');

  if (secretCode !== SECRET_CODE) {
    return new Response('Unauthorized', { status: 401 });
  }

  if (!path) {
    return new Response('Invalid request', { status: 400 });
  }

  const existingUrl = await env.kv.get(path);

  if (!existingUrl) {
    return new Response('Redirect not found', { status: 404 });
  }

  await env.kv.delete(path);
  return new Response('Redirect deleted successfully', { status: 200 });
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
            font-family: Arial, sans-serif;
            margin: 7px;
            padding: 0;
            background-color: #f9f9f9;
        }

        header {
            background-color: #045dd1;
            color: #fff;
            padding: 10px 0;
            margin: 10px auto;
            margin-bottom: 20px;
            max-width: 650px;
            border-radius: 7px;
            text-align: center;
        }

        h1 {
            margin: 0;
        }

        .container {
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        h2 {
            margin: 0;
            font-size: 1.5rem;
            line-height: 1.5rem;
            color: #333;
            padding-top: 1rem; 
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 1rem;
        }

        th,
        td {
            padding: 12px;
            text-align: left;
            word-break: break-word;
        }

        th {
            background-color: #ffca28;
            color: #333; 
            min-width: 100px;
        }

        tbody tr:nth-child(even) {
            background-color: #fff;
        }

        tbody tr:nth-child(odd) {
            background-color: #f9f9f9;
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
            background-color: #393939;
            color: #fff;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
        }

        .back-button a:hover {
            background-color: #0056b3;
        }
    </style>
    </head>
    <body>
    <header>
      <h1>URL Shortener</h1>
      </header>
      <div class="container">
      <div class="back-button">
        <a id="back-button" href="/">Back</a>
        <a id="back-button" href="/delete">Delete</a>
      </div>
    <h2>Shortened URLs</h2>
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
    </div>
    <div>
      <p style="text-align: center;">Running on Cloudflare Workers. <a href="https://2tw.in/GBnNcmic" style="color: #3d02ab; text-decoration: none; font-weight: bold;">Fork The repo at Github</a></p>
    </div>
    <script>
  const keyCells = document.querySelectorAll(".copy-key");

  keyCells.forEach(cell => {
    cell.addEventListener("click", () => {
      const key = cell.getAttribute("data-key");
      const url = location.origin + "/" + key; 
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
