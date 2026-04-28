import { useState, useEffect } from 'react';

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener('scroll', update);
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0,
      height: 3, zIndex: 99995, pointerEvents: 'none',
      background: 'rgba(0,212,255,0.08)',
    }}>
      <div
        style={{
          height: '100%',
          width: `${progress}%`,
          background: 'linear-gradient(90deg, #00d4ff, #7c3aed, #f59e0b)',
          boxShadow: '0 0 12px #00d4ff, 0 0 24px #7c3aed44',
          transition: 'width 0.1s linear',
          borderRadius: '0 2px 2px 0',
        }}
      />
      {/* Glowing tip */}
      <div style={{
        position: 'absolute',
        top: -3,
        left: `${progress}%`,
        width: 8, height: 8,
        borderRadius: '50%',
        background: '#00d4ff',
        boxShadow: '0 0 10px #00d4ff, 0 0 20px #00d4ff',
        transform: 'translateX(-50%)',
        transition: 'left 0.1s linear',
      }}/>
    </div>
  );
}
