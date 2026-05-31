# magnuslislevatn.com

Static Astro site in hybrid mode for `magnuslislevatn.com`.

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

The blog uses **Buttondown** for the mailing list.
Subscribers are registered securely via the server-side API endpoint `/api/subscribe` without exposing your API token to the client.

To configure the newsletter:
1. Store your Buttondown API key in Fly.io secrets as `BUTTONDOWN_API_KEY`.
2. Use the provided `buttondown-email-template.html` design in your Buttondown custom template settings to match the blog's theme.

## Deployment on Fly.io

The application runs in **hybrid** SSR mode on **Fly.io** using Node.js.
It is automatically built and deployed on every push to `main` via GitHub Actions.

### Setup and Manual Deploy

1. Make sure you have `flyctl` installed:
   ```bash
   curl -L https://fly.io/install.sh | sh
   ```
2. Deploy the application:
   ```bash
   fly deploy
   ```

### GitHub Actions

The repository includes:
- `.github/workflows/ci.yml` for build and code verification on every push to `main`.
- `.github/workflows/deploy.yml` for automatic Fly.io deployment on every push to `main`.

### Deployment secrets

Set the following secret in your GitHub repository's **Secrets and variables > Actions**:
- `FLY_API_TOKEN`: Your Fly.io access token.
