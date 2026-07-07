# Tushar Creates — Art Portfolio

A free, no-backend portfolio site for Tushar Parcha's graphite, charcoal, and pen art. React + Vite + Tailwind CSS v4 + Framer Motion, deployed as a static site on Cloudflare Pages.

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build   # outputs to dist/
npm run preview # serve the production build locally
```

## Deploy (Cloudflare Pages, free)

1. Create a GitHub repo and push this project to it:
   ```bash
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
2. Edit `.env` and set `VITE_GITHUB_OWNER` / `VITE_GITHUB_REPO` to match that repo (commit the change).
3. In the [Cloudflare dashboard](https://dash.cloudflare.com/) → Workers & Pages → Create → Pages → Connect to Git → pick the repo.
4. Build settings:
   - Build command: `npm run build`
   - Build output directory: `dist`
5. Deploy. Every push to `main` (including admin uploads) auto-redeploys.

## Content

Artwork lives in `src/data/artworks.json`; images live in `public/images/`. Each entry:

```json
{
  "id": "old-man",
  "title": "Old Man",
  "category": "Graphite Portraits",
  "medium": "Graphite on paper",
  "description": "...",
  "image": "/images/old-man.jpg",
  "featured": true
}
```

You can add new pieces by editing this file + adding an image directly on GitHub, or use the admin panel below.

## Admin panel (`/admin`)

There's no traditional login server — a real "Sign in with GitHub" button needs a backend to keep an OAuth secret safe, which would break the zero-backend/zero-cost setup. Instead:

1. Create a [fine-grained GitHub personal access token](https://github.com/settings/personal-access-tokens/new) scoped to **only this repo**, with **Contents: Read and write** permission, and a short expiry (e.g. 90 days).
2. Go to `https://<your-site>/admin`, paste the token in.
3. Fill in the image, title, category, medium, and description, then **Publish artwork**.
4. This commits the image to `public/images/` and updates `src/data/artworks.json` directly on `main`. Cloudflare Pages redeploys automatically in ~30–60 seconds.

The token is kept only in this browser tab's session storage and is only ever sent to `api.github.com` — never to any third party. Re-generate/revoke it any time from GitHub's token settings.

## Contact channels

WhatsApp, call, email, and Instagram links are centralized in `src/data/contact.js`.
