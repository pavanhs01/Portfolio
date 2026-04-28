import { useEffect, useRef, useState } from 'react';
import CounterStat from './CounterStat';

const roles = ['Full Stack Developer', 'React.js Engineer', 'Node.js Developer', 'AI/ML Enthusiast', 'Problem Solver'];

interface Theme { primary: string; secondary: string; bg: string; surface: string; text: string; muted: string; glow: string; }

export default function Hero({ theme }: { theme: Theme }) {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [typing, setTyping] = useState(true);
  const charIdx = useRef(0);

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    const cur = roles[roleIdx];
    if (typing) {
      if (charIdx.current < cur.length) {
        t = setTimeout(() => { setDisplayed(cur.slice(0, ++charIdx.current)); }, 75);
      } else { t = setTimeout(() => setTyping(false), 2000); }
    } else {
      if (charIdx.current > 0) {
        t = setTimeout(() => { setDisplayed(cur.slice(0, --charIdx.current)); }, 35);
      } else { setRoleIdx(i => (i + 1) % roles.length); setTyping(true); }
    }
    return () => clearTimeout(t);
  }, [displayed, typing, roleIdx]);

  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="hero" className="grid-bg" style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      position: 'relative', overflow: 'hidden', paddingTop: '5rem',
    }}>
      {/* bg orbs */}
      <div style={{ position:'absolute', top:'10%', right:'5%', width:'min(520px,50vw)', height:'min(520px,50vw)', borderRadius:'50%', background:`radial-gradient(circle,${theme.primary}09,transparent 70%)`, pointerEvents:'none' }}/>
      <div style={{ position:'absolute', bottom:'10%', left:'0', width:'min(380px,40vw)', height:'min(380px,40vw)', borderRadius:'50%', background:`radial-gradient(circle,${theme.secondary}08,transparent 70%)`, pointerEvents:'none' }}/>

      <div className="wrap" style={{ position:'relative', zIndex:1, width:'100%', paddingBottom:'4rem' }}>
        <div className="hero-grid">

          {/* ── LEFT: text content ── */}
          <div>
            {/* available badge */}
            <div style={{ display:'flex', alignItems:'center', gap:'0.7rem', marginBottom:'1.9rem' }}>
              <div style={{ width:6, height:6, borderRadius:'50%', background:theme.primary, boxShadow:`0 0 8px ${theme.primary}`, animation:'pulse 2s ease-out infinite' }}/>
              <span style={{ fontFamily:'Fira Code,monospace', fontSize:'0.82rem', color:theme.primary, letterSpacing:'0.18em', textTransform:'uppercase' }}>Available for opportunities</span>
            </div>

            {/* ── NAME — reduced size, more breathing room ── */}
            <h1 style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 'clamp(2.6rem, 6vw, 4.4rem)',
              fontWeight: 700,
              letterSpacing: '0.04em',
              lineHeight: 1.1,
              color: theme.text,
              marginBottom: '0.75rem',
            }}>
              PAVAN&nbsp;
              <span style={{ color: theme.primary, textShadow:`0 0 30px ${theme.primary}55` }}>H S</span>
            </h1>

            {/* typewriter */}
            <div style={{
              fontFamily: 'Fira Code, monospace',
              fontSize: 'clamp(1rem, 2vw, 1.22rem)',
              color: theme.muted,
              marginBottom: '1.5rem',
              minHeight: '1.8rem',
            }}>
              <span style={{ color:theme.secondary }}>$ </span>
              <span style={{ color:theme.text }}>{displayed}</span>
              <span style={{ color:theme.primary, animation:'blink 1s step-end infinite' }}>|</span>
            </div>

            {/* summary */}
            <p style={{ color:theme.muted, fontSize:'clamp(1rem,2vw,1.12rem)', lineHeight:1.85, maxWidth:620, marginBottom:'0.5rem' }}>
              Computer Science undergraduate with hands-on experience building full-stack web applications
              using React.js, Node.js, Express.js, and PostgreSQL. Skilled in designing scalable REST APIs,
              database schema design, and interactive UI development.
            </p>

            {/* CTAs */}
            <div className="cta-flex" data-no-robot>
              <button className="btn btn-fill" onClick={() => go('projects')}>
                <span>View Projects</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
              <button className="btn btn-ghost" onClick={() => go('contact')}>Get In Touch</button>
            </div>

            {/* stats */}
            <div className="stats-flex">
              <div className="stat-box" style={{ borderColor:`${theme.primary}22` }}>
                <CounterStat value="8.69" label="CGPA" color={theme.primary} />
              </div>
              <div className="stat-box" style={{ borderColor:`${theme.secondary}22` }}>
                <CounterStat value="6+" label="Projects" color={theme.secondary} />
              </div>
              <div className="stat-box" style={{ borderColor:`${theme.primary}22` }}>
                <CounterStat value="3+" label="Certs" color={theme.glow} />
              </div>
            </div>
          </div>

          {/* ── RIGHT: avatar only ── */}
          <div className="hero-avatar-col" style={{ position:'relative', display:'flex', justifyContent:'center' }}>
            <div style={{ position:'relative', width:'min(280px,72vw)', height:'min(280px,72vw)' }}>
              {/* pulse rings */}
              <div style={{ position:'absolute', inset:-14, borderRadius:'50%', border:`1px solid ${theme.primary}1e`, animation:'pulse 4s ease-out infinite' }}/>
              <div style={{ position:'absolute', inset:-28, borderRadius:'50%', border:`1px solid ${theme.secondary}10`, animation:'pulse 4s ease-out infinite 1.5s' }}/>
              {/* image */}
              <div className="float" style={{ width:'100%', height:'100%', borderRadius:'50%', overflow:'hidden', border:`2px solid ${theme.primary}44`, boxShadow:`0 0 60px ${theme.primary}18, 0 0 120px ${theme.primary}08` }}>
                <img src="/images/avatar.png" alt="Pavan H S" style={{ width:'100%', height:'100%', objectFit:'cover' }}/>
                <div style={{ position:'absolute', inset:0, background:`linear-gradient(180deg,transparent 55%,${theme.bg}88)` }}/>
              </div>
            </div>
          </div>
        </div>

        {/* scroll cue */}
        <div style={{ position:'absolute', bottom:-40, left:'50%', transform:'translateX(-50%)', display:'flex', flexDirection:'column', alignItems:'center', gap:'0.4rem', opacity:0.45 }}>
          <span style={{ fontFamily:'Fira Code,monospace', fontSize:'0.6rem', color:theme.muted, letterSpacing:'0.2em' }}>SCROLL</span>
          <div style={{ width:1, height:32, background:`linear-gradient(180deg,${theme.primary},transparent)`, animation:'floatY 2s ease-in-out infinite' }}/>
        </div>
      </div>
    </section>
  );
}
