# Headless WordPress + Next.js Setup

## What's included

| File | Purpose |
|---|---|
| `lib/wordpress.ts` | GraphQL client + all queries (pages, posts) |
| `app/layout.tsx` | Root layout with header nav + footer |
| `app/globals.css` | All styles |
| `app/page.tsx` | Homepage — lists WP pages + recent posts |
| `app/pages/[slug]/page.tsx` | Dynamic route for every WP page |
| `app/posts/page.tsx` | Blog listing — all 11 posts |
| `app/posts/[slug]/page.tsx` | Dynamic route for every WP post |
| `next.config.ts` | Allows WP image domain |
| `.env.local` | GraphQL endpoint env var |

---

## Setup steps

### 1. Copy files into your Next.js project

Copy everything into the root of your existing Next.js project.
Your project already has `app/` and `app/globals.css` — **replace** them.

```
your-nextjs-project/
├── lib/
│   └── wordpress.ts       ← new
├── app/
│   ├── globals.css        ← replace
│   ├── layout.tsx         ← replace
│   ├── page.tsx           ← replace
│   ├── pages/
│   │   └── [slug]/
│   │       └── page.tsx   ← new
│   └── posts/
│       ├── page.tsx       ← new
│       └── [slug]/
│           └── page.tsx   ← new
├── next.config.ts         ← replace
└── .env.local             ← new
```

### 2. Add the env variable

Create (or edit) `.env.local` in your project root:

```
NEXT_PUBLIC_WORDPRESS_URL=https://blanchedalmond-bison-874584.hostingersite.com/graphql
```

### 3. Run the dev server

```bash
npm run dev
```

Visit http://localhost:3000 — your WordPress content will appear!

---

## How it works

```
Browser → Next.js (React) → WPGraphQL → WordPress DB
```

1. **`lib/wordpress.ts`** sends GraphQL POST requests to `/graphql` on your WP site.
2. Each page/post route calls the relevant query (`getAllPages`, `getPostBySlug`, etc.).
3. `next: { revalidate: 60 }` on each fetch means pages are rebuilt from WP every 60 seconds (ISR), so the site stays fast without needing a full rebuild when you publish content.

## URL structure

| URL | Content |
|---|---|
| `/` | Homepage with all pages + recent posts |
| `/pages/about` | Your WordPress "About" page |
| `/pages/services` | Your WordPress "Services" page |
| `/pages/gallery` | Your WordPress "Gallery" page |
| `/pages/contact` | Your WordPress "Contact" page |
| `/posts` | All 11 blog posts |
| `/posts/your-post-slug` | Individual post |

## Troubleshooting

**GraphQL returns errors?**
- Log into WordPress → WPGraphQL → Settings → make sure "Public Introspection" is enabled.

**Images not loading?**
- The `next.config.ts` already allows your Hostinger domain. If you change domains, update `hostname` in that file.

**Page not found for a WP page?**
- Check the slug in WordPress (Pages → Edit → Permalink). The slug in the URL must match exactly.
