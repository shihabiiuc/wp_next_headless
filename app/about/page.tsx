import { getPageBySlug } from "@/lib/wordpress";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "About" };

// ── Data extracted from WP content ───────────────────────
const BUY_LINKS = [
  { label: "Amazon", href: "#" },
  { label: "Audible", href: "#" },
  { label: "Barnes & Noble", href: "#" },
  { label: "Apple Books", href: "#" },
  { label: "Bookshop.org", href: "#" },
  { label: "Spotify", href: "#" },
  { label: "BAM!", href: "#" },
  { label: "Simon & Schuster", href: "#" },
];

const EDITIONS = [
  { country: "Australia", href: "#" },
  { country: "Brazil", href: "#" },
  { country: "Canada", href: "#" },
  { country: "Japan", href: "#" },
  { country: "New Zealand", href: "#" },
  { country: "Switzerland", href: "#" },
  { country: "United States", href: "#" },
  { country: "United Kingdom", href: "#" },
];

const FAQS = [
  {
    q: "What is The Stories Book about?",
    a: "This exquisite compilation showcases a diverse array of photographs that capture the essence of different eras and cultures, reflecting the unique styles and perspectives of each artist.",
  },
  {
    q: "How much does The Stories Book cost?",
    a: "This exquisite compilation showcases a diverse array of photographs that capture the essence of different eras and cultures, reflecting the unique styles and perspectives of each artist.",
  },
  {
    q: "When will The Stories Book be released?",
    a: "This exquisite compilation showcases a diverse array of photographs that capture the essence of different eras and cultures, reflecting the unique styles and perspectives of each artist.",
  },
  {
    q: "Are signed copies available?",
    a: "This exquisite compilation showcases a diverse array of photographs that capture the essence of different eras and cultures, reflecting the unique styles and perspectives of each artist.",
  },
];

const BOOK_IMAGE =
  "https://blanchedalmond-bison-874584.hostingersite.com/wp-content/themes/twentytwentyfive/assets/images/book-image-landing.webp";

// ── Page ─────────────────────────────────────────────────
export default async function AboutPage() {
  const page = await getPageBySlug("about");
  if (!page) notFound();

  return (
    <main>
      {/* ① Hero split */}
      <section className="about-hero">
        <div className="about-hero__image">
          <img src={BOOK_IMAGE} alt="Image of the book" />
        </div>
        <div className="about-hero__text">
          <h1>The Stories Book</h1>
          <p className="about-hero__sub">
            A fine collection of moments in time featuring photographs from
            Louis Fleckenstein, Paul Strand and Asahachi Kōno.
          </p>
          <p className="about-hero__preorder">Available for pre-order now.</p>
          <Link href="#buy" className="btn btn-primary">
            Order your copy →
          </Link>
        </div>
      </section>

      {/* ② Buy buttons */}
      <section className="about-buy" id="buy">
        <div className="container">
          <h2>Buy your copy of The Stories Book</h2>
          <div className="about-buy__grid">
            {BUY_LINKS.map((b) => (
              <a key={b.label} href={b.href} className="about-buy__btn">
                {b.label}
              </a>
            ))}
          </div>
          <p className="about-buy__note">
            Outside Europe?{" "}
            <Link href="#editions">View international editions</Link>
          </p>
        </div>
      </section>

      {/* ③ About the book — text left, image right */}
      <section className="about-split container">
        <div className="about-split__text">
          <h2>About the book</h2>
          <p>
            This exquisite compilation showcases a diverse array of photographs
            that capture the essence of different eras and cultures, reflecting
            the unique styles and perspectives of each artist. Fleckenstein's
            evocative imagery, Strand's groundbreaking modernist approach, and
            Kōno's meticulous documentation of Japanese life come together in a
            harmonious blend that celebrates the art of photography.
          </p>
          <p>
            Each image in "The Stories Book" is accompanied by insightful
            commentary, providing historical context and revealing the stories
            behind the photographs.
          </p>
        </div>
        <div className="about-split__image">
          <img src={BOOK_IMAGE} alt="Image of a book" />
        </div>
      </section>

      {/* ④ International editions */}
      <section className="about-editions" id="editions">
        <div className="container about-editions__inner">
          <div className="about-editions__lead">
            <h2>International editions</h2>
            <p>
              The Stories Book will be available from these international
              retailers.
            </p>
          </div>
          <div className="about-editions__grid">
            {EDITIONS.map((e) => (
              <div key={e.country} className="about-editions__item">
                <h3>{e.country}</h3>
                <a href={e.href}>Book Store</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ⑤ FAQ */}
      <section className="about-faq container">
        <h2>Frequently Asked Questions</h2>
        <div className="about-faq__grid">
          {FAQS.map((f) => (
            <div key={f.q} className="about-faq__item">
              <h3>{f.q}</h3>
              <p>{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ⑥ CTA banner */}
      <section className="about-cta">
        <div className="container">
          <h2>Sign up to get daily stories</h2>
          <p>
            Get access to a curated collection of moments in time featuring
            photographs from historical relevance.
          </p>
          <Link href="/contact" className="btn btn-primary">
            Subscribe
          </Link>
        </div>
      </section>
    </main>
  );
}
