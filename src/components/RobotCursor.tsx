import { useEffect, useRef, useState } from 'react';

interface Props {
  mousePos: { x: number; y: number };
  themeColor: string;
  themeSecondary: string;
  themeBg: string;
}

const MESSAGES = [
  'Hello! 👋',
  'Beep boop!',
  'Impressive!',
  '01010001',
  "Let's build!",
  '⚡ Powered!',
  'Looking good!',
  'Nice one!',
];

const isTouchDevice = typeof window !== 'undefined' &&
  window.matchMedia('(hover: none) and (pointer: coarse)').matches;

export default function RobotCursor({ mousePos, themeColor, themeSecondary, themeBg }: Props) {
  if (isTouchDevice) return null;
  const robotPos = useRef({ x: -200, y: -200 });
  const dotPos = useRef({ x: -200, y: -200 });
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [dot, setDot] = useState({ x: -200, y: -200 });
  const [isBlinking, setIsBlinking] = useState(false);
  const [eyeDir, setEyeDir] = useState({ x: 0, y: 0 });
  const [isExcited, setIsExcited] = useState(false);
  const [bubble, setBubble] = useState<string | null>(null);
  const [scale, setScale] = useState(1);

  // Zone state
  const [inNoRobotZone, setInNoRobotZone] = useState(false);

  const frameRef = useRef<number>(0);
  const blinkRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const bubbleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const msgIdx = useRef(0);

  // Animation loop
  useEffect(() => {
    const animate = () => {
      robotPos.current.x += (mousePos.x - robotPos.current.x) * 0.08;
      robotPos.current.y += (mousePos.y - robotPos.current.y) * 0.08;
      dotPos.current.x += (mousePos.x - dotPos.current.x) * 0.25;
      dotPos.current.y += (mousePos.y - dotPos.current.y) * 0.25;
      setPos({ x: robotPos.current.x, y: robotPos.current.y });
      setDot({ x: dotPos.current.x, y: dotPos.current.y });

      const dx = mousePos.x - robotPos.current.x;
      const dy = mousePos.y - robotPos.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist > 1) {
        setEyeDir({ x: (dx / dist) * 2.5, y: (dy / dist) * 2.5 });
      }
      frameRef.current = requestAnimationFrame(animate);
    };
    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [mousePos]);

  // Blink
  useEffect(() => {
    blinkRef.current = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 140);
    }, 2800);
    return () => { if (blinkRef.current) clearInterval(blinkRef.current); };
  }, []);

  // Click reaction — only outside no-robot zones
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const inZone = !!target.closest('[data-no-robot]');
      if (inZone) return; // suppress robot click reaction inside no-robot zones
      setIsExcited(true);
      setScale(1.3);
      const msg = MESSAGES[msgIdx.current % MESSAGES.length];
      msgIdx.current++;
      setBubble(msg);
      if (bubbleTimer.current) clearTimeout(bubbleTimer.current);
      bubbleTimer.current = setTimeout(() => {
        setBubble(null);
        setIsExcited(false);
        setScale(1);
      }, 1800);
    };
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  // Zone detection
  useEffect(() => {
    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setInNoRobotZone(!!target.closest('[data-no-robot]'));
    };
    window.addEventListener('mouseover', onOver);
    return () => window.removeEventListener('mouseover', onOver);
  }, []);

  const eyeColor = isExcited ? '#f59e0b' : themeColor;
  const bodyColor = themeBg === '#000d00' ? '#001200' : themeBg === '#0a0a0f' ? '#0f0f18' : '#0d1526';

  return (
    <>
      {/* ── NO-ROBOT ZONE: plain light-blue arrow cursor ── */}
      {inNoRobotZone && (
        <div
          style={{
            position: 'fixed',
            left: mousePos.x,
            top: mousePos.y,
            pointerEvents: 'none',
            zIndex: 99999,
          }}
        >
          <svg
            width="22"
            height="26"
            viewBox="0 0 22 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ filter: 'drop-shadow(0 0 4px #00d4ff88)' }}
          >
            <path
              d="M2 2L2 20L7.5 14.5L11 22L13.5 21L10 13.5L18 13.5L2 2Z"
              fill="#00d4ff"
              stroke="#050a14"
              strokeWidth="1"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}

      {/* ── ROBOT ZONE: full robot cursor ── */}
      {!inNoRobotZone && (
        <>
          {/* Cursor dot */}
          <div style={{
            position: 'fixed',
            left: dot.x, top: dot.y,
            width: 8, height: 8,
            borderRadius: '50%',
            background: themeColor,
            boxShadow: `0 0 10px ${themeColor}`,
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            zIndex: 99999,
          }} />

          {/* Robot */}
          <div style={{
            position: 'fixed',
            left: pos.x, top: pos.y,
            transform: `translate(-50%, -120%) scale(${scale})`,
            pointerEvents: 'none',
            zIndex: 99998,
            transition: 'transform 0.2s cubic-bezier(0.34,1.56,0.64,1)',
            filter: isExcited
              ? `drop-shadow(0 0 12px ${eyeColor})`
              : `drop-shadow(0 0 6px ${themeColor}44)`,
          }}>
            {/* Speech bubble */}
            {bubble && (
              <div style={{
                position: 'absolute',
                bottom: '105%', left: '50%',
                transform: 'translateX(-50%)',
                background: `linear-gradient(135deg, ${themeColor}22, ${themeSecondary}22)`,
                border: `1px solid ${themeColor}55`,
                borderRadius: 10,
                padding: '0.35rem 0.75rem',
                fontFamily: 'JetBrains Mono',
                fontSize: '0.7rem',
                color: themeColor,
                whiteSpace: 'nowrap',
                backdropFilter: 'blur(10px)',
                animation: 'bubbleIn 0.3s cubic-bezier(0.34,1.56,0.64,1)',
                boxShadow: `0 0 20px ${themeColor}33`,
              }}>
                {bubble}
                <div style={{
                  position: 'absolute',
                  bottom: -6, left: '50%',
                  transform: 'translateX(-50%)',
                  width: 0, height: 0,
                  borderLeft: '5px solid transparent',
                  borderRight: '5px solid transparent',
                  borderTop: `6px solid ${themeColor}55`,
                }} />
              </div>
            )}

            <svg
              width={isExcited ? 56 : 48}
              height={isExcited ? 64 : 56}
              viewBox="0 0 48 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ transition: 'all 0.2s' }}
            >
              {/* Antenna */}
              <line x1="24" y1="0" x2="24" y2="8" stroke={themeColor} strokeWidth="2" strokeLinecap="round" />
              <circle cx="24" cy="0" r="3" fill={themeColor}>
                <animate attributeName="opacity" values="1;0.3;1" dur={isExcited ? '0.4s' : '1.5s'} repeatCount="indefinite" />
                <animate attributeName="r" values={isExcited ? '3;5;3' : '3;3;3'} dur="0.4s" repeatCount="indefinite" />
              </circle>

              {/* Head */}
              <rect x="8" y="8" width="32" height="24" rx="6" fill={bodyColor} stroke={themeColor} strokeWidth="1.5" />

              {/* Eyes */}
              <rect x="13" y={isBlinking ? 19 : 16} width="8" height={isBlinking ? 2 : 8} rx="2" fill={eyeColor} opacity="0.95" />
              <rect x="27" y={isBlinking ? 19 : 16} width="8" height={isBlinking ? 2 : 8} rx="2" fill={eyeColor} opacity="0.95" />

              {/* Pupils */}
              {!isBlinking && (
                <>
                  <circle cx={17 + eyeDir.x} cy={20 + eyeDir.y} r="2.2" fill={bodyColor} />
                  <circle cx={31 + eyeDir.x} cy={20 + eyeDir.y} r="2.2" fill={bodyColor} />
                  <circle cx={16 + eyeDir.x} cy={18.5 + eyeDir.y} r="0.8" fill="white" opacity="0.8" />
                  <circle cx={30 + eyeDir.x} cy={18.5 + eyeDir.y} r="0.8" fill="white" opacity="0.8" />
                </>
              )}

              {/* Mouth */}
              {isExcited ? (
                <path d="M16 28 Q24 33 32 28" stroke={eyeColor} strokeWidth="2" strokeLinecap="round" fill="none" />
              ) : (
                <>
                  <rect x="16" y="27" width="16" height="3" rx="1.5" fill={themeSecondary} opacity="0.8" />
                  <rect x="18" y="27" width="3" height="3" rx="1" fill={themeColor} opacity="0.6" />
                  <rect x="23" y="27" width="3" height="3" rx="1" fill={themeColor} opacity="0.6" />
                  <rect x="28" y="27" width="3" height="3" rx="1" fill={themeColor} opacity="0.6" />
                </>
              )}

              {/* Neck */}
              <rect x="20" y="32" width="8" height="4" rx="2" fill={bodyColor} stroke={themeColor} strokeWidth="1" />

              {/* Body */}
              <rect x="10" y="36" width="28" height="18" rx="6" fill={bodyColor} stroke={themeColor} strokeWidth="1.5" />

              {/* Chest light */}
              <circle cx="24" cy="45" r="4" fill={themeSecondary} opacity="0.7">
                <animate attributeName="opacity" values={isExcited ? '1;0.3;1' : '0.7;0.4;0.7'} dur={isExcited ? '0.3s' : '2s'} repeatCount="indefinite" />
              </circle>
              <circle cx="24" cy="45" r="2" fill={themeColor}>
                <animate attributeName="r" values={isExcited ? '2;3.5;2' : '2;2;2'} dur="0.3s" repeatCount="indefinite" />
              </circle>

              {/* Arms */}
              <rect
                x={isExcited ? -2 : 2} y={isExcited ? 34 : 38}
                width="8" height="3" rx="1.5"
                fill={bodyColor} stroke={themeColor} strokeWidth="1"
                style={{ transition: 'all 0.2s' }}
              />
              <rect x="38" y="38" width="8" height="3" rx="1.5" fill={bodyColor} stroke={themeColor} strokeWidth="1" />

              {/* Scan lines */}
              <line x1="15" y1="40" x2="33" y2="40" stroke={themeColor} strokeWidth="0.5" opacity="0.3" />
              <line x1="15" y1="43" x2="33" y2="43" stroke={themeColor} strokeWidth="0.5" opacity="0.3" />
              <line x1="15" y1="50" x2="33" y2="50" stroke={themeColor} strokeWidth="0.5" opacity="0.3" />
            </svg>
          </div>
        </>
      )}
    </>
  );
}
