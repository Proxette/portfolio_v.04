export const works = [
  // photoshop
  { id: 'ps-01', ext: 'png', title: 'Харуки',         cats: ['ps'],       soft: 'photoshop',    height: 540, kind: 'image' },
  { id: 'ps-02', ext: 'jpg', title: 'Мираж',          cats: ['ps'],       soft: 'photoshop',    height: 460, kind: 'image' },
  { id: 'ps-03', ext: 'png', title: 'Document 01',    cats: ['ps'],       soft: 'photoshop',    height: 500, kind: 'image' },
  { id: 'ps-04', ext: 'jpg', title: 'Archive 03',     cats: ['ps'],       soft: 'photoshop',    height: 520, kind: 'image' },
  { id: 'ps-05', ext: 'png', title: 'Frame',          cats: ['ps'],       soft: 'photoshop',    height: 480, kind: 'image' },
  { id: 'ps-06', ext: 'jpg', title: 'Study Nov',      cats: ['ps'],       soft: 'photoshop',    height: 460, kind: 'image' },
  { id: 'ps-07', ext: 'jpg', title: 'Texture 20',     cats: ['ps'],       soft: 'photoshop',    height: 500, kind: 'image' },

  // photoshop + blender
  { id: 'mix-01', ext: 'jpg', title: 'Synthetic Form', cats: ['ps','3d'], soft: 'ps + blender', height: 500, kind: 'image' },
  { id: 'mix-02', ext: 'png', title: 'Soft Geometry',  cats: ['ps','3d'], soft: 'ps + blender', height: 460, kind: 'image' },

  // blender
  { id: 'b-01', ext: 'png', title: 'Chrome Study',   cats: ['ps','3d'], soft: 'blender', height: 520, kind: 'image' },
  { id: 'b-02', ext: 'png', title: 'Object 001',     cats: ['ps','3d'], soft: 'blender', height: 480, kind: 'image' },
  { id: 'b-03', ext: 'png', title: 'Render 37',      cats: ['ps','3d'], soft: 'blender', height: 500, kind: 'image' },
  { id: 'b-04', ext: 'png', title: 'Form',           cats: ['ps','3d'], soft: 'blender', height: 460, kind: 'image' },

  // ai / generative
  { id: 'ai-01', ext: 'jpg', title: 'Neural Form',   cats: ['ai'], soft: 'ai', height: 460, kind: 'image' },
  { id: 'ai-02', ext: 'jpg', title: 'Neural 001',    cats: ['ai'], soft: 'ai', height: 480, kind: 'image' },
  { id: 'ai-03', ext: 'jpg', title: '0401 — I',      cats: ['ai'], soft: 'ai', height: 460, kind: 'image' },
  { id: 'ai-04', ext: 'jpg', title: '0401 — II',     cats: ['ai'], soft: 'ai', height: 480, kind: 'image' },
  { id: 'ai-05', ext: 'jpg', title: '0401 — III',    cats: ['ai'], soft: 'ai', height: 500, kind: 'image' },
  { id: 'ai-06', ext: 'jpg', title: '0401 — IV',     cats: ['ai'], soft: 'ai', height: 460, kind: 'image' },
  { id: 'ai-07', ext: 'jpg', title: 'АЕО',           cats: ['ai'], soft: 'ai', height: 480, kind: 'image' },
  { id: 'ai-08', ext: 'jpg', title: 'Варпт',         cats: ['ai'], soft: 'ai', height: 460, kind: 'image' },
  { id: 'gen-01', ext: 'png', title: 'Field 001',    cats: ['ai'], soft: 'generative', height: 460, kind: 'image' },
  { id: 'gen-02', ext: 'png', title: 'Noise Garden', cats: ['ai'], soft: 'generative', height: 480, kind: 'image' },

  // audio
  { id: 'au-01', ext: 'mp3', title: 'Dub Chrome',    cats: ['audio'], soft: 'fl studio', height: 380, kind: 'audio' },
  { id: 'au-02', ext: 'mp3', title: 'Eng',           cats: ['audio'], soft: 'fl studio', height: 380, kind: 'audio' },
  { id: 'au-03', ext: 'mp3', title: 'Untitled II',   cats: ['audio'], soft: 'fl studio', height: 380, kind: 'audio' },
  { id: 'au-04', ext: 'mp3', title: 'Track 01',      cats: ['audio'], soft: 'fl studio', height: 380, kind: 'audio' },
  { id: 'au-05', ext: 'mp3', title: 'Violin Sketch', cats: ['audio'], soft: 'fl studio', height: 380, kind: 'audio' },
];

export const filters = [
  { key: 'all',   label: 'all' },
  { key: 'ps',    label: 'photoshop' },
  { key: '3d',    label: 'blender' },
  { key: 'ai',    label: 'ai / gen' },
  { key: 'audio', label: 'fl studio' },
];
