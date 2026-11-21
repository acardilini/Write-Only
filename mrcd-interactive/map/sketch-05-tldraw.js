// MRCD map, sketch 5: a trail through one landscape (after the owner's trail-map reference).
// Runs as-is in the tldraw connector's exec (receives editor, createShapeId, toRichText).
// Uses only frame, geo, line and text shapes so it works across tldraw versions.

const ROUTE = 'red';           // the walker's single colour
const P = 'm5-';               // id prefix; re-running replaces the previous drawing
const W = 1500, H = 920;

// ---------- clear any previous run ----------
const old = editor.getCurrentPageShapes().filter(s => s.id.startsWith('shape:' + P)).map(s => s.id);
if (old.length) editor.deleteShapes(old);

const FRAME = createShapeId(P + 'frame');
editor.createShape({ id: FRAME, type: 'frame', x: 0, y: 0, props: { w: W, h: H, name: 'Sketch 5 · A trail through one landscape' } });

// ---------- helpers ----------
const DIG = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const key = i => 'a' + DIG[i + 1];
const sid = n => createShapeId(P + n);
const made = { trees: [], clear: [] };

function line(name, pts, o = {}) {
  const [ox, oy] = pts[0];
  const points = {};
  pts.forEach(([x, y], i) => { const k = key(i); points[k] = { id: k, index: k, x: x - ox, y: y - oy }; });
  editor.createShape({
    id: sid(name), type: 'line', parentId: FRAME, x: ox, y: oy, opacity: o.opacity ?? 1,
    props: { color: o.color || 'black', dash: o.dash || 'solid', size: o.size || 's', spline: o.spline || 'cubic', points, scale: o.scale || 1 },
  });
  if (o.keepClear) made.clear.push({ pts, r: o.keepClear });
}

function geo(name, shape, x, y, w, h, o = {}) {
  editor.createShape({
    id: sid(name), type: 'geo', parentId: FRAME, x, y, rotation: o.rotation || 0, opacity: o.opacity ?? 1,
    props: { geo: shape, w, h, color: o.color || 'black', fill: o.fill || 'none', dash: o.dash || 'solid', size: o.size || 's' },
  });
  return sid(name);
}

function text(name, str, x, y, o = {}) {
  const id = sid(name);
  editor.createShape({
    id, type: 'text', ...(o.parent === null ? {} : { parentId: FRAME }), x, y, opacity: o.opacity ?? 1,
    props: { richText: toRichText(str), color: o.color || 'black', size: 's', font: o.font || 'sans', scale: o.scale || 0.75, autoSize: true, textAlign: o.align || 'start' },
  });
  const b = editor.getShapePageBounds(id);
  let nx = x, ny = y;
  const a = o.anchor || 'left';
  if (a === 'left') ny = y - b.h / 2;
  else if (a === 'right') { nx = x - b.w; ny = y - b.h / 2; }
  else if (a === 'below') nx = x - b.w / 2;
  else if (a === 'above') { nx = x - b.w / 2; ny = y - b.h; }
  editor.updateShape({ id, type: 'text', x: nx, y: ny });
  made.clear.push({ box: { x: nx, y: ny, w: b.w, h: b.h } });
  return id;
}

// A mechanism mark in one of three states, with its label.
const STATE = {
  used:     { color: ROUTE,   fill: 'fill', dash: 'solid',  label: 'black' },
  possible: { color: 'black', fill: 'semi', dash: 'solid',  label: 'black' },
  absent:   { color: 'grey',  fill: 'semi', dash: 'dotted', label: 'grey'  },
};
function mark(name, label, x, y, state, anchor = 'left', r = 8) {
  const s = STATE[state];
  geo(name, 'ellipse', x - r, y - r, 2 * r, 2 * r, { color: s.color, fill: s.fill, dash: s.dash });
  made.clear.push({ box: { x: x - r, y: y - r, w: 2 * r, h: 2 * r } });
  const gap = r + 7;
  const pos = { left: [x + gap, y], right: [x - gap, y], below: [x, y + gap - 2], above: [x, y - gap + 2] }[anchor];
  if (label) text(name + '-label', label, pos[0], pos[1], { anchor, color: s.label });
}

function flag(name, label, px, py, state) {
  // pole from (px, py) up 54px; pennant points right
  line(name + '-pole', [[px, py], [px, py - 54]], { spline: 'line', size: 's' });
  const s = STATE[state];
  const L = 26, Hh = 20; // pennant length and height
  geo(name + '-pennant', 'triangle', px + L, py - 54, Hh, L, { rotation: Math.PI / 2, color: s.color === 'grey' ? 'black' : s.color, fill: state === 'used' ? 'fill' : 'semi' });
  text(name + '-label', label, px + L + 10, py - 44, { anchor: 'left', scale: 0.8 });
}

function stop(name, label, sub, x, y) {
  geo(name, 'ellipse', x - 14, y - 14, 28, 28, { color: 'black', fill: 'semi', size: 'm' });
  text(name + '-label', label, x, y + 18, { anchor: 'below', scale: 0.85 });
  if (sub) text(name + '-sub', sub, x, y + 40, { anchor: 'below', scale: 0.62, color: 'grey' });
}

// ---------- ground: hill and river ----------
geo('hill', 'triangle', 870, 105, 500, 322, { color: 'yellow', fill: 'fill', opacity: 0.24 });
text('zone-hill', 'the hill: justifications', 1120, 92, { anchor: 'above', font: 'serif', color: 'grey', scale: 0.7 });

const RIVER = [[-30, 455], [200, 492], [420, 455], [640, 470], [840, 503], [1060, 480], [1280, 452], [1530, 472]];
line('river', RIVER, { color: 'light-blue', size: 'xl', scale: 5, opacity: 0.42 });
text('zone-river', 'the river: discomfort', 36, 412, { anchor: 'left', font: 'serif', color: 'grey', scale: 0.7 });

// one bridge
geo('bridge', 'rectangle', 814, 456, 52, 94, { color: 'orange', fill: 'solid', size: 's', opacity: 0.9 });
line('bridge-rail-l', [[804, 444], [813, 456], [813, 550], [804, 562]], { spline: 'line', size: 'm' });
line('bridge-rail-r', [[876, 444], [867, 456], [867, 550], [876, 562]], { spline: 'line', size: 'm' });

// ---------- the walk (road) ----------
const ROAD = [[70, 815], [200, 800], [340, 780], [490, 800], [650, 822], [810, 808], [970, 784], [1130, 794], [1300, 814]];
line('road', ROAD, { color: 'grey', size: 'm' });

// house at home
geo('house-roof', 'triangle', 57, 760, 26, 14, { color: 'black', fill: 'semi' });
geo('house-body', 'rectangle', 61, 774, 18, 18, { color: 'black', fill: 'semi' });

// ---------- walker's route (drawn before marks so marks sit on top) ----------
line('route-walk', ROAD, { color: ROUTE, dash: 'dashed', size: 'l', keepClear: 20 });
// butcher's window: walked on (avoidance) - a short detour into the woods and back
line('route-woods', [[340, 780], [300, 758], [290, 726], [330, 740], [400, 791]], { color: ROUTE, dash: 'dashed', size: 'l', keepClear: 16 });
// lunch with Sam: over the bridge, up to two reasons together, back down
line('route-out', [[650, 822], [705, 768], [768, 690], [812, 600], [824, 540], [824, 470], [852, 430]], { color: ROUTE, dash: 'dashed', size: 'l', keepClear: 22 });
line('route-a', [[852, 430], [960, 368], [1060, 300], [1120, 258]], { color: ROUTE, dash: 'dashed', size: 'l' });
line('route-ab', [[1120, 258], [1176, 282], [1190, 335]], { color: ROUTE, dash: 'dashed', size: 'l' });
line('route-b', [[1190, 335], [1120, 382], [1000, 404], [852, 430]], { color: ROUTE, dash: 'dashed', size: 'l' });
line('route-back', [[852, 430], [856, 470], [856, 545], [878, 640], [902, 740], [925, 792]], { color: ROUTE, dash: 'dashed', size: 'l', keepClear: 22 });

// discomfort on the bridge
mark('mech-arousal', null, 840, 503, 'used', 'left', 10);
text('mech-arousal-label', 'discomfort', 880, 503, { anchor: 'left', scale: 0.75 });

// ---------- the woods: prevention ----------
text('zone-woods', 'the woods: kept out of sight', 60, 590, { anchor: 'left', font: 'serif', color: 'grey', scale: 0.7 });
mark('mech-perceived-change', 'Perceived behavioural change', 238, 650, 'possible', 'right');
mark('mech-wilful-ignorance', 'Wilful ignorance', 345, 578, 'possible', 'above');
mark('mech-humane', 'Humane meat', 540, 578, 'possible', 'above');
mark('mech-avoidance', 'Avoidance', 290, 726, 'used', 'right');
mark('mech-dissociation', 'Dissociation', 455, 740, 'possible', 'below');
mark('mech-derogation', 'Do-gooder derogation', 618, 728, 'possible', 'below');

// ---------- the hill: reduction, three groups ----------
text('grp-animal', 'ABOUT THE ANIMAL', 830, 250, { anchor: 'above', color: 'grey', scale: 0.55 });
mark('mech-deny-mind', 'Denying animal mind', 905, 282, 'possible', 'right');
mark('mech-dichotomisation', 'Dichotomisation', 880, 348, 'absent', 'right');

text('grp-meat', 'ABOUT THE MEAT', 1120, 214, { anchor: 'above', color: 'grey', scale: 0.55 });
mark('mech-natural', 'Meat as natural', 1050, 335, 'possible', 'below');
mark('mech-normal', 'Meat as normal', 1120, 258, 'used', 'above');
mark('mech-nice', 'Meat as nice', 1190, 335, 'used', 'left');

text('grp-resp', 'ABOUT RESPONSIBILITY', 1370, 214, { anchor: 'above', color: 'grey', scale: 0.55 });
mark('mech-necessary', 'Meat as necessary', 1305, 250, 'possible', 'left');
mark('mech-third-party', 'Third-party blame', 1335, 318, 'absent', 'left');
mark('mech-outrage', 'Moral outrage', 1365, 386, 'absent', 'left');

// ---------- outcomes ----------
line('trail-change', [[852, 430], [740, 404], [590, 372], [440, 300], [310, 236], [210, 206]], { color: 'grey', dash: 'dotted', size: 's' });
flag('mech-behaviour-change', 'something changes', 200, 206, 'possible');

// ---------- the stops ----------
stop('stop-home', 'Home', null, 70, 815);
stop('stop-high-street', 'High street', "butcher's window", 340, 780);
stop('stop-smokehouse', 'Smokehouse', 'lunch with Sam', 650, 822);
stop('stop-market', 'Market', 'vegan stall', 970, 784);
stop('stop-home-again', 'Home again', null, 1300, 814);
text('held-market', 'nothing stirred', 970, 846, { anchor: 'below', color: ROUTE, scale: 0.62 });
flag('outcome-maintained', 'same as before', 1300, 800, 'used');

// ---------- beyond the framework ----------
text('grp-beyond', 'BEYOND THE FRAMEWORK', 1250, 48, { anchor: 'left', color: 'grey', scale: 0.55 });
mark('mech-aware-justify', 'Awareness used as justification', 1258, 80, 'absent', 'left');
mark('mech-attachment', 'Meat attachment', 1258, 108, 'possible', 'left');

// ---------- trees (placed last, in the clearings, then sent behind) ----------
function distToSeg(px, py, ax, ay, bx, by) {
  const dx = bx - ax, dy = by - ay, l2 = dx * dx + dy * dy || 1;
  let t = ((px - ax) * dx + (py - ay) * dy) / l2; t = Math.max(0, Math.min(1, t));
  return Math.hypot(px - (ax + t * dx), py - (ay + t * dy));
}
function blocked(x0, y0, w, h) {
  const pad = 6;
  for (const c of made.clear) {
    if (c.box) {
      const b = c.box;
      if (x0 < b.x + b.w + pad && x0 + w > b.x - pad && y0 < b.y + b.h + pad && y0 + h > b.y - pad) return true;
    } else {
      for (let i = 0; i < c.pts.length - 1; i++) {
        const [ax, ay] = c.pts[i], [bx, by] = c.pts[i + 1];
        for (const [qx, qy] of [[x0 + w / 2, y0 + h], [x0 + w / 2, y0 + h / 2], [x0 + w / 2, y0]])
          if (distToSeg(qx, qy, ax, ay, bx, by) < c.r) return true;
      }
    }
  }
  return false;
}
let seed = 7;
const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
const WOODS = { cx: 440, cy: 662, rx: 190, ry: 72 };
let n = 0;
for (let gy = WOODS.cy - WOODS.ry + 20; gy <= WOODS.cy + WOODS.ry; gy += 17) {
  for (let gx = WOODS.cx - WOODS.rx; gx <= WOODS.cx + WOODS.rx; gx += 21) {
    const x = gx + (rnd() - 0.5) * 12 + ((gy / 17) % 2) * 10, y = gy + (rnd() - 0.5) * 8;
    if (((x - WOODS.cx) / WOODS.rx) ** 2 + ((y - WOODS.cy) / WOODS.ry) ** 2 > 1) continue;
    const w = 22 + rnd() * 10, h = w * 1.8;
    const x0 = x - w / 2, y0 = y - h;
    if (blocked(x0, y0, w, h)) continue;
    const dark = rnd() < 0.35;
    made.trees.push(geo('tree' + n++, 'triangle', x0, y0, w, h, { color: dark ? 'green' : 'light-green', fill: 'fill', opacity: dark ? 0.7 : 0.8 }));
  }
}
editor.sendToBack(made.trees);
editor.sendToBack([sid('hill')]);

// ---------- key, outside the map ----------
const KY = H + 40;
const k = (name, x, label, draw) => { draw(x); text('key-' + name, label, x + 20, KY, { anchor: 'left', scale: 0.7, parent: null }); };
const kmark = (name, state) => x => editor.createShape({ id: sid('key-' + name + '-m'), type: 'geo', x: x - 8, y: KY - 8, props: { geo: 'ellipse', w: 16, h: 16, size: 's', color: STATE[state].color, fill: STATE[state].fill, dash: STATE[state].dash } });
k('used', 20, 'used on this walk', kmark('used', 'used'));
k('possible', 200, 'possible on this walk, not used', kmark('possible', 'possible'));
k('absent', 470, 'not on this walk', kmark('absent', 'absent'));
const kp = (x0, x1) => ({ a1: { id: 'a1', index: 'a1', x: 0, y: 0 }, a2: { id: 'a2', index: 'a2', x: x1 - x0, y: 0 } });
editor.createShape({ id: sid('key-route-l'), type: 'line', x: 640, y: KY, props: { color: ROUTE, dash: 'dashed', size: 'l', spline: 'line', points: kp(640, 700) } });
editor.createShape({ id: sid('key-route-t'), type: 'text', x: 712, y: KY - 9, props: { richText: toRichText('one walker’s route'), size: 's', font: 'sans', scale: 0.7, autoSize: true } });

editor.zoomToFit();
return { trees: made.trees.length };
