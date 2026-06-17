import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = { title: "Contact" };

const CONTACT_DETAILS = [
  {
    icon: "📍",
    label: "Location",
    value: "Dhaka, Bangladesh",
    sub: "Available for remote work worldwide",
  },
  {
    icon: "⏱",
    label: "Response time",
    value: "Within 24 hours",
    sub: "On business days",
  },
  {
    icon: "🌐",
    label: "Platforms",
    value: "Fiverr & Upwork",
    sub: "Also available for direct projects",
  },
];

const FAQS = [
  {
    q: "Do you work with international clients?",
    a: "Absolutely. I work with clients across the US, Europe, Australia and beyond. Time zone differences are never a blocker — I communicate async and schedule calls to suit you.",
  },
  {
    q: "What does a typical project look like?",
    a: "After your enquiry I'll schedule a short discovery call, then send a detailed proposal with scope, timeline and fixed price. No surprises.",
  },
  {
    q: "Can you work with my existing WordPress site?",
    a: "Yes — whether it's a redesign, a headless migration, performance audit or new feature, I'm comfortable working on existing codebases.",
  },
  {
    q: "Do you offer ongoing maintenance?",
    a: "Yes. I offer monthly retainer packages for updates, security monitoring, backups and content changes.",
  },
];

export default function ContactPage() {
  return (
    <main>
      {/* ① Hero */}
      <section className="ct-hero">
        <div className="container ct-hero__inner">
          <div className="ct-hero__text">
            <span className="sv-label">Get in touch</span>
            <h1>Let's build something great together</h1>
            <p>
              Whether you have a project brief ready or just an idea — I'd love
              to hear about it. Fill in the form and I'll get back to you within
              one business day.
            </p>

            {/* Contact details */}
            <ul className="ct-details">
              {CONTACT_DETAILS.map((d) => (
                <li key={d.label} className="ct-detail">
                  <span className="ct-detail__icon">{d.icon}</span>
                  <div>
                    <span className="ct-detail__label">{d.label}</span>
                    <strong>{d.value}</strong>
                    <span className="ct-detail__sub">{d.sub}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Form */}
          <div className="ct-form-wrap">
            <div className="ct-form-card">
              <h2>Send a message</h2>
              <p className="ct-form-card__sub">
                I read every message personally and respond within 24 hours.
              </p>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* ② FAQ */}
      <section className="ct-faq container">
        <div className="ct-faq__hd">
          <h2>Common questions</h2>
          <p>Everything you need to know before reaching out.</p>
        </div>
        <div className="ct-faq__grid">
          {FAQS.map((f) => (
            <div key={f.q} className="ct-faq__item">
              <h3>{f.q}</h3>
              <p>{f.a}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
