import { useEffect, useRef, useState } from 'react';

interface Props { value: string; label: string; color: string; }

export default function CounterStat({ value, label, color }: Props) {
  const [displayed, setDisplayed] = useState('0');
  const ref = useRef<HTMLDivElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !animated.current) {
        animated.current = true;
        const numMatch = value.match(/([\d.]+)/);
        if (!numMatch) { setDisplayed(value); return; }
        const target = parseFloat(numMatch[1]);
        const suffix = value.replace(numMatch[1], '');
        const isFloat = value.includes('.');
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / 1500, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplayed((isFloat ? (target * eased).toFixed(2) : Math.floor(target * eased).toString()) + suffix);
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [value]);

  return (
    <div ref={ref}>
      <div
        className="stat-num"
        style={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontSize: 'clamp(1.5rem, 3vw, 2rem)',
          fontWeight: 700,
          color,
          lineHeight: 1,
          textShadow: `0 0 16px ${color}55`,
          transition: 'color 0.5s, text-shadow 0.3s',
        }}
      >
        {displayed}
      </div>
      <div
        className="stat-lbl"
        style={{
          fontFamily: 'Fira Code, monospace',
          fontSize: '0.62rem',
          color: '#64748b',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          marginTop: '0.3rem',
        }}
      >
        {label}
      </div>
    </div>
  );
}
