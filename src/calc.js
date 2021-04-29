// helpers
const rd = al => Math.sin(-al/180*Math.PI)

export const dx = (h, al) => h * Math.sin(rd(al))

export const dy = (h, al) => h * (1 - Math.cos(rd(al)))

// Pieces

export const cube = (x, y) => ([[0, 0], [0, y], [x, y], [x, 0]])

export const flap = (r=1) => (x, y) => ([[0, 0], [x*(1-r), y], [x*r, y], [x, 0]])

// Ops

export const skew = (al) => vecs => vecs.map(([x, y]) =>
  ([x + y * Math.sin(rd(al)), y * Math.cos(rd(al))]))

export const mirX = (vecs) => vecs.map(([x, y]) => ([x, -y]))

export const rotR = (vecs) => vecs.map(([x, y]) => ([-y, x]))

export const t = ([tx, ty]) => vecs => vecs.map(([x, y]) => ([x + tx, y + ty]))

export const o = (oPos) => (vecs) => t(oPos)(vecs)

export const path = (vecs) => {
  const path = vecs.map(([x, y]) => ({ x, y }))
  return [...path, path[0]]
}
