export const profile = {
  name: 'DJOUNDI BAKARI',
  role: 'Alternant Développeur Web',
  tagline:
    "Étudiant Web@cadémie à Epitech Lyon, je transforme cahiers des charges et maquettes en applications web complètes.",
  location: 'Lyon, France',
  email: 'djoundi.bakari@outlook.fr',
  phone: '06 64 29 81 21',
  socials: [{ label: 'GitHub', href: 'https://github.com/djoundibakari-blip' }],
}

export type Project = {
  id: string
  arcana: string
  rank: string
  title: string
  category: string
  description: string
  stack: string[]
  competences: string[]
  github: string
  live: string
  image: string
  screenshot: string
}

export const projects: Project[] = [
  {
    id: '01',
    arcana: 'The Magician',
    rank: 'RANK 8',
    title: "Réseau Social d'Entreprise",
    category: 'Full-Stack · Laravel',
    description:
      "Réseau interne avec fil d'actualité, connexion et création de compte, conteneurisé avec Docker.",
    stack: ['Laravel', 'Docker', 'Tailwind CSS', 'PHP'],
    competences: ['Authentification', 'Back-end & BDD', 'Déploiement'],
    github: 'https://github.com/djoundibakari-blip/esn',
    live: 'https://esn-flame.vercel.app',
    image: '/proj-esn.jpg',
    screenshot: '/proj-esn-live.jpg',
  },
  {
    id: '02',
    arcana: 'The Moon',
    rank: 'RANK 7',
    title: 'My Cinema',
    category: 'Back-end · PHP/SQL',
    description:
      'Home cinema avec catalogue de films, horaires et réservation en ligne.',
    stack: ['PHP', 'SQL', 'Tailwind CSS', 'HTML'],
    competences: ['Base de données', 'Back-end', 'Front-end'],
    github: 'https://github.com/djoundibakari-blip/my-cinema',
    live: 'https://my-cinema-one.vercel.app',
    image: '/proj-cinema.jpg',
    screenshot: '/proj-cinema-live.jpg',
  },
  {
    id: '03',
    arcana: 'The Hermit',
    rank: 'RANK 6',
    title: 'Générateur de CV',
    category: 'Front-end · JavaScript',
    description:
      'Génère un CV personnalisé à partir d’informations saisies, avec une interface simple et intuitive.',
    stack: ['HTML', 'JavaScript', 'Bootstrap', 'PHP'],
    competences: ['Front-end', 'Rédiger le code', 'Ergonomie & accessibilité'],
    github: 'https://github.com/djoundibakari-blip/generateur-de-CV',
    live: 'https://generateur-de-cv-eight.vercel.app',
    image: '/proj-cv.jpg',
    screenshot: '/proj-cv-live.jpg',
  },
  {
    id: '04',
    arcana: 'The Lovers',
    rank: 'RANK 8',
    title: 'Klivio — Intégration Web',
    category: 'Intégration · Tailwind CSS',
    description:
      'Intégration d’une maquette en deux phases : HTML/CSS pur, puis redesign en Tailwind CSS v4.',
    stack: ['HTML', 'CSS', 'Tailwind CSS'],
    competences: ['Intégration', 'Maquettage', 'Front-end'],
    github: 'https://github.com/djoundibakari-blip/Klivio',
    live: 'https://klivio-chi.vercel.app',
    image: '/proj-klivio.jpg',
    screenshot: '/proj-klivio-live.jpg',
  },
  {
    id: '05',
    arcana: 'The Star',
    rank: 'RANK 9',
    title: 'Videops — Jeux Rétro',
    category: 'Front-end · CI/CD',
    description:
      'Collection de jeux arcade rétro déployée via une pipeline CI/CD automatisée avec GitHub Actions.',
    stack: ['JavaScript', 'HTML', 'CI/CD'],
    competences: ['Déploiement', 'Plan de tests', 'Front-end'],
    github: 'https://github.com/djoundibakari-blip/Videops',
    live: 'https://videops-one.vercel.app',
    image: '/proj-videops.jpg',
    screenshot: '/proj-videops-live.jpg',
  },
  {
    id: '06',
    arcana: 'The World',
    rank: 'MAX',
    title: 'CoreLab — LMS',
    category: 'Full-Stack · MERN (projet perso)',
    description:
      'Plateforme LMS full-stack : gestion de cours, leçons, QCM et suivi des notes, avec authentification JWT.',
    stack: ['React', 'Node.js', 'MongoDB', 'TypeScript'],
    competences: ['Authentification', 'Back-end & BDD', 'Front-end'],
    github: 'https://github.com/djoundibakari-blip/corelab',
    live: 'https://corelab-silk.vercel.app',
    image: '/proj-corelab.jpg',
    screenshot: '/proj-corelab-live.jpg',
  },
]

export type CompetenceBlock = {
  block: string
  level: number
  summary: string
  items: string[]
}

export const competenceBlocks: CompetenceBlock[] = [
  {
    block: 'Cadrer un projet et conceptualiser une solution web',
    level: 80,
    summary:
      'Cahier des charges, spécifications techniques et maquettes pour cadrer un projet web de A à Z.',
    items: [
      'Rédiger un CDC',
      'Spécifications techniques',
      'Environnement de travail',
      'Réaliser une maquette',
      'Identifier les fonctionnalités',
      'Rédiger une présentation',
    ],
  },
  {
    block: 'Développer une solution web',
    level: 88,
    summary:
      'Du prototype au déploiement : intégration front-end, logique back-end, authentification et tests.',
    items: [
      'Développer le prototype',
      'Rédiger le code',
      'Intégrer les éléments',
      'Front-end',
      'Back-end',
      'Authentification',
      'Plan de tests',
      'Déployer',
    ],
  },
  {
    block: "Déployer un système d'assurance qualité",
    level: 74,
    summary:
      "Documentation technique et utilisateur, monitoring du lancement et amélioration continue de l'ergonomie.",
    items: [
      'Documentation technique',
      'Documentation utilisateur',
      'Monitorer le lancement',
      'Identifier les améliorations',
      'Ergonomie & accessibilité',
      'Document argumentatif',
    ],
  },
]

export const navLinks = [
  { id: 'hero', label: 'Accueil' },
  { id: 'about', label: 'Profil' },
  { id: 'projects', label: 'Projets' },
  { id: 'skills', label: 'Compétences' },
  { id: 'contact', label: 'Contact' },
]
