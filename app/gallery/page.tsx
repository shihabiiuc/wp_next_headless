import type { Metadata } from "next";
import { getPageBySlug } from "@/lib/wordpress";
import { notFound } from "next/navigation";
import GalleryGrid from "@/components/GalleryGrid";

export const metadata: Metadata = { title: "Gallery" };

// Parse all <img> tags out of WP gallery HTML
function parseGalleryImages(html: string) {
  const imgTags = html.match(/<img[^>]+>/g) || [];

  return imgTags
    .map((tag) => {
      const src = tag.match(/\bsrc="([^"]+)"/)?.[1] ?? "";
      const srcset = tag.match(/\bsrcset="([^"]+)"/)?.[1] ?? "";
      const alt = tag.match(/\balt="([^"]*)"/)?.[1] || "Gallery image";
      return { src, srcset, alt };
    })
    .filter((img) => img.src !== "");
}

export default async function GalleryPage() {
  const page = await getPageBySlug("gallery");
  if (!page) notFound();

  const images = parseGalleryImages(page.content);

  return (
    <main>
      {/* Hero */}
      <section className="gl-hero">
        <div className="container">
          <h1>Gallery</h1>
          <p>{images.length} photographs</p>
        </div>
      </section>

      {/* Grid — client component for lightbox */}
      <section className="gl-section container">
        <GalleryGrid images={images} />
      </section>
    </main>
  );
}
