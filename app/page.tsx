import Link from "next/link";
import {
  getRecentPosts,
  getAllPages,
  formatDate,
  stripHtml,
} from "@/lib/wordpress";

export default async function HomePage() {
  const [pages, posts] = await Promise.all([getAllPages(), getRecentPosts(6)]);

  // filter out the "home" page itself from the listing
  const sitePages = pages.filter((p) => p.slug !== "home");

  return (
    <>
      {/* Hero */}
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

      {/* Pages */}
      {sitePages.length > 0 && (
        <section className="section">
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

      {/* Recent posts */}
      {posts.length > 0 && (
        <section className="section" style={{ background: "var(--surface)" }}>
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
    </>
  );
}
