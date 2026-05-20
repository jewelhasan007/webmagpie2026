import {
  Search,
  Lightbulb,
  PenTool,
  Code,
  Rocket,
  BarChart3,
} from 'lucide-react';

export const processSteps = [
  {
    sl: 1,
    title: 'Discovery',
    icon: Search,
    color: 'from-blue-500 to-cyan-500',
    short:
      'Understanding your business, audience, and goals.',
    details: [
      'We analyze your business model',
      'We research your competitors',
      'We define your target audience',
      'We identify core problems',
    ],
  },
  {
    sl: 2,
    title: 'Strategy',
    icon: Lightbulb,
    color: 'from-purple-500 to-pink-500',
    short:
      'Building a clear roadmap for success.',
    details: [
      'We create a project roadmap',
      'Define technical architecture',
      'Set KPIs and goals',
      'Plan timelines and milestones',
    ],
  },
  {
    sl: 3,
    title: 'Design',
    icon: PenTool,
    color: 'from-orange-500 to-red-500',
    short:
      'Crafting user-focused UI/UX design.',
    details: [
      'Wireframing user flow',
      'UI/UX prototyping',
      'Design system creation',
      'Mobile-first optimization',
    ],
  },
  {
    sl: 4,
    title: 'Development',
    icon: Code,
    color: 'from-emerald-500 to-teal-500',
    short:
      'Building scalable digital solutions.',
    details: [
      'Frontend development (React/Next)',
      'Backend API integration',
      'Database setup',
      'Performance optimization',
    ],
  },
  {
    sl: 5,
    title: 'Launch',
    icon: Rocket,
    color: 'from-indigo-500 to-blue-500',
    short:
      'Deploying your product with precision.',
    details: [
      'Production deployment',
      'Server setup',
      'Bug fixing & QA',
      'Final performance checks',
    ],
  },
  {
    sl: 6,
    title: 'Growth',
    icon: BarChart3,
    color: 'from-fuchsia-500 to-violet-500',
    short:
      'Scaling and improving your product.',
    details: [
      'SEO optimization',
      'Performance tracking',
      'Feature improvements',
      'Long-term support',
    ],
  },
];