import sonrisappDashboard from '../assets/projects/sonrisapp/dashboard.jpeg'
import sonrisappInventario from '../assets/projects/sonrisapp/inventario.jpeg'
import sonrisappOdontograma from '../assets/projects/sonrisapp/odontograma.jpeg'
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

export const site = {
  name: 'José Rondón',
  shortName: 'JR',
  role: 'Ingeniero de Software',
  headline: 'José Rondón',
  subhead:
    'Desarrollo software a medida, SaaS, plataformas web e integraciones de Inteligencia Artificial, agentes y chatbots.',
  about: [
    'Soy José Alberto Rondón. Diseño y desarrollo software a medida, páginas web, tiendas online y plataformas SaaS multi‑tenant con automatización de IA, además de un sistema POS con cobro por voz sobre blockchain y soluciones industriales resilientes frente a caídas de red. Mi experiencia abarca CRM clínicas, catálogos e‑commerce con gestión de stock y analítica en vivo, y sistemas integrados para sectores como salud, restaurantes, gimnasios e industria.',
    'Domino arquitecturas backend (Node.js, Spring Boot, Java) y frontend (Next.js, React, Angular), junto con contratos inteligentes en Soroban (Stellar) e integración de agentes de Inteligencia Artificial. Mi enfoque es cerrar todo el ciclo del software: interfaces ágiles, datos en tiempo real y procesos automatizados que generan un impacto real en el negocio.',
  ],
  github: 'https://github.com/Rondnt',
  githubHandle: 'Rondnt',
  email: 'joserondon0319@gmail.com',
  phone: '+51 995 296 282',
  whatsapp: 'https://wa.me/51995296282',
  linkedin: 'https://www.linkedin.com/in/jose-rondon-torres-3244501b3',
  avatar: 'https://avatars.githubusercontent.com/u/107903082?v=4',
  location: 'Perú',
} as const

export const stackGroups = [
  {
    title: 'Frontend',
    items: ['React', 'Next.js', 'Angular', 'Vue.js', 'TypeScript', 'Tailwind CSS', 'HTML', 'CSS', 'JavaScript', 'RxJS', 'Angular Material', 'Flutter'],
  },
  {
    title: 'Backend',
    items: ['NestJS', 'Spring Boot', 'Node.js', 'PHP', 'Java', 'Python', 'Express'],
  },
  {
    title: 'DevOps',
    items: ['Docker', 'CI/CD', 'Git/GitLab', 'GitHub', 'JWT/RBAC', 'Clean Architecture', 'Microservicios', 'Design Patterns', 'Clean Code'],
  },
  {
    title: 'IA & Blockchain',
    items: ['LLMs', 'Sistemas Multi-Agentes', 'Stellar / Soroban', 'Rust'],
  },
  {
    title: 'Bases de Datos',
    items: ['PostgreSQL', 'MySQL', 'MongoDB', 'SQLite'],
  },
] as const

export type ProjectImage = {
  src: string
  alt: string
}

export type Project = {
  name: string
  year: string
  status?: string
  summary: string
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
    summary:
      'SaaS multi-sede en producción para clínicas dentales: historia clínica, agenda online, facturación electrónica, CRM y portal del paciente.',
    stack: ['React', 'TypeScript', 'Express', 'PostgreSQL', 'Prisma', 'Socket.IO', 'Docker'],
    live: 'https://sonrisapp.averoapps.com',
    images: [
      { src: sonrisappDashboard, alt: 'Dashboard de SonrisApp con ingresos y estado de citas' },
      { src: sonrisappOdontograma, alt: 'Odontograma interactivo de SonrisApp' },
      { src: sonrisappInventario, alt: 'Inventario de SonrisApp con alertas de stock bajo' },
    ],
    featured: true,
  },
  {
    name: 'Invicto',
    year: '2026',
    status: 'MVP en desarrollo',
    summary:
      'SaaS multi-tenant para gimnasios con una o varias sedes: membresías, control de acceso, caja, entrenamiento y reportes por sede o consolidados.',
    stack: ['Angular', 'NestJS', 'TypeScript', 'PostgreSQL', 'JWT', 'Docker'],
    images: [
      { src: invictoLogin, alt: 'Pantalla de inicio de sesión de Invicto' },
      { src: invictoDashboard, alt: 'Dashboard de Invicto con ingresos y estado de clientes' },
    ],
    featured: true,
  },
  {
    name: 'DeliciApp',
    year: '2026',
    summary:
      'SaaS multi-tenant en producción para restaurantes: pedidos por QR desde la mesa, cocina en tiempo real, caja, inventario y facturación electrónica.',
    stack: ['Angular', 'NestJS', 'TypeScript', 'TypeORM', 'PostgreSQL', 'Docker'],
    live: 'https://deliciapp.averoapps.com',
    images: [
      { src: deliciappLogin, alt: 'Pantalla de inicio de sesión de DeliciApp' },
      { src: deliciappPedidos, alt: 'Tablero de pedidos de DeliciApp por estado' },
      { src: deliciappCocina, alt: 'Pantalla de cocina (KDS) de DeliciApp con comandas en preparación' },
    ],
    featured: true,
  },
  {
    name: 'Almora Home',
    year: '2026',
    summary:
      'Tienda online en producción de miniaturas y objetos de colección, con su propio panel de inventario y ventas. Los pedidos se cierran por WhatsApp.',
    stack: ['React', 'TypeScript', 'Express', 'PostgreSQL', 'Prisma', 'Cloudinary', 'Docker'],
    live: 'https://almorahome.com/tienda',
    images: [
      { src: almoraTienda, alt: 'Portada de la tienda online de Almora Home' },
      { src: almoraCarrito, alt: 'Carrito de Almora Home con el pedido listo para enviar por WhatsApp' },
      { src: almoraPanel, alt: 'Panel de administración de Almora Home con ingresos e inventario' },
    ],
    featured: true,
  },
  {
    name: 'AVERO Labs',
    year: '2026',
    summary:
      'Landing page bilingüe de AVERO Labs, generada como sitio estático a partir de un solo archivo JSON, para reutilizarla con otras marcas.',
    stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Zod', 'Docker'],
    live: 'https://averoapps.com',
    images: [
      { src: averoInicio, alt: 'Portada de la landing page de AVERO Labs' },
      { src: averoServicios, alt: 'Sección de servicios de AVERO Labs' },
      { src: averoNosotros, alt: 'Sección sobre AVERO Labs con sus beneficios' },
    ],
    featured: true,
  },
  {
    name: 'VoxPay',
    year: '2026',
    summary:
      'POS por voz: el comerciante habla, un agente interpreta el cobro y Stellar lo ejecuta en testnet, con reparto on-chain.',
    stack: ['Next.js', 'NestJS', 'FastAPI', 'Soroban', 'Stellar'],
    repo: 'https://github.com/Rondnt/VoxPay-Stellar',
    live: 'https://voxpay--voxpay-gj.us-central1.hosted.app',
    images: [
      { src: voxpayLogin, alt: 'Pantalla de inicio de VoxPay' },
    ],
    featured: true,
  },
]
