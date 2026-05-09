import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';

const useMedia = (queries, values, fallback) => {
  const [val, setVal] = useState(fallback);
  useEffect(() => {
    const mqls = queries.map(q => window.matchMedia(q));
    const handler = () => {
      const idx = mqls.findIndex(m => m.matches);
      setVal(idx === -1 ? fallback : values[idx]);
    };
    handler();
    mqls.forEach(m => m.addEventListener('change', handler));
    return () => mqls.forEach(m => m.removeEventListener('change', handler));
  }, []);
  return val;
};

const useMeasure = () => {
  const ref = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  useEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(entries => {
      const { width, height } = entries[0].contentRect;
      setSize({ width, height });
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);
  return [ref, size];
};

const useImagePreload = (urls) => {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (!urls.length) { setReady(true); return; }
    let n = 0;
    urls.forEach(u => {
      const img = new Image();
      img.onload = img.onerror = () => { n++; if (n === urls.length) setReady(true); };
      img.src = u;
    });
  }, [urls.join('|')]);
  return ready;
};

export default function Masonry({
  items,
  ease = 'power3.out',
  duration = 0.6,
  stagger = 0.05,
  animateFrom = 'bottom',
  scaleOnHover = true,
  hoverScale = 0.95,
  blurToFocus = true,
  colorShiftOnHover = false
}) {
  const cols = useMedia(
    ['(min-width: 1100px)', '(min-width: 720px)', '(min-width: 480px)'],
    [3, 2, 2],
    1
  );
  const [containerRef, { width }] = useMeasure();
  const ready = useImagePreload(items.map(i => i.img).filter(Boolean));
  const elements = useRef({});
  const hasMounted = useRef(false);

  const grid = useMemo(() => {
    if (!width) return [];
    const gap = 16;
    const colW = (width - gap * (cols - 1)) / cols;
    const colH = new Array(cols).fill(0);
    return items.map(item => {
      const c = colH.indexOf(Math.min(...colH));
      const x = c * (colW + gap);
      const h = item.height ? (item.height / 600) * colW : colW;
      const y = colH[c];
      colH[c] = y + h + gap;
      return { ...item, x, y, w: colW, h, totalH: Math.max(...colH) };
    });
  }, [items, width, cols]);

  const totalHeight = grid.length ? Math.max(...grid.map(g => g.y + g.h)) : 0;

  const fromVars = (it) => {
    const base = { x: it.x, y: it.y, width: it.w, height: it.h, opacity: 0 };
    switch (animateFrom) {
      case 'top':    return { ...base, y: -100 };
      case 'bottom': return { ...base, y: window.innerHeight };
      case 'left':   return { ...base, x: -100 };
      case 'right':  return { ...base, x: window.innerWidth };
      case 'center': return { ...base, scale: 0.6 };
      default:       return { ...base };
    }
  };

  useLayoutEffect(() => {
    if (!ready || !grid.length) return;
    grid.forEach((it, i) => {
      const el = elements.current[it.id];
      if (!el) return;
      const targets = { x: it.x, y: it.y, width: it.w, height: it.h, opacity: 1 };
      if (!hasMounted.current) {
        gsap.fromTo(el, fromVars(it), {
          ...targets,
          duration,
          ease,
          delay: i * stagger,
          filter: blurToFocus ? 'blur(0px)' : undefined
        });
        if (blurToFocus) gsap.fromTo(el, { filter: 'blur(8px)' }, { filter: 'blur(0px)', duration: duration * 1.2, delay: i * stagger });
      } else {
        gsap.to(el, { ...targets, duration: 0.4, ease });
      }
    });
    hasMounted.current = true;
  }, [grid, ready]);

  const onEnter = (e) => {
    if (scaleOnHover) gsap.to(e.currentTarget, { scale: hoverScale, duration: 0.25, ease: 'power2.out' });
    if (colorShiftOnHover) {
      const overlay = e.currentTarget.querySelector('.color-overlay');
      if (overlay) gsap.to(overlay, { opacity: 0.4, duration: 0.25 });
    }
  };
  const onLeave = (e) => {
    if (scaleOnHover) gsap.to(e.currentTarget, { scale: 1, duration: 0.25, ease: 'power2.out' });
    if (colorShiftOnHover) {
      const overlay = e.currentTarget.querySelector('.color-overlay');
      if (overlay) gsap.to(overlay, { opacity: 0, duration: 0.25 });
    }
  };

  return (
    <div ref={containerRef} className="masonry" style={{ position: 'relative', width: '100%', height: totalHeight }}>
      {grid.map(it => (
        <div
          key={it.id}
          ref={el => (elements.current[it.id] = el)}
          className="masonry-item"
          onMouseEnter={onEnter}
          onMouseLeave={onLeave}
          onClick={() => it.url && window.open(it.url, '_blank', 'noopener')}
          style={{
            position: 'absolute',
            willChange: 'transform, width, height',
            cursor: it.url ? 'pointer' : 'default'
          }}
        >
          {it.render ? it.render(it) : (
            <div className="masonry-tile" style={{ backgroundImage: `url(${it.img})` }}>
              {colorShiftOnHover && <div className="color-overlay" />}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
