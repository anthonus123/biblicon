// Flags story text (src/books/<book>/overrides.js) that drifts from the KJV verses it retells.
// Normalizes both texts and prints every 4-word window of the story that is not a substring of
// the passage's own verse range — the fast, mechanical half of the check; a human still reads
// what this prints; it cannot judge whether a paraphrase is *fair*, only whether its wording
// is invented. Usage: BOOK=luke node src/tools/story_check.js [key ...]  (default: every key
// in overrides.js that has a story)
const path = require('path');
const book = process.env.BOOK || 'matthew';
const dir = path.join(__dirname, '..', 'books', book);
const kjv = require(path.join(dir, 'kjv.json'));
const ov = require(path.join(dir, 'overrides.js'));
const anchors = require(path.join(dir, 'anchors.json'));

const byId = {};
for (const ch of Object.keys(anchors)) for (const a of anchors[ch]) byId[a.id] = Object.assign({ch}, a);

function norm(s) {
  return s.toLowerCase().replace(/[‘’']/g, "'").replace(/[^a-z0-9' ]+/g, ' ').replace(/\s+/g, ' ').trim();
}

function verseText(id) {
  const a = byId[id];
  if (!a) return null;
  const chv = kjv.chapters[String(Number(a.ch) - 1)];
  let out = [];
  for (const v of chv.verses) {
    const vn = Number(v.verse);
    if (vn >= a.vS && vn <= a.vE) out.push(v.text);
  }
  return norm(out.join(' '));
}

const keys = process.argv.slice(2).length ? process.argv.slice(2) : Object.keys(ov).filter(k => ov[k].story);
let anyFlag = false;
for (const k of keys) {
  const o = ov[k];
  if (!o || !o.story) { console.log(k + ': no story'); continue; }
  const source = verseText(k);
  if (source === null) { console.log(k + ': not found in anchors.json'); continue; }
  const words = norm(o.story).split(' ');
  const flagged = new Set();
  const W = 4;
  for (let i = 0; i + W <= words.length; i++) {
    const win = words.slice(i, i + W).join(' ');
    if (!source.includes(win)) flagged.add(win);
  }
  if (flagged.size) {
    anyFlag = true;
    console.log('\n' + k + ':');
    for (const f of flagged) console.log('  ' + f);
  }
}
if (!anyFlag) console.log('clean — every 4-word window traces to its own verse range');
