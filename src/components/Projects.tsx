import { useEffect, useRef } from 'react';
import ProjectModal from './ProjectModal';

const projects = [
  {
    id:1, title:'IntelliPlace', subtitle:'AI-Powered Student Placement Platform', emoji:'🎓', color:'#00d4ff',
    desc:'A comprehensive placement preparation platform leveraging AI to help students prepare for campus placements. Features personalized learning paths, mock interview simulations, aptitude tests, and real-time performance analytics.',
    highlights:['AI-driven personalized study recommendations','Mock interview module with role-based access control','Real-time aptitude & coding test engine','Placement analytics dashboard','Company-wise preparation roadmaps'],
    tech:['React.js','Node.js','Express.js','PostgreSQL','JWT','REST APIs'], status:'In Development', sColor:'#f59e0b',
  },
  {
    id:2, title:'Fit-Builder', subtitle:'AI-Powered Fitness & Workout Planner', emoji:'💪', color:'#7c3aed',
    desc:'Smart fitness application built with AI assistance to generate personalized workout plans, track progress, and provide nutrition guidance. Adapts training intensity based on user performance data.',
    highlights:['AI-generated personalized workout plans','Progress tracking with interactive charts','Nutrition & calorie management module','Exercise library with demonstrations','Goal-setting and milestone tracking'],
    tech:['React.js','Tailwind CSS','Node.js','PostgreSQL','REST APIs','Chart.js'], status:'Completed', sColor:'#00d4ff',
  },
  {
    id:3, title:'Budget Tracker', subtitle:'Personal Finance Management App', emoji:'💰', color:'#f59e0b',
    desc:'Feature-rich personal finance tracker helping users manage income, expenses, and savings goals with visual analytics. Provides spending breakdowns, monthly trends, and smart budgeting suggestions.',
    highlights:['Income & expense tracking with categories','Interactive charts for spending analysis','Monthly & yearly budget planning','Savings goals with progress indicators','Export reports as PDF / CSV'],
    tech:['React.js','Node.js','PostgreSQL','Chart.js','Tailwind CSS','Express.js'], status:'Completed', sColor:'#00d4ff',
  },
  {
    id:4, title:'JourneyQuest', subtitle:'Database-Driven Travel Management App', emoji:'✈️', color:'#00d4ff',
    desc:'Full-stack web application for managing travel data across multiple countries. Features secure storage, interactive world map visualization, and a normalized PostgreSQL schema handling 1000+ travel entries.',
    highlights:['Full-stack travel data management','Normalized PostgreSQL schema for 1000+ entries','Interactive world map visualization','Secure user authentication','Optimized queries for fast retrieval'],
    tech:['React.js','Node.js','PostgreSQL','Express.js','REST APIs','Leaflet.js'], status:'Completed', sColor:'#00d4ff',
  },
  {
    id:5, title:'ProctorPro', subtitle:'AI-Based Exam Monitoring System', emoji:'🔍', color:'#7c3aed',
    desc:'Scalable AI-based online proctoring platform enabling secure real-time remote assessments. Features role-based access control, real-time violation detection via webcam, and comprehensive analytics.',
    highlights:['Real-time violation detection via webcam','Role-based access control with JWT','Scalable RESTful APIs for event logging','Test creation, submission & evaluation','Proctoring analytics dashboard'],
    tech:['React.js','Node.js','MongoDB','JWT','WebRTC','REST APIs'], status:'Completed', sColor:'#00d4ff',
  },
  {
    id:6, title:'Hyper Notebook', subtitle:'React-Based Note-Taking Application', emoji:'📝', color:'#f59e0b',
    desc:'Clean, component-based React note-taking application with dynamic note creation, editing, and deletion. Features efficient state management, responsive UI, and a minimal yet powerful interface.',
    highlights:['Component-based React architecture','Dynamic note creation, editing & deletion','Efficient state management','Responsive design for all devices','Clean, distraction-free interface'],
    tech:['React.js','JavaScript','CSS3','HTML5'], status:'Completed', sColor:'#00d4ff',
  },
];

type P = typeof projects[0];
interface Theme { primary:string; secondary:string; bg:string; surface:string; text:string; muted:string; }
interface Props { theme:Theme; selectedProject:P|null; setSelectedProject:(p:P|null)=>void; }

export default function Projects({ theme, selectedProject, setSelectedProject }: Props) {
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
    <section id="projects" ref={ref} data-no-robot className="sec">
      <div className="wrap">
        <div className="reveal" style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
          <div className="sec-label" style={{ justifyContent: 'center' }}>03. projects</div>
          <h2 className="sec-title" style={{ textAlign: 'center' }}>Things I've Built</h2>
          <p style={{ color: theme.muted, marginTop: '0.75rem', fontFamily: 'Fira Code,monospace', fontSize: '0.78rem' }}>
            Click any card to explore full details
          </p>
        </div>

        <div className="proj-grid">
          {projects.map((p, i) => (
            <div
              key={p.id}
              className="card pcard reveal"
              onClick={() => setSelectedProject(p)}
              style={{
                padding: '1.8rem',
                minHeight: 372,
                transitionDelay: `${i * 0.07}s`,
                borderColor: `${p.color}22`,
                background: `linear-gradient(135deg,${p.color}08,rgba(15,23,42,0.7))`,
                position: 'relative', overflow: 'hidden',
                ['--card-color' as string]: p.color,
                ['--card-clr' as string]: p.color,
              }}
            >
              {/* top accent bar — animates width on hover via CSS */}
              <div className="p-accent" style={{
                position: 'absolute', top: 0, left: 0, height: 2,
                background: `linear-gradient(90deg,${p.color},transparent)`,
              }}/>

              {/* corner brackets — appear on hover via CSS */}
              <div className="p-corner-tl" style={{ ['--card-clr' as string]: p.color } as React.CSSProperties}/>
              <div className="p-corner-br" style={{ ['--card-clr' as string]: p.color } as React.CSSProperties}/>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.875rem' }}>
                <span className="p-emoji" style={{ fontSize: '1.875rem' }}>{p.emoji}</span>
                <span style={{
                  fontFamily: 'Fira Code,monospace', fontSize: '0.58rem',
                  padding: '0.18rem 0.55rem', borderRadius: 6,
                  border: `1px solid ${p.sColor}44`, color: p.sColor, background: `${p.sColor}10`,
                  whiteSpace: 'nowrap',
                }}>{p.status}</span>
              </div>

              <h3 className="p-title" style={{
                fontFamily: 'Space Grotesk,sans-serif',
                fontSize: 'clamp(1rem,2vw,1.15rem)', fontWeight: 700,
                color: theme.text, marginBottom: '0.2rem',
              }}>{p.title}</h3>

              <div style={{ fontFamily: 'Fira Code,monospace', fontSize: '0.68rem', color: p.color, marginBottom: '0.75rem', opacity: 0.85 }}>
                {p.subtitle}
              </div>

              <p style={{ color: theme.muted, fontSize: '0.83rem', lineHeight: 1.65, marginBottom: '0.875rem' }}>
                {p.desc.slice(0, 105)}...
              </p>

              <ul style={{ listStyle: 'none', marginBottom: '0.875rem' }}>
                {p.highlights.slice(0, 2).map(h => (
                  <li key={h} style={{ display: 'flex', gap: '0.4rem', color: theme.muted, fontSize: '0.75rem', lineHeight: 1.5, marginBottom: '0.3rem' }}>
                    <span style={{ color: p.color, flexShrink: 0 }}>▸</span>{h}
                  </li>
                ))}
              </ul>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                {p.tech.slice(0, 3).map(t => <span key={t} className="chip" style={{ fontSize: '0.62rem' }}>{t}</span>)}
                {p.tech.length > 3 && (
                  <span style={{ fontFamily: 'Fira Code,monospace', fontSize: '0.62rem', color: theme.muted }}>+{p.tech.length - 3}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} theme={theme} />
    </section>
  );
}
