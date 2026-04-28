import { useState, useEffect, useRef } from 'react';
import { themes, ThemeKey } from './ThemeSwitcher';

const links = [
  { label:'Home', href:'#hero' },
  { label:'About', href:'#about' },
  { label:'Skills', href:'#skills' },
  { label:'Projects', href:'#projects' },
  { label:'Education', href:'#education' },
  { label:'Contact', href:'#contact' },
];

interface Theme { primary:string; secondary:string; bg:string; surface:string; text:string; muted:string; }
interface Props { scrollY:number; theme:Theme; currentTheme:ThemeKey; onThemeChange:(t:ThemeKey)=>void; onNavClick:()=>void; }

export default function Navbar({ scrollY, theme, currentTheme, onThemeChange, onNavClick }: Props) {
  const [active, setActive] = useState('hero');
  const [open, setOpen] = useState(false);
  const [tOpen, setTOpen] = useState(false);
  const tRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const secs = links.map(l => l.href.slice(1));
    for (let i = secs.length - 1; i >= 0; i--) {
      const el = document.getElementById(secs[i]);
      if (el && el.getBoundingClientRect().top <= 120) { setActive(secs[i]); break; }
    }
  }, [scrollY]);

  useEffect(() => {
    if (!tOpen) return;
    const h = (e: MouseEvent) => { if (tRef.current && !tRef.current.contains(e.target as Node)) setTOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, [tOpen]);

  const go = (href: string) => {
    onNavClick();
    document.getElementById(href.slice(1))?.scrollIntoView({ behavior:'smooth' });
    setOpen(false);
  };

  const scrolled = scrollY > 60;

  return (
    <>
      <nav data-no-robot style={{
        position:'fixed', top:0, left:0, right:0, zIndex:1000,
        background: scrolled ? `${theme.bg}f2` : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? `1px solid ${theme.primary}12` : 'none',
        transition:'all 0.35s ease',
      }}>
        <div className="wrap nav-shell" style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'1.45rem 2.5rem' }}>
          {/* logo */}
          <button onClick={() => go('#hero')} style={{
            fontFamily:'Fira Code,monospace', fontSize:'1.35rem', fontWeight:700,
            color:theme.primary, background:'none', border:'none',
            letterSpacing:'0.12em',
            textShadow:`0 0 18px ${theme.primary}66`,
          }}>
            PAVAN
          </button>

          {/* desktop links */}
          <div className="hidden-mob" style={{ display:'flex', gap:'2.4rem', alignItems:'center' }}>
            {links.map(l => (
              <button key={l.href} onClick={() => go(l.href)}
                className={`nav-link ${active === l.href.slice(1) ? 'active' : ''}`}
              >{l.label}</button>
            ))}
          </div>

          {/* hamburger */}
          <button onClick={() => setOpen(!open)} className="show-mob"
            style={{ background:'none', border:'none', color:theme.primary, fontSize:'1.7rem', display:'none' }}>
            {open ? '✕' : '☰'}
          </button>
        </div>

        {/* mobile menu */}
        {open && (
          <div style={{ background:`${theme.bg}f8`, borderTop:`1px solid ${theme.primary}12`, padding:'1.25rem 2.25rem', display:'flex', flexDirection:'column', gap:'1rem' }}>
            {links.map(l => (
              <button key={l.href} onClick={() => go(l.href)}
                className={`nav-link ${active === l.href.slice(1) ? 'active' : ''}`}
                style={{ textAlign:'left' }}
              >{l.label}</button>
            ))}
          </div>
        )}
      </nav>

      {/* Themes — fixed top-right, visible only at top */}
      <div
        data-no-robot
        ref={tRef}
        className="themes-fixed"
        style={{
          position:'fixed', top:94, right:'2.8rem', zIndex:999,
          opacity: scrollY > 80 ? 0 : 1,
          pointerEvents: scrollY > 80 ? 'none' : 'all',
          transition:'opacity 0.3s ease',
        }}
      >
        <button
          onClick={() => setTOpen(o => !o)}
          style={{
            fontFamily:'Fira Code,monospace', fontSize:'0.9rem', fontWeight:600,
            letterSpacing:'0.1em', color: tOpen ? theme.primary : theme.muted,
            background: tOpen ? `${theme.primary}12` : `${theme.bg}cc`,
            border:`1px solid ${tOpen ? theme.primary+'44' : theme.primary+'1a'}`,
            borderRadius:10, padding:'0.7rem 1.2rem',
            backdropFilter:'blur(16px)',
            display:'flex', alignItems:'center', gap:'0.55rem', whiteSpace:'nowrap',
            transition:'all 0.25s',
          }}
        >
          <span style={{ width:8, height:8, borderRadius:'50%', background:theme.primary, boxShadow:`0 0 7px ${theme.primary}`, display:'inline-block', flexShrink:0 }}/>
          Themes
          <span style={{ fontSize:'0.55rem', transform: tOpen?'rotate(180deg)':'rotate(0)', transition:'transform 0.25s', opacity:0.6 }}>▼</span>
        </button>

        {tOpen && (
          <div style={{
            position:'absolute', top:'calc(100% + 8px)', right:0,
            background:`${theme.surface}f8`, border:`1px solid ${theme.primary}20`,
            borderRadius:14, padding:'0.8rem',
            backdropFilter:'blur(24px)', minWidth:210,
            boxShadow:`0 20px 60px rgba(0,0,0,0.5), 0 0 30px ${theme.primary}10`,
            animation:'slideUp 0.2s ease',
          }}>
            <div style={{ fontFamily:'Fira Code,monospace', fontSize:'0.68rem', color:theme.muted, letterSpacing:'0.18em', textTransform:'uppercase', marginBottom:'0.65rem', paddingLeft:'0.5rem' }}>Select Theme</div>
            {(Object.keys(themes) as ThemeKey[]).map(key => (
              <button key={key} onClick={() => { onThemeChange(key); setTOpen(false); }}
                style={{
                  display:'flex', alignItems:'center', gap:'0.6rem',
                  width:'100%', padding:'0.7rem 0.8rem', borderRadius:10,
                  border:'none',
                  background: currentTheme===key ? `${themes[key].primary}18` : 'transparent',
                  outline: currentTheme===key ? `1px solid ${themes[key].primary}38` : 'none',
                  color: currentTheme===key ? themes[key].primary : theme.muted,
                  fontFamily:'Space Grotesk,sans-serif', fontSize:'0.98rem',
                  fontWeight: currentTheme===key ? 600 : 400,
                  transition:'all 0.15s', marginBottom:'0.1rem', textAlign:'left',
                }}
              >
                <span style={{ width:10, height:10, borderRadius:'50%', background:themes[key].primary, boxShadow: currentTheme===key?`0 0 7px ${themes[key].primary}`:'none', flexShrink:0, display:'inline-block' }}/>
                <span style={{ flex:1 }}>{themes[key].name}</span>
                {currentTheme===key && <span style={{ fontSize:'0.7rem', color:themes[key].primary }}>✓</span>}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
