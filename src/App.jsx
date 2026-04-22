import React, { useState, useEffect } from 'react';
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
  CheckCircle2,
  Copy
} from 'lucide-react';
import avatarImg from './assets/avatar.png';

const projects = [
  {
    id: 1,
    title: 'Fintech Dashboard',
    category: 'Product Design',
    icon: <Layers size={24} strokeWidth={1.5} />,
    description: 'A comprehensive financial dashboard for managing personal wealth and investments.',
    client: 'Acme Corp',
    year: '2025'
  },
  {
    id: 2,
    title: 'E-commerce App',
    category: 'UX/UI Design',
    icon: <LayoutTemplate size={24} strokeWidth={1.5} />,
    description: 'A mobile-first e-commerce shopping experience with a focus on quick checkout.',
    client: 'StyleStore',
    year: '2024'
  },
  {
    id: 3,
    title: 'Brand Identity',
    category: 'Branding',
    icon: <Palette size={24} strokeWidth={1.5} />,
    description: 'Complete visual identity redesign for a sustainable tech startup.',
    client: 'EcoTech',
    year: '2024'
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
  const [copied, setCopied] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('hello@designer.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
      <nav className="navbar glass-card">
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
              }}
            >
              {item.icon}
              <span>{item.label}</span>
            </a>
          ))}
        </div>
        <a href="#contact" className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>
          Hire Me
        </a>
      </nav>

      <main className="container">
        <section id="home" className="hero-section">
          <FadeIn>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '24px' }}>
              <motion.img 
                src={avatarImg} 
                alt="Pawan Negi Avatar" 
                className="avatar"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                style={{ margin: '0 0 16px 0', display: 'block' }}
              />
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
                Hire Me <ArrowRight size={18} />
              </a>
              <button onClick={handleCopyEmail} className="btn btn-outline">
                {copied ? <CheckCircle2 size={18} /> : <Copy size={18} />}
                {copied ? 'Copied!' : 'Copy Email'}
              </button>
            </div>
          </FadeIn>
        </section>

        <section id="about">
          <FadeIn>
            <h2 style={{ textAlign: 'center' }}>About Me</h2>
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
                <h3 style={{ fontSize: '1.125rem', marginBottom: '12px', color: 'var(--text-secondary)' }}>More About Me</h3>
                <p style={{ color: 'var(--text-primary)', lineHeight: 1.7 }}>
                  I’m currently in my first year of a Bachelor of Computer Applications at MUIT, Noida. My skill set includes Python (Pandas, NumPy), SQL, data cleaning, exploratory data analysis, statistics, and data visualization using Matplotlib and Seaborn. I also have foundational experience in machine learning concepts such as regression, classification, and feature engineering.
                </p>
                <p style={{ color: 'var(--text-primary)', lineHeight: 1.7, marginTop: '12px' }}>
                  I consider myself a logical thinker with a disciplined mindset, driven by curiosity and a strong work ethic. I focus on building solid fundamentals and applying them practically through projects.
                </p>
                <p style={{ color: 'var(--text-primary)', lineHeight: 1.7, marginTop: '12px' }}>
                  Outside of academics, I spend time gaming, playing volleyball, listening to music, and traveling. I value consistency, discipline, and continuous self-improvement.
                </p>
              </div>

              <div style={{ height: '1px', background: 'var(--border-color)', margin: '4px 0' }}></div>

              <div>
                <h3 style={{ fontSize: '1.125rem', marginBottom: '12px', color: 'var(--text-secondary)' }}>My Side Projects</h3>
                <p style={{ color: 'var(--text-primary)', lineHeight: 1.7 }}>
                  I actively work on data science and machine learning projects to strengthen my skills and apply what I learn. You can explore them in the projects section.
                </p>
              </div>
            </div>
          </FadeIn>
        </section>

        <section id="projects">
          <FadeIn>
            <h2 style={{ textAlign: 'center' }}>Selected Projects</h2>
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
            <h2 style={{ textAlign: 'center' }}>Let's work together</h2>
            <p style={{ textAlign: 'center', marginBottom: '32px' }}>
              Have a project in mind? I'd love to hear about it.
            </p>
            
            <form className="contact-form glass-card" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" className="form-control" placeholder="John Doe" />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" className="form-control" placeholder="john@example.com" />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" className="form-control" placeholder="Tell me about your project..."></textarea>
              </div>
              
              <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '16px' }}>
                Submit Inquiry
              </button>
            </form>
          </FadeIn>
        </section>
      </main>

      <footer>
        <FadeIn>
          <div className="social-links">
            <a href="#" className="social-link" title="Twitter/X">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
            </a>
            <a href="#" className="social-link" title="Instagram">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
            <a href="#" className="social-link" title="Dribbble">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"/></svg>
            </a>
            <a href="#" className="social-link" title="LinkedIn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
          </div>
          <p className="copyright">© {new Date().getFullYear()} Pawan Negi. All rights reserved.</p>
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
              initial={{ y: 50, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              style={{
                background: 'var(--bg-color)',
                width: '100%',
                maxWidth: '600px',
                borderRadius: 'var(--border-radius)',
                padding: '40px',
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
                  cursor: 'pointer'
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
              
              <button className="btn btn-primary" style={{ width: '100%' }}>
                Visit Website <ExternalLink size={18} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
