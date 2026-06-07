/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PortfolioItem, Testimonial, BlogPost } from './types';

export const initialPortfolioItems: PortfolioItem[] = [
  {
    id: 'apex-saas',
    title: 'Apex Analytics Dashboard',
    client: 'Apex Financial Technologies LLC',
    description: 'A dark-mode-first collaborative analytics interface tailored clean and highly readable for financial analysts.',
    category: 'saas',
    image: 'https://picsum.photos/seed/analytics/1200/800',
    wireframeImage: 'https://picsum.photos/seed/wireframe1/1200/800',
    tech: ['React', 'Tailwind CSS', 'Recharts', 'Framer Motion'],
    colors: ['#09090b', '#3b82f6', '#10b981', '#f59e0b'],
    fontFamily: 'Space Grotesk / Inter',
    date: 'April 2026',
    challenge: 'Financial dashboards are notorious for overwhelming users with dense columns, low text contrast, and poor navigational hierarchies. Apex needed an interface that aggregated high-velocity stock indicators and portfolio balances into logical, fast-scan viewport modules.',
    solution: 'Designed an elegant dark canvas with a sidebar layout utilizing absolute container scaling. Reduced visual noise by substituting bulky borders with subtle gap spacing and soft colored typography highlights, creating an immediate visual hierarchy.',
    features: [
      'Aggregated KPI widgets with micro-sparklines',
      'Instant drag-and-resize analytics panels',
      'Dual color-scheme optimization (optimized dark/light curves)',
      'Configurable client-side feature toggling'
    ]
  },
  {
    id: 'elixir-ecommerce',
    title: 'Elixir Organic Botanicals',
    client: 'Elixir Skincare Ltd',
    description: 'A spacious, typography-driven e-commerce experience celebrating natural ingredients and luxury beauty products.',
    category: 'ecommerce',
    image: 'https://picsum.photos/seed/botanicals/1200/800',
    wireframeImage: 'https://picsum.photos/seed/wireframe2/1200/800',
    tech: ['NextJS', 'Tailwind v4', 'GraphQL', 'Shopify Storefront'],
    colors: ['#fafaf9', '#1c1917', '#854d0e', '#fef08a'],
    fontFamily: 'Playfair Display / Inter',
    date: 'January 2026',
    challenge: 'Elixir brand positioning is luxury-organic. Their legacy online shop looked clinical and dry, failing to justify their premium pricing tiers or tell an immersive physical ingredient story.',
    solution: 'Engineered a highly elegant layout with grand editorial headers, oversized grid photography, and seamless floating cart overlays. Introduced immersive scrolling stories that link ingredients to scientific metrics right on the checkout funnel path.',
    features: [
      'Interactive ingredient-to-benefit visual matrices',
      'Quick-add floating drawer checkout helper',
      'Staggered product listings with dynamic zoom hovering',
      'Full, standards-compliant keyboard accessibility'
    ]
  },
  {
    id: 'monolith-brand',
    title: 'Monolith Architect Studio',
    client: 'Monolith & Partners',
    description: 'A minimalist portfolio reflecting heavy geometries, brutalist structures, and modern residential design.',
    category: 'brand',
    image: 'https://picsum.photos/seed/architecture/1200/800',
    wireframeImage: 'https://picsum.photos/seed/wireframe3/1200/800',
    tech: ['Vite', 'PostCSS', 'Lenis Scroll', 'Tailwind CSS'],
    colors: ['#ffffff', '#000000', '#71717a', '#a1a1aa'],
    fontFamily: 'JetBrains Mono / Space Grotesk',
    date: 'March 2026',
    challenge: 'Monolith wanted their digital portfolio to mirror their architectural philosophy: heavy, structural, uncompromising, yet sophisticated. Standard template layout structures looked too flighty and ungrounded.',
    solution: 'Implemented a bold, heavy-grid brutalist grid system using 2px black grid lines. Used oversized JetBrains Mono lettering to denote floor sizes, project coordinates, and completion dates. Embedded smooth scroll mechanics matching physical momentum.',
    features: [
      'Synchronized multi-column scroll timelines',
      'Dynamic interactive architectural blueprint inspectors',
      'High-contrast, light-sensitive reactive themes',
      'Interactive vector layout overlays'
    ]
  },
  {
    id: 'nova-creative',
    title: 'Nova Sound Collective',
    client: 'Nova Audio Labs',
    description: 'An interactive audio-visual catalog supporting upcoming ambient experimental records and physical audio synthesizers.',
    category: 'creative',
    image: 'https://picsum.photos/seed/records/1200/800',
    wireframeImage: 'https://picsum.photos/seed/wireframe4/1200/800',
    tech: ['React Canvas', 'Web Audio API', 'Motion', 'Tailwind CSS'],
    colors: ['#0f051d', '#ec4899', '#a855f7', '#6366f1'],
    fontFamily: 'Fira Code / Space Grotesk',
    date: 'May 2026',
    challenge: 'As a niche, high-art audio house, Nova and their artists needed more than a basic list of MP3 assets. They demanded a visceral representation of high-fidelity frequencies, physical interaction, and digital sound waves.',
    solution: 'Designed an ambient, dark interstellar site featuring dynamic canvas spectrum analyses. Interactive album sleeves spin slowly on user orbit and expand into full-frequency listening circles with dynamic bass ripples.',
    features: [
      'Interactive client-side Web Audio wave visualizer',
      'Slow-orbiting orbital record shelves',
      'Context-aware ambient neon background color shifting',
      'Fluid page-state transitions'
    ]
  },
  {
    id: 'zenith-logo',
    title: 'Zenith Solar Energy Systems',
    client: 'Zenith Group International',
    description: 'A mathematical brand logo symbol engineered with precise geometry to represent sun transitions and sustainable solar systems.',
    category: 'graphics',
    image: 'https://picsum.photos/seed/solarlogo/1200/800',
    wireframeImage: 'https://picsum.photos/seed/wireframelogo5/1200/800',
    tech: ['Adobe Illustrator', 'Vector Math', 'Figma', 'Grid Alignment'],
    colors: ['#0f172a', '#e2e8f0', '#f59e0b', '#ef4444'],
    fontFamily: 'Outfit / Cabinet Grotesk',
    date: 'February 2026',
    challenge: 'Zenith required a high-reductive signature emblem that retains visual legibility at 16x16 pixels favicon dimensions and up to billboard scales. Their old identity felt generic, using cliché leaf and globe motifs.',
    solution: 'Engineered a modern, pure vector glyph combining overlapping concentric golden rings inclined at the earth\'s rotational axis (23.5°). The symmetry perfectly depicts a multi-phase solar convergence and represents technological forward-momentum.',
    features: [
      'Pure geometry vector grid blueprints (SVG/Ai format)',
      'High-legibility tested icon sub-variants and favicons',
      'Unified brand guideline handbook with CSS styling system specs',
      'Dark and light layout optimized color variants'
    ]
  },
  {
    id: 'kinetix-identity',
    title: 'Kinetix Studio Visual Assets',
    client: 'Kinetix Motion Agency',
    description: 'A modular, dynamic brand system consisting of graphic assets, custom patterns, and screen collateral for a modern motion design studio.',
    category: 'graphics',
    image: 'https://picsum.photos/seed/kineticgraphics/1200/800',
    wireframeImage: 'https://picsum.photos/seed/wireframelogo6/1200/800',
    tech: ['InDesign', 'After Effects', 'Figma Components', 'Vector Suite'],
    colors: ['#000000', '#ffffff', '#2563eb', '#38bdf8'],
    fontFamily: 'Space Grotesk',
    date: 'May 2026',
    challenge: 'Kinetix needed a modular graphic framework that matches the motion vectors in their video output. Their stationary, social media layouts, and digital branding assets felt static and disconnected.',
    solution: 'Created a responsive grid of kinetic shape layers, visual brackets, and frame indicators. The identity framework acts as a viewfinder, dynamically stretching and scaling based on the aspect ratio of the underlying media.',
    features: [
      'Responsive aspect-ratio dynamic layout systems',
      'Custom graphic toolkit with 40+ vector overlay patterns',
      'Print-ready stationary with textured matte spot UV specifications',
      'Motion graphics assets and animated Lottie SVG components'
    ]
  },
  {
    id: 'equinox-packaging',
    title: 'Equinox Micro-Roasters Coffee',
    client: 'Equinox Trading Co.',
    description: 'Artisanal organic coffee packaging design featuring rustic hand-drawn woodcut etchings paired with high-contrast Swiss typography grids.',
    category: 'graphics',
    image: 'https://picsum.photos/seed/coffeepackaging/1200/800',
    wireframeImage: 'https://picsum.photos/seed/wireframelogo7/1200/800',
    tech: ['Illustrator', 'Digital Etching', 'Packaging CAD', 'Color Separation'],
    colors: ['#1c1917', '#e7e5e4', '#d97706', '#451a03'],
    fontFamily: 'Playfair Display / JetBrains Mono',
    date: 'March 2026',
    challenge: 'Equinox launched a premium single-origin micro-lot series. In a crowded retail shelf, they needed layout packaging that looks deeply premium, historical, yet cleanly modern and technically honest.',
    solution: 'Designed a dual-sided label structure. The front presents a rustic, hand-shaded woodcut solar eclipse illustration. The back utilizes a clean Swiss-grid mono layout detailing origin altitude, soil pH, and roasting temperature profiles.',
    features: [
      'Eco-friendly compostable kraft bag dieline engineering',
      'Precision ink color-separation templates for screenprinting',
      'Interlocking geometric graphic sticker seal systems',
      'Origin-stamped custom vector typographic badges'
    ]
  }
];

export const initialTestimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Sarah Jenkins',
    role: 'VP of Product',
    company: 'Apex Technologies',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
    content: 'Nexus Lab transformed our legacy interface into an extremely elegant financial engine. Our users praised the visual clarity immediately after launch—it literally dropped our churn curve by 12% in the second month. Simply masterclass!',
    rating: 5,
    tags: ['UI/UX Redesign', 'Fintech Solution']
  },
  {
    id: 't2',
    name: 'Marcus Thorne',
    role: 'Creative Director',
    company: 'Monolith Partners',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    content: 'Very rare to find a web designer who genuinely understands architectural restraint and brand essence. The typography pairing, custom grids, and smooth interactions made our structural projects feel alive in the digital viewport.',
    rating: 5,
    tags: ['Branded Showcase', 'Interactive Canvas']
  },
  {
    id: 't3',
    name: 'Elena Rostova',
    role: 'Founder & CEO',
    company: 'Elixir Botanicals',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
    content: 'We had a complex story to tell about luxury skincare ingredients. Nexus Lab synthesized this perfectly with beautiful editorial grids and custom cart setups. E-commerce conversion rate spiked by 28% practically overnight.',
    rating: 5,
    tags: ['NextJS Commerce', 'Editorial Design']
  }
];

export const initialBlogPosts: BlogPost[] = [
  {
    id: 'b1',
    title: 'The Power of Spatial Breathing Room: Designing for Intentional Focus',
    excerpt: 'Why increasing your padding by 50% and grouping containers on deep logical relationships will immediately triple your user retention scores.',
    content: `In modern interface design, the greatest battle is fought over user cognitive fatigue. Often, when designers encounter low conversion rates or high page exit metrics, the immediate reflex is to add visual guides, explanatory banners, or more button variations. 

This reaction is an anti-pattern. The actual culprit is typically a complete lack of spatial breathing room.

### 1. The Threat of Visual Density
When a user arrives on a layout, their brain immediately scans for anchors. If every square millimeter is packed with labels, borders, boxes, and high-intensity accents, the visual noise acts as an immediate cognitive speedbump. By introducing *intentional negative space* (margins, open paddings of \`py-20\` or \`md:py-32\`), we allow the user to settle on your high-priority headers.

### 2. Layout Hierarchy & Containers
- **Group logically:** Place related elements in containers, but make the layout borderless when possible. Prefer using slight background color contrasts (e.g., \`bg-zinc-50\` on an off-white baseline) rather than stark outlines.
- **Dynamic Padding:** Let padding scale according to content importance.
- **Typography Sizing:** Make display headers noticeably larger and lighter, and standard text tightly packed for comfortable reading.

In our studios, we run "layout stress tests"—if you zoom out to 10% size, can you still instantly identify the primary call to action? If not, strip the noise. Use layout density sparingly, and let the rest breathe.`,
    author: 'Nexus Lab',
    category: 'UI/UX',
    readTime: '4 min read',
    date: 'June 4, 2026',
    imageUrl: 'https://picsum.photos/seed/spatial/800/500',
    likes: 42,
    comments: [
      {
        id: 'c1',
        author: 'Julian Cole',
        content: 'This philosophy has completely changed how I build my SaaS landing pages. Absolute gold.',
        date: 'June 5, 2026'
      }
    ]
  },
  {
    id: 'b2',
    title: 'Modern Sans-Serif vs. Technical Mono: Crafting Cohesive Visual Personalities',
    excerpt: 'How to select and pair high-contrast display letterforms to create a specific emotional identity for tech, luxury, or creative brands.',
    content: `Typography is the body language of the web. It is the unspoken tone that establishes credibility, playfulness, or digital precision before a single sentence is cognitively read.

One of our favorite visual tactics is pairing standard high-legibility geometric sans-serif layouts (like *Inter*) with high-precision technical monospaced details (like *JetBrains Mono*).

### Why the Sans & Mono Pair Works
- **Structural Tension:** Geometric sans feels human, soft, and modern. Monospaced characters, on the other hand, represent strict digital logic, code, coordinates, and coordinates. This contrast creates a satisfying, premium engineering "vibe".
- **Scale Contrast:** Oversized sans-serif titles paired with miniature, uppercase, spaced mono subheadings makes information feels deeply researched and deliberate.

### When to Pivot to Serif
If your brand positions itself around artisanal luxury, heritage, or intellectual depth (as in skincare or premium architecture), swap the monospaced indicators for a clean, high-contrast Serif (such as *Playfair Display*). The serif detail instantly conveys heritage, craft, and bespoke premium values.`,
    author: 'Nexus Lab',
    category: 'Typography',
    readTime: '6 min read',
    date: 'May 28, 2026',
    imageUrl: 'https://picsum.photos/seed/typography/800/500',
    likes: 31,
    comments: []
  },
  {
    id: 'b3',
    title: 'Converting Clicks: The Practical Sales Psychology Behind Web Layouts',
    excerpt: 'Stop over-complicating workflows. A breakdown of structural layout funnels that safely guide clients from landing page to signatures.',
    content: `Many freelance designers focus so heavily on custom particle effects or advanced animations that they forget the core purpose of a business website: to establish high-level client trust and handle conversion funnel mechanics cleanly.

### The Conversion Blueprint
When design clients source freelance talent, they seek confidence and capability. Here is the structure we use to convert cold visitors to qualified design inquiries:

1. **The Hero Verdict:** A clear, minimalist statement of your design specialization in under 10 words. Show who you are and who you design for.
2. **Contextual Proof (The Portfolio):** Let the work speak. But do not just show screenshot grids. Include the specific business challenges you solved and the metrics achieved.
3. **Social Assurance (Testimonials):** Highly scannable quotes displaying real client titles, companies, and actual headshots.
4. **Structured Intake (The Form):** A simple, multi-choice pricing estimator or onboarding questionnaire that helps clients express their service goals easily.

Keep the interface extremely focused. Redundancy leads to friction, and friction kills conversions.`,
    author: 'Nexus Lab',
    category: 'Strategy',
    readTime: '5 min read',
    date: 'May 15, 2026',
    imageUrl: 'https://picsum.photos/seed/strategy/800/500',
    likes: 56,
    comments: []
  }
];
