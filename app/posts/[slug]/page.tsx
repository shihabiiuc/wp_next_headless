import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, getPostBySlug, formatDate, stripHtml } from "@/lib/wordpress";

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Post not found" };
  return {
    title: post.title,
    description: stripHtml(post.excerpt).slice(0, 160),
  };
}

export default async function PostRoute(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article>
      {/* Hero */}
      <div className="single-hero">
        <div className="container">
          <Link href="/posts" className="back">← All posts</Link>
          <h1>{post.title}</h1>
          <div className="single-meta">
            <span>{formatDate(post.date)}</span>
            {post.author?.node.name && <span>by {post.author.node.name}</span>}
            {post.categories?.nodes.map((c) => (
              <span key={c.slug} style={{ color: "var(--accent)" }}>{c.name}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="single-body">
        <div className="container">
          {post.featuredImage && (
            <img
              src={post.featuredImage.node.sourceUrl}
              alt={post.featuredImage.node.altText || post.title}
              className="featured-img"
            />
          )}
          <div
            className="wp-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </div>
    </article>
  );
}
