export default `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>404 - Twin-Url</title>
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
      justify-content: center; 
      padding: 2rem; 
    }
    header { text-align: center; margin-bottom: 2rem; }
    h1 { font-size: 2.5rem; font-weight: 600; color: #fff; }
    header p { font-size: 1.1rem; color: #8b5cf6; margin-top: 0.5rem; }
    .container { text-align: center; }
    h2 { font-size: 3rem; font-weight: 600; color: #fff; margin-bottom: 1rem; }
    p { font-size: 1rem; color: #8b949e; margin-bottom: 1.5rem; }
    img { max-width: 200px; border-radius: 8px; margin-bottom: 1.5rem; }
    a { 
      background: #D32C4B; 
      color: #fff; 
      padding: 0.75rem 1.5rem; 
      border-radius: 6px; 
      text-decoration: none; 
      font-weight: 500; 
      transition: background 0.2s; 
    }
    a:hover { background: #a78bfa; }
    footer { margin-top: auto; padding: 1rem; font-size: 0.8rem; color: #f5f5f5; text-align: center; }
    footer a { color: #D32C4B; text-decoration: none; background: none; }
    footer a:hover { color: #a78bfa; }
  </style>
</head>
<body>
  <header>
    <h1>Twin-Url</h1>
    <p>Transform long URLs into sleek Twins. Shorten, shine, succeed.</p>
  </header>
  <div class="container">
    <h2>404</h2>
    <img src="https://assets.2tw.in/TW_grumpy-cat.webp" alt="Grumpy Cat">
    <p>This link doesn’t exist yet—or it’s hiding. Maybe twin a new one?</p>
    <a href="/">Back to Home</a>
  </div>
  <footer>
    Powered by <a href="https://2tw.in">Twin-Url</a> on Cloudflare Workers | <a href="https://2tw.in/GBnNcmic">Fork on GitHub</a>
  </footer>
</body>
</html>
`;
