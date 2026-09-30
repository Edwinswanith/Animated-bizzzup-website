/* The Line engine: one continuous polyline whose shape is a pure function of scroll state.
 * Every shape starts at the leading edge and ends at the trailing edge of the viewport, so any
 * two shapes can be morphed point-for-point without the line ever breaking.
 * Landscape: the line runs left → right. Portrait: top → bottom. */

export type Geo = { w: number; h: number; portrait: boolean; n: number };
export type Pt = [number, number];

export const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
export const sstep = (a: number, b: number, x: number) => {
  const t = clamp((x - a) / (b - a));
  return t * t * (3 - 2 * t);
};
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export function geometry(w: number, h: number): Geo {
  const portrait = w < 900;
  return { w, h, portrait, n: portrait ? 360 : 640 };
}

/** The resting axis the line returns to between shapes (the "taut" line). */
function axis(g: Geo, u: number): Pt {
  return g.portrait ? [g.w * 0.1, -0.05 * g.h + u * 1.1 * g.h] : [-0.05 * g.w + u * 1.1 * g.w, g.h * 0.72];
}

/* ------------------------------------------------------------------ shapes */

export function tangle(g: Geo, out: Float32Array) {
  const [cx, cy, rx, ry] = g.portrait ? [g.w * 0.5, g.h * 0.83, g.w * 0.38, g.h * 0.11] : [g.w * 0.72, g.h * 0.48, g.w * 0.21, g.h * 0.3];
  for (let i = 0; i < g.n; i++) {
    const u = i / (g.n - 1);
    // Portrait: the line runs down the gutter and only knots in the lower third, clear of the text.
    const v = g.portrait ? clamp((u - 0.6) / 0.32) : u;
    const th = v * Math.PI * 2;
    let x = cx + rx * (0.62 * Math.sin(3 * th + 0.4) + 0.28 * Math.sin(7 * th + 1.3) + 0.1 * Math.sin(13 * th + 2.1));
    let y = cy + ry * (0.58 * Math.sin(2 * th + 1.1) + 0.3 * Math.sin(5 * th + 0.2) + 0.12 * Math.sin(11 * th + 2.7));
    if (g.portrait) [x, y] = [cx + (y - cy) * (rx / ry) * 0.9, cy + (x - cx) * (ry / rx) * 1.1];
    // The knot sits in an otherwise continuous line: blend the ends out to the edges.
    const edge = g.portrait ? Math.min(sstep(0.6, 0.66, u), 1 - sstep(0.86, 0.92, u)) : Math.min(sstep(0, 0.1, u), 1 - sstep(0.9, 1, u));
    const [ax, ay] = axis(g, u);
    out[i * 2] = lerp(ax, x, edge);
    out[i * 2 + 1] = lerp(ay, y, edge);
  }
}

export function taut(g: Geo, out: Float32Array) {
  for (let i = 0; i < g.n; i++) {
    const [x, y] = axis(g, i / (g.n - 1));
    out[i * 2] = x;
    out[i * 2 + 1] = y;
  }
}

/** Speech: a carrier modulated by a syllable envelope, displaced perpendicular to the axis. */
export function wave(g: Geo, out: Float32Array, amp: number, phase: number) {
  const A = g.portrait ? g.w * 0.07 : g.h * 0.13;
  const cycles = g.portrait ? 30 : 54;
  for (let i = 0; i < g.n; i++) {
    const u = i / (g.n - 1);
    const window = sstep(0.1, 0.22, u) * (1 - sstep(0.82, 0.94, u));
    const syllables = Math.pow(Math.abs(Math.sin(Math.PI * u * 11 + 0.5)), 1.2) * 0.8 + 0.2;
    const carrier = 0.7 * Math.sin(Math.PI * 2 * u * cycles + phase) + 0.3 * Math.sin(Math.PI * 2 * u * (cycles * 0.43) + phase * 0.6);
    const d = amp * A * window * syllables * carrier;
    const [x, y] = axis(g, u);
    out[i * 2] = g.portrait ? x + d : x;
    out[i * 2 + 1] = g.portrait ? y : y + d;
  }
}

/* Anchor layouts shared by the line and the DOM, so documents and nodes sit exactly on it. */
export function knowledgeAnchors(g: Geo): { docs: Pt[]; answer: Pt; path: Pt[] } {
  if (g.portrait) {
    const docs: Pt[] = [[0.36, 0.4], [0.7, 0.5], [0.36, 0.6], [0.7, 0.7]].map(([x, y]) => [x * g.w, y * g.h]);
    const answer: Pt = [0.5 * g.w, 0.81 * g.h];
    return { docs, answer, path: [[0.1 * g.w, -0.05 * g.h], [0.1 * g.w, 0.3 * g.h], ...docs, answer, [0.5 * g.w, 1.05 * g.h]] };
  }
  const docs: Pt[] = [[0.38, 0.36], [0.5, 0.64], [0.62, 0.34], [0.74, 0.62]].map(([x, y]) => [x * g.w, y * g.h]);
  const answer: Pt = [0.89 * g.w, 0.46 * g.h];
  return { docs, answer, path: [[-0.05 * g.w, 0.72 * g.h], [0.2 * g.w, 0.66 * g.h], ...docs, answer, [1.05 * g.w, 0.46 * g.h]] };
}

export function routeAnchors(g: Geo): { path: Pt[]; branches: { from: number; to: Pt }[] } {
  const P = (x: number, y: number): Pt => [x * g.w, y * g.h];
  if (g.portrait) {
    const path = [P(0.1, -0.05), P(0.1, 0.36), P(0.45, 0.36), P(0.45, 0.62), P(0.16, 0.62), P(0.16, 0.86), P(0.5, 0.86), P(0.5, 1.05)];
    const branches = [0.3, 0.36, 0.5, 0.56, 0.62, 0.84, 0.9].map((f, k) => ({ from: f, to: P(0.92, [0.41, 0.47, 0.54, 0.68, 0.74, 0.8, 0.93][k]) }));
    return { path, branches };
  }
  const path = [P(-0.05, 0.72), P(0.22, 0.72), P(0.22, 0.5), P(0.46, 0.5), P(0.46, 0.74), P(0.7, 0.74), P(0.7, 0.5), P(1.05, 0.5)];
  const branches = [0.33, 0.4, 0.47, 0.6, 0.66, 0.84, 0.9].map((f, k) => ({ from: f, to: P(0.3 + k * 0.095, k % 2 ? 0.26 : 0.9) }));
  return { path, branches };
}

/** Resample a path to n points evenly spaced by length. `smooth` runs Catmull-Rom first. */
export function resample(pts: Pt[], n: number, out: Float32Array, smooth: boolean) {
  const dense: Pt[] = [];
  if (smooth) {
    for (let s = 0; s < pts.length - 1; s++) {
      const p0 = pts[Math.max(0, s - 1)], p1 = pts[s], p2 = pts[s + 1], p3 = pts[Math.min(pts.length - 1, s + 2)];
      for (let k = 0; k < 48; k++) {
        const t = k / 48, t2 = t * t, t3 = t2 * t;
        dense.push([
          0.5 * (2 * p1[0] + (-p0[0] + p2[0]) * t + (2 * p0[0] - 5 * p1[0] + 4 * p2[0] - p3[0]) * t2 + (-p0[0] + 3 * p1[0] - 3 * p2[0] + p3[0]) * t3),
          0.5 * (2 * p1[1] + (-p0[1] + p2[1]) * t + (2 * p0[1] - 5 * p1[1] + 4 * p2[1] - p3[1]) * t2 + (-p0[1] + 3 * p1[1] - 3 * p2[1] + p3[1]) * t3),
        ]);
      }
    }
    dense.push(pts[pts.length - 1]);
  } else dense.push(...pts);
  const cum = [0];
  for (let i = 1; i < dense.length; i++) cum.push(cum[i - 1] + Math.hypot(dense[i][0] - dense[i - 1][0], dense[i][1] - dense[i - 1][1]));
  const total = cum[cum.length - 1];
  let j = 1;
  for (let i = 0; i < n; i++) {
    const d = (i / (n - 1)) * total;
    while (j < cum.length - 1 && cum[j] < d) j++;
    const seg = cum[j] - cum[j - 1] || 1;
    const t = (d - cum[j - 1]) / seg;
    out[i * 2] = lerp(dense[j - 1][0], dense[j][0], t);
    out[i * 2 + 1] = lerp(dense[j - 1][1], dense[j][1], t);
  }
}

/** Point-for-point morph with a travelling front: the leading end moves first, so the line flows
 *  into its new form instead of cross-fading. */
export function morph(a: Float32Array, b: Float32Array, m: number, n: number, out: Float32Array, stagger = 0.4) {
  if (m <= 0) { out.set(a); return; }
  if (m >= 1) { out.set(b); return; }
  for (let i = 0; i < n; i++) {
    const u = i / (n - 1);
    const t = sstep(0, 1, (m * (1 + stagger) - u * stagger));
    out[i * 2] = lerp(a[i * 2], b[i * 2], t);
    out[i * 2 + 1] = lerp(a[i * 2 + 1], b[i * 2 + 1], t);
  }
}

/** Index along the line nearest to a point (used to dock DOM content onto it). */
export function nearest(buf: Float32Array, n: number, p: Pt) {
  let best = 0, bd = Infinity;
  for (let i = 0; i < n; i++) {
    const d = (buf[i * 2] - p[0]) ** 2 + (buf[i * 2 + 1] - p[1]) ** 2;
    if (d < bd) { bd = d; best = i; }
  }
  return best;
}
