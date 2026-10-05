# e-ctgroup.co.uk

Static website for E-CT Group Ltd. Plain HTML and CSS, no build step, no dependencies.

## Deploy to Vercel

**Option A: GitHub (recommended, so every change redeploys automatically)**
1. Create a new GitHub repository and upload the contents of this folder (not the folder itself) to it.
2. In Vercel, choose **Add New → Project** and import the repository.
3. Framework preset: **Other**. Leave the build command and output directory empty.
4. Click **Deploy**.

**Option B: Vercel CLI**
1. Install Node.js, then run `npm i -g vercel`.
2. In this folder, run `vercel` and follow the prompts, then `vercel --prod`.

## Connect the domain
1. In the Vercel project, go to **Settings → Domains** and add `e-ctgroup.co.uk` and `www.e-ctgroup.co.uk`.
2. Set `www` to redirect to `e-ctgroup.co.uk`.
3. Add the DNS records Vercel shows you at your domain registrar. HTTPS is set up automatically.
4. If you register lookalike domains (ect-group.co.uk, ectgroup.co.uk, e-ct-group.co.uk), add each one to the same project and set it to redirect to `e-ctgroup.co.uk`.

## What's included
| Path | What it is |
| --- | --- |
| `index.html` | The home page |
| `privacy.html` | Privacy notice, served at `/privacy` |
| `404.html` | Page shown for broken links |
| `assets/site.css` | Styles and self-hosted font declarations |
| `assets/site.js` | Enquiry form and mobile menu behaviour |
| `api/enquiry.js` | Sends enquiry form submissions to team@e-ctgroup.co.uk via Resend |
| `assets/fonts/` | Manrope and JetBrains Mono (SIL Open Font License) |
| `assets/img/` | Logos, product logos and the social sharing image |
| `favicon.svg`, `favicon-32.png`, `apple-touch-icon.png`, `icon-512.png`, `site.webmanifest` | Browser and home-screen icons |
| `robots.txt`, `sitemap.xml` | Search engine files |
| `vercel.json` | Clean URLs, security headers and font caching |

## Good to know
- **The enquiry form emails team@e-ctgroup.co.uk** through `api/enquiry.js`, a Vercel function that sends via [Resend](https://resend.com). Nothing is stored on the website. If sending fails, the form falls back to opening the visitor's email app. To set it up:
  1. Create a Resend account, add the domain `e-ctgroup.co.uk` under **Domains**, and add the DNS records it shows at IONOS. Wait until the domain shows as verified.
  2. Create an API key in Resend (sending access is enough).
  3. In Vercel, go to **Settings → Environment Variables** and add `RESEND_API_KEY` (the key) and `ENQUIRY_FROM` (for example `E-CT Group website <website@e-ctgroup.co.uk>`). Then redeploy.
  4. Send a test enquiry from the live site and check it arrives. Replying to the email replies to the visitor.
- **No cookies, analytics or third-party requests.** Fonts and images are served from the site itself. If you add analytics later, update `privacy.html` and the Content-Security-Policy in `vercel.json`.
- **Security headers** in `vercel.json` block the site from being framed and only allow scripts, styles and fonts from the site itself. If something you add stops working, check the browser console for a Content-Security-Policy message.
- **Before going live**, have the privacy notice reviewed, and add your ICO registration number to the footer once you have it.
