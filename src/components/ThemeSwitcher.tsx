import { useState } from 'react';

export const themes = {
  cyberpunk: {
    name: 'Cyberpunk',
    icon: '⚡',
    bg: '#050a14',
    surface: '#0d1526',
    primary: '#00d4ff',
    secondary: '#7c3aed',
    accent: '#f59e0b',
    text: '#e2e8f0',
    muted: '#64748b',
    gridColor: 'rgba(0, 212, 255, 0.03)',
    glow: '#00d4ff',
  },
  synthwave: {
    name: 'Synthwave',
    icon: '🌆',
    bg: '#0f0020',
    surface: '#1a0035',
    primary: '#ff2d78',
    secondary: '#bf00ff',
    accent: '#ffdd00',
    text: '#ffe4f0',
    muted: '#8b5a7a',
    gridColor: 'rgba(255, 45, 120, 0.04)',
    glow: '#ff2d78',
  },
  matrix: {
    name: 'Matrix',
    icon: '🟩',
    bg: '#000d00',
    surface: '#001400',
    primary: '#00ff41',
    secondary: '#008f11',
    accent: '#00ff41',
    text: '#ccffcc',
    muted: '#2d7a2d',
    gridColor: 'rgba(0, 255, 65, 0.03)',
    glow: '#00ff41',
  },
  midnight: {
    name: 'Midnight',
    icon: '🌙',
    bg: '#0a0a0f',
    surface: '#12121a',
    primary: '#a78bfa',
    secondary: '#ec4899',
    accent: '#fbbf24',
    text: '#f1f0ff',
    muted: '#6b6b8a',
    gridColor: 'rgba(167, 139, 250, 0.03)',
    glow: '#a78bfa',
  },
};

export type ThemeKey = keyof typeof themes;

interface Props {
  current: ThemeKey;
  onChange: (t: ThemeKey) => void;
}

export default function ThemeSwitcher({ current, onChange }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{
      position: 'fixed',
      bottom: '2rem',
      right: '2rem',
      zIndex: 9990,
    }}>
      {/* Panel */}
      <div style={{
        position: 'absolute',
        bottom: '4rem',
        right: 0,
        background: 'rgba(13,21,38,0.95)',
        border: `1px solid ${themes[current].primary}33`,
        borderRadius: 16,
        padding: open ? '1rem' : '0',
        backdropFilter: 'blur(20px)',
        overflow: 'hidden',
        maxHeight: open ? 300 : 0,
        opacity: open ? 1 : 0,
        transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)',
        pointerEvents: open ? 'all' : 'none',
        minWidth: 160,
        boxShadow: open ? `0 0 40px ${themes[current].primary}22` : 'none',
      }}>
        <div style={{
          fontFamily: 'JetBrains Mono',
          fontSize: '0.65rem',
          color: themes[current].muted,
          letterSpacing: '0.15em',
          marginBottom: '0.75rem',
          textTransform: 'uppercase',
        }}>Theme</div>
        {(Object.keys(themes) as ThemeKey[]).map(key => (
          <button
            key={key}
            onClick={() => { onChange(key); setOpen(false); }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              width: '100%',
              padding: '0.6rem 0.75rem',
              borderRadius: 10,
              border: 'none',
              background: current === key
                ? `${themes[key].primary}22`
                : 'transparent',
              outline: current === key ? `1px solid ${themes[key].primary}55` : 'none',
              color: current === key ? themes[key].primary : themes[current].muted,
              fontFamily: 'Syne',
              fontSize: '0.85rem',
              fontWeight: current === key ? 700 : 400,
              transition: 'all 0.2s',
              marginBottom: '0.25rem',
            }}
          >
            <span style={{ fontSize: '1rem' }}>{themes[key].icon}</span>
            {themes[key].name}
            {current === key && (
              <span style={{ marginLeft: 'auto', fontSize: '0.7rem', color: themes[key].primary }}>✓</span>
            )}
          </button>
        ))}
      </div>

      {/* Toggle button */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: 52, height: 52,
          borderRadius: '50%',
          background: `linear-gradient(135deg, ${themes[current].primary}, ${themes[current].secondary})`,
          border: 'none',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.3rem',
          boxShadow: `0 0 20px ${themes[current].primary}66`,
          transition: 'all 0.3s ease',
          transform: open ? 'rotate(45deg) scale(1.1)' : 'rotate(0deg) scale(1)',
        }}
        title="Change Theme"
      >
        🎨
      </button>
    </div>
  );
}
