// Flags story text (src/books/<book>/overrides.js) that drifts from the KJV verses it retells.
//
// Default mode: a vocabulary diff. Prints every content word in a story that does not occur
// anywhere in its own passage's verse range (a stopword list of pronouns, articles and the
// like is excluded). This catches an invented word or an imported clause from a different verse
// or source ("Christians" for "us", "the sacrifice the law allowed" importing Leviticus). It
// CANNOT catch an invented causal link built only from stopwords ("so", "that", "because" are
// themselves in the source, just not in that relation) or a person/grammar slip where every word
// is already present. Read every such connective the story adds, and every quoted speech whose
// pronouns changed, by eye against the printed verses — that reading, not this script, is what
// actually clears a batch.
//
// --ngram mode: prints the story's 4-word windows that are not a literal substring of the verse
// range. It is far noisier — a fair retelling reorders clauses across verse boundaries constantly,
// and every reordering flags — so it is not the default, but it is occasionally useful for
// spotting an exact-phrase problem the vocabulary diff's bag-of-words can't see (e.g. two true
// words used in a false relation to each other).
//
// Usage: BOOK=luke node src/tools/story_check.js [--ngram] [key ...]  (default: every key in
// overrides.js that has a story)
const path = require('path');
const book = process.env.BOOK || 'matthew';
const dir = path.join(__dirname, '..', 'books', book);
const kjv = require(path.join(dir, 'kjv.json'));
const ov = require(path.join(dir, 'overrides.js'));
const anchors = require(path.join(dir, 'anchors.json'));

const byId = {};
for (const ch of Object.keys(anchors)) for (const a of anchors[ch]) byId[a.id] = Object.assign({ch}, a);

const STOP = new Set(('a an the and or but of to in on at is was were he she it they them his her their that this '
  + 'these those as for with not no so then when while because before after who which what shall should would will '
  + 'be been being i thou thee ye you your my mine our we us am art hast hath unto from by than also even too again '
  + 'there here into out up down over under').split(' '));

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

const argv = process.argv.slice(2);
const ngram = argv.includes('--ngram');
const keys = argv.filter(a => a !== '--ngram').length
  ? argv.filter(a => a !== '--ngram')
  : Object.keys(ov).filter(k => ov[k].story);

let anyFlag = false;
for (const k of keys) {
  const o = ov[k];
  if (!o || !o.story) { console.log(k + ': no story'); continue; }
  const source = verseText(k);
  if (source === null) { console.log(k + ': not found in anchors.json'); continue; }

  if (ngram) {
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
  } else {
    const srcWords = new Set(source.split(' '));
    const extra = [...new Set(norm(o.story).split(' '))].filter(w => w && !srcWords.has(w) && !STOP.has(w));
    if (extra.length) {
      anyFlag = true;
      console.log(k + ': ' + extra.join(', '));
    }
  }
}
if (!anyFlag) console.log(ngram
  ? 'clean — every 4-word window traces to its own verse range'
  : 'clean — every content word occurs somewhere in its own verse range (still read the connectives by eye)');
