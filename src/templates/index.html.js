export default `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Twin-Url | Modern URL Shortener for Professionals</title>
  <link rel="icon" type="image/x-icon" href="https://assets.2tw.in/twin-url-logo.webp">
  <link rel="manifest" href="/manifest.json"/>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <style>
  :root {
    --primary: #D32C4B;
    --primary-hover: #F44336;
    --primary-light: rgba(229, 113, 113, 0.3);
    --primary-medium: rgba(229, 113, 113, 0.5);
    --text: #FFFFFF;
    --text-muted: #9CA3AF;
    --bg-dark: #0F0F0F;
    --bg-card: #1A1A19;
    --transition: all 0.2s ease;
  }
  
  * { margin: 0; padding: 0; box-sizing: border-box; }
  
  body { 
    font-family: 'Inter', sans-serif; 
    background: var(--bg-dark); 
    color: var(--text); 
    min-height: 100vh; 
    display: flex; 
    flex-direction: column;
    line-height: 1.6;
  }
  
  .nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem 2rem;
    border-bottom: 1px solid var(--primary-light);
  }
  
  .logo {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
  
  .logo img {
    height: 32px;
    width: auto;
  }
  
  .logo h2 {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--text);
  }
  
  .nav-links {
    display: flex;
    gap: 1.5rem;
  }
  
  .nav-links a {
    color: var(--text-muted);
    text-decoration: none;
    font-weight: 500;
    transition: var(--transition);
  }
  
  .nav-links a:hover {
    color: var(--primary);
  }
  
  .hero {
    text-align: center;
    padding: 5rem 2rem 3rem;
    max-width: 800px;
    margin: 0 auto;
  }
  
  h1 {
    font-size: 3rem;
    font-weight: 700;
    background: linear-gradient(90deg, #FFFFFF 0%, #D32C4B 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 1.5rem;
  }
  
  .hero p {
    font-size: 1.25rem;
    color: var(--text-muted);
    margin-bottom: 2.5rem;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }
  
  .container { 
    max-width: 600px; 
    width: 100%; 
    background: var(--bg-card); 
    padding: 2rem;
    margin: 0 auto 4rem;
    border-radius: 12px; 
    border: 1px solid var(--primary-medium);
    box-shadow: 0 8px 24px rgba(211, 44, 75, 0.15);
  }
  
  form { display: flex; flex-direction: column; gap: 1.25rem; }
  
  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  label { 
    font-size: 0.9rem; 
    color: var(--text-muted);
    font-weight: 500;
  }
  
  input { 
    background: var(--bg-dark); 
    border: 1px solid var(--primary-light);
    border-radius: 8px; 
    padding: 1rem; 
    color: var(--text); 
    font-size: 1rem; 
    transition: var(--transition);
  }
  
  input:focus { 
    outline: none; 
    border-color: var(--primary); 
    box-shadow: 0 0 0 2px rgba(211, 44, 75, 0.2);
  }
  
  button { 
    background: var(--primary); 
    color: var(--text); 
    border: none; 
    padding: 1rem; 
    border-radius: 8px; 
    font-weight: 600; 
    font-size: 1rem;
    cursor: pointer; 
    transition: var(--transition);
    margin-top: 0.5rem;
  }
  
  button:hover { 
    background: var(--primary-hover);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(211, 44, 75, 0.25);
  }
  
  #message { 
    margin-top: 1.5rem; 
    text-align: center; 
    font-size: 0.95rem; 
    color: var(--primary); 
    font-weight: 500;
  }
  
  .short-url { 
    margin-top: 1.5rem; 
    text-align: center; 
    color: var(--primary); 
    background: rgba(211, 44, 75, 0.1);
    padding: 1rem;
    border-radius: 8px;
    cursor: pointer; 
    font-size: 1.1rem;
    font-weight: 600; 
    transition: var(--transition);
  }
  
  .short-url:hover { 
    color: var(--primary-hover);
    background: rgba(211, 44, 75, 0.15);
  }
  
  .features {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
    max-width: 1200px;
    margin: 0 auto 4rem;
    padding: 0 2rem;
  }
  
  .feature-card {
    background: var(--bg-card);
    border: 1px solid var(--primary-light);
    border-radius: 12px;
    padding: 2rem;
    transition: var(--transition);
  }
  
  .feature-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 24px rgba(211, 44, 75, 0.15);
    border-color: var(--primary-medium);
  }
  
  .feature-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    background: rgba(211, 44, 75, 0.15);
    border-radius: 12px;
    margin-bottom: 1.25rem;
  }
  
  .feature-card h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
  }
  
  .feature-card p {
    color: var(--text-muted);
    font-size: 0.95rem;
  }
  
  .links { 
    display: flex; 
    gap: 1.5rem; 
    justify-content: center;
    margin-top: 2rem;
  }
  
  .links a { 
    color: var(--primary); 
    text-decoration: none; 
    font-size: 0.95rem;
    font-weight: 500;
    transition: var(--transition);
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  .links a:hover { 
    color: var(--primary-hover);
  }
  
  footer { 
    margin-top: auto; 
    padding: 2rem; 
    font-size: 0.9rem; 
    color: var(--text-muted);
    text-align: center;
    border-top: 1px solid var(--primary-light);
  }
  
  footer a { 
    color: var(--primary); 
    text-decoration: none;
    font-weight: 500;
    transition: var(--transition);
  }
  
  footer a:hover { color: var(--primary-hover); }
  
  .notification { 
    position: fixed; 
    top: 1.5rem; 
    right: 1.5rem; 
    background: var(--bg-card); 
    padding: 1rem 1.5rem; 
    border-radius: 8px; 
    border: 1px solid var(--primary-medium);
    color: var(--primary); 
    font-size: 0.95rem;
    font-weight: 500;
    opacity: 0; 
    transform: translateY(-10px);
    transition: all 0.3s ease-out; 
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 100;
  }
  
  .notification.show { 
    opacity: 1;
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 2.25rem;
    }
    
    .hero p {
      font-size: 1.1rem;
    }
    
    .nav {
      flex-direction: column;
      gap: 1rem;
      text-align: center;
    }
    
    .container {
      padding: 1.5rem;
    }
  }
</style>
</head>
<body>
  <nav class="nav">
    <div class="logo">
      <img src="https://assets.2tw.in/twin-url-logo.webp" alt="Twin-Url Logo">
      <h2>Twin-Url</h2>
    </div>
    <div class="nav-links">
      <a href="/">Home</a>
      <a href="/list">Dashboard</a>
      <a href="https://2tw.in/GBnNcmic">GitHub</a>
    </div>
  </nav>

  <section class="hero">
    <h1>Transform Long URLs into Sleek Twins</h1>
    <p>Twin-Url helps professionals create memorable, branded links that drive engagement and boost click-through rates. Simplify sharing with our powerful URL shortener.</p>
  </section>

  <div class="container">
    <form id="add-redirect-form">
      <div class="form-group">
        <label>Custom Path (optional)</label>
        <input type="text" name="path" placeholder="e.g., mylink">
      </div>
      <div class="form-group">
        <label>Destination URL</label>
        <input type="url" name="url" placeholder="https://example.com" required>
      </div>
      <div class="form-group">
        <label>Secret Code</label>
        <input type="text" name="secretCode" placeholder="Enter secret code" required>
      </div>
      <button type="submit">Twin It</button>
    </form>
    <p id="message"></p>
    <div id="shortUrl" class="short-url" style="display: none;"></div>
    <div class="links">
      <a href="/list">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="3" y1="9" x2="21" y2="9"></line>
          <line x1="9" y1="21" x2="9" y2="9"></line>
        </svg>
        View Dashboard
      </a>
    </div>
  </div>

  <section class="features">
    <div class="feature-card">
      <div class="feature-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D32C4B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M9 6l6 6-6 6"></path>
        </svg>
      </div>
      <h3>Custom Short Links</h3>
      <p>Create memorable, branded URLs that reinforce your identity and increase recognition with every share.</p>
    </div>
    <div class="feature-card">
      <div class="feature-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D32C4B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
      </div>
      <h3>Lightning Fast</h3>
      <p>Built on Cloudflare Workers for global edge distribution, ensuring your shortened links load instantly from anywhere.</p>
    </div>
    <div class="feature-card">
      <div class="feature-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D32C4B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
      </div>
      <h3>Secure Management</h3>
      <p>Manage all your links with our simple secret code system. Create, update, or remove links with complete control.</p>
    </div>
  </section>

  <footer>
    <p>© 2025 Twin-Url. All rights reserved.</p>
    <p>Powered by <a href="https://2tw.in">Twin-Url</a> on Cloudflare Workers | <a href="https://2tw.in/GBnNcmic">Fork on GitHub</a></p>
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
      
      // Show loading state
      const button = form.querySelector('button');
      const originalText = button.textContent;
      button.textContent = 'Processing...';
      button.disabled = true;
      
      try {
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
            navigator.clipboard.writeText(shortUrl).then(() => showNotification('Copied to clipboard!'));
            form.reset();
          };
        }
      } catch (error) {
        messageEl.textContent = 'An error occurred. Please try again.';
      } finally {
        // Restore button state
        button.textContent = originalText;
        button.disabled = false;
      }
    });
  </script>
</body>
</html>
`;
