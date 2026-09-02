export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "image"; src: string; alt: string; caption?: string }

export interface BlogPost {
  id: number
  slug: string
  title: string
  excerpt: string
  date: string // ISO format, e.g. "2026-08-09"
  readTime: string
  tags: string[]
  coverImage?: { src: string; alt: string } // shown after the header, before the body — skipped if src is empty
  content: ContentBlock[]
}

export const blogs: BlogPost[] = [
  {
    id: 1,
    slug: "microtenant-architecture",
    title: "Choosing a data isolation strategy for a multi-tenant SaaS",
    excerpt:
      "Why I went with a shared schema and a tenant_id column instead of a database per business, and what it takes to make that safe.",
    date: "2026-08-09",
    readTime: "6 min read",
    tags: ["Architecture", "Backend", "Postgres"],
    coverImage: {
      src: "https://ipw88zuno5.ufs.sh/f/rXxdhjbFRcsmODPqjRrhUBcA9sr1TSMCko4q2EaWP8QIxRi7",
      alt: "Choosing a data isolation strategy for a multi-tenant SaaS",
    },
    content: [
      { type: "paragraph", text: "I'm currently building a SaaS product where every business that signs up gets its own workspace, its own users, its own data, its own view of the product, with zero visibility into anyone else's. That's the whole premise of multi-tenancy, and the first real architectural decision it forces is where does one tenant's data end and another's begin, at the database level." },
      { type: "paragraph", text: "There are three common answers. Database per tenant, where every business gets a fully separate Postgres database. Schema per tenant, where they share a database but get their own namespace inside it. Or shared schema, where everything lives in the same tables and a tenant_id column does the separating. I went with shared schema, and it wasn't a difficult call for a project at this stage." },
      { type: "paragraph", text: "Database per tenant gives you the strongest isolation, but it turns every migration into a fan out problem, since a schema change has to run against every tenant's database, and provisioning a new tenant means spinning up new infrastructure instead of inserting a row. Schema per tenant is a middle ground, but Postgres wasn't designed to comfortably hold thousands of schemas, and most tooling including Prisma treats schema per tenant as a second class citizen. For a product where I expect a lot of tenants and don't yet know their individual scale, shared schema was the option that let me move fast without boxing myself in." },
      {
        type: "image",
        src: "https://ipw88zuno5.ufs.sh/f/rXxdhjbFRcsmTMhfuEPbHzfd2q156aZIwcuMxLUDEgNAkvCo",
        alt: "Comparison of database-per-tenant, schema-per-tenant, and shared-schema tradeoffs",
      },
      { type: "paragraph", text: "The tradeoff is that isolation moves from the infrastructure layer into application code, and that's a much easier place to make a mistake. Every table that holds tenant owned data gets a tenant_id foreign key, and every single query has to be scoped by it. Forget one WHERE clause and you've leaked one tenant's data into another tenant's response. That's the failure mode this whole approach lives or dies on." },
      { type: "paragraph", text: "To make that hard to get wrong, I'm not relying on remembering to add tenant_id to every query by hand. I'm using a Prisma client extension that wraps the query layer. It reads the current tenant from request context and injects the tenant_id filter automatically on every read, and stamps it on every write. The application code calls prisma.booking.findMany() like normal. It never gets the chance to forget the scope, because the scoping doesn't live in the call site anymore." },
      {
        type: "image",
        src: "https://ipw88zuno5.ufs.sh/f/rXxdhjbFRcsmrZe3p6bFRcsmvG1Au5n32Tli8LqkoUxYDf0I",
        alt: "Shared database with tenant_id scoping tenant-specific rows through a Prisma extension",
      },
      { type: "paragraph", text: "That still leaves the request context itself as the thing that has to be correct. The tenant gets resolved once, early in the request lifecycle, from the authenticated session, and passed down through a context object rather than trusted from anything the client sends. A tenant_id in a request body or query param is not something I treat as authoritative, since that's exactly the kind of value a malicious or buggy client could tamper with." },
      { type: "paragraph", text: "On the schema side, tenant_id is indexed on every tenant scoped table, almost always as the leading column in a composite index alongside whatever the table is normally queried by, for example tenant_id and created_at for anything list and paginate, or tenant_id and email for lookups. Without that, every query technically works but degrades the moment any tenant's table grows, since Postgres ends up scanning rows that belong to other tenants just to filter them out." },
      { type: "paragraph", text: "The honest tradeoff of shared schema is that a single bug in the scoping layer is a cross tenant data leak, whereas with database per tenant that same bug class is architecturally impossible. I've accepted that risk in exchange for simplicity, and I'm managing it with the Prisma extension as the single choke point, tests that specifically assert tenant A can never see tenant B's rows, and the plan to move genuinely large or sensitive tenants onto dedicated databases later if it's ever warranted, without having to redesign anything." },
      { type: "paragraph", text: "That last point is really the thing that made this decision comfortable. Shared schema now doesn't foreclose stronger isolation later. It's the option that matches where the product actually is today, not where it might be in a year." },
    ],
  },
]

export const getBlogBySlug = (slug: string) => blogs.find((b) => b.slug === slug)
