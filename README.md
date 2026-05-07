# Threat Labs

Threat Labs is a minimalist cybersecurity education website for everyday internet users, students, and beginners. It teaches practical online safety habits through short lessons and small client-side interactive labs.

The site is built as a static Vite/React app. It does not require a backend, authentication, or a database.

## What It Teaches

- Common cyber threats and simple defenses
- How to recognize phishing messages
- Basic network and data privacy concepts
- Password strength habits through a local-only Password Lab
- Two-factor authentication and safer account protection
- A final review checklist and beginner quiz

## Pages

- **Home**: Overview of Threat Labs and learning modules
- **Threats**: Malware, scams, credential theft, breaches, unsafe downloads, and public Wi-Fi risks
- **Phishing**: Warning signs and an interactive phishing detector
- **Networks & Data**: Beginner-friendly explanation of web requests, DNS, HTTPS, cookies, and public networks
- **Password Lab**: Local-only password strength estimate with suggestions and badges
- **2FA**: Comparison of SMS, authenticator apps, hardware keys, and passkeys
- **Review**: Cyber hygiene checklist and quiz

## Privacy and Security

Threat Labs is intentionally static and privacy-preserving.

- No backend
- No authentication
- No database
- No analytics around password input
- No password breach API
- No password storage
- No password logging
- No password transmission

The Password Lab runs entirely in the browser. Password input is held only in React state while the page is open and is used only for local educational scoring. The tool is an estimate, not a guarantee of password security.

The theme preference may be saved in `localStorage`, but password values are never saved there.

## Tech Stack

- React
- Vite
- TypeScript
- CSS
- `lucide-react` for icons

## Project Structure

```text
src/
  app/
    App.tsx
    components/
      learning/
      Layout.tsx
      ModuleCard.tsx
      PageHeader.tsx
      InfoCard.tsx
    pages/
  styles/
    index.css
    site.css
```

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

The production build is generated in:

```text
dist/
```

## Static Hosting

This project can be hosted as a static site on services like Vercel, AWS Amplify, Netlify, Cloudflare Pages, or S3 plus CloudFront.

Recommended build settings:

```text
Build command: npm run build
Output directory: dist
```

Because the app uses client-side routing, configure the host to rewrite unknown routes to `index.html`.

For Vercel, the Vite preset usually handles this automatically.

For AWS Amplify, use a rewrite similar to:

```text
Source address: </^[^.]+$|\.(?!(css|gif|ico|jpg|js|png|txt|svg|woff|woff2|ttf|map|json)$)([^.]+$)/>
Target address: /index.html
Type: 200 (Rewrite)
```

## Design Direction

Threat Labs uses a restrained editorial visual system:

- Off-white and charcoal foundation
- Clean dark mode palette
- One muted green accent
- No gradients
- No neon cyberpunk styling
- No hacker imagery
- Generous spacing
- Responsive layouts for desktop, tablet, and mobile

## Development Notes

- Keep interactive features client-side.
- Do not add a backend for password analysis.
- Do not send password input to any API.
- Do not store password input in `localStorage`, `sessionStorage`, cookies, logs, or analytics.
- Keep examples defensive and educational.
- Use fake safe domains such as `example.com` for phishing examples.

## Verification

Run a production build before deploying:

```bash
npm run build
```

If the build passes, the contents of `dist/` are ready to deploy as a static site.
