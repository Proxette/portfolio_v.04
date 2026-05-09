import { useMemo, useState } from 'react';
import Prism from './components/Prism';
import Masonry from './components/Masonry';
import WorkTile from './components/WorkTile';
import { works, filters } from './data/works';

export default function App() {
  const [filter, setFilter] = useState('all');
  const [toast, setToast] = useState(null);

  const items = useMemo(
    () => works
      .filter(w => filter === 'all' || (w.cats || []).includes(filter))
      .map(w => ({
        id: w.id,
        height: w.height,
        render: () => <WorkTile item={w} onToast={(m) => showToast(m)} />
      })),
    [filter]
  );

  const showToast = (msg) => {
    setToast(msg);
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => setToast(null), 2400);
  };

  return (
    <>
      <div className="bg-galaxy">
        <Prism
          animationType="3drotate"
          timeScale={0.4}
          height={3.5}
          baseWidth={5.5}
          scale={3.6}
          hueShift={0}
          colorFrequency={1}
          noise={0.15}
          glow={0.85}
          bloom={0.9}
        />
      </div>
      <div className="bg-vignette" />
      <div className="scanlines" />

      <header className="nav">
        <div className="logo">proxette<span className="caret">_</span></div>
        <nav>
          <a href="#about">about</a>
          <a href="#works">works</a>
          <a href="#contact">contact</a>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-meta">
          <span>// portfolio_v.04</span>
          <span className="status"><i />online</span>
        </div>
        <h1 className="glitch" data-text="proxette">proxette</h1>
        <span className="angel-tag">proxette means angel</span>
        <p className="subtitle">
          <span className="tag">[ designer ]</span>
          <span className="tag">[ 3D ]</span>
          <span className="tag">[ sound ]</span>
          <span className="tag">[ AI / generative ]</span>
        </p>
        <div className="lead-stack">
          <span>Дизайн<i className="ld">.</i></span>
          <span>3D<i className="ld">.</i></span>
          <span>ИИ<i className="ld">.</i></span>
          <span>Генеративное&nbsp;искусство<i className="ld">.</i></span>
        </div>
        <div className="hero-cta">
          <a href="#works" className="btn solid">смотреть работы →</a>
          <a href="#contact" className="btn">написать в&nbsp;Telegram</a>
        </div>
      </section>

      <section id="about" className="about">
        <div className="section-head">
          <span className="num">01</span>
          <h2>about</h2>
        </div>
        <div className="about-grid">
          <div className="about-card">
            <h3>что я делаю</h3>
            <p>Обложки, постеры, коллажи, UI, мокапы. Photoshop, Blender, Figma. Сдаю файлы в нужных форматах, принимаю правки.</p>
          </div>
          <div className="about-card">
            <h3>звук</h3>
            <p>Биты, эмбиент, саунд-дизайн. FL Studio. Под видео, контент, игры — или просто трек.</p>
          </div>
          <div className="about-card">
            <h3>ИИ / generative</h3>
            <p>Midjourney, Stable Diffusion, генерация через код. Текстуры, арт, фоны — под задачу.</p>
          </div>
          <div className="about-card stats">
            <div><b>+50</b><span>работ</span></div>
            <div><b>4</b><span>стека</span></div>
            <div><b>∞</b><span>итераций</span></div>
          </div>
        </div>
      </section>

      <section id="works" className="works">
        <div className="section-head">
          <span className="num">02</span>
          <h2>selected works</h2>
        </div>
        <div className="filter">
          {filters.map(f => (
            <button
              key={f.key}
              className={`chip ${filter === f.key ? 'active' : ''}`}
              onClick={() => setFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>
        <Masonry
          items={items}
          ease="power3.out"
          duration={0.6}
          stagger={0.05}
          animateFrom="bottom"
          scaleOnHover
          hoverScale={0.95}
          blurToFocus
          colorShiftOnHover={false}
        />
      </section>

      <section id="contact" className="contact">
        <div className="section-head">
          <span className="num">03</span>
          <h2>contact</h2>
        </div>
        <div className="contact-card">
          <div className="contact-inner">
            <p className="contact-lead">Есть задача — пиши.</p>
            <p className="contact-sub">Обложка, 3D, ИИ-арт, трек. Разберёмся.</p>
            <a href="https://t.me/proxette" target="_blank" rel="noopener" className="btn big solid">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 2 11 13" />
                <path d="M22 2l-7 20-4-9-9-4 20-7z" />
              </svg>
              @proxette в&nbsp;Telegram
            </a>
            <div className="contact-extra">
              <span>&copy; {new Date().getFullYear()} proxette</span>
              <span>design · 3d · sound</span>
            </div>
          </div>
        </div>
      </section>

      {toast && <div className="toast">{toast}</div>}
    </>
  );
}
