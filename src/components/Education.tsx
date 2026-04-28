import { useEffect, useRef } from 'react';

const edu = [
  { deg:'B.E. in Computer Science and Engineering', inst:'JSS Science and Technology University, Mysuru', period:'2022 – 2026', score:'CGPA: 8.69', icon:'🎓', color:'#00d4ff' },
  { deg:'Pre-University (II PUC)', inst:'KNC Innovative PU College, Mysuru', period:'2020 – 2022', score:'Score: 87.3%', icon:'📚', color:'#7c3aed' },
];

const concepts = ['Object-Oriented Programming','DBMS','Operating Systems','Computer Networks','Data Structures & Algorithms','Software Engineering'];

interface Theme { primary:string; secondary:string; bg:string; surface:string; text:string; muted:string; }

export default function Education({ theme }: { theme: Theme }) {
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
    <section id="education" ref={ref} className="sec">
      <div className="wrap">
        <div className="reveal" style={{ marginBottom: '2.5rem' }}>
          <div className="sec-label">04. education</div>
          <h2 className="sec-title">Academic Journey</h2>
        </div>

        <div className="edu-grid" style={{ marginBottom: '2rem' }}>
          {edu.map((e, i) => (
            <div
              key={e.deg}
              className="card edu-card reveal"
              style={{
                padding: '2rem', minHeight: 244, transitionDelay: `${i * 0.12}s`,
                borderColor: `${e.color}28`, position: 'relative', overflow: 'hidden',
                ['--edu-clr' as string]: e.color,
              } as React.CSSProperties}
            >
              {/* left accent bar */}
              <div
                className="edu-bar"
                style={{
                  position: 'absolute', top: 0, left: 0, bottom: 0,
                  background: `linear-gradient(180deg,${e.color},${e.color}44)`,
                  borderRadius: '3px 0 0 3px',
                }}
              />

              <div style={{ paddingLeft: '1.1rem' }}>
                <div style={{ fontFamily: 'Fira Code,monospace', fontSize: '0.68rem', color: e.color, letterSpacing: '0.1em', marginBottom: '0.4rem' }}>
                  {e.period}
                </div>
                <h3 style={{ fontFamily: 'Space Grotesk,sans-serif', fontSize: 'clamp(0.9rem,2vw,1.05rem)', fontWeight: 700, color: theme.text, lineHeight: 1.3, marginBottom: '0.3rem' }}>
                  {e.deg}
                </h3>
                <div style={{ color: theme.muted, fontSize: '0.85rem', marginBottom: '1rem' }}>{e.inst}</div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
                  {/* icon */}
                  <div
                    className="edu-icon"
                    style={{
                      width: 42, height: 42, borderRadius: 10, flexShrink: 0,
                      background: `${e.color}12`, border: `1px solid ${e.color}28`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '1.3rem',
                    }}
                  >{e.icon}</div>

                  {/* score badge */}
                  <div
                    className="edu-score"
                    style={{
                      display: 'inline-flex', alignItems: 'center',
                      padding: '0.3rem 0.875rem', borderRadius: 6,
                      background: `${e.color}12`, border: `1px solid ${e.color}28`,
                    }}
                  >
                    <span style={{ color: e.color, fontFamily: 'Space Grotesk,sans-serif', fontWeight: 700, fontSize: '0.9rem' }}>{e.score}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="reveal">
          <div style={{ fontFamily: 'Fira Code,monospace', fontSize: '0.68rem', color: theme.muted, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
            Core Concepts
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {concepts.map(c => <span key={c} className="chip">{c}</span>)}
          </div>
        </div>
      </div>
    </section>
  );
}
