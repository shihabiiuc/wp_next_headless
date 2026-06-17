"use client";

import { useState, useEffect, useCallback } from "react";

type GalleryImage = {
  src: string;
  srcset: string;
  alt: string;
};

export default function GalleryGrid({ images }: { images: GalleryImage[] }) {
  const [active, setActive] = useState<number | null>(null);

  const close = useCallback(() => setActive(null), []);

  const prev = useCallback(() => {
    setActive((i) =>
      i === null ? null : (i - 1 + images.length) % images.length,
    );
  }, [images.length]);

  const next = useCallback(() => {
    setActive((i) => (i === null ? null : (i + 1) % images.length));
  }, [images.length]);

  // Keyboard navigation
  useEffect(() => {
    if (active === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [active, close, prev, next]);

  // Lock body scroll when lightbox open
  useEffect(() => {
    document.body.style.overflow = active !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [active]);

  return (
    <>
      {/* Masonry grid */}
      <div className="gl-grid">
        {images.map((img, i) => (
          <button
            key={img.src}
            className="gl-item"
            onClick={() => setActive(i)}
            aria-label={`Open image ${i + 1}`}
          >
            <img
              src={img.src}
              srcSet={img.srcset}
              alt={img.alt}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              loading="lazy"
            />
            <div className="gl-item__overlay">
              <span>View</span>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {active !== null && (
        <div
          className="lb-backdrop"
          onClick={close}
          role="dialog"
          aria-modal="true"
        >
          {/* Stop click inside image area from closing */}
          <div className="lb-content" onClick={(e) => e.stopPropagation()}>
            <img
              src={images[active].src}
              srcSet={images[active].srcset}
              alt={images[active].alt}
              sizes="90vw"
              className="lb-img"
            />
            <div className="lb-meta">
              {active + 1} / {images.length}
            </div>
          </div>

          {/* Controls */}
          <button className="lb-close" onClick={close} aria-label="Close">
            ✕
          </button>
          <button
            className="lb-prev"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Previous"
          >
            ‹
          </button>
          <button
            className="lb-next"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="Next"
          >
            ›
          </button>
        </div>
      )}
    </>
  );
}
