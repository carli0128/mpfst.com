// ─── The Sephirotic Graph — canonical definition + live spectral solver ───
//
// This is the mathematical keystone of MPFST: the claim that α = 6/5 is an
// EXACT eigenvalue of the normalized Laplacian of an 11-node graph (the
// Kabbalistic Tree of Life: 10 Sephirot + Da'at, 24 edges).
//
// Everything in this file runs in the visitor's browser with zero
// dependencies — no precomputed answers, no linear-algebra package. The
// eigenvalues you see on /verify are computed from the adjacency matrix
// below, live, every time the page loads. The math is checkable by hand.
//
// Reference: Paper 9 (10.5281/zenodo.18897608) and Paper 24
// (10.5281/zenodo.19041034).

export interface SephirotNode {
  id: string;
  label: string;     // English gloss
  pillar: "left" | "center" | "right";
  x: number;         // layout coordinate in [0,1]
  y: number;         // layout coordinate in [0,1], 0 = top
  daat?: boolean;    // the 11th, "hidden" node
}

// 10 Sephirot + Da'at, positioned in the traditional Tree-of-Life layout.
export const NODES: SephirotNode[] = [
  { id: "Keter",   label: "Crown",        pillar: "center", x: 0.50, y: 0.05 },
  { id: "Chokmah", label: "Wisdom",       pillar: "right",  x: 0.80, y: 0.17 },
  { id: "Binah",   label: "Understanding",pillar: "left",   x: 0.20, y: 0.17 },
  { id: "Daat",    label: "Knowledge",    pillar: "center", x: 0.50, y: 0.25, daat: true },
  { id: "Chesed",  label: "Mercy",        pillar: "right",  x: 0.80, y: 0.38 },
  { id: "Gevurah", label: "Severity",     pillar: "left",   x: 0.20, y: 0.38 },
  { id: "Tiferet", label: "Beauty",       pillar: "center", x: 0.50, y: 0.50 },
  { id: "Netzach", label: "Victory",      pillar: "right",  x: 0.80, y: 0.64 },
  { id: "Hod",     label: "Splendor",     pillar: "left",   x: 0.20, y: 0.64 },
  { id: "Yesod",   label: "Foundation",   pillar: "center", x: 0.50, y: 0.77 },
  { id: "Malkuth", label: "Kingdom",      pillar: "center", x: 0.50, y: 0.93 },
];

// The 22 classical paths of the Kircher Tree of Life.
export const CLASSICAL_PATHS: [string, string][] = [
  ["Keter", "Chokmah"], ["Keter", "Binah"], ["Keter", "Tiferet"],
  ["Chokmah", "Binah"], ["Chokmah", "Tiferet"], ["Chokmah", "Chesed"],
  ["Binah", "Tiferet"], ["Binah", "Gevurah"],
  ["Chesed", "Gevurah"], ["Chesed", "Tiferet"], ["Chesed", "Netzach"],
  ["Gevurah", "Tiferet"], ["Gevurah", "Hod"],
  ["Tiferet", "Netzach"], ["Tiferet", "Hod"], ["Tiferet", "Yesod"],
  ["Netzach", "Hod"], ["Netzach", "Yesod"], ["Netzach", "Malkuth"],
  ["Hod", "Yesod"], ["Hod", "Malkuth"],
  ["Yesod", "Malkuth"],
];

// Da'at sits on the central pillar between Chokmah and Binah (the supernal
// pair). Adding it contributes exactly these two edges — total 24.
export const DAAT_EDGES: [string, string][] = [
  ["Daat", "Chokmah"], ["Daat", "Binah"],
];

export const TARGET = 6 / 5; // 1.2 — the topological invariant

export interface Eigenpair {
  value: number;
  vector: number[]; // aligned with the active node list
}

export interface Spectrum {
  nodes: string[];        // active node ids, in matrix order
  edges: [string, string][];
  pairs: Eigenpair[];     // sorted ascending by eigenvalue
  alphaIndex: number;     // index into pairs whose value === 6/5 (or -1)
  nearest: Eigenpair;     // eigenpair closest to 6/5
}

// Build the symmetric normalized Laplacian L = I − D^{-1/2} A D^{-1/2}
// for the given node set and edge set.
function normalizedLaplacian(nodeIds: string[], edges: [string, string][]): number[][] {
  const idx = new Map(nodeIds.map((id, i) => [id, i]));
  const n = nodeIds.length;
  const A: number[][] = Array.from({ length: n }, () => new Array(n).fill(0));
  for (const [a, b] of edges) {
    const i = idx.get(a);
    const j = idx.get(b);
    if (i === undefined || j === undefined) continue;
    A[i][j] = 1;
    A[j][i] = 1;
  }
  const deg = A.map(row => row.reduce((s, v) => s + v, 0));
  const L: number[][] = Array.from({ length: n }, () => new Array(n).fill(0));
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (i === j) {
        L[i][j] = deg[i] > 0 ? 1 : 0;
      } else if (A[i][j] !== 0) {
        L[i][j] = -A[i][j] / Math.sqrt(deg[i] * deg[j]);
      }
    }
  }
  return L;
}

// Classic cyclic Jacobi eigenvalue algorithm for a real symmetric matrix.
// Returns eigenvalues and the matching eigenvectors (as columns of V).
function jacobiEigen(input: number[][]): { values: number[]; vectors: number[][] } {
  const n = input.length;
  const A = input.map(row => row.slice());
  const V: number[][] = Array.from({ length: n }, (_, i) =>
    Array.from({ length: n }, (_, j) => (i === j ? 1 : 0))
  );

  for (let sweep = 0; sweep < 200; sweep++) {
    // largest off-diagonal magnitude
    let p = 0, q = 1, max = 0;
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        if (Math.abs(A[i][j]) > max) {
          max = Math.abs(A[i][j]);
          p = i; q = j;
        }
      }
    }
    if (max < 1e-15) break;

    const phi = 0.5 * Math.atan2(2 * A[p][q], A[q][q] - A[p][p]);
    const c = Math.cos(phi);
    const s = Math.sin(phi);

    for (let k = 0; k < n; k++) {
      const akp = A[k][p], akq = A[k][q];
      A[k][p] = c * akp - s * akq;
      A[k][q] = s * akp + c * akq;
    }
    for (let k = 0; k < n; k++) {
      const apk = A[p][k], aqk = A[q][k];
      A[p][k] = c * apk - s * aqk;
      A[q][k] = s * apk + c * aqk;
    }
    for (let k = 0; k < n; k++) {
      const vkp = V[k][p], vkq = V[k][q];
      V[k][p] = c * vkp - s * vkq;
      V[k][q] = s * vkp + c * vkq;
    }
  }

  const values = A.map((row, i) => row[i]);
  // columns of V are eigenvectors
  const vectors = V;
  return { values, vectors };
}

// Compute the full spectrum of the Sephirotic graph. With Da'at the graph
// has 11 nodes / 24 edges and 6/5 is an exact eigenvalue; without Da'at it
// has 10 nodes / 22 edges and the nearest eigenvalue is ≈ 1.2224.
export function computeSpectrum(includeDaat: boolean): Spectrum {
  const nodeIds = NODES.filter(nd => includeDaat || !nd.daat).map(nd => nd.id);
  const edges = includeDaat ? [...CLASSICAL_PATHS, ...DAAT_EDGES] : [...CLASSICAL_PATHS];

  const L = normalizedLaplacian(nodeIds, edges);
  const { values, vectors } = jacobiEigen(L);

  const pairs: Eigenpair[] = values
    .map((value, col) => ({ value, vector: vectors.map(row => row[col]) }))
    .sort((a, b) => a.value - b.value);

  let alphaIndex = -1;
  let nearest = pairs[0];
  for (let i = 0; i < pairs.length; i++) {
    if (Math.abs(pairs[i].value - TARGET) < Math.abs(nearest.value - TARGET)) {
      nearest = pairs[i];
    }
    if (Math.abs(pairs[i].value - TARGET) < 1e-9) alphaIndex = i;
  }

  return { nodes: nodeIds, edges, pairs, alphaIndex, nearest };
}
