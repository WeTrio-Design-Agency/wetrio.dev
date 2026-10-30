"use client";

import { useEffect, useRef } from "react";

/**
 * The moving blue ground behind the product windows (Kirill, 30.10.2026: the blue backgrounds in the references move,
 * and the site should move the same way). A fragment shader warps noise into itself twice (domain warping) and reads
 * the result as cloth: the deep folds drop into black, the body is the studio's blue, the crests lift to a pale light.
 *
 * Cheap on purpose: half the screen's pixels, 30 frames a second, only while the panel is on screen and the tab is
 * visible. One still frame when less motion is asked for. A CSS gradient where WebGL is missing.
 */

const VERT = `attribute vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }`;

const FRAG = `
precision highp float;
uniform vec2 res;
uniform float t;
uniform float seed;
uniform float dim; // 1 = full strength, lower = quieter ground

float hash(vec2 p){ p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p){
  float v = 0.0, a = 0.5;
  mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
  for (int i = 0; i < 4; i++){ v += a * noise(p); p = m * p; a *= 0.5; }
  return v;
}

void main(){
  vec2 uv = gl_FragCoord.xy / res;
  vec2 p = vec2(uv.x * res.x / res.y, uv.y) * 0.5 + seed;
  float s = t * 0.04;

  vec2 q = vec2(fbm(p + vec2(0.0, s)), fbm(p + vec2(5.2, 1.3) - s * 0.8));
  vec2 r = vec2(fbm(p + 3.0 * q + vec2(1.7, 9.2) + s * 1.2), fbm(p + 3.0 * q + vec2(8.3, 2.8) - s));
  float f = fbm(p + 3.4 * r);

  vec3 black = vec3(0.016, 0.02, 0.035);
  vec3 navy  = vec3(0.05, 0.13, 0.45);
  vec3 blue  = vec3(0.23, 0.51, 0.96);   // #3b82f6
  vec3 pale  = vec3(0.80, 0.89, 1.0);

  vec3 col = mix(black, navy, smoothstep(0.26, 0.5, f));
  col = mix(col, blue, smoothstep(0.46, 0.72, f));
  col = mix(col, pale, smoothstep(0.68, 0.92, f) * 0.9);
  // the deep folds drop into black
  col = mix(col, black, smoothstep(0.55, 0.95, length(q)) * 0.75);
  // a thin light along the crests
  float crest = pow(clamp(1.0 - abs(f - r.x) * 3.0, 0.0, 1.0), 8.0);
  col += crest * 0.22;

  col = mix(black, col, dim);
  col += (hash(gl_FragCoord.xy + fract(t) * 37.0) - 0.5) * 0.02;
  gl_FragColor = vec4(col, 1.0);
}
`;

type Props = {
  className?: string;
  /** Shifts the field so two panels on one page do not show the same picture. */
  seed?: number;
  /** 1 is the full picture; 0.6 keeps it quiet behind text. */
  dim?: number;
};

export function Fluid({ className = "", seed = 0, dim = 1 }: Props) {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = canvas.current;
    if (!el) return;
    const gl = el.getContext("webgl", { antialias: false, premultipliedAlpha: false, preserveDrawingBuffer: false });
    if (!gl) return;
    const sh = (type: number, src: string) => {
      const o = gl.createShader(type)!;
      gl.shaderSource(o, src);
      gl.compileShader(o);
      return o;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, sh(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const uRes = gl.getUniformLocation(prog, "res");
    const uT = gl.getUniformLocation(prog, "t");
    gl.uniform1f(gl.getUniformLocation(prog, "seed"), seed);
    gl.uniform1f(gl.getUniformLocation(prog, "dim"), dim);

    const SCALE = 0.5;
    const size = () => {
      const w = Math.max(1, Math.round(el.clientWidth * SCALE));
      const h = Math.max(1, Math.round(el.clientHeight * SCALE));
      if (el.width !== w || el.height !== h) {
        el.width = w;
        el.height = h;
        gl.viewport(0, 0, w, h);
      }
      gl.uniform2f(uRes, w, h);
    };
    const draw = (sec: number) => {
      size();
      gl.uniform1f(uT, sec);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };

    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const start = performance.now() - 40_000;
    if (still) {
      draw(40);
      const ro = new ResizeObserver(() => draw(40));
      ro.observe(el);
      return () => ro.disconnect();
    }

    let raf = 0;
    let last = 0;
    let visible = true;
    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      if (now - last < 33) return;
      last = now;
      draw((now - start) / 1000);
    };
    const run = () => {
      if (!raf && visible && !document.hidden) raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) run();
      else stop();
    });
    io.observe(el);
    const onVis = () => (document.hidden ? stop() : run());
    document.addEventListener("visibilitychange", onVis);
    draw((performance.now() - start) / 1000);
    run();
    return () => {
      stop();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [seed, dim]);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {/* the ground under the canvas: shown until WebGL draws, and wherever it cannot */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 80% at 70% 30%, #2563eb 0%, #0b1a4a 45%, #04050a 100%)",
        }}
      />
      <canvas ref={canvas} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
