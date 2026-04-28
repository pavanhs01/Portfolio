import { useEffect, useRef } from 'react';

interface Theme { primary: string; secondary: string; bg: string; surface: string; text: string; muted: string; }

const features = [
  { icon: '🚀', title: 'Full Stack Development', desc: 'React.js • Node.js • Express.js • PostgreSQL' },
  { icon: '🤖', title: 'AI & Machine Learning',  desc: 'NumPy • Pandas • Scikit-learn • Seaborn' },
  { icon: '🗄️', title: 'Database Design',         desc: 'PostgreSQL • MySQL • Schema Design' },
  { icon: '⚡', title: 'REST API Engineering',    desc: 'Express.js • JWT • Middleware • REST' },
];

export default function About({ theme }: { theme: Theme }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    ref.current?.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section id="about" ref={ref} className="sec">
      <div className="wrap">
        <div className="reveal" style={{ marginBottom: '2.5rem' }}>
          <div className="sec-label">01. about</div>
          <h2 className="sec-title">Who I Am</h2>
        </div>

        <div className="about-grid">
          {/* Left — text */}
          <div className="reveal">
            <p style={{ color: theme.muted, lineHeight: 1.85, fontSize: 'clamp(0.875rem,2vw,1rem)', marginBottom: '1.25rem' }}>
              Computer Science undergraduate at JSS Science and Technology University, Mysuru.
              Hands-on experience building full-stack web applications using React.js, Node.js,
              Express.js, and PostgreSQL. Skilled in designing scalable REST APIs, database
              schema design, and interactive UI development.
            </p>
            <p style={{ color: theme.muted, lineHeight: 1.85, fontSize: 'clamp(0.875rem,2vw,1rem)', marginBottom: '1.25rem' }}>
              Built multiple production-style projects including an AI-powered placement preparation
              platform and a real-time exam monitoring system. Seeking a Software Engineer or
              Full Stack Developer role to build scalable web applications.
            </p>

            {/* contact pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginTop: '1.5rem' }} data-no-robot>
              {[
                { icon: '📧', val: 'pavangowda0404@gmail.com', href: 'mailto:pavangowda0404@gmail.com' },
                { icon: '📱', val: '6363101192',               href: 'tel:6363101192' },
                { icon: '🔗', val: 'LinkedIn',                  href: 'https://linkedin.com' },
                { icon: '🐙', val: 'GitHub',                    href: 'https://github.com' },
              ].map(c => (
                <a key={c.val} href={c.href} target="_blank" rel="noopener noreferrer"
                  style={{
                    display: 'flex', alignItems: 'center', gap: '0.4rem',
                    padding: '0.35rem 0.875rem', borderRadius: 8,
                    background: 'rgba(0,212,255,0.06)', border: '1px solid rgba(0,212,255,0.18)',
                    color: theme.primary, fontFamily: 'Fira Code,monospace', fontSize: '0.72rem',
                    textDecoration: 'none', whiteSpace: 'nowrap',
                    transition: 'all 0.25s',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.background = 'rgba(0,212,255,0.14)';
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                    (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 14px rgba(0,212,255,0.2)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.background = 'rgba(0,212,255,0.06)';
                    (e.currentTarget as HTMLElement).style.transform = '';
                    (e.currentTarget as HTMLElement).style.boxShadow = '';
                  }}
                >
                  <span>{c.icon}</span>{c.val}
                </a>
              ))}
            </div>
          </div>

          {/* Right — feature cards */}
          <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
            {features.map(item => (
              <div key={item.title} className="card about-card" style={{ padding: '1.2rem 1.45rem', display: 'flex', gap: '1rem', alignItems: 'flex-start', minHeight: 108 }}>
                <span className="ac-icon" style={{ fontSize: '1.35rem', flexShrink: 0, marginTop: 2 }}>{item.icon}</span>
                <div>
                  <div style={{ fontWeight: 600, color: theme.text, fontFamily: 'Space Grotesk,sans-serif', fontSize: '0.95rem', marginBottom: '0.15rem' }}>{item.title}</div>
                  <div style={{ color: theme.muted, fontFamily: 'Fira Code,monospace', fontSize: '0.72rem' }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
