export default `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>404 - Twin-Url | Page Not Found</title>
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
    
    .container { 
      max-width: 600px; 
      width: 100%; 
      background: var(--bg-card); 
      padding: 3rem 2rem;
      margin: 6rem auto 4rem;
      border-radius: 12px;
      text-align: center;
      border: 1px solid var(--primary-medium);
      box-shadow: 0 8px 24px rgba(211, 44, 75, 0.15);
    }
    
    h1 {
      font-size: 5rem;
      font-weight: 700;
      background: linear-gradient(90deg, #FFFFFF 0%, #D32C4B 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 1.5rem;
      line-height: 1.2;
    }
    
    p {
      font-size: 1.1rem;
      color: var(--text-muted);
      margin-bottom: 2rem;
      max-width: 400px;
      margin-left: auto;
      margin-right: auto;
    }
    
    img {
      max-width: 200px;
      border-radius: 12px;
      margin-bottom: 2rem;
      border: 1px solid var(--primary-light);
      box-shadow: 0 4px 12px rgba(211, 44, 75, 0.15);
      transition: var(--transition);
    }
    
    img:hover {
      transform: scale(1.05);
      box-shadow: 0 8px 24px rgba(211, 44, 75, 0.2);
    }
    
    .btn { 
      background: var(--primary); 
      color: var(--text); 
      border: none; 
      padding: 1rem 1.5rem; 
      border-radius: 8px; 
      font-weight: 600; 
      font-size: 1rem;
      text-decoration: none;
      cursor: pointer; 
      transition: var(--transition);
      display: inline-block;
    }
    
    .btn:hover { 
      background: var(--primary-hover);
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(211, 44, 75, 0.25);
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
    
    @media (max-width: 768px) {
      h1 {
        font-size: 4rem;
      }
      
      .nav {
        flex-direction: column;
        gap: 1rem;
        text-align: center;
      }
      
      .container {
        padding: 2rem 1.5rem;
        margin: 3rem auto;
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

  <div class="container">
    <h1>404</h1>
    <img src="https://assets.2tw.in/TW_grumpy-cat.webp" alt="Grumpy Cat">
    <p>This link doesn't exist yet—or it's hiding. Maybe twin a new one?</p>
    <a href="/" class="btn">Back to Home</a>
  </div>

  <footer>
    <p>© 2025 Twin-Url. All rights reserved.</p>
    <p>Powered by <a href="https://2tw.in">Twin-Url</a> on Cloudflare Workers | <a href="https://2tw.in/GBnNcmic">Fork on GitHub</a></p>
  </footer>
</body>
</html>
`;
