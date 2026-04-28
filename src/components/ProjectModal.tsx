import { useEffect } from 'react';

interface Project {
  id: number; title: string; subtitle: string; emoji: string;
  gradient?: string; borderColor?: string; color?: string;
  description?: string; desc?: string;
  highlights: string[]; tech: string[];
  status: string; statusColor?: string; sColor?: string;
}

interface Props {
  project: Project | null;
  onClose: () => void;
  theme: { primary:string; secondary:string; surface:string; text:string; muted:string; bg:string };
}

export default function ProjectModal({ project, onClose, theme }: Props) {
  useEffect(() => {
    if (project) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', h);
    return () => { window.removeEventListener('keydown', h); document.body.style.overflow = ''; };
  }, [project, onClose]);

  if (!project) return null;

  const color = project.color || project.borderColor || theme.primary;
  const desc = project.description || project.desc || '';
  const sColor = project.sColor || project.statusColor || theme.primary;

  return (
    <div onClick={onClose} style={{
      position:'fixed', inset:0,
      background:'rgba(0,0,0,0.85)', backdropFilter:'blur(14px)',
      zIndex:99980, display:'flex', alignItems:'center', justifyContent:'center',
      padding:'1.25rem', animation:'fadeIn 0.2s ease',
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: theme.surface,
        border:`1px solid ${color}33`,
        borderRadius:18, maxWidth:680, width:'100%',
        maxHeight:'90vh', overflowY:'auto',
        position:'relative',
        boxShadow:`0 0 80px ${color}18, 0 40px 80px rgba(0,0,0,0.6)`,
        animation:'slideUp 0.3s cubic-bezier(0.4,0,0.2,1)',
      }}>
        <div style={{ height:3, background:`linear-gradient(90deg,${color},${theme.secondary})`, borderRadius:'18px 18px 0 0' }}/>

        <div style={{ padding:'2rem' }}>
          <button onClick={onClose} style={{
            position:'absolute', top:'1.1rem', right:'1.1rem',
            width:32, height:32, borderRadius:'50%',
            background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)',
            color:theme.muted, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'0.9rem',
          }}>✕</button>

          {/* header */}
          <div style={{ display:'flex', alignItems:'center', gap:'1rem', marginBottom:'1.5rem' }}>
            <div style={{ width:60, height:60, borderRadius:14, background:`${color}14`, border:`1px solid ${color}28`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'2rem', flexShrink:0 }}>{project.emoji}</div>
            <div>
              <div style={{ display:'flex', alignItems:'center', gap:'0.6rem', marginBottom:'0.25rem' }}>
                <h2 style={{ fontFamily:'Space Grotesk,sans-serif', fontSize:'clamp(1.2rem,3vw,1.6rem)', fontWeight:700, color:theme.text }}>{project.title}</h2>
                <span style={{ fontFamily:'Fira Code,monospace', fontSize:'0.6rem', padding:'0.18rem 0.55rem', borderRadius:6, border:`1px solid ${sColor}44`, color:sColor, background:`${sColor}10` }}>{project.status}</span>
              </div>
              <div style={{ fontFamily:'Fira Code,monospace', fontSize:'0.75rem', color, opacity:0.85 }}>{project.subtitle}</div>
            </div>
          </div>

          {/* desc */}
          <div style={{ background:`${color}07`, border:`1px solid ${color}14`, borderRadius:10, padding:'1.1rem', marginBottom:'1.5rem' }}>
            <p style={{ color:theme.muted, lineHeight:1.8, fontSize:'0.9rem' }}>{desc}</p>
          </div>

          {/* highlights */}
          <div style={{ marginBottom:'1.5rem' }}>
            <div style={{ fontFamily:'Fira Code,monospace', fontSize:'0.62rem', color, letterSpacing:'0.15em', textTransform:'uppercase', marginBottom:'0.75rem' }}>Key Features</div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.5rem' }}>
              {project.highlights.map((h, i) => (
                <div key={i} style={{ display:'flex', alignItems:'flex-start', gap:'0.5rem', padding:'0.5rem 0.75rem', background:`${color}07`, borderRadius:8, border:`1px solid ${color}12` }}>
                  <span style={{ color, fontSize:'0.75rem', flexShrink:0, marginTop:2 }}>▸</span>
                  <span style={{ color:theme.muted, fontSize:'0.78rem', lineHeight:1.5 }}>{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* tech */}
          <div>
            <div style={{ fontFamily:'Fira Code,monospace', fontSize:'0.62rem', color, letterSpacing:'0.15em', textTransform:'uppercase', marginBottom:'0.75rem' }}>Tech Stack</div>
            <div style={{ display:'flex', flexWrap:'wrap', gap:'0.5rem' }}>
              {project.tech.map(t => (
                <span key={t} className="chip" style={{ fontSize:'0.75rem', padding:'0.3rem 0.875rem' }}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
