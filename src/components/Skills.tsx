import { useEffect, useRef, useState } from 'react';

const FIXED_H = 300;

const skillGroups = [
  {
    cat: 'Programming Languages', icon: '💻', color: '#00d4ff',
    items: ['Python', 'Java', 'JavaScript'],
    bars: [{ n:'JavaScript', v:90 }, { n:'Python', v:85 }, { n:'Java', v:75 }],
    back: 'Core languages powering every project — from dynamic UIs to ML pipelines.',
  },
  {
    cat: 'Frontend', icon: '🎨', color: '#7c3aed',
    items: ['React.js', 'HTML5', 'CSS3', 'jQuery', 'Tailwind CSS', 'Bootstrap'],
    bars: [{ n:'React.js', v:92 }, { n:'HTML5/CSS3', v:95 }, { n:'Tailwind', v:88 }, { n:'Bootstrap', v:80 }],
    back: 'Crafting pixel-perfect, responsive interfaces with modern React and utility-first CSS.',
  },
  {
    cat: 'Backend', icon: '⚙️', color: '#f59e0b',
    items: ['Node.js', 'Express.js', 'RESTful APIs', 'Middleware'],
    bars: [{ n:'Node.js', v:88 }, { n:'Express.js', v:87 }, { n:'REST APIs', v:90 }],
    back: 'Engineering robust server-side logic, middleware, and scalable REST APIs.',
  },
  {
    cat: 'Databases', icon: '🗄️', color: '#00d4ff',
    items: ['PostgreSQL', 'MySQL'],
    bars: [{ n:'PostgreSQL', v:85 }, { n:'MySQL', v:80 }],
    back: 'Designing normalized schemas, writing complex queries, and optimizing performance.',
  },
  {
    cat: 'Data Science', icon: '📊', color: '#7c3aed',
    items: ['NumPy', 'Pandas', 'Matplotlib', 'Seaborn', 'Scikit-learn'],
    bars: [{ n:'NumPy/Pandas', v:78 }, { n:'Matplotlib', v:75 }, { n:'Scikit-learn', v:70 }],
    back: 'Applying ML algorithms, data wrangling, and visualization for insight-driven solutions.',
  },
  {
    cat: 'Tools & IDEs', icon: '🔧', color: '#f59e0b',
    items: ['Git', 'GitHub', 'Postman', 'VS Code', 'PyCharm', 'Jupyter'],
    bars: [{ n:'Git/GitHub', v:90 }, { n:'VS Code', v:92 }, { n:'Postman', v:85 }, { n:'Jupyter', v:80 }],
    back: 'Leveraging the best developer tools for version control, testing, and productivity.',
  },
];

interface Theme { primary: string; secondary: string; bg: string; surface: string; text: string; muted: string; }

export default function Skills({ theme }: { theme: Theme }) {
  const ref = useRef<HTMLElement>(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { setVis(true); e.target.classList.add('visible'); } });
    }, { threshold: 0.1 });
    ref.current?.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="skills" ref={ref} data-no-robot className="sec" style={{ background:`linear-gradient(180deg,transparent,rgba(15,23,42,0.4),transparent)` }}>
      <div className="wrap">
        <div className="reveal" style={{ marginBottom:'2.5rem', textAlign:'center' }}>
          <div className="sec-label" style={{ justifyContent:'center' }}>02. skills</div>
          <h2 className="sec-title" style={{ textAlign:'center' }}>Technical Arsenal</h2>
          <p style={{ color:theme.muted, marginTop:'0.75rem', fontFamily:'Fira Code,monospace', fontSize:'0.78rem' }}>Hover any card to flip and see details</p>
        </div>

        <div className="skills-grid" style={{ gridAutoRows:`${FIXED_H}px` }}>
          {skillGroups.map(g => {
            const empty = 4 - g.bars.length;
            return (
              <div key={g.cat} className="flip-wrap reveal" style={{ height:FIXED_H }}>
                <div className="flip-inner" style={{ height:'100%' }}>
                  {/* front */}
                  <div className="flip-front card" style={{ padding:'1.45rem', height:'100%', display:'flex', flexDirection:'column' }}>
                    <div style={{ display:'flex', alignItems:'center', gap:'0.6rem', marginBottom:'1rem', flexShrink:0 }}>
                      <span style={{ fontSize:'1.1rem' }}>{g.icon}</span>
                      <span style={{ fontFamily:'Space Grotesk,sans-serif', fontWeight:600, color:theme.text, fontSize:'0.9rem' }}>{g.cat}</span>
                      <span style={{ marginLeft:'auto', fontFamily:'Fira Code,monospace', fontSize:'0.55rem', color:g.color, opacity:0.6, letterSpacing:'0.1em' }}>HOVER</span>
                    </div>
                    <div style={{ flex:1 }}>
                      {g.bars.map(b => (
                        <div key={b.n} style={{ marginBottom:'0.75rem' }}>
                          <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'0.25rem' }}>
                            <span style={{ fontFamily:'Fira Code,monospace', fontSize:'0.72rem', color:theme.muted }}>{b.n}</span>
                            <span style={{ fontFamily:'Fira Code,monospace', fontSize:'0.68rem', color:g.color }}>{b.v}%</span>
                          </div>
                          <div className="sbar-track">
                            <div className="sbar-fill" style={{ width: vis ? `${b.v}%` : '0%' }}/>
                          </div>
                        </div>
                      ))}
                      {empty > 0 && Array.from({length:empty}).map((_,i) => (
                        <div key={i} style={{ height:44 }}/>
                      ))}
                    </div>
                  </div>
                  {/* back */}
                  <div className="flip-back" style={{ height:'100%' }}>
                    <span style={{ fontSize:'2rem', marginBottom:'0.75rem' }}>{g.icon}</span>
                    <div style={{ fontFamily:'Space Grotesk,sans-serif', fontWeight:600, color:g.color, fontSize:'0.9rem', marginBottom:'0.6rem', textAlign:'center' }}>{g.cat}</div>
                    <p style={{ fontFamily:'Fira Code,monospace', fontSize:'0.72rem', color:theme.muted, textAlign:'center', lineHeight:1.7 }}>{g.back}</p>
                    <div style={{ display:'flex', flexWrap:'wrap', gap:'0.4rem', marginTop:'0.875rem', justifyContent:'center' }}>
                      {g.items.map(it => (
                        <span key={it} className="chip" style={{ fontSize:'0.62rem' }}>{it}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* tech cloud */}
        <div className="reveal" style={{ marginTop:'2.5rem', display:'flex', flexWrap:'wrap', gap:'0.5rem', justifyContent:'center' }}>
          {['React.js','Node.js','Express.js','PostgreSQL','Python','JavaScript','Tailwind CSS','Git','REST APIs','JWT','NumPy','Pandas','Scikit-learn','MongoDB','WebRTC'].map(t => (
            <span key={t} className="chip">{t}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
