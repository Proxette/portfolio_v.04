import { useRef } from 'react';

export default function GlareHover({
  glareColor = '#ffffff',
  glareOpacity = 0.3,
  glareAngle = -30,
  glareSize = 300,
  transitionDuration = 800,
  playOnce = false,
  className = '',
  style = {},
  children
}) {
  const ref = useRef(null);
  const fired = useRef(false);

  const rgba = (() => {
    const hex = glareColor.replace('#', '');
    const bigint = parseInt(hex.length === 3 ? hex.split('').map(c => c + c).join('') : hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgba(${r}, ${g}, ${b}, ${glareOpacity})`;
  })();

  const animate = () => {
    if (playOnce && fired.current) return;
    const el = ref.current?.querySelector('.glare-layer');
    if (!el) return;
    el.style.transition = 'none';
    el.style.backgroundPosition = '-100% 0';
    void el.offsetWidth;
    el.style.transition = `background-position ${transitionDuration}ms ease`;
    el.style.backgroundPosition = '200% 0';
    fired.current = true;
  };

  return (
    <div
      ref={ref}
      onMouseEnter={animate}
      className={`glare-hover ${className}`}
      style={{
        position: 'relative',
        overflow: 'hidden',
        ...style
      }}
    >
      {children}
      <span
        className="glare-layer"
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background: `linear-gradient(${glareAngle}deg, transparent 35%, ${rgba} 50%, transparent 65%)`,
          backgroundSize: `${glareSize}% 100%`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: '-100% 0',
          mixBlendMode: 'screen'
        }}
      />
    </div>
  );
}
