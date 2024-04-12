# Twin-Url: A simple, fast Url Shortner and redirector with branded domain using Cloudflare Workers (Password Protection and Analytics supported)
A very simple, fast, free(within cloudflare free limit) URL shortner built on top of Cloudflare Workers and Cloudflare KV database. You can use it as a link organiser and management tool too. For visitors/redirection analytics you can use [**Matomo**](https://matomo.org/) (both paid and self-hosted works). And to password protect you link list page and main ui you can use [Octauthent](https://octauthent.com/)

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
* You can set custom path like https://2tw.in/techblog.
* Or,if you don't specify a path, a random 8 digit string will be generated like https://2tw.in/VDYWckqz. There is a very very negligible chance of genaration of same string in a very very large setup.
* After a short url is generated it will display the generated url.
* Click on the short url path to copy the short url on list page
* /robots.txt: crawling is blocked

## Adding Analytics
Modify the workers.js script with this matomo code at line 223. The easiest way to self-host matomo is through [CloudPanel](https://www.cloudpanel.io/docs/v2/php/applications/matomo/). This will slow down redirection for locations physically far from your matomo server. If you use analytics try proxying matomo through cdn with good peering (like Cloudflare with Argo or Bunny).
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
* As modification of redirects is rare, I didn't add UI for that, you can easily change your redirect url by going to you kv dashboard and your kv database.

## Screenshots 
![](https://raw.githubusercontent.com/drshounak/Really-Simple-Url-Shortner-with-cloudflare-workers/main/images/Screenshot%202024-04-03%20145409.png)
![](https://raw.githubusercontent.com/drshounak/Really-Simple-Url-Shortner-with-cloudflare-workers/main/images/Screenshot%202024-04-03%20145449.png)
![](https://raw.githubusercontent.com/drshounak/Really-Simple-Url-Shortner-with-cloudflare-workers/main/images/Screenshot%202024-04-03%20145522.png)
![](https://raw.githubusercontent.com/drshounak/Really-Simple-Url-Shortner-with-cloudflare-workers/main/images/Screenshot%202024-04-03%20145613.png)
![](https://raw.githubusercontent.com/drshounak/Really-Simple-Url-Shortner-with-cloudflare-workers/main/images/Screenshot%202024-04-03%20145644.png)
![](https://raw.githubusercontent.com/drshounak/Really-Simple-Url-Shortner-with-cloudflare-workers/main/images/Screenshot_20240403_195427_Chrome.png)


