# Hostinger SPA Deployment Guide - The Tailored Tail

Follow these easy steps to host your newly redesigned React/Vite website on your **Hostinger** server.

---

## Step 1: Build the Site Locally

Run the compiler script to compress and minify your TypeScript code into high-speed static assets. Open your terminal in the project directory and invoke:

```bash
npm run build
```

This compiles your code and outputs all hostable assets into a new folder called `/dist`.

Inside `/dist`, you will find:
* `index.html` (main entering page)
* `assets/` (compiled javascript hooks and minified tailwind stylings)
* `.htaccess` (copied automatically from our `/public` directory to preserve BrowserRouter paths)

---

## Step 2: Access Hostinger File Manager or FTP

You can upload your files either through Hostinger hPanel's web-based File Manager, or using an FTP client like **FileZilla**.

### Option A: Hostinger hPanel File Manager (Recommended)
1. Log in to your **Hostinger hPanel**.
2. Go to **Websites** and click **Manage** next to your domain.
3. Search for **File Manager** and click it to open the directory explorer.
4. Double-click the **`public_html`** folder (this is the public-facing root directory of your website).

### Option B: FTP Client (FileZilla)
1. In hPanel, search for **FTP Accounts** to retrieve your Host Name, Username, and Password.
2. Open **FileZilla** and enter these credentials to connect.
3. Navigate to **`public_html`** on the remote server window (right panel).

---

## Step 3: Upload Compiled Dist Files

1. If there is an existing default `default.html` or old Squarespace static files inside your `public_html` folder, delete them or backing them up first to clean the slate.
2. Drag and drop **the entire CONTENTS of the `/dist` folder** (not the `/dist` directory folder itself, just the files and folders *inside* it) directly into **`public_html`**.
3. Confirm that `.htaccess` is present inside `public_html/` alongside `index.html` and the `assets/` folder.

---

## Step 4: Verification of BrowserRouter Clean URLs

Because we utilized clean URL mapping (`BrowserRouter` on React Router), refreshing a page on `yourdomain.com/services` normally yields an Apache *404 Not Found* error unless the server redirects to the main single-page index file.

Our `.htaccess` contains the following routing directives:
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

This rewrite rule automatically captures any dynamic path (like `/services`, `/contact`, `/book-now`) and serves `index.html` silently so that your React script handles the view smoothly without breaking or showing a 404 error!

---

Congratulations! Your cute and high-converting pet grooming site is now live on Hostinger! 🎉
