# How to Host Your Portfolio Live

Since you have already uploaded your code to GitHub, the easiest and best free methods to host your website are **GitHub Pages** and **Netlify**.

## Option 1: GitHub Pages (Easiest)
**Best because:** Your code is already on GitHub.

1.  **Go to your Repository** on GitHub.
2.  Click on the **Settings** tab (usually the rightmost tab in the top bar).
3.  On the left sidebar, click on **Pages** (under the "Code and automation" section).
4.  Under **Build and deployment** > **Source**, verify it is set to "Deploy from a branch".
5.  Under **Branch**, select `main` (or `master`) from the dropdown menu and ensure the folder is set to `/ (root)`.
6.  Click **Save**.
7.  Wait about 1-2 minutes. Refresh the page. You will see a banner at the top saying: "Your site is live at..." with a link (usually `https://username.github.io/repo-name/`).

## Option 2: Netlify (Recommended for Speed/Features)
**Best because:** It's often faster and updates instantly when you push code.

1.  Go to [Netlify.com](https://www.netlify.com/) and sign up (you can use your GitHub account).
2.  Once logged in, click **"Add new site"** > **"Import from existing project"**.
3.  Select **GitHub**.
4.  Authorize Netlify to access your repositories.
5.  Search for and select your portfolio repository.
6.  The default settings are usually correct (Publish directory: left empty or `/`, Build command: left empty).
7.  Click **Deploy Site**.
8.  Your site will be live in seconds initially via a random name (e.g., `optimistic-beaver-...netlify.app`).
9.  You can change the site name in **Site Settings** > **Change site name**.
