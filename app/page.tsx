import Link from "next/link";
import {
  getRecentPosts,
  getAllPages,
  formatDate,
  stripHtml,
} from "@/lib/wordpress";

export default async function HomePage() {
  const [pages, posts] = await Promise.all([getAllPages(), getRecentPosts(6)]);
  const sitePages = pages.filter((p) => p.slug !== "home");

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="hero">
        <div className="container">
          <h1>
            Content from WordPress,
            <br />
            speed from Next.js.
          </h1>
          <p>
            All pages and posts are pulled live from your WordPress GraphQL API
            and rendered as a blazing-fast React app.
          </p>
          <div className="btn-row">
            <Link href="/posts" className="btn btn-primary">
              Read the blog →
            </Link>
            <Link href="/about" className="btn btn-ghost">
              About us
            </Link>
          </div>
        </div>
      </section>

      {/* ── How it works ──────────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="section-hd">
            <p className="section-label">Architecture</p>
            <h2>How headless WordPress works</h2>
            <p>
              The content lives in WordPress. The front-end is entirely yours —
              built with React, served from the edge.
            </p>
          </div>
          <div className="how-grid">
            {[
              {
                n: "01",
                title: "Author in WordPress",
                body: "Write pages and posts in the familiar WP editor. All data is stored in the WP database.",
              },
              {
                n: "02",
                title: "WPGraphQL exposes data",
                body: "The WPGraphQL plugin adds a /graphql endpoint that speaks the GraphQL query language.",
              },
              {
                n: "03",
                title: "Next.js fetches it",
                body: "Server components query GraphQL at build or request time and render pure HTML.",
              },
              {
                n: "04",
                title: "Users get speed",
                body: "Pages are statically generated and served from a CDN edge — no PHP, no page-builder overhead.",
              },
            ].map((step) => (
              <div key={step.n} className="how-step">
                <span className="step-num">{step.n}</span>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-body">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why headless (image + copy) ───────────────────────────────── */}
      <section className="section section-alt">
        <div className="container">
          <div className="split-row">
            <img
              src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=900&q=80&auto=format&fit=crop"
              alt="Code editor showing a modern web project"
              className="split-img"
            />
            <div className="split-copy">
              <p className="section-label">Why headless?</p>
              <h2>The best of both worlds</h2>
              <p>
                WordPress is the world's most mature CMS. Next.js is the fastest
                way to ship React on the web. Headless architecture lets you use
                both — content editors keep the tools they know while developers
                get a modern, unconstrained front-end stack.
              </p>
              <div className="btn-row">
                <Link href="/posts" className="btn btn-primary">
                  Read the blog →
                </Link>
                <Link href="/about" className="btn btn-ghost">
                  Learn more
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Tech stack pills ──────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="section-hd">
            <p className="section-label">Stack</p>
            <h2>Everything you need, nothing you don't</h2>
            <p>
              A minimal, production-ready stack. Every piece has a clear job.
            </p>
          </div>
          <div className="tech-row">
            {[
              {
                bg: "#000",
                color: "#fff",
                abbr: "N",
                label: "Next.js 15 — App Router",
              },
              {
                bg: "#21759b",
                color: "#fff",
                abbr: "W",
                label: "WordPress — headless CMS",
              },
              {
                bg: "#e535ab",
                color: "#fff",
                abbr: "G",
                label: "WPGraphQL — data API",
              },
              {
                bg: "#3178c6",
                color: "#fff",
                abbr: "T",
                label: "TypeScript — type safety",
              },
              {
                bg: "#f97316",
                color: "#fff",
                abbr: "V",
                label: "Vercel — edge deployment",
              },
            ].map((t) => (
              <div key={t.label} className="tech-pill">
                <span
                  className="tech-icon"
                  style={{ background: t.bg, color: t.color }}
                >
                  {t.abbr}
                </span>
                {t.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Site pages ────────────────────────────────────────────────── */}
      {sitePages.length > 0 && (
        <section className="section section-alt">
          <div className="container">
            <div className="section-hd">
              <h2>Site Pages</h2>
              <p>{sitePages.length} pages pulled directly from WordPress.</p>
            </div>
            <div className="grid">
              {sitePages.map((page) => (
                <Link key={page.id} href={`/${page.slug}`} className="card">
                  {page.featuredImage ? (
                    <img
                      src={page.featuredImage.node.sourceUrl}
                      alt={page.featuredImage.node.altText || page.title}
                      className="card-thumb"
                    />
                  ) : (
                    <div className="card-placeholder">📄</div>
                  )}
                  <div className="card-body">
                    <span className="card-tag">Page</span>
                    <span className="card-title">{page.title}</span>
                    {page.excerpt && (
                      <p className="card-excerpt">
                        {stripHtml(page.excerpt).slice(0, 110)}…
                      </p>
                    )}
                    <span className="card-cta">Visit page →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Recent posts ──────────────────────────────────────────────── */}
      {posts.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="section-hd">
              <h2>Latest Posts</h2>
              <p>Your {posts.length} most-recent WordPress posts.</p>
            </div>
            <div className="grid">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/posts/${post.slug}`}
                  className="card"
                >
                  {post.featuredImage ? (
                    <img
                      src={post.featuredImage.node.sourceUrl}
                      alt={post.featuredImage.node.altText || post.title}
                      className="card-thumb"
                    />
                  ) : (
                    <div className="card-placeholder">📝</div>
                  )}
                  <div className="card-body">
                    {post.categories?.nodes[0] && (
                      <span className="card-tag">
                        {post.categories.nodes[0].name}
                      </span>
                    )}
                    <span className="card-title">{post.title}</span>
                    {post.excerpt && (
                      <p className="card-excerpt">
                        {stripHtml(post.excerpt).slice(0, 110)}…
                      </p>
                    )}
                    <div className="card-meta">
                      {formatDate(post.date)}
                      {post.author?.node.name && ` · ${post.author.node.name}`}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div style={{ textAlign: "center", paddingTop: "2rem" }}>
              <Link href="/posts" className="btn btn-ghost">
                View all posts →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── CTA strip ─────────────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="cta-strip">
            <div className="cta-text">
              <h2>Ready to go headless?</h2>
              <p>
                All the source code for this demo is open. Clone it, point it at
                your own WordPress install, and you're live.
              </p>
            </div>
            <div className="btn-row">
              <a
                href="https://github.com/shihabiiuc/wp_next_headless"
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary"
              >
                View on GitHub →
              </a>
              <Link href="/posts" className="btn btn-ghost">
                Read the guide
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
