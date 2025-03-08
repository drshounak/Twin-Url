# Twin-Url: A Simple, Fast URL Shortener and Redirector with Branded Domains

**Twin-Url** is a lightweight, serverless URL shortener built on Cloudflare Workers and Cloudflare KV. It offers a sleek UI, password protection, and optional analytics, all while leveraging Cloudflare's free tier (100,000 requests and 1,000 KV operations daily). Use it to shorten URLs, organize links, or manage redirects with ease. Twin-Url now includes advanced features like batch deletion, link modification, and a modernized interface.

- **Live Demo**: [https://2tw.in](https://2tw.in)
- **GitHub**: [Fork it here](https://2tw.in/GBnNcmic)

---

## Features

- **Simple URL Shortening**: Convert long URLs into short, branded links (e.g., `https://2tw.in/techblog`).
- **Random Path Generation**: Auto-generates unique 8-character paths (e.g., `https://2tw.in/AbCd1234`) if no custom path is specified.
- **Custom Paths**: Set your own path for memorable links.
- **Link Management UI**: Add, view, modify, and delete links via an intuitive interface.
- **Batch Deletion**: Select and delete multiple links at once.
- **Password Protection**: Secure your dashboard with a secret code (configurable in the Worker environment).
- **Analytics Support**: Optional integration with [**Matomo**](https://matomo.org/) for visitor tracking.
- **Custom 404 Page**: A fun, branded 404 page for invalid links (e.g., [https://2tw.in/404](https://2tw.in/404)).
- **Progressive Web App (PWA)**: Installable with a manifest for a native-like experience.
- **Fast & Global**: Powered by Cloudflare’s edge network for low-latency redirects worldwide.
- **SEO Control**: Blocks crawling with `/robots.txt`.
- **Clipboard Integration**: Click short URLs to copy them instantly.

---

## Why Cloudflare Workers?

- **Free Tier**: 100,000 daily requests and 1,000 KV operations at no cost.
- **Speed**: Globally distributed edge network ensures fast TTFB (Time to First Byte).
- **Serverless**: No server maintenance required.
- **Scalability**: Handles traffic spikes effortlessly.

---

## Prerequisites

- A **Cloudflare account** with access to Workers and KV.
- Basic familiarity with GitHub and command-line tools.
- (Optional) A custom domain for branded URLs.

---

## Setup Instructions

### 1. Create a KV Database

1. **Log in to Cloudflare**:
   - Go to the [Cloudflare Dashboard](https://dash.cloudflare.com/).

2. **Navigate to Workers & KV**:
   - From the left sidebar, select **Workers & Pages** > **KV**.

3. **Create a KV Namespace**:
   - Click **Create Namespace**.
   - Name it something memorable (e.g., `twin-url-links`).
   - Click **Add** to create it.
   - Note the **Namespace ID** (you’ll need it later).

### 2. Deploy the Worker

1. **Clone or Fork the Repository**:
   - Fork the GitHub repo: [https://2tw.in/GBnNcmic](https://2tw.in/GBnNcmic).
   - Clone it locally: `git clone https://github.com/your-username/twin-url.git`.

2. **Install Dependencies**:
   - Ensure you have Node.js installed.
   - Install Wrangler: `npm install -g wrangler`.
   - Log in to Cloudflare via Wrangler: `wrangler login`.

3. **Configure `wrangler.toml`**:
   - Open `wrangler.toml` in the project root.
   - Update the KV namespace binding with your Namespace ID:
     ```toml
     [[kv_namespaces]]
     binding = "KV"
     id = "YOUR_KV_NAMESPACE_ID"
     ```
   - Set a secure `SECRET_CODE` under `[vars]`:
     ```toml
      [vars]
      SECRET_CODE = "your-secret-code-here"
     ```
4. **Deploy the Worker**:
   - Run `npm run deploy` (or `wrangler deploy`).
   - Wrangler will build and deploy your Worker to Cloudflare.

5. **Attach a Custom Domain (Optional)**:
   - In the Cloudflare Workers dashboard, go to your Worker > **Triggers** > **Custom Domains**.
   - Add your domain or subdomain (e.g., `links.yourdomain.com`).
   - Ensure DNS is configured in Cloudflare for the domain.

6. **Enable GitHub Auto-Deploy (Optional)**:
   - Link your GitHub repo to Cloudflare Workers for automatic deployments on push.

## Usage

1. **Shorten a URL**:
   - Visit your Worker URL (e.g., `https://twin-url.your-worker.workers.dev/`).
   - Enter a destination URL, an optional custom path, and your secret code.
   - Click **Twin It** to generate a short URL.

2. **View All Links**:
   - Go to `/list` (e.g., `https://2tw.in/list`).
   - See all redirects, copy short URLs, or modify/delete them.

3. **Modify a Link**:
   - On the `/list` page, click **Modify** next to a link, update the destination URL, and save with your secret code.

4. **Delete Links**:
   - Click **Delete** for a single link or select multiple links and use **Batch Delete** on the `/list` page.

## Adding Analytics (Optional)

To track redirects, integrate **Matomo**:

1. **Set Up Matomo**:
   - Self-host Matomo using [CloudPanel](https://www.cloudpanel.io/docs/v2/php/applications/matomo/) or use a paid instance.
   - Note your Matomo URL (e.g., `https://your.matomo.url/matomo.php`) and `token_auth`.

2.2. **Modify the Worker**:
   - Edit `src/index.js` and add the following in the redirect logic (before the `Response`):
     ```javascript
     const dest = await env.KV.get(key);
     if (dest) {
       const matomoURL = "https://your.matomo.url/matomo.php";
       const clientIP = request.headers.get("cf-connecting-ip");
       const userAgent = request.headers.get("User-Agent");
       const userId = clientIP.replace(/\./g, "").slice(0, 16);

       const payload = new URLSearchParams();
       payload.append("idsite", "1");
       payload.append("rec", "1");
       payload.append("action_name", `Redirect/${key}`);
       payload.append("url", `https://2tw.in/${key}`);
       payload.append("_id", userId);
       payload.append("rand", Math.floor(Math.random() * 1000000000));
       payload.append("apiv", "1");
       payload.append("token_auth", "YOUR_MATOMO_TOKEN_AUTH");
       payload.append("cip", clientIP);

       // Fire-and-forget analytics request (no await)
       fetch(matomoURL, {
         method: "POST",
         body: payload.toString(),
         headers: {
           "Content-Type": "application/x-www-form-urlencoded",
           "User-Agent": userAgent,
         },
         keepalive: true,
       }).catch((error) => {
         console.error("Analytics tracking failed:", error);
       });

       // Return redirect response immediately
       return new Response("Redirecting...", {
         status: 302,
         headers: { "Location": dest },
       });
     }
     ```
        - Deploy the updated Worker.


## Development

- **Local Testing**:
  - Run `npm run dev` (or `wrangler dev`) to test locally with live reloading.

- **Contributing**:
  - Submit PRs or issues to the [GitHub repo](https://2tw.in/GBnNcmic).

## License

MIT License - Free to use, modify, and distribute.

## Powered By

- [Cloudflare Workers](https://workers.cloudflare.com/)
- [TechWeirdo](https://www.techweirdo.net)


### Quick Deploy

1. **One-Click Setup** (Easiest Method):
   - Click the button below to deploy Twin-Url directly to your Cloudflare account:
   
   [![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/drshounak/Twin-Url)
   
   - Follow the prompts to:
     - Authorize Cloudflare (if not already logged in)
     - Create a new KV namespace (automatically configured)
     - Set your `SECRET_CODE` for dashboard protection
     - Deploy the worker

2. **After Deployment**:
   - Add your custom domain through the Cloudflare dashboard
   - Start using your new URL shortener!
