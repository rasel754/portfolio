export type Service = {
  id: string
  icon: string          // emoji icon (rendered large)
  tag: string           // font-mono label shown above title
  title: string
  description: string
  deliverables: string[] // 3–4 bullet points
  accent: string        // per-card accent color (hex)
}

export const services: Service[] = [
  {
    id: 'fullstack-web-app',
    icon: '🧱',
    tag: '01 / full_stack',
    title: 'Full Stack Web Application',
    description:
      'End-to-end web applications built with Next.js 15, Node.js, Express, and MongoDB. From database schema to deployed UI — production-ready, scalable, and maintainable.',
    deliverables: [
      'Next.js 15 App Router with SSR/SSG',
      'REST API with Node.js + Express',
      'MongoDB schema design & Mongoose models',
      'Deployed on Vercel + cloud DB (Atlas)',
    ],
    accent: '#6c63ff', // violet
  },
  {
    id: 'ecommerce-marketplace',
    icon: '🛒',
    tag: '02 / e_commerce',
    title: 'E-Commerce & Marketplace',
    description:
      'Multi-vendor marketplaces and e-commerce platforms with role-based dashboards, product management, cart, checkout, and order tracking — as proven in NextMart and Script & Scroll.',
    deliverables: [
      'Multi-vendor shop & admin panel',
      'Product, order & coupon management',
      'Secure checkout & payment integration',
      'Customer, vendor & admin role separation',
    ],
    accent: '#f59e0b', // gold
  },
  {
    id: 'react-frontend',
    icon: '⚛️',
    tag: '03 / frontend',
    title: 'React / Next.js Frontend',
    description:
      'Pixel-perfect, responsive UIs using React 19, Next.js, TypeScript, and Tailwind CSS. Clean component architecture, smooth animations, and mobile-first design.',
    deliverables: [
      'Responsive UI for all screen sizes',
      'Reusable component library',
      'TypeScript strict-mode codebase',
      'Tailwind CSS + custom design system',
    ],
    accent: '#06b6d4', // cyan
  },
  {
    id: 'rest-api',
    icon: '🔗',
    tag: '04 / backend',
    title: 'REST API Development',
    description:
      'Robust, documented REST APIs with Express.js, JWT authentication, role-based access control, and proper error handling. Built to scale from MVP to production.',
    deliverables: [
      'JWT / cookie-based authentication',
      'Role-based access control (RBAC)',
      'Pagination, filtering & search endpoints',
      'Postman-documented API collection',
    ],
    accent: '#10b981', // emerald
  },
  {
    id: 'dashboard-admin',
    icon: '📊',
    tag: '05 / dashboard',
    title: 'Admin & Analytics Dashboard',
    description:
      'Feature-rich admin dashboards with CRUD for users, products, orders, and reports. Built as demonstrated in NextMart\'s admin panel and University Hall Management System.',
    deliverables: [
      'Full CRUD for all entities',
      'Data tables with sort, filter & search',
      'Summary stats with chart visualizations',
      'Role-gated route protection',
    ],
    accent: '#8b5cf6', // purple
  },
  {
    id: 'database-design',
    icon: '🍃',
    tag: '06 / database',
    title: 'MongoDB Database Design',
    description:
      'Schema design, data modeling, and query optimization for MongoDB. Designed complex schemas for multi-tenant marketplaces, hall management, and agricultural tracking platforms.',
    deliverables: [
      'Normalized & embedded schema modeling',
      'Aggregation pipeline optimization',
      'Mongoose model + validation layer',
      'Indexing strategy for performance',
    ],
    accent: '#f59e0b', // gold
  },
  {
    id: 'portfolio-landing',
    icon: '🎨',
    tag: '07 / design_&_deploy',
    title: 'Portfolio & Landing Page',
    description:
      'Stunning, performant portfolio sites and landing pages with unique visual identity, smooth animations, and Vercel deployment — just like this one you\'re looking at.',
    deliverables: [
      'Custom design system & typography',
      'Scroll animations & micro-interactions',
      'SEO meta tags + Lighthouse ≥ 90',
      'Vercel deployment with CI/CD',
    ],
    accent: '#ec4899', // pink
  },
]
