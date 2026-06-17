import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts, formatDate, stripHtml } from "@/lib/wordpress";

export const metadata: Metadata = { title: "Blog" };

export default async function PostsPage() {
  const posts = await getAllPosts();

  if (!posts.length) {
    return (
      <div className="empty">
        <h2>No posts yet</h2>
        <p>Publish your first post in WordPress and it will appear here.</p>
      </div>
    );
  }

  return (
    <section className="section">
      <div className="container">
        <div className="section-hd">
          <h2>Blog</h2>
          <p>{posts.length} posts from WordPress.</p>
        </div>
        <div className="grid">
          {posts.map((post) => (
            <Link key={post.id} href={`/posts/${post.slug}`} className="card">
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
                  <span className="card-tag">{post.categories.nodes[0].name}</span>
                )}
                <span className="card-title">{post.title}</span>
                {post.excerpt && (
                  <p className="card-excerpt">
                    {stripHtml(post.excerpt).slice(0, 120)}…
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
      </div>
    </section>
  );
}
