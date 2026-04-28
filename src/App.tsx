import { useEffect, useState } from 'react';
import RobotCursor from './components/RobotCursor';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Navbar from './components/Navbar';
import ParticleBackground from './components/ParticleBackground';
import ClickEffect from './components/ClickEffect';
import ScrollProgress from './components/ScrollProgress';
import { themes, ThemeKey } from './components/ThemeSwitcher';
import SpotlightEffect from './components/SpotlightEffect';

export default function App() {
  const [mousePos, setMousePos] = useState({ x: -200, y: -200 });
  const [scrollY, setScrollY] = useState(0);
  const [theme, setTheme] = useState<ThemeKey>('cyberpunk');

  // Lifted modal state — so Navbar can close it on any nav click
  const [selectedProject, setSelectedProject] = useState<null | {
    id: number; title: string; subtitle: string; emoji: string;
    color: string; desc: string; highlights: string[];
    tech: string[]; status: string; sColor: string;
  }>(null);

  const t = themes[theme];

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--theme-primary', t.primary);
    root.style.setProperty('--theme-secondary', t.secondary);
    root.style.setProperty('--theme-bg', t.bg);
    root.style.setProperty('--theme-surface', t.surface);
    root.style.setProperty('--theme-text', t.text);
    root.style.setProperty('--theme-muted', t.muted);
    root.style.setProperty('--theme-glow', t.glow);
    root.style.setProperty('--theme-grid', t.gridColor);
    document.body.style.background = t.bg;
    document.body.style.color = t.text;
  }, [theme, t]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="app-root" style={{ background: t.bg, color: t.text, transition: 'background 0.5s, color 0.5s' }}>
      <ScrollProgress />
      <ParticleBackground themeColor={t.primary} />
      <SpotlightEffect mousePos={mousePos} color={t.primary} />
      <ClickEffect />
      <RobotCursor
        mousePos={mousePos}
        themeColor={t.primary}
        themeSecondary={t.secondary}
        themeBg={t.bg}
      />
      <Navbar
        scrollY={scrollY}
        theme={t}
        currentTheme={theme}
        onThemeChange={setTheme}
        onNavClick={() => setSelectedProject(null)}
      />
      <main>
        <Hero theme={t} />
        <About theme={t} />
        <Skills theme={t} />
        <Projects
          theme={t}
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
        />
        <Education theme={t} />
        <Certifications theme={t} />
        <Contact theme={t} />
      </main>
    </div>
  );
}
