import { useEffect } from 'react';

const BASE = import.meta.env.BASE_URL;

export default function Lightbox({ item, onClose }) {
  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div className="lb-overlay" onClick={onClose}>
      <div className="lb-inner" onClick={e => e.stopPropagation()}>
        <button className="lb-close" onClick={onClose} aria-label="close">✕</button>
        <div className="lb-img-wrap">
          <img
            src={`${BASE}assets/works/${item.id}.${item.ext || 'png'}`}
            alt={item.title}
            className="lb-img"
          />
        </div>
        <div className="lb-meta">
          <span className="lb-title">{item.title}</span>
          <span className="lb-soft">{item.soft}</span>
        </div>
      </div>
    </div>
  );
}
