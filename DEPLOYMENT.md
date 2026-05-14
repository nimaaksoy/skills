# Deployment

The site is a static export from Next.js. Build output lives in `web/out/`. Any static host works. Cloudflare Pages is the default; Vercel and Netlify are documented below.

## Build locally

```sh
npm install
npm run build      # validates skills, builds index, exports the site
ls web/out         # confirm static HTML/CSS/JS in the output directory
```

The repo is a single workspace. The `build` script chains:

1. `npm run validate` — checks every `skills/**/SKILL.md`
2. `npm run build-index` — writes `web/public/skills.json`, `web/public/categories.json`, and per-skill zips into `web/public/zips/`
3. `npm --prefix web run build` — Next.js static export to `web/out/`

## Domain: skills.nimaaksoy.com

Whatever host you pick, point a CNAME to it.

- Apex domain: use the host's recommended `ALIAS`/`ANAME` (Cloudflare's flattened CNAME, Netlify's `NETLIFY` value, Vercel's apex IPs).
- Subdomain `skills.nimaaksoy.com`: a CNAME to the platform target.

## Cloudflare Pages (default)

The `deploy.yml` workflow uses [`cloudflare/pages-action@v1`](https://github.com/cloudflare/pages-action).

Repo settings:
- **Project name**: `skills-nimaaksoy-com`
- **Build command**: `npm run build`
- **Build output directory**: `web/out`
- **Root directory**: `/`
- **Node version**: 22

GitHub repository secrets required:
- `NIMA_CLOUDFLARE_TOKEN` — API token with `Account.Cloudflare Pages: Edit`
- `NIMA_CLOUDFLARE_ACCOUNT_ID` — your CF account id

Custom domain: Pages dashboard → Project → Custom domains → add `skills.nimaaksoy.com`. Cloudflare provisions the certificate.

## Vercel (alternative)

Uncomment the Vercel block in `.github/workflows/deploy.yml` and remove the Cloudflare block.

Vercel project settings:
- **Framework preset**: Next.js
- **Root directory**: `web`
- **Build command**: `cd .. && npm run build`
- **Output directory**: `out`
- **Install command**: `cd .. && npm install`
- **Node version**: 22

Repo secrets:
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

Custom domain: Project Settings → Domains → add `skills.nimaaksoy.com`.

## Netlify (alternative)

Uncomment the Netlify block in `.github/workflows/deploy.yml`.

Netlify build settings (or `netlify.toml`):

```toml
[build]
  base = "/"
  command = "npm run build"
  publish = "web/out"
[build.environment]
  NODE_VERSION = "22"
```

Repo secrets:
- `NETLIFY_AUTH_TOKEN`
- `NETLIFY_SITE_ID`

Custom domain: Site settings → Domain management → add `skills.nimaaksoy.com`.

## Environment variables

None required at build or runtime. The site reads only `web/public/skills.json` and `web/public/categories.json`, both produced from the repo at build time. There is no backend.

## Rolling back

Each commit on `main` is a deploy. Roll back by:

- **Cloudflare Pages**: dashboard → Deployments → previous deploy → Rollback.
- **Vercel**: dashboard → Deployments → promote a previous deployment.
- **Netlify**: dashboard → Deploys → publish a previous deploy.

Or push a revert commit on `main`.
