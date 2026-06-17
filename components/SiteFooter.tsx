import Link from "next/link";
import Image from "next/image";

const POPULAR_FEATURES = [
  { label: "All Products and Features", href: "/products" },
  { label: "Free Meeting Scheduler App", href: "/meeting-scheduler" },
  { label: "Social Media Tools", href: "/social-media-tools" },
  { label: "Email Tracking Software", href: "/email-tracking" },
  { label: "Sales Email Automation", href: "/sales-email-automation" },
  { label: "Ads Software", href: "/ads-software" },
  { label: "Email Marketing Software", href: "/email-marketing" },
  { label: "Lead Management Software", href: "/lead-management" },
  { label: "Pipeline Management Tools", href: "/pipeline-management" },
  { label: "Free Website Builder", href: "/website-builder" },
  { label: "Sales Email Templates", href: "/email-templates" },
];

const FREE_TOOLS = [
  { label: "Password Generator", href: "/tools/password-generator" },
  { label: "Username Generator", href: "/tools/username-generator" },
  { label: "Keyboard Counter", href: "/tools/keyboard-counter" },
  { label: "Word Counter", href: "/tools/word-counter" },
  { label: "30 Minutes Timer", href: "/tools/timer" },
  { label: "Help Desk Software", href: "/help-desk" },
  { label: "Free Online Form Builder", href: "/form-builder" },
  { label: "Free Chatbot Builder", href: "/chatbot-builder" },
  { label: "Free Live Chat Software", href: "/live-chat" },
  { label: "Marketing Analytics", href: "/analytics" },
];

const COMPANY = [
  { label: "About Us", href: "/about" },
  { label: "Career", href: "/career" },
  { label: "Management Team", href: "/management" },
  { label: "Board of Directors", href: "/board" },
  { label: "Investor Relations", href: "/investors" },
  { label: "Blog", href: "/posts" },
  { label: "Contact Us", href: "/contact" },
  { label: "Partner Programs", href: "/partners" },
  { label: "Affiliate Programs", href: "/affiliates" },
];

const SERVICES = [
  { label: "Website Design", href: "/services/web-design" },
  { label: "Website Development", href: "/services/web-development" },
  { label: "WordPress Development", href: "/services/wordpress" },
  { label: "PHP & Laravel", href: "/services/php-laravel" },
  { label: "Node & React", href: "/services/node-react" },
  { label: "Search Engine Optimization", href: "/services/seo" },
  { label: "Blog Content Creation", href: "/services/content" },
  { label: "Custom Software Development", href: "/services/custom-software" },
];

const SOCIAL = [
  {
    name: "facebook",
    href: "https://facebook.com",
    src: "/img/social-icons/facebook.png",
  },
  {
    name: "instagram",
    href: "https://instagram.com",
    src: "/img/social-icons/instagram.png",
  },
  {
    name: "youtube",
    href: "https://youtube.com",
    src: "/img/social-icons/youtube.png",
  },
  {
    name: "twitter",
    href: "https://twitter.com",
    src: "/img/social-icons/twitter.png",
  },
  {
    name: "linkedin",
    href: "https://linkedin.com",
    src: "/img/social-icons/linkedin.png",
  },
  {
    name: "medium",
    href: "https://medium.com",
    src: "/img/social-icons/medium.png",
  },
  {
    name: "tiktok",
    href: "https://tiktok.com",
    src: "/img/social-icons/tiktok.png",
  },
];

const LEGAL = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Refund Policy", href: "/refund-policy" },
];

export default function SiteFooter() {
  return (
    <footer className="example-3">
      {/* Main link columns */}
      <div className="container main-content-area">
        {[
          { title: "Popular Features", links: POPULAR_FEATURES },
          { title: "Free Tools", links: FREE_TOOLS },
          { title: "Company", links: COMPANY },
          { title: "Services", links: SERVICES },
        ].map((col) => (
          <div key={col.title} className="holder">
            <h3>{col.title}</h3>
            <ul>
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Social icons */}
      <div className="container social-media-links">
        <ul>
          {SOCIAL.map((s) => (
            <li key={s.name}>
              <a href={s.href} target="_blank" rel="noreferrer">
                <Image src={s.src} alt={s.name} width={30} height={30} />
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Copyright */}
      <div className="copyright">
        <Link href="/">
          <Image src="/logo.svg" alt="logo" width={200} height={60} />
        </Link>
        <p>Copyright © {new Date().getFullYear()} Your company name.</p>
        <ul>
          {LEGAL.map((l) => (
            <li key={l.href}>
              <Link href={l.href}>{l.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
