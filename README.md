# Really-Simple-Url-Shortner
A very simple URL shortner built on top of Cloudflare Workers and Cloudflare KV database. A 302 redirector for shortening your url at edge.
## Reason behind choosing Cloudflare Workers
* 100,000 free requests daily
* 1000 free addition, modification or deletions daily.
* Fast TTFB, globally distributed so, redirect occurs very fast accross the globe
* Serverless, so no server maintenance headache

## Features Present
* A nice UI to add URL.
* Secret code to prevent unauthorised use (Change it in line 164).
* Go to /list to list all your redirects.
* You can provide custom path like https://2tw.in/techblog.
* If you don't specify a path a random 8 digit string will be generated like https://2tw.in/VDYWckqz. There is a very very negligible chance of genaration of same string in a very very large setup.
* /robots.txt gives you no index, and /manifest.json gives you Manifest.
* To add password to your main page and list page use octauthent.

## Feature Not Present
* As deletion or modification of redirects is rare I didn't add UI for that, you can easily change and delete those in Cloudflare KV dashboard.
* No analytics.

[](https://github.com/drshounak/Really-Simple-Url-Shortner/blob/main/Screenshots/Screenshot_20240403_090347_Chrome.png)
[](https://github.com/drshounak/Really-Simple-Url-Shortner/blob/main/Screenshots/Screenshot_20240403_090313_Chrome.png)

