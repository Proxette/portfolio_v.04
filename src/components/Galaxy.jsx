import { useEffect, useRef } from 'react';
import { Renderer, Program, Mesh, Triangle } from 'ogl';

const vert = /* glsl */ `
attribute vec2 uv;
attribute vec2 position;
varying vec2 vUv;
void main(){
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

/* Adapted starfield — multi-layer parallax with bright cores
   designed to read clearly at saturation 0 (pure monochrome). */
const frag = /* glsl */ `
precision highp float;
uniform float uTime;
uniform vec3  uResolution;
uniform vec2  uMouse;
uniform float uMouseInteraction;
uniform float uMouseRepulsion;
uniform float uRepulsionStrength;
uniform float uAutoCenterRepulsion;
uniform float uDensity;
uniform float uGlowIntensity;
uniform float uSaturation;
uniform float uHueShift;
uniform float uTwinkleIntensity;
uniform float uRotationSpeed;
uniform float uStarSpeed;
uniform float uSpeed;
varying vec2 vUv;

mat2 rot(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

vec3 hsv2rgb(vec3 c){
  vec4 K = vec4(1.0, 2.0/3.0, 1.0/3.0, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

float hash21(vec2 p){
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

vec3 hash33(vec3 p){
  p = vec3(
    dot(p, vec3(127.1, 311.7,  74.7)),
    dot(p, vec3(269.5, 183.3, 246.1)),
    dot(p, vec3(113.5, 271.9, 124.6))
  );
  return -1.0 + 2.0 * fract(sin(p) * 43758.5453);
}

/* render a single layer of stars by sampling cells */
float starLayer(vec2 uv, float t, float seed){
  float total = 0.0;
  vec2 ip = floor(uv);
  vec2 fp = fract(uv);

  for (int y = -1; y <= 1; y++){
    for (int x = -1; x <= 1; x++){
      vec2 off = vec2(float(x), float(y));
      vec2 cell = ip + off;
      vec3 r = hash33(vec3(cell, seed));
      // probability of a star existing in this cell
      float exists = step(1.0 - uDensity * 0.55, r.x);
      vec2 starPos = off + 0.5 + r.yz * 0.4;
      float d = length(fp - starPos);
      // bright core + soft halo
      float core = smoothstep(0.08, 0.0, d);
      float halo = smoothstep(0.45, 0.0, d) * 0.5;
      // twinkle
      float tw = 0.5 + 0.5 * sin(t * (1.0 + r.x * 6.0) + r.y * 6.28);
      float intensity = (core + halo) * mix(0.55, 1.0, tw * uTwinkleIntensity);
      total += intensity * exists * (0.5 + r.x * 0.5);
    }
  }
  return total;
}

/* big diffuse highlights — gives the sense of a galactic core */
float nebula(vec2 uv, float t){
  float n = 0.0;
  vec2 p = uv * 0.6 + vec2(t * 0.02, 0.0);
  for (int i = 0; i < 4; i++){
    float fi = float(i);
    p = rot(0.5) * p + vec2(0.7);
    n += (sin(p.x * (1.0 + fi)) * cos(p.y * (1.3 + fi))) / (fi + 2.0);
  }
  return n;
}

void main(){
  vec2 res = uResolution.xy;
  vec2 uv = (vUv - 0.5) * vec2(res.x / res.y, 1.0);

  float t = uTime * uSpeed;
  uv = rot(t * uRotationSpeed * 0.06) * uv;

  // mouse repulsion / attraction
  vec2 m = (uMouse - 0.5) * vec2(res.x / res.y, 1.0);
  if (uMouseInteraction > 0.5){
    vec2 d = uv - m;
    float r = length(d);
    float push = uRepulsionStrength * 0.06 / (r * r + 0.05);
    if (uMouseRepulsion > 0.5) uv += normalize(d) * push;
    else                       uv -= normalize(d) * push;
  }
  if (uAutoCenterRepulsion > 0.0){
    float r = length(uv);
    uv += normalize(uv) * uAutoCenterRepulsion * 0.05 / (r * r + 0.05);
  }

  vec3 col = vec3(0.0);

  // 5 parallax layers
  float drift = t * uStarSpeed * 0.15;
  for (int i = 0; i < 5; i++){
    float fi = float(i);
    float depth = 1.0 + fi * 0.7;
    vec2 p = uv * (3.0 + fi * 3.0) + vec2(drift * (0.3 + fi * 0.2), drift * 0.18 * fi);
    float v = starLayer(p, t, fi * 7.13);
    float hue = mod(uHueShift / 360.0 + fi * 0.04, 1.0);
    vec3 tint = hsv2rgb(vec3(hue, uSaturation, 1.0));
    col += v * tint / depth * 1.2;
  }

  // подчёркнутый, но узкий галактический центр + лёгкая полоса
  float radial = exp(-length(uv) * 2.4);
  float band = smoothstep(0.0, 0.8, 0.5 + 0.5 * nebula(uv, t)) * 0.06;
  vec3 glowTint = hsv2rgb(vec3(mod(uHueShift / 360.0, 1.0), uSaturation, 1.0));
  col += glowTint * (radial * uGlowIntensity * 0.6 + band * uGlowIntensity * 0.5);

  // мягкая виньетка по краям — фокус в центре
  float vig = smoothstep(1.4, 0.2, length(uv));
  col *= mix(0.6, 1.0, vig);

  col = pow(col, vec3(0.9));
  gl_FragColor = vec4(col, 1.0);
}
`;

export default function Galaxy({
  mouseRepulsion = true,
  mouseInteraction = true,
  density = 1,
  glowIntensity = 0.3,
  saturation = 0,
  hueShift = 140,
  twinkleIntensity = 0.3,
  rotationSpeed = 0.1,
  repulsionStrength = 2,
  autoCenterRepulsion = 0,
  starSpeed = 0.5,
  speed = 1,
  className = '',
  style = {}
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new Renderer({ alpha: false, antialias: false, premultipliedAlpha: false, preserveDrawingBuffer: true, dpr: Math.min(window.devicePixelRatio || 1, 2) });
    const gl = renderer.gl;
    Object.assign(gl.canvas.style, {
      position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block'
    });
    container.appendChild(gl.canvas);

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex: vert,
      fragment: frag,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: [container.clientWidth, container.clientHeight, 1] },
        uMouse: { value: [0.5, 0.5] },
        uMouseInteraction: { value: mouseInteraction ? 1 : 0 },
        uMouseRepulsion: { value: mouseRepulsion ? 1 : 0 },
        uRepulsionStrength: { value: repulsionStrength },
        uAutoCenterRepulsion: { value: autoCenterRepulsion },
        uDensity: { value: density },
        uGlowIntensity: { value: glowIntensity },
        uSaturation: { value: saturation },
        uHueShift: { value: hueShift },
        uTwinkleIntensity: { value: twinkleIntensity },
        uRotationSpeed: { value: rotationSpeed },
        uStarSpeed: { value: starSpeed },
        uSpeed: { value: speed }
      }
    });
    const mesh = new Mesh(gl, { geometry, program });

    const targetMouse = [0.5, 0.5];
    const onMouse = (e) => {
      const rect = container.getBoundingClientRect();
      targetMouse[0] = (e.clientX - rect.left) / rect.width;
      targetMouse[1] = 1.0 - (e.clientY - rect.top) / rect.height;
    };
    if (mouseInteraction) window.addEventListener('mousemove', onMouse);

    const resize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
      program.uniforms.uResolution.value = [w, h, 1];
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    let raf, t0 = performance.now();
    const tick = () => {
      raf = requestAnimationFrame(tick);
      const t = (performance.now() - t0) / 1000;
      program.uniforms.uTime.value = t;
      const m = program.uniforms.uMouse.value;
      m[0] += (targetMouse[0] - m[0]) * 0.05;
      m[1] += (targetMouse[1] - m[1]) * 0.05;
      renderer.render({ scene: mesh });
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      if (mouseInteraction) window.removeEventListener('mousemove', onMouse);
      gl.canvas.remove();
    };
  }, [
    mouseRepulsion, mouseInteraction, density, glowIntensity, saturation,
    hueShift, twinkleIntensity, rotationSpeed, repulsionStrength,
    autoCenterRepulsion, starSpeed, speed
  ]);

  return <div ref={containerRef} className={className} style={{ width: '100%', height: '100%', position: 'absolute', inset: 0, ...style }} />;
}
