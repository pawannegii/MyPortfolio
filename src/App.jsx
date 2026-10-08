import React, { useState, useEffect, useRef } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  ExternalLink,
  Download,
  Sun,
  Moon,
  Menu,
  X,
  Terminal,
  Database,
  Code2,
  Cpu,
  Layers,
  Sparkles,
  Mail,
  CheckCircle2,
  AlertCircle,
  FileText
} from 'lucide-react';
import avatarImg from './assets/avatar.png';

// Theme state helpers
const getStoredTheme = () => {
  try {
    const saved = window.localStorage.getItem('theme');
    return ['light', 'dark'].includes(saved) ? saved : null;
  } catch {
    return null;
  }
};

const setStoredTheme = (theme) => {
  try {
    window.localStorage.setItem('theme', theme);
  } catch {
    // Storage can be unavailable in restricted contexts
  }
};

const getPreferredTheme = () => {
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
};

// Portfolio Projects (Desert Ant Feature Showcase)
const projectsData = [
  {
    id: 'ofira',
    title: 'OFIRA',
    tag: 'Hyperlocal Micro-tasks · 2026',
    category: 'Frontend & Web Engineering',
    themeClass: 'feature-card--teal',
    tilt: '-2.2deg',
    claim: 'Connect with locals for urgent micro-tasks in real time. Apna locality batao — baaki hum dekhenge.',
    description: 'A community-first platform designed to simplify everyday urban life. Enables users to post quick localized micro-tasks and connect directly with nearby helpers without unnecessary friction.',
    client: 'Independent Project',
    year: '2026',
    technologies: ['React.js', 'Vite', 'HTML5', 'Modern CSS', 'Vercel'],
    link: 'https://myofira.vercel.app/',
    github: 'https://github.com/pawannegii',
    highlights: [
      'Engineered localized micro-task discovery with responsive modular components.',
      'Designed frictionless user flow for immediate neighborhood task creation.',
      'Deployed on Vercel with high-speed asset delivery.'
    ]
  },
  {
    id: 'dataviz',
    title: 'DataViz & Predictive Analysis',
    tag: 'Data Science & Machine Learning · 2025–2026',
    category: 'Analytics & Machine Learning',
    themeClass: 'feature-card--terracotta',
    tilt: '0deg',
    claim: 'Exploratory data analysis, statistical model building, and high-density visual patterns.',
    description: 'Data analytics and machine learning pipelines developed with Python, NumPy, Pandas, and Matplotlib. Focused on structured dataset analysis, hypothesis testing, and practical pattern recognition.',
    client: 'Academic & Research',
    year: '2025–2026',
    technologies: ['Python', 'NumPy', 'Pandas', 'Matplotlib', 'SQL'],
    link: 'https://github.com/pawannegii',
    github: 'https://github.com/pawannegii',
    highlights: [
      'Implemented end-to-end data cleaning, transformation, and exploratory visualizations.',
      'Applied fundamental machine learning algorithms for classification and regression tasks.',
      'Evaluated model accuracy metrics and feature importance distributions.'
    ]
  },
  {
    id: 'algomatrix',
    title: 'AlgoMatrix Core',
    tag: 'Systems & Data Structures · 2024–2026',
    category: 'Algorithms & Problem Solving',
    themeClass: 'feature-card--sage',
    tilt: '2.4deg',
    claim: 'Optimized algorithmic problem-solving and structured implementations across platforms.',
    description: 'A comprehensive repository of competitive programming challenges, graph traversals, dynamic programming solutions, and data structures implemented in C++, Java, and C.',
    client: 'Competitive Programming',
    year: '2024–2026',
    technologies: ['C++', 'Java', 'C', 'Algorithms', 'Data Structures'],
    link: 'https://leetcode.com/u/pawannegi2006/',
    github: 'https://github.com/pawannegii',
    highlights: [
      'Solved hundreds of algorithmic challenges across LeetCode, Codeforces, and HackerRank.',
      'Focused on optimal time-complexity bounds (O(n log n), O(n)) and memory profiling.',
      'Practiced disciplined pattern categorization: sliding window, two pointers, graphs, and DP.'
    ]
  }
];

// Tech Icon Component for Badge Display (Matching reference image)
function TechIcon({ name }) {
  switch (name) {
    case 'Python':
      return (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 2C8 2 6 3.5 6 6v3h6v1H5C3 10 2 12 2 15s1.5 5 4.5 5H8v-2.5C8 16 9 15 10.5 15h3c1.5 0 2.5-1 2.5-2.5V9H18c2 0 3-1.5 3-3.5S19.5 2 16.5 2H12zm-2 2a1 1 0 110 2 1 1 0 010-2z" />
          <path d="M12 22c4 0 6-1.5 6-4v-3h-6v-1h7c2 0 3-2 3-5s-1.5-5-4.5-5H16v2.5c0 1.5-1 2.5-2.5 2.5h-3C9 14 8 15 8 16.5V20H6c-2 0-3 1.5-3 3.5S4.5 22 7.5 22H12zm2-2a1 1 0 110-2 1 1 0 010 2z" />
        </svg>
      );
    case 'C++':
      return (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polygon points="12 2 21 7.2 21 16.8 12 22 3 16.8 3 7.2 12 2" />
          <path d="M9 10a3 3 0 1 0 0 4" />
          <path d="M13 12h2.5m-1.25-1.25v2.5" />
          <path d="M17.5 12h2.5m-1.25-1.25v2.5" />
        </svg>
      );
    case 'C':
      return (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polygon points="12 2 21 7.2 21 16.8 12 22 3 16.8 3 7.2 12 2" />
          <path d="M14 9a3.5 3.5 0 1 0 0 6" />
        </svg>
      );
    case 'Java':
      return (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M5 10h11a3 3 0 0 1 3 3v1a3 3 0 0 1-3 3H5a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2z" />
          <path d="M16 12h2a1.5 1.5 0 0 1 0 3h-2" />
          <path d="M8 5c0 1.5-1 2.5-1 3.5m4-3.5c0 1.5-1 2.5-1 3.5m4-3.5c0 1.5-1 2.5-1 3.5" />
          <path d="M3 19h14" />
        </svg>
      );
    case 'JavaScript':
      return (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="4" />
          <path d="M8.5 12v3a1.5 1.5 0 0 1-3 0" />
          <path d="M13 16.5c1 1 2.5 1 3 0s-.5-1.5-1.5-2-1.5-1-.5-2 2-.5 2.5.5" />
        </svg>
      );
    case 'HTML':
    case 'HTML5':
      return (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M4 3l1.8 16.2L12 21l6.2-1.8L20 3H4z" />
          <path d="M16.5 7H7.5l.5 4.5h7.5l-.5 4.5L12 17l-3-.9-.2-2" />
        </svg>
      );
    case 'CSS':
    case 'CSS3':
      return (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M4 3l1.8 16.2L12 21l6.2-1.8L20 3H4z" />
          <path d="M8 7.5h8l-.5 4H8.5l.3 3L12 15.5l3.2-1-.3-2.5" />
        </svg>
      );
    case 'React':
      return (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(0 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
          <circle cx="12" cy="12" r="1.8" fill="currentColor" />
        </svg>
      );
    case 'Tailwind CSS':
      return (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
          <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.335 6.182 14.974 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.335 13.382 8.974 12 6.001 12z" />
        </svg>
      );
    case 'SQL':
    case 'MySQL':
    case 'DBMS':
      return (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <ellipse cx="12" cy="5" rx="8" ry="3" />
          <path d="M4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5" />
          <path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3" />
        </svg>
      );
    case 'Machine Learning':
      return (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 2a4 4 0 0 0-4 4v1a4 4 0 0 0 0 8v1a4 4 0 0 0 4 4 4 4 0 0 0 4-4v-1a4 4 0 0 0 0-8V6a4 4 0 0 0-4-4z" />
          <circle cx="12" cy="7" r="1.5" fill="currentColor" />
          <circle cx="12" cy="12" r="1.5" fill="currentColor" />
          <circle cx="12" cy="17" r="1.5" fill="currentColor" />
          <path d="M8 7H5m3 5H4m4 5H5m11-10h3m-3 5h4m-4 5h3" />
        </svg>
      );
    case 'NumPy':
      return (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M4 7l8-4 8 4-8 4-8-4z" />
          <path d="M4 7v10l8 4V11" />
          <path d="M20 7v10l-8 4" />
          <path d="M9 13l3 1.5 3-1.5" />
        </svg>
      );
    case 'Pandas':
      return (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="3" y="4" width="18" height="16" rx="3" />
          <line x1="3" y1="10" x2="21" y2="10" />
          <line x1="9" y1="4" x2="9" y2="20" />
          <line x1="15" y1="4" x2="15" y2="20" />
        </svg>
      );
    case 'Matplotlib':
      return (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="9" />
          <path d="M8 15c2-4 3-5 5-1s3 4 5-3" />
        </svg>
      );
    case 'Data Analytics':
      return (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      );
    case 'Statistics':
    case 'Statistical Modeling':
      return (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M3 19h18" />
          <path d="M4 17c3-1 5-12 8-12s5 11 8 12" />
        </svg>
      );
    case 'Git':
      return (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="6" cy="6" r="2.5" />
          <circle cx="18" cy="9" r="2.5" />
          <circle cx="6" cy="18" r="2.5" />
          <path d="M6 8.5v7m12-2l-7 4-5-3" />
        </svg>
      );
    case 'GitHub':
      return (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
          <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
      );
    case 'VS Code':
      return (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M16.5 3L8 9.5 3 6l-1 2 4 4-4 4 1 2 5-3.5 8.5 6.5 5-2.5V5.5L16.5 3z" />
          <path d="M16.5 3v18" />
        </svg>
      );
    case 'Linux':
      return (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="4 17 10 11 4 5" />
          <line x1="12" y1="19" x2="20" y2="19" />
        </svg>
      );
    case 'Vercel':
      return (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
          <polygon points="12 3 22 21 2 21" />
        </svg>
      );
    case 'Vite':
      return (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      );
    case 'Excel':
      return (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <line x1="8" y1="8" x2="16" y2="16" />
          <line x1="16" y1="8" x2="8" y2="16" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      );
  }
}

// Categorized Skills Data (Matching user screenshot structure)
const skillsGrouped = [
  {
    title: 'Languages',
    skills: ['Python', 'C++', 'C', 'Java', 'SQL', 'JavaScript', 'HTML5', 'CSS3']
  },
  {
    title: 'Data Science & Machine Learning',
    skills: ['Machine Learning', 'NumPy', 'Pandas', 'Matplotlib', 'Data Analytics', 'Statistical Modeling', 'Excel']
  },
  {
    title: 'Frontend',
    skills: ['React', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Vite']
  },
  {
    title: 'Backend, Database & Tools',
    skills: ['MySQL', 'DBMS', 'Git', 'GitHub', 'VS Code', 'Linux', 'Vercel']
  }
];

// Coding Profiles for Unified Direct Inquiries Selector
const codingProfilesData = [
  {
    name: 'LeetCode',
    handle: '@pawannegi2006',
    desc: 'Algorithmic problem solving, data structures & daily challenges',
    url: 'https://leetcode.com/u/pawannegi2006/',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .666-1.751L9.07 7.768l4.413-4.72a1.374 1.374 0 0 0-.999-3.048zm2.445 10.638H9.378c-.768 0-1.39.622-1.39 1.39s.622 1.39 1.39 1.39h6.55c.768 0 1.39-.622 1.39-1.39s-.622-1.39-1.39-1.39z" />
      </svg>
    )
  },
  {
    name: 'HackerRank',
    handle: '@pawan_negi',
    desc: 'Problem solving skills, certifications & coding challenges',
    url: 'https://www.hackerrank.com/profile/pawan_negi',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm3.87 17.5h-2.12v-4.12h-3.5v4.12H8.13V6.5h2.12v4.13h3.5V6.5h2.12v11z" />
      </svg>
    )
  },
  {
    name: 'Codeforces',
    handle: '@pawannegi2006',
    desc: 'Rated contest rounds, competitive algorithms & problem sets',
    url: 'https://codeforces.com/profile/pawannegi2006',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <rect x="2" y="10" width="5" height="11" rx="1.5" />
        <rect x="9.5" y="4" width="5" height="17" rx="1.5" />
        <rect x="17" y="7" width="5" height="14" rx="1.5" />
      </svg>
    )
  }
];

// Academic Milestones & Timeline
const academicSpec = [
  {
    period: '2025 — 2028',
    title: 'Bachelor of Computer Applications (BCA) — 2nd Year',
    institution: 'Maharishi University of Information Technology (Noida, India)',
    detail: 'Cumulative grade(1st Year): 8.6 CGPA.'
  },
  {
    period: '2024 — 2025',
    title: 'CBSE Senior Secondary School Examination (Class XII)',
    institution: 'Government Boys Senior Secondary School (New Kondli, Delhi)',
    detail: 'Scored 77.4% with focus on science and analytical coursework.'
  },
  {
    period: '2022 — 2023',
    title: 'CBSE Secondary School Examination (Class X)',
    institution: 'Government Boys Senior Secondary School (New Kondli, Delhi)',
    detail: 'Scored 70%.'
  }
];

export default function App() {
  const [theme, setTheme] = useState(() => getStoredTheme() || getPreferredTheme());
  const [activeSection, setActiveSection] = useState('hero');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isCodingProfilesOpen, setIsCodingProfilesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNavHidden, setIsNavHidden] = useState(false);
  const [contactStatus, setContactStatus] = useState('idle'); // idle | sending | success | error

  const lastScrollY = useRef(0);
  const modalRef = useRef(null);

  // Apply theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    setStoredTheme(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Scrollspy & Nav hide/show
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY.current && currentScrollY > 120) {
        setIsNavHidden(true);
      } else if (currentScrollY < lastScrollY.current) {
        setIsNavHidden(false);
      }
      lastScrollY.current = currentScrollY;

      const sections = ['hero', 'work', 'skills', 'about', 'connect'];
      const scrollPosition = currentScrollY + window.innerHeight / 3;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock background scroll when modal is active
  useEffect(() => {
    if (selectedProject || isCodingProfilesOpen) {
      const original = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [selectedProject, isCodingProfilesOpen]);

  // Modal ESC key listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
        setIsCodingProfilesOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Contact Form handler (Web3Forms)
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    setContactStatus('sending');

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });
      let data = {};
      try {
        data = await res.json();
      } catch {
        data = {};
      }

      if (!res.ok || data.success === false) {
        throw new Error('Submission failed');
      }

      form.reset();
      setContactStatus('success');
    } catch {
      setContactStatus('error');
    }
  };

  const scrollTo = (id) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="page-wrapper">
      {/* ====================================================================
          HEADER / MINIMAL SPLIT NAVIGATION (Desert Ant Lab style)
          ==================================================================== */}
      <header className={`site-header ${isNavHidden ? 'site-header--hidden' : ''}`}>
        <div className="site-container">
          <div className="site-header-inner">
            {/* Brandmark */}
            <a href="#hero" onClick={(e) => { e.preventDefault(); scrollTo('hero'); }} className="brandmark">
              <span className="brandmark-icon" aria-hidden="true">PN</span>
              <span>Pawan Negi</span>
              <span className="brandmark-meta">Data Science / ML</span>
            </a>

            {/* Desktop Navigation */}
            <nav className="site-nav" aria-label="Main Navigation">
              <button
                type="button"
                className={`site-nav-link ${activeSection === 'work' ? 'is-active' : ''}`}
                onClick={() => scrollTo('work')}
              >
                Work
              </button>
              <button
                type="button"
                className={`site-nav-link ${activeSection === 'skills' ? 'is-active' : ''}`}
                onClick={() => scrollTo('skills')}
              >
                Skills & Intel
              </button>
              <button
                type="button"
                className={`site-nav-link ${activeSection === 'about' ? 'is-active' : ''}`}
                onClick={() => scrollTo('about')}
              >
                About
              </button>
              <button
                type="button"
                className={`site-nav-link ${activeSection === 'connect' ? 'is-active' : ''}`}
                onClick={() => scrollTo('connect')}
              >
                Connect
              </button>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="site-nav-link"
                title="View Resume (PDF)"
              >
                Resume ↗
              </a>
            </nav>

            {/* Actions: Theme Toggle & Mobile Menu */}
            <div className="header-actions">
              <button
                type="button"
                onClick={toggleTheme}
                className="theme-toggle-btn"
                aria-label={`Toggle theme. Current: ${theme}`}
                title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              >
                {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
              </button>

              <button
                type="button"
                className="mobile-menu-toggle"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle Menu"
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="mobile-nav-panel"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="mobile-nav-links">
                <button type="button" className="mobile-nav-link" onClick={() => scrollTo('work')}>
                  <span>Selected Work</span>
                  <span className="font-mono" style={{ fontSize: '0.85rem' }}>01</span>
                </button>
                <button type="button" className="mobile-nav-link" onClick={() => scrollTo('skills')}>
                  <span>Skills & Intel</span>
                  <span className="font-mono" style={{ fontSize: '0.85rem' }}>02</span>
                </button>
                <button type="button" className="mobile-nav-link" onClick={() => scrollTo('about')}>
                  <span>About & Profile</span>
                  <span className="font-mono" style={{ fontSize: '0.85rem' }}>03</span>
                </button>
                <button type="button" className="mobile-nav-link" onClick={() => scrollTo('connect')}>
                  <span>Contact & Socials</span>
                  <span className="font-mono" style={{ fontSize: '0.85rem' }}>04</span>
                </button>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mobile-nav-link"
                >
                  <span>Resume (PDF)</span>
                  <ArrowUpRight size={18} />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ====================================================================
          MAIN CONTENT STAGE
          ==================================================================== */}
      <main>
        {/* ==================================================================
            HERO SECTION (Desert Ant Editorial Composition)
            ================================================================== */}
        <section id="hero" className="hero-section">
          <div className="site-container">
            <span className="eyebrow" style={{ marginBottom: '1.25rem' }}>
              Portfolio · 2026 Edition · Pawan Negi
            </span>

            <h1 className="hero-h1">
              <em>Data &amp; Intelligence</em> engineered with clarity.
            </h1>

            <p className="hero-sub">
              I am building practical machine learning models, exploratory data analytics pipelines, and high-efficiency algorithmic solutions with mathematical curiosity, discipline, and clean code.
            </p>

            {/* Technical Metadata Strip */}
            <div className="hero-meta-grid">
              <div className="hero-meta-item">
                <span className="meta-label">Location</span>
                <span className="meta-value">Noida / Delhi, India</span>
              </div>
              <div className="hero-meta-item">
                <span className="meta-label">Education</span>
                <span className="meta-value">BCA (2nd Year)</span>
              </div>
              <div className="hero-meta-item">
                <span className="meta-label">Primary Stack</span>
                <span className="meta-value">
                  Python, Data Analysis,
                  <br />
                  <span style={{ whiteSpace: 'nowrap' }}>Data Visualization</span>
                </span>
              </div>
              <div className="hero-meta-item">
                <span className="meta-label">Status</span>
                <span className="meta-value" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }}></span>
                  Available for Work
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="hero-actions">
              <button
                type="button"
                onClick={() => scrollTo('work')}
                className="btn"
              >
                Explore Projects <ArrowRight size={14} />
              </button>

              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--outline"
              >
                <Download size={14} /> Resume (PDF)
              </a>

              <button
                type="button"
                onClick={() => scrollTo('connect')}
                className="btn btn--outline"
              >
                Get in Touch
              </button>
            </div>
          </div>
        </section>

        {/* ==================================================================
            SECTION 01: SELECTED WORK / FEATURED CARDS (Desert Ant Fan Style)
            ================================================================== */}
        <section id="work" className="section-hairline" style={{ paddingTop: 'clamp(3.5rem, 7vw, 6rem)', paddingBottom: 'clamp(3.5rem, 7vw, 6rem)' }}>
          <div className="site-container">
            <div className="section-head section-head--split">
              <div>
                <span className="eyebrow">01 / Featured Engineering</span>
                <h2 className="section-title">Selected Projects</h2>
              </div>
              <p className="section-lead">
                Applied work bridging frontend user interfaces, data intelligence pipelines, and algorithmic computer science.
              </p>
            </div>

            <div className="feature-cards-grid">
              {projectsData.map((project) => (
                <div
                  key={project.id}
                  className={`feature-card ${project.themeClass}`}
                  style={{ '--tilt': project.tilt }}
                  onClick={() => setSelectedProject(project)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedProject(project);
                    }
                  }}
                  aria-label={`Open details for ${project.title}`}
                >
                  <div className="fc-head">
                    <span className="fc-tag">{project.tag}</span>
                    <h3 className="fc-name">{project.title}</h3>
                    <p className="fc-claim">{project.claim}</p>
                  </div>

                  <div className="fc-bottom">
                    <span className="fc-tech">{project.technologies.slice(0, 3).join(' · ')}</span>
                    <span className="fc-arrow">
                      Details <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================================================================
            SECTION 02: TECHNICAL SKILLS & BADGES (Matching User Reference Image)
            ================================================================== */}
        <section id="skills" className="section-hairline intel-section" style={{ background: 'var(--color-bg-sunken)' }}>
          <div className="site-container">
            <div className="section-head section-head--split">
              <div>
                <span className="eyebrow">02 / Technical Stack</span>
                <h2 className="section-title">Skills</h2>
              </div>
              <p className="section-lead">
                Languages, data science toolkits, frontend frameworks, and developer platforms I work with.
              </p>
            </div>

            <div className="skills-groups-wrapper">
              {skillsGrouped.map((group, idx) => (
                <div key={idx} className="skills-group">
                  <h3 className="skills-group-title">{group.title}</h3>
                  <div className="skills-badge-grid">
                    {group.skills.map((skillName, sIdx) => (
                      <div key={sIdx} className="tech-badge">
                        <span className="tech-badge-icon">
                          <TechIcon name={skillName} />
                        </span>
                        <span className="tech-badge-label">{skillName}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================================================================
            SECTION 03: ABOUT & CURRICULUM VITAE (Editorial Two-Column)
            ================================================================== */}
        <section id="about" className="section-hairline" style={{ paddingTop: 'clamp(4rem, 8vw, 7rem)', paddingBottom: 'clamp(4rem, 8vw, 7rem)' }}>
          <div className="site-container">
            <div className="section-head">
              <span className="eyebrow">03 / Profile &amp; Background</span>
              <h2 className="section-title">Foundations &amp; Philosophy</h2>
            </div>

            <div className="about-grid">
              {/* Left Column: Editorial Narrative */}
              <div className="about-narrative">
                <blockquote className="about-quote">
                  "I consider myself a logical thinker with a disciplined mindset, driven by curiosity and a strong work ethic. I focus on building solid fundamentals and applying them practically."
                </blockquote>

                <p className="about-text">
                  I am a Computer Applications student based in Noida, India, developing my skills in data science, Python, SQL, and machine learning. I enjoy working through datasets step by step, asking useful questions, and learning how analysis can support better decisions.
                </p>

                <p className="about-text">
                  Right now, I am focused on strengthening my fundamentals through hands-on projects, practice, and consistent learning. My goal is to grow into a Machine Learning Engineer role where I can solve practical problems with curiosity, discipline, and clear thinking.
                </p>

                <p className="about-text">
                  Outside of academics, I spend time gaming, playing volleyball, listening to music, and traveling. I value consistency, discipline, and continuous self-improvement.
                </p>

                {/* Avatar & Visual Proof */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginTop: '1.5rem', padding: '1rem', border: '1px solid var(--color-border-subtle)', borderRadius: 'var(--radius-sm)', background: 'var(--color-bg-sunken)' }}>
                  <img
                    src={avatarImg}
                    alt="Pawan Negi"
                    style={{ width: '56px', height: '56px', borderRadius: 'var(--radius-xs)', objectFit: 'cover' }}
                  />
                  <div>
                    <span className="font-mono" style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block' }}>Pawan Negi</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>Student &amp; Machine Learning Practitioner · Noida</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Academic & Technical Timeline */}
              <div className="spec-list">
                <span className="eyebrow" style={{ marginBottom: '0.5rem' }}>Education &amp; Credentials</span>
                {academicSpec.map((item, idx) => (
                  <div key={idx} className="spec-item">
                    <span className="spec-time">{item.period}</span>
                    <h4 className="spec-title">{item.title}</h4>
                    <span className="spec-sub">{item.institution}</span>
                    <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                      {item.detail}
                    </p>
                  </div>
                ))}

                <div className="spec-item" style={{ marginTop: '1rem', paddingTop: '1.5rem', borderTop: '1px solid var(--color-border-subtle)' }}>
                  <span className="spec-time">Competitive Coding &amp; Hackathons</span>
                  <h4 className="spec-title">Active Problem Solver</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                    Participated in 3 hackathons (1 inter-college, 2 intra-college). Actively solving algorithmic challenges on LeetCode, Codeforces, and HackerRank.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================================
            SECTION 04: CONNECT & CONTACT (Desert Ant Direct Form & Channels)
            ================================================================== */}
        <section id="connect" className="section-hairline connect-section" style={{ background: 'var(--color-bg-sunken)' }}>
          <div className="site-container">
            <div className="section-head section-head--split">
              <div>
                <span className="eyebrow">04 / Direct Inquiries</span>
                <h2 className="section-title">Let's build together.</h2>
              </div>
              <p className="section-lead">
                Available for Data Science/Machine Learning internships, full-time positions, and collaborative research initiatives.
              </p>
            </div>

            <div className="connect-grid">
              {/* Form Column */}
              <div>
                <form onSubmit={handleContactSubmit} className="desert-form">
                  <input
                    type="hidden"
                    name="access_key"
                    value={import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "dd3066f2-7cb7-499e-8654-70dd58b69555"}
                  />
                  <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" style={{ display: 'none' }} />

                  <div className="field-group">
                    <label htmlFor="form-name" className="field-label">Your Name</label>
                    <input
                      type="text"
                      id="form-name"
                      name="name"
                      required
                      placeholder="Jane Doe"
                      className="field-input"
                    />
                  </div>

                  <div className="field-group">
                    <label htmlFor="form-email" className="field-label">Email Address</label>
                    <input
                      type="email"
                      id="form-email"
                      name="email"
                      required
                      placeholder="jane@example.com"
                      className="field-input"
                    />
                  </div>

                  <div className="field-group">
                    <label htmlFor="form-message" className="field-label">Message</label>
                    <textarea
                      id="form-message"
                      name="message"
                      required
                      rows={4}
                      placeholder="Tell me about your project, team, or opportunity..."
                      className="field-textarea"
                    ></textarea>
                  </div>

                  {contactStatus !== 'idle' && (
                    <div style={{
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-xs)',
                      fontSize: '0.85rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: contactStatus === 'error' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(34, 197, 94, 0.1)',
                      color: contactStatus === 'error' ? '#ef4444' : '#15803d'
                    }}>
                      {contactStatus === 'sending' && <span>Dispatching transmission...</span>}
                      {contactStatus === 'success' && (
                        <>
                          <CheckCircle2 size={16} />
                          <span>Message delivered successfully. I will get back to you shortly!</span>
                        </>
                      )}
                      {contactStatus === 'error' && (
                        <>
                          <AlertCircle size={16} />
                          <span>Could not submit. You can email me directly at pawannegi2243@gmail.com</span>
                        </>
                      )}
                    </div>
                  )}

                  <button
                    type="submit"
                    className="btn"
                    style={{ alignSelf: 'flex-start', marginTop: '0.5rem' }}
                    disabled={contactStatus === 'sending'}
                  >
                    {contactStatus === 'sending' ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>

              {/* Profiles & Channels Column */}
              <div className="social-directory">
                <a
                  href="https://github.com/pawannegii"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-dir-item"
                >
                  <div className="social-dir-left">
                    <span className="social-dir-title">GitHub</span>
                    <span className="social-dir-handle">@pawannegii · Repositories &amp; Code</span>
                  </div>
                  <ArrowUpRight size={18} />
                </a>

                <a
                  href="https://www.linkedin.com/in/pawannegii/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-dir-item"
                >
                  <div className="social-dir-left">
                    <span className="social-dir-title">LinkedIn</span>
                    <span className="social-dir-handle">in/pawannegii · Professional Network</span>
                  </div>
                  <ArrowUpRight size={18} />
                </a>

                <button
                  type="button"
                  className="social-dir-item"
                  onClick={() => setIsCodingProfilesOpen(true)}
                  aria-haspopup="dialog"
                  aria-expanded={isCodingProfilesOpen}
                >
                  <div className="social-dir-left">
                    <span className="social-dir-title">Coding Profiles</span>
                    <span className="social-dir-handle">LeetCode · HackerRank · Codeforces</span>
                  </div>
                  <div className="social-dir-right">
                    <span className="social-dir-badge">3 Profiles</span>
                    <ArrowUpRight size={18} />
                  </div>
                </button>

                <a
                  href="mailto:pawannegi2243@gmail.com"
                  className="social-dir-item"
                >
                  <div className="social-dir-left">
                    <span className="social-dir-title">Direct Email</span>
                    <span className="social-dir-handle">pawannegi2243@gmail.com</span>
                  </div>
                  <ArrowUpRight size={18} />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ====================================================================
          SITE FOOTER (Desert Ant Multi-Column Grid)
          ==================================================================== */}
      <footer className="site-footer">
        <div className="site-container">
          <div className="footer-grid">
            {/* Col 1: Identity & Note */}
            <div className="footer-col footer-col--brand">
              <div className="brandmark">
                <span className="brandmark-icon" aria-hidden="true">PN</span>
                <span>Pawan Negi</span>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: 1.6, maxWidth: '340px' }}>
                Building skills in data analysis, data science, and machine learning to develop practical real-world solutions.
              </p>
              <div style={{ marginTop: '0.5rem' }}>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--sm btn--outline"
                >
                  <FileText size={13} /> Download Resume
                </a>
              </div>
            </div>

            {/* Col 2: Navigation */}
            <div className="footer-col">
              <span className="eyebrow">Index</span>
              <ul className="footer-list">
                <li><a href="#hero" onClick={(e) => { e.preventDefault(); scrollTo('hero'); }}>Overview</a></li>
                <li><a href="#work" onClick={(e) => { e.preventDefault(); scrollTo('work'); }}>Featured Work</a></li>
                <li><a href="#skills" onClick={(e) => { e.preventDefault(); scrollTo('skills'); }}>Skills &amp; Benchmarks</a></li>
                <li><a href="#about" onClick={(e) => { e.preventDefault(); scrollTo('about'); }}>About &amp; Background</a></li>
                <li><a href="#connect" onClick={(e) => { e.preventDefault(); scrollTo('connect'); }}>Contact Inquiries</a></li>
              </ul>
            </div>

            {/* Col 3: External Profiles */}
            <div className="footer-col">
              <span className="eyebrow">Code &amp; Profiles</span>
              <ul className="footer-list">
                <li><a href="https://github.com/pawannegii" target="_blank" rel="noopener noreferrer">GitHub</a></li>
                <li><a href="https://www.linkedin.com/in/pawannegii/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                <li><a href="https://leetcode.com/u/pawannegi2006/" target="_blank" rel="noopener noreferrer">LeetCode</a></li>
                <li><a href="https://www.hackerrank.com/profile/pawan_negi" target="_blank" rel="noopener noreferrer">HackerRank</a></li>
                <li><a href="https://codeforces.com/profile/pawannegi2006" target="_blank" rel="noopener noreferrer">Codeforces</a></li>
              </ul>
            </div>

            {/* Col 4: Contact & Context */}
            <div className="footer-col">
              <span className="eyebrow">Location &amp; University</span>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                Maharishi University of Information Technology<br />
                Noida / Delhi NCR, India<br />
              </p>
              <a
                href="mailto:pawannegi2243@gmail.com"
                style={{ fontSize: '0.85rem', color: 'var(--color-text-primary)', textDecoration: 'underline' }}
              >
                pawannegi2243@gmail.com
              </a>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="footer-bottom-bar">
            <span>© 2026 Pawan Negi.</span>
            <span>All projects &amp; academic records verified.</span>
          </div>
        </div>
      </footer>

      {/* Coding Profiles Selection Dialog */}
      <AnimatePresence>
        {isCodingProfilesOpen && (
          <motion.div
            className="desert-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCodingProfilesOpen(false)}
          >
            <motion.div
              className="coding-profiles-modal-card"
              role="dialog"
              aria-modal="true"
              aria-labelledby="coding-profiles-modal-title"
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setIsCodingProfilesOpen(false)}
                aria-label="Close dialog"
              >
                ✕
              </button>

              <div>
                <span className="eyebrow">Competitive Programming · 3 Profiles</span>
                <h3
                  id="coding-profiles-modal-title"
                  style={{
                    fontFamily: 'var(--font-family-display)',
                    fontSize: 'clamp(1.5rem, 2.8vw, 1.85rem)',
                    fontWeight: 400,
                    letterSpacing: 'var(--font-tracking-tight)',
                    marginTop: '0.25rem'
                  }}
                >
                  Coding Profiles
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginTop: '0.35rem' }}>
                  Select a platform below to view my verified solutions, competition ratings, and problem-solving history:
                </p>
              </div>

              <div className="coding-profiles-list">
                {codingProfilesData.map((profile, pIdx) => (
                  <a
                    key={pIdx}
                    href={profile.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="coding-profile-option"
                  >
                    <div className="coding-profile-left">
                      <div className="coding-profile-icon">
                        {profile.icon}
                      </div>
                      <div className="coding-profile-info">
                        <span className="coding-profile-name">{profile.name}</span>
                        <span className="coding-profile-desc">{profile.desc}</span>
                      </div>
                    </div>
                    <ArrowUpRight size={18} style={{ opacity: 0.7 }} />
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="desert-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              ref={modalRef}
              className="desert-modal-card"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-project-title"
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setSelectedProject(null)}
                aria-label="Close dialog"
              >
                ✕
              </button>

              <div style={{ marginBottom: '1.25rem' }}>
                <span className="eyebrow">{selectedProject.tag}</span>
                <h3
                  id="modal-project-title"
                  style={{
                    fontFamily: 'var(--font-family-display)',
                    fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
                    fontWeight: 400,
                    letterSpacing: 'var(--font-tracking-tight)',
                    marginTop: '0.25rem'
                  }}
                >
                  {selectedProject.title}
                </h3>
                <p style={{ fontSize: '1rem', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>
                  {selectedProject.claim}
                </p>
              </div>

              <div style={{ borderTop: '1px solid var(--color-border-subtle)', borderBottom: '1px solid var(--color-border-subtle)', padding: '1rem 0', margin: '1.25rem 0' }}>
                <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: 'var(--color-text-secondary)' }}>
                  {selectedProject.description}
                </p>

                {selectedProject.highlights && (
                  <ul style={{ listStyle: 'none', marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {selectedProject.highlights.map((h, hIdx) => (
                      <li key={hIdx} style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                        <span style={{ color: 'var(--color-text-primary)' }}>—</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem', fontFamily: 'var(--font-family-mono)', fontSize: '0.8rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-text-muted)' }}>
                  <span>STACK</span>
                  <span style={{ color: 'var(--color-text-primary)' }}>{selectedProject.technologies.join(', ')}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-text-muted)' }}>
                  <span>SCOPE</span>
                  <span style={{ color: 'var(--color-text-primary)' }}>{selectedProject.client}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-text-muted)' }}>
                  <span>TIMELINE</span>
                  <span style={{ color: 'var(--color-text-primary)' }}>{selectedProject.year}</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                {selectedProject.link && (
                  <a
                    href={selectedProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn"
                  >
                    Open Live Deployment <ExternalLink size={14} />
                  </a>
                )}

                {selectedProject.github && (
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--outline"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg> View Repository
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
