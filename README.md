# AXORION website

Corporate website for AXORION: web, software, AI and automation solutions.

## Stack
- Next.js 16 (App Router, server components), React 19, TypeScript
- Tailwind CSS 4
- Resend (contact-form email), GA4 and Meta Pixel (loaded only after cookie consent)

## Pages
`/` Home (includes the AI agent demos) · `/services` · `/industries` · `/work` (Projects & AI demonstrations) · `/partner` · `/insights` · `/company` · `/contact` · `/privacy` · `/terms`

Content lives in `src/lib/site.ts` (services, projects, stack) and `src/lib/agents.ts` (scripted AI demo conversations).
The AI demos are simulated: no AI model is called and nothing is stored.

## Develop
```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev                  # http://localhost:3000
npm run lint && npm run build
```

## Environment variables
| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL (sitemap, metadata) |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp number with country code, digits only |
| `NEXT_PUBLIC_GA_ID` | GA4 measurement ID (optional) |
| `NEXT_PUBLIC_META_PIXEL_ID` | Meta Pixel ID (optional) |
| `RESEND_API_KEY` | Sends contact-form leads by email |
| `LEAD_FROM_EMAIL` / `LEAD_TO_EMAIL` | Sender (verified domain) and recipient of leads |

## Deploy (Hostinger, Node.js web app)
Build command `npm run build`, start command `npm start`, Node.js 20 or newer. Redirect `www` to the apex domain (or the reverse) so only one process runs.

## Before launch
Replace the placeholder WhatsApp number, set the Resend key, review the Privacy and Terms drafts with a legal professional, and test the contact form, WhatsApp buttons and cookie banner on the live domain.
