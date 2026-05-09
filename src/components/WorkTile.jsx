import { useEffect, useRef, useState } from 'react';
import GlareHover from './GlareHover';

const BASE = import.meta.env.BASE_URL;

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
);
const PauseIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M6 5h4v14H6zM14 5h4v14h-4z" /></svg>
);

export default function WorkTile({ item, onToast, onSelect }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [imgOk, setImgOk] = useState(true);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const onEnded = () => setPlaying(false);
    a.addEventListener('ended', onEnded);
    return () => a.removeEventListener('ended', onEnded);
  }, []);

  const togglePlay = (e) => {
    e.stopPropagation();
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) {
      a.currentTime = 0;
      a.play().then(() => setPlaying(true))
        .catch(() => onToast?.(`нет файла: ${item.id}.mp3`));
    } else {
      a.pause();
      setPlaying(false);
    }
  };

  if (item.kind === 'audio') {
    return (
      <GlareHover
        glareColor="#ffffff" glareOpacity={0.25} glareAngle={-30}
        glareSize={250} transitionDuration={800} playOnce={false}
        className="work-card audio" style={{ width: '100%', height: '100%' }}
      >
        <div className="cover audio-cover">
          <span className="pill">{item.soft}</span>
          <div className={`wave ${playing ? 'playing' : ''}`}>
            {Array.from({ length: 20 }).map((_, i) => (
              <span key={i} style={{ height: `${20 + Math.abs(Math.sin(i * 1.3)) * 70}%` }} />
            ))}
          </div>
          <button className="play-btn" onClick={togglePlay} aria-label={playing ? 'pause' : 'play'}>
            {playing ? <PauseIcon /> : <PlayIcon />}
          </button>
          <audio ref={audioRef} preload="none" src={`${BASE}assets/audio/${item.id}.mp3`} />
        </div>
        <div className="meta">
          <span className="ttl">{item.title}</span>
          <span className="cat">{item.soft}</span>
        </div>
      </GlareHover>
    );
  }

  return (
    <GlareHover
      glareColor="#ffffff" glareOpacity={0.3} glareAngle={-30}
      glareSize={300} transitionDuration={800} playOnce={false}
      className="work-card image" style={{ width: '100%', height: '100%' }}
      onClick={() => onSelect?.(item)}
    >
      <div className="cover">
        <span className="pill">{item.soft}</span>
        {imgOk ? (
          <img
            src={`${BASE}assets/works/${item.id}.${item.ext || 'png'}`}
            alt={item.title}
            onError={() => setImgOk(false)}
          />
        ) : (
          <div className="placeholder">
            <span className="ph-label">{item.id}</span>
          </div>
        )}
        <div className="tile-hint">↗</div>
      </div>
    </GlareHover>
  );
}
