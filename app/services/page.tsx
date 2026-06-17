import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Services" };

const BASE =
  "https://blanchedalmond-bison-874584.hostingersite.com/wp-content/themes/twentytwentyfive/assets/images";

const SERVICES = [
  {
    title: "Collect",
    description:
      "Like flowers that bloom in unexpected places, every story unfolds with beauty and resilience.",
    image: `${BASE}/campanula-alliariifolia-flower.webp`,
    alt: "Image for service",
  },
  {
    title: "Assemble",
    description:
      "Like flowers that bloom in unexpected places, every story unfolds with beauty and resilience.",
    image: `${BASE}/delphinium-flowers.webp`,
    alt: "Image for service",
  },
  {
    title: "Deliver",
    description:
      "Like flowers that bloom in unexpected places, every story unfolds with beauty and resilience.",
    image: `${BASE}/star-thristle-flower.webp`,
    alt: "Image for service",
  },
];

const PRICING = [
  {
    tier: "Free",
    price: "0€",
    href: "#",
    features: [
      "Get access to our paid articles and weekly newsletter.",
      "Join our IRL events.",
      "Get a free tote bag.",
      "An elegant addition of home decor collection.",
      "Join our forums.",
    ],
  },
  {
    tier: "Single",
    price: "20€/month",
    href: "#",
    featured: true,
    features: [
      "Get access to our paid articles and weekly newsletter.",
      "Join our IRL events.",
      "Get a free tote bag.",
      "An elegant addition of home decor collection.",
      "Join our forums.",
    ],
  },
];

export default async function ServicesPage() {
  return (
    <main>
      {/* ① Hero */}
      <section className="sv-hero">
        <div className="container sv-hero__inner">
          <h1>Tell your story</h1>
          <p>
            Like flowers that bloom in unexpected places, every story unfolds
            with beauty and resilience, revealing hidden wonders.
          </p>
          <Link href="#services" className="btn btn-primary">
            Learn more
          </Link>
        </div>
      </section>

      {/* ② About split — images left, text right */}
      <section className="sv-about">
        <div className="sv-about__images">
          <img
            src={`${BASE}/red-hibiscus-closeup.webp`}
            alt="Photography close up of a red flower."
            className="sv-about__img-main"
          />
          <img
            src={`${BASE}/grid-flower-2.webp`}
            alt="Black and white photography close up of a flower."
            className="sv-about__img-accent"
          />
        </div>
        <div className="sv-about__text">
          <span className="sv-label">About Us</span>
          <p>
            <strong>Fleurs</strong> is a flower delivery and subscription
            business. Based in the EU, our mission is not only to deliver
            stunning flower arrangements but also foster knowledge and
            enthusiasm on the beautiful gift of nature: flowers.
          </p>
        </div>
      </section>

      {/* ③ Services 3-col */}
      <section className="sv-services container" id="services">
        <h2>Our services</h2>
        <div className="sv-services__grid">
          {SERVICES.map((s) => (
            <div key={s.title} className="sv-service-card">
              <div className="sv-service-card__img-wrap">
                <img src={s.image} alt={s.alt} />
              </div>
              <h3>{s.title}</h3>
              <p>{s.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ④ Testimonial */}
      <section className="sv-testimonial">
        <div className="container sv-testimonial__inner">
          <div className="sv-testimonial__quote">
            <span className="sv-label">What people are saying</span>
            <blockquote>"Superb product and customer service!"</blockquote>
            <cite>
              Jo Mulligan
              <span>Atlanta, GA</span>
            </cite>
          </div>
          <div className="sv-testimonial__image">
            <img
              src={`${BASE}/typewriter.webp`}
              alt="Picture of a person typing on a typewriter."
            />
          </div>
        </div>
      </section>

      {/* ⑤ Pricing */}
      <section className="sv-pricing container">
        <h2>Pricing</h2>
        <p className="sv-pricing__sub">Cancel or pause anytime.</p>
        <div className="sv-pricing__grid">
          {PRICING.map((p) => (
            <div
              key={p.tier}
              className={`sv-pricing-card${p.featured ? " sv-pricing-card--featured" : ""}`}
            >
              <h3>{p.tier}</h3>
              <p className="sv-pricing-card__price">{p.price}</p>
              <ul>
                {p.features.map((f) => (
                  <li key={f}>
                    <span className="sv-check">✓</span> {f}
                  </li>
                ))}
              </ul>
              <Link
                href={p.href}
                className="btn btn-primary sv-pricing-card__cta"
              >
                Join
              </Link>
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
