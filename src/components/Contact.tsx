import { useEffect, useRef } from 'react';

interface Theme { primary:string; secondary:string; bg:string; surface:string; text:string; muted:string; }

export default function Contact({ theme }: { theme: Theme }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    ref.current?.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const links = [
    { icon:'📧', label:'Email',    val:'pavangowda0404@gmail.com',  href:'mailto:pavangowda0404@gmail.com', color:theme.primary },
    { icon:'📱', label:'Phone',    val:'+91 6363101192',             href:'tel:+916363101192',               color:theme.secondary },
    { icon:'💼', label:'LinkedIn', val:'linkedin.com/in/pavan-h-s',  href:'https://linkedin.com',            color:'#f59e0b' },
    { icon:'🐙', label:'GitHub',   val:'github.com/pavan-hs',        href:'https://github.com',              color:theme.primary },
  ];

  return (
    <section id="contact" ref={ref} data-no-robot className="sec" style={{ paddingBottom: '5rem' }}>
      <div className="wrap">
        <div className="reveal" style={{ textAlign: 'center', maxWidth: 580, margin: '0 auto' }}>
          <div className="sec-label" style={{ justifyContent: 'center' }}>06. contact</div>
          <h2 className="sec-title" style={{ textAlign: 'center', marginBottom: '1rem' }}>Let's Connect</h2>
          <p style={{ color: theme.muted, lineHeight: 1.8, marginBottom: '2rem', fontSize: 'clamp(0.875rem,2vw,1rem)' }}>
            I'm actively looking for Software Engineer and Full Stack Developer opportunities.
            Whether you have a role, a project, or just want to say hi — my inbox is always open.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
            {links.map(l => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
                style={{
                  borderColor: `${l.color}22`,
                  ['--cl-clr' as string]: l.color,
                } as React.CSSProperties}
              >
                {/* icon box */}
                <div
                  className="cl-icon"
                  style={{
                    width: 40, height: 40, borderRadius: 9, flexShrink: 0,
                    background: `${l.color}12`, border: `1px solid ${l.color}28`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.1rem',
                    ['--cl-clr' as string]: l.color,
                  } as React.CSSProperties}
                >{l.icon}</div>

                <div style={{ textAlign: 'left', minWidth: 0 }}>
                  <div style={{ fontFamily: 'Fira Code,monospace', fontSize: '0.62rem', color: theme.muted, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    {l.label}
                  </div>
                  <div style={{ color: l.color, fontFamily: 'Space Grotesk,sans-serif', fontWeight: 600, fontSize: 'clamp(0.8rem,2vw,0.95rem)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {l.val}
                  </div>
                </div>

                <div className="cl-arrow" style={{ marginLeft: 'auto', color: theme.muted, fontSize: '0.9rem', flexShrink: 0 }}>→</div>
              </a>
            ))}
          </div>

          <button
            className="btn btn-fill"
            onClick={() => window.open('mailto:pavangowda0404@gmail.com')}
            style={{ fontSize: '0.95rem', padding: '0.8rem 2.5rem' }}
          >
            <span>Say Hello 👋</span>
          </button>
        </div>
      </div>

      {/* footer */}
      <div style={{ textAlign: 'center', marginTop: '4rem', paddingTop: '1.5rem', borderTop: `1px solid ${theme.primary}14`, color: theme.muted, fontFamily: 'Fira Code,monospace', fontSize: '0.68rem' }}>
        <div style={{ marginBottom: '0.3rem' }}>Designed & Built by <span style={{ color: theme.primary }}>Pavan H S</span></div>
        <div>© 2026 · Made with ❤️ and lots of ☕</div>
      </div>
    </section>
  );
}
