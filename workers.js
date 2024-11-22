const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Twin-Url - Modern URL Shortener</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/drshounak/twin-url@main/styles.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap">
    <link rel="manifest" href="manifest.json"/>
</head>
<body>
    <header class="header">
        <div class="container">
            <h1>Twin-Url</h1>
        </div>
    </header>
    
    <main class="container">
        <div class="card">
            <h2 class="card-title">Create Short URL</h2>
            <form id="add-redirect-form">
                <div class="form-group">
                    <label class="label" for="path">Custom Path (optional)</label>
                    <input type="text" id="path" name="path" class="input" placeholder="Leave empty for random path">
                </div>
                
                <div class="form-group">
                    <label class="label" for="url">URL*</label>
                    <input type="url" id="url" name="url" class="input" required placeholder="https://example.com">
                </div>
                
                <div class="form-group">
                    <label class="label" for="secretCode">Secret Code*</label>
                    <input type="text" id="secretCode" name="secretCode" class="input" required>
                </div>
                
                <button type="submit" class="button button-primary">Create Short URL</button>
            </form>
            
            <div id="message" class="message" style="display: none;"></div>
        </div>
        
        <div class="nav-links">
            <a href="/list" class="link">View All URLs</a>
            <a href="/delete" class="link">Delete URLs</a>
        </div>
    </main>
    
    <footer class="footer">
        <p style="color: white;">Made with Love by TechWeirdo.net | <a href="https://github.com/drshounak/twin-url" style="color: orange; "class="link">Fork at GitHub</a></p>
    </footer>

    <script>
        const form = document.getElementById('add-redirect-form');
        const messageEl = document.getElementById('message');

        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            const formData = new FormData(form);
            
            try {
                const response = await fetch('/api/redirects', {
                    method: 'POST',
                    body: formData
                });
                
                const message = await response.text();
                messageEl.textContent = message;
                messageEl.style.display = 'block';
                
                if (response.ok) {
                    form.reset();
                }
            } catch (error) {
                messageEl.textContent = 'An error occurred. Please try again.';
                messageEl.style.display = 'block';
            }
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
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Twin-Url - All URLs</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/drshounak/twin-url@main/styles.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap">
</head>
<body>
    <header class="header">
        <div class="container">
            <h1>Twin-Url</h1>
        </div>
    </header>
    
    <main class="container">
        <div class="nav-links">
            <a href="/" class="link">Create URL</a>
            <a href="/delete" class="link">Delete URLs</a>
        </div>

        <div class="card">
            <h2 class="card-title">All Shortened URLs</h2>
            <div class="table-container">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Short URL</th>
                            <th>Destination</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${keys.map(({ name, value }) => `
                            <tr class="copy-key" data-key="${name}">
                                <td>${name}</td>
                                <td>${value}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    </main>
    
    <footer class="footer">
        <p style="color: white;">Made with Love by TechWeirdo.net | <a href="https://github.com/drshounak/twin-url" style="color: orange; "class="link">Fork at GitHub</a></p>
    </footer>

    <script>
        const rows = document.querySelectorAll(".copy-key");
        
        rows.forEach(row => {
            row.addEventListener("click", () => {
                const key = row.getAttribute("data-key");
                const url = `${location.origin}/${key}`;
                
                navigator.clipboard.writeText(url)
                    .then(() => {
                        alert(`Copied: ${url}`);
                    })
                    .catch(err => {
                        console.error("Failed to copy URL:", err);
                    });
            });
        });
    </script>
</body>
</html>
  `;

  return new Response(listHTML, { headers: { 'Content-Type': 'text/html' } });
}
