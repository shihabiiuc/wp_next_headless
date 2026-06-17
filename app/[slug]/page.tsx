import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getAllPages, getPageBySlug, formatDate } from "@/lib/wordpress";

// Pre-generate all known WP page slugs at build time
export async function generateStaticParams() {
  const pages = await getAllPages();
  return pages.map((p) => ({ slug: p.slug }));
}

// Generate <title> per page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPageBySlug(slug);
  if (!page) return { title: "Page not found" };
  return { title: page.title };
}

export default async function PageRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = await getPageBySlug(slug);
  if (!page) notFound();

  return (
    <article>
      {/* Hero */}

      <div className="single-hero">
        <div className="container">
          <Link href="/" className="back">
            ← Home
          </Link>
          <h1>{page.title}</h1>
          <div className="single-meta">
            <span>Last updated {formatDate(page.modified)}</span>
          </div>
        </div>
      </div>
      {/* Body */}
      <div className="single-body">
        <div className="container">
          {page.featuredImage && (
            <img
              src={page.featuredImage.node.sourceUrl}
              alt={page.featuredImage.node.altText || page.title}
              className="featured-img"
            />
          )}
          {/* dangerouslySetInnerHTML is intentional: WP returns trusted HTML */}
          <div
            className="wp-content"
            dangerouslySetInnerHTML={{ __html: page.content }}
          />
        </div>
      </div>
    </article>
  );
}
