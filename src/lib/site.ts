export const site = {
  name: "AXORION",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://axorion.com",
  tagline: "Independent Digital Growth Partner",
  description:
    "AXORION engineers high-performing websites, software, mobile apps, AI automation and performance marketing for ambitious businesses.",
  emails: ["contact@axorion.com", "support@axorion.com"],
  phones: [
    { display: "+91 82475 37997", tel: "+918247537997" },
    { display: "+91 82172 18659", tel: "+918217218659" },
  ],
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "910000000000",
  address: {
    street: "AXORION, Palamaner",
    district: "Chittoor District",
    region: "Andhra Pradesh",
    country: "India",
    postalCode: "517408",
  },
  social: [
    { label: "LinkedIn", icon: "linkedin", href: "https://www.linkedin.com/" },
    { label: "Instagram", icon: "instagram", href: "https://www.instagram.com/" },
    { label: "X (Twitter)", icon: "x", href: "https://x.com/" },
    { label: "GitHub", icon: "github", href: "https://github.com/" },
    { label: "Facebook", icon: "facebook", href: "https://www.facebook.com/" },
  ],
};

export const nav = [
  { label: "Services", href: "/services" },
  { label: "AI Agents", href: "/#ai-agents" },
  { label: "Industries", href: "/industries" },
  { label: "Projects", href: "/work" },
  { label: "Partner", href: "/partner" },
  { label: "About Us", href: "/company" },
  { label: "Blog", href: "/insights" },
  { label: "Contact Us", href: "/contact" },
];

// The footer lists every navbar link.
export const footerNav = nav;

export const whatsappLink = (text = "Hi AXORION, I'd like to discuss a project.") =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;

export const capabilities = [
  { label: "AI Automation", icon: "ai" },
  { label: "Custom Software", icon: "web" },
  { label: "Web & E-Commerce", icon: "ecommerce" },
  { label: "WhatsApp Automation", icon: "chat" },
  { label: "Dedicated Development", icon: "users" },
  { label: "NDA-Ready", icon: "lock" },
];

export const services = [
  {
    slug: "web",
    label: "Web & Custom Apps",
    title: "Web & Custom Application Engineering",
    short: "Fast, scalable web platforms and custom applications.",
    stack: ["Next.js", "React", "Node.js"],
    points: ["Business websites & web apps", "Internal tools and dashboards", "API design & integrations"],
  },
  {
    slug: "mobile",
    label: "Mobile Apps",
    title: "Mobile Applications",
    short: "Mobile-friendly apps and experiences for your customers and team.",
    stack: ["Mobile-first", "Cross-platform"],
    points: ["App planning & UX", "Cross-platform builds", "Launch support"],
  },
  {
    slug: "ecommerce",
    label: "E-Commerce & CMS",
    title: "E-Commerce & CMS Architecture",
    short: "Online stores and content systems built to convert and easy to manage.",
    stack: ["Online stores", "Custom CMS", "Payments"],
    points: ["Storefront & checkout experience", "Catalog and content management", "Payment and order integrations"],
  },
  {
    slug: "ai",
    label: "AI & Automation",
    title: "AI Solutions & Workflow Automation",
    short: "Practical AI agents and automation that remove manual work.",
    stack: ["AI Agents", "Chatbots", "WhatsApp Automation", "Workflows"],
    points: ["AI support and sales agents", "WhatsApp and workflow automation", "Integrations with your tools"],
  },
  {
    slug: "design",
    label: "UI/UX & Brand",
    title: "UI/UX Design Systems & Brand Identity",
    short: "Clear interfaces and consistent brands, designed for real users.",
    stack: ["UI/UX Design", "Design Systems", "Brand Identity"],
    points: ["Research & prototyping", "Reusable component libraries", "Brand identity & guidelines"],
  },
  {
    slug: "growth",
    label: "Digital Growth & SEO",
    title: "Digital Growth, SEO & Performance Marketing",
    short: "Measurable visibility and lead growth.",
    stack: ["Technical SEO", "Analytics", "Performance Marketing"],
    points: ["Technical & content SEO", "Conversion tracking", "Campaign setup and reporting"],
  },
];

export const industries = [
  { title: "Retail & E-Commerce", text: "Storefronts, catalog tools and checkout experiences that convert." },
  { title: "Logistics & Supply Chain", text: "Tracking, dispatch and customer-communication systems." },
  { title: "Real Estate", text: "Property platforms, listings and lead-management systems." },
  { title: "Manufacturing", text: "Digital systems that streamline production and business processes." },
  { title: "Healthcare", text: "Technology for better patient and provider experiences." },
];

export const projectCategories = [
  "AI Automation",
  "AI Agents",
  "Web Applications",
  "E-Commerce",
  "WhatsApp Automation",
  "Logistics Solutions",
  "Business Workflow Automation",
] as const;

export type ProjectLabel = "AXORION Demo" | "Concept Build" | "AI Demo" | "Prototype" | "Illustrative Use Case";

// Demonstrations and concepts only. These are NOT client projects; do not add client names or results here.
export const projects: { title: string; label: ProjectLabel; category: (typeof projectCategories)[number]; text: string; tags: string[] }[] = [
  { title: "AI Customer Support Agent", label: "AI Demo", category: "AI Agents", text: "Answers FAQs, handles customer queries, captures leads and escalates to a human. Try it in the demo above.", tags: ["AI Agent", "Lead capture"] },
  { title: "AI Sales Qualification Agent", label: "AI Demo", category: "AI Agents", text: "Asks about requirements, qualifies the enquiry and prepares a summary for your sales team.", tags: ["AI Agent", "Qualification"] },
  { title: "AI Logistics Automation", label: "Illustrative Use Case", category: "Logistics Solutions", text: "An illustrative workflow showing how AXORION can automate shipment queries and customer communication.", tags: ["Workflow", "WhatsApp"] },
  { title: "WhatsApp Logistics Agent", label: "AI Demo", category: "WhatsApp Automation", text: "Shipment status, delivery queries and customer notifications in a WhatsApp-style conversation.", tags: ["WhatsApp", "Notifications"] },
  { title: "AI Appointment Agent", label: "AI Demo", category: "AI Automation", text: "Collects requirements and captures preferred date and time for appointment requests.", tags: ["AI Agent", "Scheduling"] },
  { title: "AXORION.com", label: "AXORION Demo", category: "Web Applications", text: "This website: a fast, SEO-ready business site built with the latest Next.js, with a multi-step lead form.", tags: ["Next.js", "React", "Tailwind CSS"] },
  { title: "Online Store Concept", label: "Concept Build", category: "E-Commerce", text: "A conversion-focused storefront concept showing catalog, cart and checkout flow ideas.", tags: ["Storefront", "Checkout"] },
  { title: "Operations Workflow Dashboard", label: "Concept Build", category: "Business Workflow Automation", text: "A concept for tracking approvals, tasks and handoffs in one place instead of spreadsheets and chats.", tags: ["Dashboard", "Automation"] },
];

export const techTabs = [
  { id: "web", label: "Web", items: ["Next.js & React applications", "Node.js back-ends and APIs", "Performance-first builds (Core Web Vitals)", "SEO-ready structure and metadata"] },
  { id: "ai", label: "AI & Automation", items: ["AI customer support and sales agents", "WhatsApp automation", "Workflow and document automation", "Integrations with your existing tools"] },
  { id: "ecom", label: "E-commerce", items: ["Online store experiences", "Custom CMS", "Payment and order integrations", "Conversion-focused UX"] },
  { id: "design", label: "UI/UX", items: ["Figma design systems", "Brand identity", "Responsive, accessible interfaces", "Usability review"] },
];

export const stack = [
  { group: "Frontend", items: ["Next.js", "React", "TypeScript", "Tailwind CSS"] },
  { group: "Backend", items: ["Node.js", "REST APIs", "Server Actions"] },
  { group: "AI & Automation", items: ["LLM APIs", "AI agents", "WhatsApp automation", "Workflow automation"] },
  { group: "Data", items: ["PostgreSQL", "Supabase"] },
  { group: "Design", items: ["Figma", "Design systems"] },
  { group: "Commerce & CMS", items: ["Custom CMS", "Storefront builds", "Payment integrations"] },
];

export const plannedTopics = [
  "Why fast websites win more enquiries",
  "Where to start with AI automation",
  "Choosing a web stack for a growing business",
];
