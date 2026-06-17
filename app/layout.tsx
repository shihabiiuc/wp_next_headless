import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });

export const metadata: Metadata = {
  title: { default: "My Site", template: "%s | My Site" },
  description: "Headless WordPress powered by Next.js",
};

const NAV = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "Blog", href: "/posts" },
  { label: "Contact", href: "/contact" },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={geist.variable}>
        <header className="site-header">
          <div className="container header-inner">
            <Link href="/" className="site-logo">
              MySite
            </Link>
            <nav className="site-nav" aria-label="Main navigation">
              {NAV.map((n) => (
                <Link key={n.href} href={n.href} className="nav-link">
                  {n.label}
                </Link>
              ))}
            </nav>
          </div>
        </header>

        <main>{children}</main>

        <footer className="site-footer">
          <div className="container">
            <p>
              Content from{" "}
              <a href="https://wordpress.org" target="_blank" rel="noreferrer">
                WordPress
              </a>{" "}
              · Rendered by{" "}
              <a href="https://nextjs.org" target="_blank" rel="noreferrer">
                Next.js
              </a>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
