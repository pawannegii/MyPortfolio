import React, { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  User,
  Folder,
  Mail,
  ArrowRight,
  ExternalLink,
  Layers,
  PenTool,
  LayoutTemplate,
  Palette,
  Download,
  Sun,
  Moon,
  Leaf,
  Code,
  TerminalSquare,
  Cpu,
  Coffee,
  Database,
  Globe,
  BrainCircuit,
  BarChart3,
  Code2,
  Network
} from 'lucide-react';
import avatarImg from './assets/avatar.png';

const technicalSkills = [
  { name: 'C & C++', icon: <Cpu size={28} strokeWidth={1.5} /> },
  { name: 'Python', icon: <TerminalSquare size={28} strokeWidth={1.5} /> },
  { name: 'Java', icon: <Coffee size={28} strokeWidth={1.5} /> },
  { name: 'SQL & DBs', icon: <Database size={28} strokeWidth={1.5} /> },
  { name: 'Web Dev', icon: <Globe size={28} strokeWidth={1.5} /> },
  { name: 'Machine Learning', icon: <BrainCircuit size={28} strokeWidth={1.5} /> },
  { name: 'Data Analysis & Visuals', icon: <BarChart3 size={28} strokeWidth={1.5} /> },
  { name: 'Data Structures & Algorithms', icon: <Network size={28} strokeWidth={1.5} /> },
];

const projects = [
  {
    id: 1,
    title: 'OFIRA',
    category: 'Frontend Development',
    icon: <LayoutTemplate size={24} strokeWidth={1.5} />,
    description: "Connect with locals for urgent micro-tasks. Apna locality batao — baaki hum dekhenge. Let's make everyday life a little easier, together.",
    client: 'Personal Project',
    year: '2026',
    link: 'https://ofiraofficial.vercel.app/'
  }
];



const FadeIn = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.6, delay, ease: [0.25, 0.8, 0.25, 1] }}
  >
    {children}
  </motion.div>
);

function App() {
  const [activeSection, setActiveSection] = useState('home');

  const [selectedProject, setSelectedProject] = useState(null);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (['light', 'dark', 'avocado'].includes(saved)) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const cycleTheme = () => {
    setTheme((currentTheme) => {
      if (currentTheme === 'light') return 'dark';
      if (currentTheme === 'dark') return 'avocado';
      return 'light';
    });
  };



  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'contact'];
      const scrollPosition = window.scrollY + window.innerHeight / 2;

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

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <div className="background-effects">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>
      <nav className={`navbar glass-card ${isMobileNavOpen ? 'open' : ''}`}>
        <button
          type="button"
          className="menu-toggle"
          aria-label={isMobileNavOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMobileNavOpen}
          onClick={() => setIsMobileNavOpen((isOpen) => !isOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div className="nav-links">
          {[
            { id: 'home', icon: <Home size={18} />, label: 'Home' },
            { id: 'about', icon: <User size={18} />, label: 'About' },
            { id: 'projects', icon: <Folder size={18} />, label: 'Projects' },
            { id: 'contact', icon: <Mail size={18} />, label: 'Contact' }
          ].map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                setIsMobileNavOpen(false);
              }}
            >
              {item.icon}
              <span>{item.label}</span>
            </a>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={cycleTheme}
            className="nav-link"
            style={{ padding: '10px', borderRadius: '50%' }}
            aria-label={`Switch theme, current theme is ${theme}`}
            title={`Theme: ${theme}`}
          >
            {theme === 'dark' ? <Sun size={20} /> : theme === 'avocado' ? <Leaf size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </nav>

      <main className="container">
        <section id="home" className="hero-section">
          <FadeIn>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '24px' }}>
              <div className="avatar-jelly">
                <img
                  src={avatarImg}
                  alt="Pawan Negi Avatar"
                  className="avatar"
                />
              </div>
              <div className="status-badge" style={{ margin: 0 }}>
                <div className="status-dot"></div>
                Available for work
              </div>
            </div>

            <h1 style={{ fontWeight: 700 }}>Pawan Negi</h1>
            <h2 style={{ fontWeight: 700 }}>Data Scientist</h2>

            <p className="hero-description">
              I analyze data to extract meaningful insights and build data-driven solutions.
              Focused on applying statistical methods and machine learning to solve real-world problems, while balancing analytical rigor with practical impact.
            </p>

            <div className="hero-ctas">
              <a href="#contact" className="btn btn-primary">
                Let's Connect <ArrowRight size={18} />
              </a>
              <button className="btn btn-outline">
                <Download size={18} />
                Resume
              </button>
            </div>
          </FadeIn>
        </section>

        <section id="about">
          <FadeIn>
            <h2 className="section-title">About Me</h2>
            <div className="glass-card" style={{ padding: '40px', display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '800px', margin: '0 auto' }}>
              <div>
                <h3 style={{ fontSize: '1.125rem', marginBottom: '12px', color: 'var(--text-secondary)' }}>Background</h3>
                <p style={{ color: 'var(--text-primary)', lineHeight: 1.7 }}>
                  I’m a Computer Applications student based in Noida, India, with a strong foundation in data science and a growing focus on machine learning. I work with data to build models, uncover patterns, and solve real-world problems through logical and structured thinking.
                </p>
                <p style={{ color: 'var(--text-primary)', lineHeight: 1.7, marginTop: '12px' }}>
                  My approach is simple—understand the data, extract meaningful insights, and translate them into intelligent systems that can support better decisions. Currently, I’m expanding my skills in machine learning and continuously improving through hands-on projects and consistent practice.
                </p>
              </div>

              <div style={{ height: '1px', background: 'var(--border-color)', margin: '4px 0' }}></div>

              <div>
                <h3 style={{ fontSize: '1.125rem', marginBottom: '12px', color: 'var(--text-secondary)' }}>Beyond Code</h3>
                <p style={{ color: 'var(--text-primary)', lineHeight: 1.7 }}>
                  I consider myself a logical thinker with a disciplined mindset, driven by curiosity and a strong work ethic. I focus on building solid fundamentals and applying them practically through projects.
                </p>
                <p style={{ color: 'var(--text-primary)', lineHeight: 1.7, marginTop: '12px' }}>
                  Outside of academics, I spend time gaming, playing volleyball, listening to music, and traveling. I value consistency, discipline, and continuous self-improvement.
                </p>
              </div>
            </div>
          </FadeIn>
        </section>

        <section id="skills">
          <FadeIn>
            <h2 className="section-title">Technical Skills</h2>
            <div className="skills-grid">
              {technicalSkills.map((skill, idx) => (
                <FadeIn key={skill.name} delay={idx * 0.05}>
                  <div className="glass-card skill-box">
                    <div className="skill-icon">
                      {skill.icon}
                    </div>
                    <span>{skill.name}</span>
                  </div>
                </FadeIn>
              ))}
            </div>
          </FadeIn>
        </section>

        <section id="projects">
          <FadeIn>
            <h2 className="section-title">Selected Projects</h2>
            <div className="project-list">
              {projects.map((project, idx) => (
                <FadeIn key={project.id} delay={idx * 0.1}>
                  <div
                    className="project-card glass-card"
                    onClick={() => setSelectedProject(project)}
                  >
                    <div className="project-info">
                      <div className="project-icon">
                        {project.icon}
                      </div>
                      <div className="project-details">
                        <h3>{project.title}</h3>
                        <span>{project.category}</span>
                      </div>
                    </div>
                    <ArrowRight className="project-arrow" size={24} />
                  </div>
                </FadeIn>
              ))}
            </div>
          </FadeIn>
        </section>



        <section id="contact">
          <FadeIn>
            <h2 className="section-title" style={{ marginBottom: '16px' }}>Let's Connect</h2>
            <p style={{ textAlign: 'center', maxWidth: '500px', margin: '0 auto 48px auto', fontSize: '1.15rem', color: 'var(--text-secondary)' }}>
              Feel free to reach out for collaborations or just a friendly chat. You can find me on these platforms:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', maxWidth: '800px', margin: '0 auto' }}>

              <a href="https://github.com/pawannegii" target="_blank" rel="noopener noreferrer" className="glass-card project-card" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '16px', textDecoration: 'none' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--bg-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-primary)' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
                </div>
                <div>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '4px', color: 'var(--text-primary)' }}>GitHub</h3>
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>@pawannegii</span>
                </div>
              </a>

              <a href="https://www.linkedin.com/in/pawannegii/" target="_blank" rel="noopener noreferrer" className="glass-card project-card" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '16px', textDecoration: 'none' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--bg-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-primary)' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
                </div>
                <div>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '4px', color: 'var(--text-primary)' }}>LinkedIn</h3>
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Connect with me</span>
                </div>
              </a>

              <a href="https://leetcode.com/u/pawannegi2006/" target="_blank" rel="noopener noreferrer" className="glass-card project-card" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '16px', textDecoration: 'none' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--bg-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-primary)' }}>
                  <Code size={24} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '4px', color: 'var(--text-primary)' }}>LeetCode</h3>
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Solve problems</span>
                </div>
              </a>

              <a href="https://www.hackerrank.com/profile/pawan_negi" target="_blank" rel="noopener noreferrer" className="glass-card project-card" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '16px', textDecoration: 'none' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--bg-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-primary)' }}>
                  <TerminalSquare size={24} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '4px', color: 'var(--text-primary)' }}>HackerRank</h3>
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Coding Challenges</span>
                </div>
              </a>

            </div>
          </FadeIn>
        </section>
      </main>

      <footer>
        <FadeIn>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
            <p className="copyright">© 2026 Pawan Negi</p>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', opacity: 0.8, letterSpacing: '0.02em', fontStyle: 'italic' }}>
              "Simplicity is the ultimate sophistication."
            </p>
          </div>
        </FadeIn>
      </footer>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(28, 28, 30, 0.4)',
              backdropFilter: 'blur(8px)',
              zIndex: 1000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px'
            }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="project-modal"
              initial={{ y: 50, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              style={{
                background: 'var(--bg-color)',
                width: '100%',
                maxWidth: '600px',
                borderRadius: 'var(--border-radius)',
                position: 'relative',
                boxShadow: 'var(--shadow-hover)'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedProject(null)}
                style={{
                  position: 'absolute',
                  top: '24px',
                  right: '24px',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'var(--card-bg)',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: 'var(--text-primary)'
                }}
              >
                ✕
              </button>

              <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '24px' }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: 'var(--border-radius-sm)',
                  background: 'var(--card-bg)',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-primary)'
                }}>
                  {selectedProject.icon}
                </div>
                <div>
                  <h2 style={{ marginBottom: '4px' }}>{selectedProject.title}</h2>
                  <p>{selectedProject.category} • {selectedProject.year}</p>
                </div>
              </div>

              <div style={{ marginBottom: '32px' }}>
                <p style={{ color: 'var(--text-primary)', marginBottom: '16px' }}>
                  {selectedProject.description}
                </p>
                <p><strong>Client:</strong> {selectedProject.client}</p>
              </div>

              <div style={{
                width: '100%',
                height: '240px',
                background: 'var(--card-bg)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--border-radius-sm)',
                marginBottom: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-secondary)'
              }}>
                [Project Preview Image Stack]
              </div>

              <a href={selectedProject.link || '#'} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ width: '100%' }}>
                Visit Website <ExternalLink size={18} />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
