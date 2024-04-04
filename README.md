# Simple Url Shortner and redirector witn branded url using Cloudflare Workers (Link analysis with Matomo self-hosted)
A very simple fast free(within cloudflare free limit) URL shortner built on top of Cloudflare Workers and Cloudflare KV database. A 302 redirector for shortening your url at edge. Or you can use it as a link organisation and management tool. For visitors analytics you can use **Matomo** (both paid and self-hosted works). I could not make it work with Plausible or Umami. 
## How to use
### Deploy a KV database
* Go to Cloudflare workers dashboard and KV, deploy a kv namespace with a fancy name.
### Deploy Workers script
* Go to your Cloudflare Workers Dashboard and deploy a worker.
* Go to settings > variables > kv name space binding > add binding
* Variable Name = "kv" and select the namespace you just created.
* Then go to Edit code.
* Copy the workers.js and change your secret code in **line 156 and** deploy.
* Now add a domain or subdomain of you own in settings > triggers > custom domain.

## Reason behind choosing Cloudflare Workers
* 100,000 free requests daily
* 1000 free addition, modification or deletions daily.
* Fast TTFB, globally distributed so, redirect occurs very fast accross the globe
* Serverless, so no server maintenance headache

## Features Present
* A nice UI to add URL.
* Secret code to prevent unauthorised use **(Change it in line 156).**
* Go to /list to list all your redirects.
* Go to /delete and enter the path like 'VDYWckqz' and secret code to delete a redirect
* Custom 404 page. The default one is funny https://2tw.in/404. 
* You can provide custom path like https://2tw.in/techblog.
* If you don't specify a path, a random 8 digit string will be generated like https://2tw.in/VDYWckqz. There is a very very negligible chance of genaration of same string in a very very large setup.
* After short url is generated it will display that.
* Click on the short url path to copy the short url in list page
* /robots.txt gives you no index, and /manifest.json gives you Manifest.
* To add a password to your main page and list page use octauthent.

## Adding Analytics
Modify the workers.js script with with this at line 223
```
    const dest = await env.kv.get(key);
    if (dest) {
      const matomoURL = `https://your.matomo.url/matomo.php`;
      const clientIP = request.headers.get('cf-connecting-ip');
      const userAgent = request.headers.get('User-Agent');
      const userId = clientIP.replace(/\./g, '').slice(0, 16);

      const payload = new URLSearchParams();
      payload.append('idsite', '1');
      payload.append('rec', '1');
      payload.append('action_name', `Redirect/${key}`);
      payload.append('url', `https://2tw.in/${key}`);
      payload.append('_id', userId);
      payload.append('rand', Math.floor(Math.random() * 1000000000));
      payload.append('apiv', '1');
      payload.append('token_auth', 'YOUR_MATOMO_TOKEN_AUTH');
      payload.append('cip', clientIP);

      await fetch(matomoURL, {
        method: 'POST',
        body: payload.toString(),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': userAgent,
        },
      });

      return new Response('Redirecting...', {
        status: 302,
        headers: {
          'Location': dest,
        },
      });
    }
```

## Feature Not Present
* As modification of redirects is rare I didn't add UI for that, you can easily change those in Cloudflare KV dashboard.

![](https://raw.githubusercontent.com/drshounak/Really-Simple-Url-Shortner-with-cloudflare-workers/main/images/Screenshot%202024-04-03%20145409.png)
![](https://raw.githubusercontent.com/drshounak/Really-Simple-Url-Shortner-with-cloudflare-workers/main/images/Screenshot%202024-04-03%20145449.png)
![](https://raw.githubusercontent.com/drshounak/Really-Simple-Url-Shortner-with-cloudflare-workers/main/images/Screenshot%202024-04-03%20145522.png)
![](https://raw.githubusercontent.com/drshounak/Really-Simple-Url-Shortner-with-cloudflare-workers/main/images/Screenshot%202024-04-03%20145613.png)
![](https://raw.githubusercontent.com/drshounak/Really-Simple-Url-Shortner-with-cloudflare-workers/main/images/Screenshot%202024-04-03%20145644.png)
![](https://raw.githubusercontent.com/drshounak/Really-Simple-Url-Shortner-with-cloudflare-workers/main/images/Screenshot_20240403_195427_Chrome.png)


