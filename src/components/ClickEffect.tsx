import { useEffect, useRef } from 'react';

// ── Inject the keyframe once into <head> ──
const STYLE_ID = 'corner-flash-style';
if (!document.getElementById(STYLE_ID)) {
  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = `
    @keyframes _cfTL {
      0%   { width:0;    height:0;    opacity:1; }
      60%  { width:22px; height:22px; opacity:1; }
      100% { width:22px; height:22px; opacity:0; }
    }
    @keyframes _cfTR {
      0%   { width:0;    height:0;    opacity:1; }
      60%  { width:22px; height:22px; opacity:1; }
      100% { width:22px; height:22px; opacity:0; }
    }
    @keyframes _cfBL {
      0%   { width:0;    height:0;    opacity:1; }
      60%  { width:22px; height:22px; opacity:1; }
      100% { width:22px; height:22px; opacity:0; }
    }
    @keyframes _cfBR {
      0%   { width:0;    height:0;    opacity:1; }
      60%  { width:22px; height:22px; opacity:1; }
      100% { width:22px; height:22px; opacity:0; }
    }
  `;
  document.head.appendChild(style);
}

const DURATION = 480; // ms — total corner flash duration

function flashCorners(el: HTMLElement, color: string) {
  // Make sure element has position so absolute children work
  const pos = getComputedStyle(el).position;
  if (pos === 'static') el.style.position = 'relative';

  const corners: Array<{ top?: string; bottom?: string; left?: string; right?: string; anim: string; borderStyle: string }> = [
    { top: '0', left: '0',   anim: '_cfTL', borderStyle: `border-top:2px solid ${color};border-left:2px solid ${color};border-radius:4px 0 0 0;` },
    { top: '0', right: '0',  anim: '_cfTR', borderStyle: `border-top:2px solid ${color};border-right:2px solid ${color};border-radius:0 4px 0 0;` },
    { bottom: '0', left: '0', anim: '_cfBL', borderStyle: `border-bottom:2px solid ${color};border-left:2px solid ${color};border-radius:0 0 0 4px;` },
    { bottom: '0', right: '0', anim: '_cfBR', borderStyle: `border-bottom:2px solid ${color};border-right:2px solid ${color};border-radius:0 0 4px 0;` },
  ];

  corners.forEach(c => {
    const div = document.createElement('div');
    const pos = [
      c.top    !== undefined ? `top:${c.top}`       : '',
      c.bottom !== undefined ? `bottom:${c.bottom}` : '',
      c.left   !== undefined ? `left:${c.left}`     : '',
      c.right  !== undefined ? `right:${c.right}`   : '',
    ].filter(Boolean).join(';');

    div.setAttribute('style', `
      position:absolute;
      ${pos};
      width:0; height:0;
      pointer-events:none;
      z-index:9999;
      box-shadow:0 0 8px ${color};
      animation:${c.anim} ${DURATION}ms ease-out forwards;
      ${c.borderStyle}
    `);

    el.appendChild(div);
    setTimeout(() => { if (div.parentNode) div.parentNode.removeChild(div); }, DURATION + 50);
  });
}

// Walk up from target to find the best element to flash corners on
function findTarget(target: HTMLElement): { el: HTMLElement; color: string } | null {
  const selectors = ['.card-glass', '.project-card', '.skill-card-wrap', 'button', 'a', '.tech-tag'];
  let el: HTMLElement | null = target;
  while (el && el !== document.body) {
    for (const sel of selectors) {
      if (el.matches(sel)) {
        const color =
          el.style.getPropertyValue('--card-color') ||
          getComputedStyle(el).getPropertyValue('--card-color') ||
          '#00d4ff';
        return { el, color: color.trim() || '#00d4ff' };
      }
    }
    el = el.parentElement;
  }
  return null;
}

export default function ClickEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ripplesRef = useRef<Array<{ id: number; x: number; y: number; life: number; maxLife: number }>>([]);
  const frameRef = useRef<number>(0);
  const counterRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);

    // ── Arrow zone: corner flash on mousedown (zero delay) ──
    const handleMouseDown = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('[data-no-robot]')) return;
      const found = findTarget(target);
      if (found) flashCorners(found.el, found.color);
    };

    // ── Robot zone: ripple ring on click ──
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('[data-no-robot]')) return;
      ripplesRef.current.push({ id: counterRef.current++, x: e.clientX, y: e.clientY, life: 0, maxLife: 55 });
    };

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('click', handleClick);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ripplesRef.current = ripplesRef.current.filter(r => r.life < r.maxLife);
      ripplesRef.current.forEach(r => {
        const progress = r.life / r.maxLife;
        const eased = 1 - Math.pow(1 - progress, 2);
        const alpha = 1 - progress;
        const radius = eased * 48;
        ctx.beginPath();
        ctx.arc(r.x, r.y, radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 212, 255, ${alpha * 0.7})`;
        ctx.lineWidth = 2 * (1 - eased * 0.5);
        ctx.stroke();
        if (progress < 0.35) {
          ctx.beginPath();
          ctx.arc(r.x, r.y, radius * 0.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 212, 255, ${(1 - progress / 0.35) * 0.18})`;
          ctx.fill();
        }
        r.life++;
      });
      frameRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 99990 }}
    />
  );
}
