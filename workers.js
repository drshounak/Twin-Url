const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Twin-Url - Modern URL Shortener</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/drshounak/twin-url@v1.1/styles.css">
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
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Twin-Url - Page Not Found</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/drshounak/twin-url@v1.1/styles.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap">
    <style>
        .error-container {
            text-align: center;
            padding: .5rem 1rem;
        }
        
        .error-title {
            font-size: 3rem;
            font-weight: 800;
            color: var(--primary);
            margin-bottom: 1rem;
            line-height: 1;
        }
        
        .error-subtitle {
            font-size: 1.5rem;
            font-weight: 600;
            color: var(--foreground);
            margin-bottom: 2rem;
        }
        
        .error-image {
            max-width: 150px;
            height: auto;
            margin: 0.5rem auto;
            border-radius: var(--radius);
            box-shadow: var(--shadow-lg);
        }
        
        .error-text {
            max-width: 500px;
            margin: 0 auto 2rem;
            color: var(--muted-foreground);
        }
    </style>
</head>
<body>
    
    <main class="container">
        <div class="card error-container">
            <h2 class="error-title">404</h2>
            <h3 class="error-subtitle">Page Not Found</h3>
            
            <img 
                src="https://raw.githubusercontent.com/drshounak/Really-Simple-Url-Shortner-with-cloudflare-workers/main/images/grumpy-cat-olga-shvartsur.jpg" 
                alt="Grumpy Cat" 
                class="error-image"
                title="Mr. Grumpy is not happy about this"
            >
            
            <p class="error-text">
                Oops! It seems like this URL doesn't exist. This usually happens when:
                <br><br>
                • The short URL is incorrect<br>
                • The link has expired or been deleted<br>
                • Mr. Grumpy is having a bad day
            </p>
            
            <a href="/" class="button button-primary">Go Back Home</a>
        </div>
    </main>
    
    <footer class="footer">
        <p style="color: white;">Made with Love by TechWeirdo.net | <a href="https://github.com/drshounak/twin-url" style="color: orange; "class="link">Fork at GitHub</a></p>
    </footer>
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
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Twin-Url - Delete URLs</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/drshounak/twin-url@v1.1/styles.css">
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
            <a href="/list" class="link">View All URLs</a>
        </div>

        <div class="card">
            <h2 class="card-title">Delete URL</h2>
            <form id="delete-redirect-form">
                <div class="form-group">
                    <label class="label" for="path">Short URL Path*</label>
                    <input type="text" id="path" name="path" class="input" required placeholder="Enter the path to delete">
                </div>
                
                <div class="form-group">
                    <label class="label" for="secretCode">Secret Code*</label>
                    <input type="text" id="secretCode" name="secretCode" class="input" required>
                </div>
                
                <button type="submit" class="button button-primary">Delete URL</button>
            </form>
            
            <div id="message" class="message" style="display: none;"></div>
        </div>
    </main>
    
    <footer class="footer">
        <p style="color: white;">Made with Love by TechWeirdo.net | <a href="https://github.com/drshounak/twin-url" style="color: orange; "class="link">Fork at GitHub</a></p>
    </footer>

    <script>
        const form = document.getElementById('delete-redirect-form');
        const messageEl = document.getElementById('message');

        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            const formData = new FormData(form);
            
            try {
                const response = await fetch('/api/redirects', {
                    method: 'DELETE',
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
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/drshounak/twin-url@v1.1/styles.css">
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
        <p>Powered by Cloudflare Workers | <a href="https://github.com/drshounak/twin-url" class="link">GitHub</a></p>
    </footer>

    <script>
        const keyCells = document.querySelectorAll(".copy-key");
        
        keyCells.forEach(cell => {
            cell.addEventListener("click", () => {
                const key = cell.getAttribute("data-key");
                const url = location.origin + "/" + key; 
                
                navigator.clipboard.writeText(url)
                    .then(() => {
                        alert(`Copied: ${url}`);
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
