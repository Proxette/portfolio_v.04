export const works = [
  // photoshop
  { id: 'ps-01', ext: 'png', title: 'haruki',      cats: ['ps'],       soft: 'photoshop',    height: 540, kind: 'image' },
  { id: 'ps-02', ext: 'jpg', title: 'mirage',      cats: ['ps'],       soft: 'photoshop',    height: 460, kind: 'image' },
  { id: 'ps-03', ext: 'png', title: 'document',    cats: ['ps'],       soft: 'photoshop',    height: 500, kind: 'image' },
  { id: 'ps-04', ext: 'jpg', title: 'archive_03',  cats: ['ps'],       soft: 'photoshop',    height: 520, kind: 'image' },
  { id: 'ps-05', ext: 'png', title: 'frame_12345', cats: ['ps'],       soft: 'photoshop',    height: 480, kind: 'image' },
  { id: 'ps-06', ext: 'jpg', title: 'study_nov',   cats: ['ps'],       soft: 'photoshop',    height: 460, kind: 'image' },
  { id: 'ps-07', ext: 'jpg', title: 'texture_20',  cats: ['ps'],       soft: 'photoshop',    height: 500, kind: 'image' },

  // photoshop + blender
  { id: 'mix-01', ext: 'jpg', title: 'synthetic_form', cats: ['ps','3d'], soft: 'ps + blender', height: 500, kind: 'image' },
  { id: 'mix-02', ext: 'png', title: 'soft_geometry',  cats: ['ps','3d'], soft: 'ps + blender', height: 460, kind: 'image' },

  // blender (always also ps)
  { id: 'b-01', ext: 'png', title: 'chrome_study', cats: ['ps','3d'], soft: 'blender', height: 520, kind: 'image' },
  { id: 'b-02', ext: 'png', title: 'object_001',   cats: ['ps','3d'], soft: 'blender', height: 480, kind: 'image' },
  { id: 'b-03', ext: 'png', title: 'render_37',    cats: ['ps','3d'], soft: 'blender', height: 500, kind: 'image' },
  { id: 'b-04', ext: 'png', title: 'form_dgt',     cats: ['ps','3d'], soft: 'blender', height: 460, kind: 'image' },

  // ai / generative
  { id: 'ai-01', ext: 'jpg', title: 'neural_form', cats: ['ai'], soft: 'ai', height: 460, kind: 'image' },
  { id: 'ai-02', ext: 'jpg', title: 'neural_001',  cats: ['ai'], soft: 'ai', height: 480, kind: 'image' },
  { id: 'ai-03', ext: 'jpg', title: 'gen_0401_a',  cats: ['ai'], soft: 'ai', height: 460, kind: 'image' },
  { id: 'ai-04', ext: 'jpg', title: 'gen_0401_b',  cats: ['ai'], soft: 'ai', height: 480, kind: 'image' },
  { id: 'ai-05', ext: 'jpg', title: 'gen_0401_c',  cats: ['ai'], soft: 'ai', height: 500, kind: 'image' },
  { id: 'ai-06', ext: 'jpg', title: 'gen_0401_d',  cats: ['ai'], soft: 'ai', height: 460, kind: 'image' },
  { id: 'ai-07', ext: 'jpg', title: 'aeo',          cats: ['ai'], soft: 'ai', height: 480, kind: 'image' },
  { id: 'ai-08', ext: 'jpg', title: 'varpt',        cats: ['ai'], soft: 'ai', height: 460, kind: 'image' },
  { id: 'gen-01', ext: 'png', title: 'field_001',  cats: ['ai'], soft: 'generative', height: 460, kind: 'image' },
  { id: 'gen-02', ext: 'png', title: 'noise_garden',cats: ['ai'], soft: 'generative', height: 480, kind: 'image' },

  // audio
  { id: 'au-01', ext: 'mp3', title: 'dub_chrome',    cats: ['audio'], soft: 'fl studio', height: 380, kind: 'audio' },
  { id: 'au-02', ext: 'mp3', title: 'eng',            cats: ['audio'], soft: 'fl studio', height: 380, kind: 'audio' },
  { id: 'au-03', ext: 'mp3', title: 'untitled_ii',    cats: ['audio'], soft: 'fl studio', height: 380, kind: 'audio' },
  { id: 'au-04', ext: 'mp3', title: 'track_01',       cats: ['audio'], soft: 'fl studio', height: 380, kind: 'audio' },
  { id: 'au-05', ext: 'mp3', title: 'violin_sketch',  cats: ['audio'], soft: 'fl studio', height: 380, kind: 'audio' },
];

export const filters = [
  { key: 'all',   label: 'all' },
  { key: 'ps',    label: 'photoshop' },
  { key: '3d',    label: 'blender' },
  { key: 'ai',    label: 'ai / gen' },
  { key: 'audio', label: 'fl studio' },
];
