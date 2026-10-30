import sonrisappDashboard from '../assets/projects/sonrisapp/dashboard.jpeg'
import sonrisappInventario from '../assets/projects/sonrisapp/inventario.jpeg'
import sonrisappOdontograma from '../assets/projects/sonrisapp/odontograma.jpeg'
import voxpayCobro from '../assets/projects/voxpay/cobro.jpeg'
import voxpayDashboard from '../assets/projects/voxpay/dashboard.jpeg'
import voxpayLogin from '../assets/projects/voxpay/login.jpeg'
import invictoDashboard from '../assets/projects/invicto/dashboard.jpeg'
import invictoLogin from '../assets/projects/invicto/login.jpeg'
import deliciappCocina from '../assets/projects/deliciapp/cocina.jpeg'
import deliciappLogin from '../assets/projects/deliciapp/login.jpeg'
import deliciappPedidos from '../assets/projects/deliciapp/pedidos.jpeg'
import almoraCarrito from '../assets/projects/almorahome/carrito.jpeg'
import almoraPanel from '../assets/projects/almorahome/panel.jpeg'
import almoraTienda from '../assets/projects/almorahome/tienda.jpeg'
import averoInicio from '../assets/projects/averolabs/inicio.jpeg'
import averoNosotros from '../assets/projects/averolabs/nosotros.jpeg'
import averoServicios from '../assets/projects/averolabs/servicios.jpeg'
import type { Localized } from '../lib/locale'

export const site = {
  name: 'José Rondón',
  shortName: 'JR',
  role: { es: 'Ingeniero de Software', en: 'Software Engineer' },
  headline: 'José Rondón',
  subhead: {
    es: 'Desarrollo software a medida, SaaS, plataformas web e integraciones de Inteligencia Artificial, agentes y chatbots.',
    en: 'I build custom software, SaaS, web platforms and Artificial Intelligence integrations, agents and chatbots.',
  },
  about: {
    es: [
      'Soy José Alberto Rondón. Diseño y desarrollo software a medida, páginas web, tiendas online y plataformas SaaS multi‑tenant con automatización de IA, además de un sistema POS con cobro por voz sobre blockchain y soluciones industriales resilientes frente a caídas de red. Mi experiencia abarca CRM para clínicas, catálogos e‑commerce con gestión de stock y analítica en vivo, y sistemas integrados para sectores como salud, restaurantes, gimnasios e industria.',
      'Domino arquitecturas backend (Node.js, Spring Boot, Java) y frontend (Next.js, React, Angular), junto con contratos inteligentes en Soroban (Stellar) e integración de agentes de Inteligencia Artificial. Mi enfoque es cerrar todo el ciclo del software: interfaces ágiles, datos en tiempo real y procesos automatizados que generan un impacto real en el negocio.',
    ],
    en: [
      "I'm José Alberto Rondón. I design and build custom software, websites, online stores and multi‑tenant SaaS platforms with AI automation, as well as a voice-driven POS that settles payments on blockchain and industrial solutions that stay resilient through network outages. My experience spans CRMs for clinics, e‑commerce catalogs with stock management and live analytics, and integrated systems for sectors such as healthcare, restaurants, gyms and industry.",
      'I work across backend architectures (Node.js, Spring Boot, Java) and frontend (Next.js, React, Angular), along with smart contracts on Soroban (Stellar) and AI agent integration. My focus is closing the whole software loop: responsive interfaces, real-time data and automated processes that make a real impact on the business.',
    ],
  },
  github: 'https://github.com/Rondnt',
  githubHandle: 'Rondnt',
  email: 'joserondon0319@gmail.com',
  phone: '+51 995 296 282',
  whatsapp: 'https://wa.me/51995296282',
  whatsappMessage: {
    es: 'Hola José, vi tu portafolio y me gustaría conversar sobre un proyecto.',
    en: "Hi José, I saw your portfolio and I'd like to talk about a project.",
  },
  linkedin: 'https://www.linkedin.com/in/jose-rondon-torres-3244501b3',
  avatar: 'https://avatars.githubusercontent.com/u/107903082?v=4',
} as const

export const stackGroups = [
  {
    title: { es: 'Frontend', en: 'Frontend' },
    items: ['React', 'Next.js', 'Angular', 'Vue.js', 'TypeScript', 'Tailwind CSS', 'HTML', 'CSS', 'JavaScript', 'RxJS', 'Angular Material', 'Flutter'],
  },
  {
    title: { es: 'Backend', en: 'Backend' },
    items: ['NestJS', 'Spring Boot', 'Node.js', 'PHP', 'Java', 'Python', 'Express'],
  },
  {
    title: { es: 'DevOps', en: 'DevOps' },
    items: ['Docker', 'CI/CD', 'Git/GitLab', 'GitHub', 'JWT/RBAC', 'Clean Architecture', 'Microservicios', 'Design Patterns', 'Clean Code'],
  },
  {
    title: { es: 'IA & Blockchain', en: 'AI & Blockchain' },
    items: ['LLMs', 'Sistemas Multi-Agentes', 'Stellar / Soroban', 'Rust'],
  },
  {
    title: { es: 'Bases de Datos', en: 'Databases' },
    items: ['PostgreSQL', 'MySQL', 'MongoDB', 'SQLite'],
  },
] as const

export type ProjectImage = {
  src: string
  alt: Localized
}

export type Project = {
  name: string
  year: string
  status?: Localized
  summary: Localized
  stack: string[]
  repo?: string
  live?: string
  images: ProjectImage[]
  featured?: boolean
}

export const projects: Project[] = [
  {
    name: 'SonrisApp',
    year: '2026',
    summary: {
      es: 'SaaS multi-sede en producción para clínicas dentales: historia clínica, agenda online, facturación electrónica, CRM y portal del paciente.',
      en: 'Multi-location SaaS in production for dental clinics: clinical records, online booking, electronic invoicing, CRM and patient portal.',
    },
    stack: ['React', 'TypeScript', 'Express', 'PostgreSQL', 'Prisma', 'Socket.IO', 'Docker'],
    live: 'https://sonrisapp.averoapps.com',
    images: [
      { src: sonrisappDashboard, alt: { es: 'Dashboard de SonrisApp con ingresos y estado de citas', en: 'SonrisApp dashboard with revenue and appointment status' } },
      { src: sonrisappOdontograma, alt: { es: 'Odontograma interactivo de SonrisApp', en: 'SonrisApp interactive dental chart' } },
      { src: sonrisappInventario, alt: { es: 'Inventario de SonrisApp con alertas de stock bajo', en: 'SonrisApp inventory with low-stock alerts' } },
    ],
    featured: true,
  },
  {
    name: 'DeliciApp',
    year: '2026',
    summary: {
      es: 'SaaS multi-tenant en producción para restaurantes: pedidos por QR desde la mesa, cocina en tiempo real, caja, inventario y facturación electrónica.',
      en: 'Multi-tenant SaaS in production for restaurants: QR ordering from the table, real-time kitchen, cashier, inventory and electronic invoicing.',
    },
    stack: ['Angular', 'NestJS', 'TypeScript', 'TypeORM', 'PostgreSQL', 'Docker'],
    live: 'https://deliciapp.averoapps.com',
    images: [
      { src: deliciappLogin, alt: { es: 'Pantalla de inicio de sesión de DeliciApp', en: 'DeliciApp sign-in screen' } },
      { src: deliciappPedidos, alt: { es: 'Tablero de pedidos de DeliciApp por estado', en: 'DeliciApp order board by status' } },
      { src: deliciappCocina, alt: { es: 'Pantalla de cocina (KDS) de DeliciApp con comandas en preparación', en: 'DeliciApp kitchen display (KDS) with orders in progress' } },
    ],
    featured: true,
  },
  {
    name: 'Almora Home',
    year: '2026',
    summary: {
      es: 'Tienda online en producción de miniaturas y objetos de colección, con su propio panel de inventario y ventas. Los pedidos se cierran por WhatsApp.',
      en: 'Online store in production for miniatures and collectibles, with its own inventory and sales dashboard. Orders are closed over WhatsApp.',
    },
    stack: ['React', 'TypeScript', 'Express', 'PostgreSQL', 'Prisma', 'Cloudinary', 'Docker'],
    live: 'https://almorahome.com/tienda',
    images: [
      { src: almoraTienda, alt: { es: 'Portada de la tienda online de Almora Home', en: 'Almora Home online store front page' } },
      { src: almoraCarrito, alt: { es: 'Carrito de Almora Home con el pedido listo para enviar por WhatsApp', en: 'Almora Home cart with the order ready to send over WhatsApp' } },
      { src: almoraPanel, alt: { es: 'Panel de administración de Almora Home con ingresos e inventario', en: 'Almora Home admin dashboard with revenue and inventory' } },
    ],
    featured: true,
  },
  {
    name: 'AVERO Labs',
    year: '2026',
    summary: {
      es: 'Landing page bilingüe de AVERO Labs, generada como sitio estático a partir de un solo archivo JSON, para reutilizarla con otras marcas.',
      en: 'Bilingual landing page for AVERO Labs, generated as a static site from a single JSON file so it can be reused for other brands.',
    },
    stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Zod', 'Docker'],
    live: 'https://averoapps.com',
    images: [
      { src: averoInicio, alt: { es: 'Portada de la landing page de AVERO Labs', en: 'AVERO Labs landing page hero' } },
      { src: averoServicios, alt: { es: 'Sección de servicios de AVERO Labs', en: 'AVERO Labs services section' } },
      { src: averoNosotros, alt: { es: 'Sección sobre AVERO Labs con sus beneficios', en: 'AVERO Labs about section with its benefits' } },
    ],
    featured: true,
  },
  {
    name: 'Invicto',
    year: '2026',
    status: { es: 'MVP en desarrollo', en: 'MVP in development' },
    summary: {
      es: 'SaaS multi-tenant para gimnasios con una o varias sedes: membresías, control de acceso, caja, entrenamiento y reportes por sede o consolidados.',
      en: 'Multi-tenant SaaS for gyms with one or more locations: memberships, access control, cashier, training and per-location or consolidated reports.',
    },
    stack: ['Angular', 'NestJS', 'TypeScript', 'PostgreSQL', 'JWT', 'Docker'],
    images: [
      { src: invictoLogin, alt: { es: 'Pantalla de inicio de sesión de Invicto', en: 'Invicto sign-in screen' } },
      { src: invictoDashboard, alt: { es: 'Dashboard de Invicto con ingresos y estado de clientes', en: 'Invicto dashboard with revenue and client status' } },
    ],
    featured: true,
  },
  {
    name: 'VoxPay',
    year: '2026',
    summary: {
      es: 'POS por voz: el comerciante habla, un agente interpreta el cobro y Stellar lo ejecuta en testnet, con reparto on-chain.',
      en: 'Voice POS: the merchant speaks, an agent interprets the charge and Stellar executes it on testnet, with on-chain payment splitting.',
    },
    stack: ['Next.js', 'NestJS', 'FastAPI', 'Soroban', 'Stellar'],
    images: [
      { src: voxpayLogin, alt: { es: 'Pantalla de inicio de sesión de VoxPay', en: 'VoxPay sign-in screen' } },
      { src: voxpayCobro, alt: { es: 'Nuevo cobro por voz en VoxPay con la mascota Voxi', en: 'New voice charge in VoxPay with the Voxi mascot' } },
      { src: voxpayDashboard, alt: { es: 'Dashboard de VoxPay con los cobros del día en USDC', en: "VoxPay dashboard with the day's charges in USDC" } },
    ],
    featured: true,
  },
]
