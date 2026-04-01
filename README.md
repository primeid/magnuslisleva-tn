# MagnusLisleva.tn

Static Astro site for `MagnusLisleva.tn`.

Site design inspired by [Robin Rendle](https://robinrendle.com/).

## Commands

```bash
npm install
npm run dev
npm run build
```

## Content workflow

Each entry gets a single Markdown file, and its media lives in a matching folder under `public/media/`.

```text
src/content/texts/my-entry.md
src/content/creations/my-project.md
public/media/my-entry/cover.jpg
```

Add a new text:

1. Create a Markdown file in `src/content/texts/`.
2. Use the slug-style filename you want in the URL, for example `my-entry.md`.
3. Put any images in `public/media/<slug>/` and reference them with paths like `/media/my-entry/example.jpg`.

Add a new creation:

1. Create a Markdown file in `src/content/creations/`.
2. Use the `creationType` field to choose `music`, `podcast`, `video`, `photo`, `app`, `other`, or `event`.
3. Add `externalUrl`, `embedUrl`, `stack`, `cover`, and `gallery` only when relevant.

## Newsletter

Set `mailchimpAction` in `src/site.config.ts` to your Mailchimp form action URL.

## Next infra step

For the Debian LXC deployment target, the clean first version is:

1. Build static files with `npm run build`.
2. Serve `dist/` through `nginx` or `caddy`.
3. Add GitHub Actions once the container exists.

## GitHub Actions

The repository includes:

- `.github/workflows/ci.yml` for build and verification on every push to `main`
- `.github/workflows/deploy-manual.yml` for manual SSH deployment once the LXC target is ready

## Deployment secrets

Set these repository secrets when the LXC target is ready:

- `DEPLOY_HOST`: MagicDNS name or IP of the LXC
- `DEPLOY_USER`: SSH user on the LXC
- `DEPLOY_SSH_KEY`: private key for deploy access
- `DEPLOY_PORT`: optional, defaults to `22`
- `DEPLOY_PATH`: optional, defaults to `/var/www/magnuslisleva-tn`
- `DEPLOY_RELOAD_COMMAND`: optional command such as `sudo systemctl reload nginx`
