import { useEffect, useRef } from 'react';

const certs = [
  { title:'Full Stack Web Development Bootcamp', issuer:'Udemy (PERN)', icon:'🌐', color:'#00d4ff', desc:'Comprehensive bootcamp covering PostgreSQL, Express, React, and Node.js for building production-ready web applications.' },
  { title:'Oracle AI Foundations', issuer:'Oracle', icon:'🤖', color:'#f59e0b', desc:'Machine Learning Basics and AI Concepts certification covering fundamental principles of artificial intelligence.' },
  { title:'Generative AI Mastermind', issuer:'Outskill & Google Cloud', icon:'✨', color:'#7c3aed', desc:'Advanced certification in LLMs, NLP, and Prompt Engineering — covering the latest in generative AI technologies.' },
];

interface Theme { primary:string; secondary:string; bg:string; surface:string; text:string; muted:string; }

export default function Certifications({ theme }: { theme: Theme }) {
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
    <section id="certifications" ref={ref} className="sec">
      <div className="wrap">
        <div className="reveal" style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
          <div className="sec-label" style={{ justifyContent: 'center' }}>05. certifications</div>
          <h2 className="sec-title" style={{ textAlign: 'center' }}>Credentials</h2>
        </div>

        <div className="cert-grid">
          {certs.map((c, i) => (
            <div
              key={c.title}
              className="card cert-card reveal"
              style={{
                padding: '1.8rem',
                minHeight: 260,
                transitionDelay: `${i * 0.1}s`,
                borderColor: `${c.color}28`,
                position: 'relative', overflow: 'hidden',
                ['--cert-clr' as string]: c.color,
              } as React.CSSProperties}
            >
              {/* top accent bar — animates on hover via CSS */}
              <div
                className="cert-bar"
                style={{
                  position: 'absolute', top: 0, left: 0, height: 2,
                  background: `linear-gradient(90deg,${c.color},transparent)`,
                }}
              />

              {/* icon */}
              <div
                className="cert-icon"
                style={{
                  width: 46, height: 46, borderRadius: 11,
                  background: `${c.color}12`, border: `1px solid ${c.color}28`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.35rem', marginBottom: '0.875rem',
                }}
              >{c.icon}</div>

              <h3 style={{ fontFamily: 'Space Grotesk,sans-serif', fontSize: '0.95rem', fontWeight: 700, color: theme.text, marginBottom: '0.3rem', lineHeight: 1.3 }}>
                {c.title}
              </h3>
              <div style={{ fontFamily: 'Fira Code,monospace', fontSize: '0.68rem', color: c.color, marginBottom: '0.75rem' }}>
                {c.issuer}
              </div>
              <p style={{ color: theme.muted, fontSize: '0.83rem', lineHeight: 1.6 }}>{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
