interface Props {
  mousePos: { x: number; y: number };
  color: string;
}

export default function SpotlightEffect({ mousePos, color }: Props) {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
        background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, ${color}06, transparent 60%)`,
        transition: 'background 0.05s',
      }}
    />
  );
}
