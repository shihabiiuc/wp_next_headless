// ─── GraphQL endpoint ──────────────────────────────────────────────────────────
const WP_GRAPHQL_URL =
  process.env.NEXT_PUBLIC_WORDPRESS_URL ||
  "https://blanchedalmond-bison-874584.hostingersite.com/graphql";

// ─── Core fetcher ──────────────────────────────────────────────────────────────
async function fetchGraphQL<T = unknown>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<T> {
  const res = await fetch(WP_GRAPHQL_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 }, // ISR: rebuild cached page every 60 s
  });

  if (!res.ok) {
    throw new Error(`GraphQL request failed: ${res.status} ${res.statusText}`);
  }

  const json = await res.json();

  if (json.errors) {
    console.error("WPGraphQL Errors:", json.errors);
    throw new Error(json.errors[0]?.message ?? "Unknown GraphQL error");
  }

  return json.data as T;
}

// ─── Types ─────────────────────────────────────────────────────────────────────
export interface FeaturedImage {
  node: { sourceUrl: string; altText: string };
}

export interface WPPage {
  id: string;
  slug: string;
  title: string;
  content: string;
  excerpt: string;
  date: string;
  modified: string;
  featuredImage: FeaturedImage | null;
}

export interface WPPost {
  id: string;
  slug: string;
  title: string;
  content: string;
  excerpt: string;
  date: string;
  modified: string;
  featuredImage: FeaturedImage | null;
  categories: { nodes: { name: string; slug: string }[] } | null;
  author: { node: { name: string; avatar: { url: string } | null } } | null;
}

// ─── Field fragments ───────────────────────────────────────────────────────────
const PAGE_FIELDS = `
  id slug title content date modified
  featuredImage { node { sourceUrl altText } }
`;

const POST_FIELDS = `
  id slug title content excerpt date modified
  featuredImage { node { sourceUrl altText } }
  categories { nodes { name slug } }
  author { node { name avatar { url } } }
`;

// ─── Page queries ──────────────────────────────────────────────────────────────
export async function getAllPages(): Promise<WPPage[]> {
  const data = await fetchGraphQL<{ pages: { nodes: WPPage[] } }>(`
    query { pages(first: 100) { nodes { ${PAGE_FIELDS} } } }
  `);
  return data.pages.nodes;
}

export async function getPageBySlug(slug: string): Promise<WPPage | null> {
  const data = await fetchGraphQL<{ pageBy: WPPage | null }>(
    `
    query GetPage($slug: String!) {
      pageBy(uri: $slug) { ${PAGE_FIELDS} }
    }
  `,
    { slug },
  );
  return data.pageBy ?? null;
}

// ─── Post queries ──────────────────────────────────────────────────────────────
export async function getAllPosts(): Promise<WPPost[]> {
  const data = await fetchGraphQL<{ posts: { nodes: WPPost[] } }>(`
    query {
      posts(first: 100, where: { status: PUBLISH, orderby: { field: DATE, order: DESC } }) {
        nodes { ${POST_FIELDS} }
      }
    }
  `);
  return data.posts.nodes;
}

export async function getPostBySlug(slug: string): Promise<WPPost | null> {
  const data = await fetchGraphQL<{ postBy: WPPost | null }>(
    `
    query GetPost($slug: String!) {
      postBy(slug: $slug) { ${POST_FIELDS} }
    }
  `,
    { slug },
  );
  return data.postBy ?? null;
}

export async function getRecentPosts(count = 6): Promise<WPPost[]> {
  const data = await fetchGraphQL<{ posts: { nodes: WPPost[] } }>(
    `
    query GetRecent($count: Int!) {
      posts(first: $count, where: { status: PUBLISH, orderby: { field: DATE, order: DESC } }) {
        nodes {
          id slug title excerpt date
          featuredImage { node { sourceUrl altText } }
          categories { nodes { name slug } }
          author { node { name } }
        }
      }
    }
  `,
    { count },
  );
  return data.posts.nodes;
}

// ─── Utilities ─────────────────────────────────────────────────────────────────
export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}
