# Really-Simple-Url-Shortner
A very simple URL shortner built on top of Cloudflare Workers and Cloudflare KV database. A 302 redirector for shortening your url at edge.
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
* You can provide custom path like https://2tw.in/techblog.
* If you don't specify a path, a random 8 digit string will be generated like https://2tw.in/VDYWckqz. There is a very very negligible chance of genaration of same string in a very very large setup.
* After short url is generated it will display that.
* Click on the short url path to copy the short url in list page
* /robots.txt gives you no index, and /manifest.json gives you Manifest.
* To add a password to your main page and list page use octauthent.

## Feature Not Present
* As modification of redirects is rare I didn't add UI for that, you can easily change those in Cloudflare KV dashboard.
* No analytics. (I don't know how to add one)

![](https://github.com/drshounak/Really-Simple-Url-Shortner-with-cloudflare-workers/blob/main/images/Screenshot%202024-04-03%20156409.png)
![](https://github.com/drshounak/Really-Simple-Url-Shortner-with-cloudflare-workers/blob/main/images/Screenshot%202024-04-03%20156449.png)
![](https://github.com/drshounak/Really-Simple-Url-Shortner-with-cloudflare-workers/blob/main/images/Screenshot%202024-04-03%20156522.png)
![](https://github.com/drshounak/Really-Simple-Url-Shortner-with-cloudflare-workers/blob/main/images/Screenshot%202024-04-03%20156613.png)
![](https://github.com/drshounak/Really-Simple-Url-Shortner-with-cloudflare-workers/blob/main/images/Screenshot%202024-04-03%20156644.png)


