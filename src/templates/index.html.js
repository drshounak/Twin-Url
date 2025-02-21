export default `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Twin-Url</title>
  <link rel="icon" type="image/x-icon" href="https://assets.2tw.in/twin-url-logo.webp">
  <link rel="manifest" href="/manifest.json"/>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
  <style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { 
    font-family: 'Inter', sans-serif; 
    background: #1a1a19; 
    color: #FFFFFF; 
    min-height: 100vh; 
    display: flex; 
    flex-direction: column; 
    align-items: center; 
    padding: 2rem; 
  }
  header { text-align: center; margin-bottom: 2rem; }
  h1 { font-size: 2.5rem; font-weight: 600; color: #FFFFFF; }
  header p { font-size: 1.1rem; color: #e63d45; margin-top: 0.5rem; }
  .container { 
    max-width: 600px; 
    width: 100%; 
    background: #1a1a19; 
    padding: 1.5rem; 
    border-radius: 8px; 
    border: 1px solid rgb(229, 113, 113, 0.5); /* Lighter red shade for borders */
  }
  form { display: flex; flex-direction: column; gap: 1rem; }
  label { font-size: 0.9rem; color: #F5F5F5; }
  input { 
    background: #1a1a19; 
    border: 1px solid rgb(229, 113, 113, 0.3); /* Lighter red shade for borders */
    border-radius: 6px; 
    padding: 0.75rem; 
    color: #FFFFFF; 
    font-size: 1rem; 
    transition: border-color 0.2s; 
  }
  input:focus { outline: none; border-color: #D32C4B; }
  button { 
    background: #D32C4B; 
    color: #FFFFFF; 
    border: none; 
    padding: 0.75rem; 
    border-radius: 6px; 
    font-weight: 500; 
    cursor: pointer; 
    transition: background 0.2s; 
  }
  button:hover { background: #F44336; } /* A slightly lighter red for hover effect */
  #message { margin-top: 1rem; text-align: center; font-size: 0.9rem; color: #D32C4B; }
  .short-url { 
    margin-top: 1rem; 
    text-align: center; 
    color: #D32C4B; 
    cursor: pointer; 
    font-size: 1rem; 
    transition: color 0.2s; 
  }
  .short-url:hover { color: #F44336; }
  .links { margin-top: 1.5rem; display: flex; gap: 1rem; justify-content: center; }
  .links a { color: #D32C4B; text-decoration: none; font-size: 0.9rem; transition: color 0.2s; }
  .links a:hover { color: #F44336; }
  footer { margin-top: auto; padding: 1rem; font-size: 0.8rem; color: #F5F5F5; text-align: center; }
  footer a { color: #e63d45; text-decoration: none; }
  footer a:hover { color: #F44336; }
  .notification { 
    position: fixed; 
    top: 1rem; 
    right: 1rem; 
    background: #000000; 
    padding: 0.5rem 1rem; 
    border-radius: 6px; 
    border: 1px solid #E57373; /* Lighter red shade for borders */
    color: #e63d45; 
    font-size: 0.9rem; 
    opacity: 0; 
    transition: opacity 0.3s ease-out; 
  }
  .notification.show { opacity: 1; }
</style>
</head>
<body>
  <header>
    <h1>Twin-Url</h1>
    <p>Transform long URLs into sleek Twins. Shorten, shine, succeed.</p>
  </header>
  <div class="container">
    <form id="add-redirect-form">
      <label>Custom Path (optional)</label>
      <input type="text" name="path" placeholder="e.g., mylink">
      <label>Destination URL</label>
      <input type="url" name="url" placeholder="https://example.com" required>
      <label>Secret Code</label>
      <input type="text" name="secretCode" placeholder="Enter secret code" required>
      <button type="submit">Twin It</button>
    </form>
    <p id="message"></p>
    <div id="shortUrl" class="short-url" style="display: none;"></div>
    <div class="links">
      <a href="/list">View All</a>
    </div>
  </div>
  <footer>
    Powered by <a href="https://2tw.in">Twin-Url</a> on Cloudflare Workers | <a href="https://2tw.in/GBnNcmic">Fork on GitHub</a>
  </footer>
  <div id="notification" class="notification"></div>
  <script>
    const form = document.getElementById('add-redirect-form');
    const messageEl = document.getElementById('message');
    const shortUrlEl = document.getElementById('shortUrl');
    const notification = document.getElementById('notification');

    function showNotification(message) {
      notification.textContent = message;
      notification.classList.add('show');
      setTimeout(() => notification.classList.remove('show'), 2000);
    }

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const path = form.path.value;
      const url = form.url.value;
      const secretCode = form.secretCode.value;
      const response = await fetch('/api/redirects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ path, url, secretCode }),
      });
      const message = await response.text();
      messageEl.textContent = message;
      if (response.status === 200) {
        const shortUrl = message.split('is: ')[1];
        shortUrlEl.textContent = shortUrl;
        shortUrlEl.style.display = 'block';
        shortUrlEl.onclick = () => {
          navigator.clipboard.writeText(shortUrl).then(() => showNotification('Copied!'));
          form.reset();
        };
      }
    });
  </script>
</body>
</html>
`;
