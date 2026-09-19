#!/usr/bin/env node
// Check the quotations inside a reader's icon readings and marker texts — the one class of
// error `make check`, the overlay sheets and the browser cannot see.  Usage, from the repo root:
//
//     BOOK=john node src/tools/quotes.js
//
// Two passes over hotspots.js / hotspots2.js / hotspots3.js:
//  1. KJV.  Every clause carrying an archaic word (thou, ye, saith, unto, hath…) must be a
//     verbatim substring of this book's kjv.json.  Misses are printed with how many of their
//     trailing words do match, and whether the whole clause is in Matthew instead — a Synoptic
//     verse passed off as John's.  Expect false positives where our own prose leads into a
//     quotation or a Father is quoted; read the list, do not trust the count.
//  2. Fathers.  Every "St Augustine: …" style quotation must open with words found in a
//     Catena comment credited to that Father, and each of its sentences must lie inside that
//     comment.  This is what caught two comments of Origen — excluded from both readers —
//     credited to Augustine and Chrysostom.  Matthew's texts mostly report the Fathers in
//     indirect speech ("St Jerome supposed…"), which no string check can verify.
const fs = require('fs'), path = require('path');
const B = (process.env.BOOK || 'matthew').toLowerCase();
const dir = path.join(__dirname, '..', 'books', B);
const norm = s => s.toLowerCase().replace(/[’']/g, '').replace(/[^a-z ]+/g, ' ').replace(/\s+/g, ' ').trim();
const flat = j => { const out = []; (function walk(x) { if (typeof x === 'string') out.push(x); else if (Array.isArray(x)) x.forEach(walk); else if (x && typeof x === 'object') Object.values(x).forEach(walk); })(j); return out.join(' '); };
const kjv = norm(flat(JSON.parse(fs.readFileSync(path.join(dir, 'kjv.json'), 'utf8'))));
const mattPath = path.join(__dirname, '..', 'books', 'matthew', 'kjv.json');
const matt = B === 'matthew' ? '' : norm(flat(JSON.parse(fs.readFileSync(mattPath, 'utf8'))));
const C = JSON.parse(fs.readFileSync(path.join(dir, 'catena.json'), 'utf8'));
const com = [];
for (const ch of Object.values(C)) for (const blk of ch) for (const c of (blk.comments || [])) com.push([c.attr, norm(c.text)]);

const texts = [];
for (const f of ['hotspots', 'hotspots2', 'hotspots3']) {
  const file = path.join(dir, f + '.js');
  if (!fs.existsSync(file)) continue;
  for (const [k, v] of Object.entries(require(file))) {
    if (typeof v === 'string') texts.push([k, f, v]);
    else if (Array.isArray(v)) v.forEach(m => texts.push([k, f + ': ' + m[0], m[1]]));
    else { if (v.read) texts.push([k, f + ': read', v.read]); (v.hot || []).forEach(m => texts.push([k, f + ': ' + m[0], m[1]])); }
  }
}
const where = (k, lab) => k.replace(/^File:/, '').slice(0, 40).padEnd(40) + ' ' + lab.slice(0, 32).padEnd(32);

// 1. KJV
const arch = /\b(thou|thee|thy|thine|ye|hath|doth|saith|unto|cometh|verily|shalt|wilt|hast|art|dost|goeth|spake|thereof|wherewith|behold|lo)\b/i;
let kjvMiss = 0;
for (const [k, lab, t] of texts) for (const sent of t.split(/(?<=[.?!;:])\s+|\s—\s/)) {
  if (!arch.test(sent)) continue;
  const w = norm(sent).split(' ');
  if (w.length < 4 || kjv.includes(w.join(' '))) continue;
  let tail = 0;
  for (let i = 0; i < w.length; i++) if (kjv.includes(w.slice(i).join(' '))) { tail = w.length - i; break; }
  kjvMiss++;
  console.log('KJV     ' + where(k, lab) + ' tail ' + tail + '/' + w.length + (matt && matt.includes(w.join(' ')) ? '  IN MATTHEW' : '') + '\n        ' + sent);
}

// 2. Fathers
const key = { chrysostom: /chrys/i, augustine: /aug/i, bede: /bede/i, gregory: /greg/i, hilary: /hil/i, theophylact: /theophyl/i, ambrose: /ambr/i, cyril: /cyr/i, jerome: /hier|jer/i, leo: /leo/i, cassian: /cassian/i, chrysologus: /chrysol/i, cyprian: /cypr/i };
const re = /(?:St |Blessed )?(Chrysostom|Augustine|Bede|Gregory|Hilary|Theophylact|Ambrose|Cyril|Jerome|Leo|Cassian|Chrysologus|Cyprian)(?: of [A-Z][a-z]+)?:\s*/g;
let ok = 0, wrong = 0, none = 0, drift = 0;
for (const [k, lab, t] of texts) {
  const idx = []; let m; re.lastIndex = 0;
  while ((m = re.exec(t))) idx.push([m.index, m[0].length, m[1]]);
  idx.forEach(([i, len, name], j) => {
    const q = t.slice(i + len, j + 1 < idx.length ? idx[j + 1][0] : undefined);
    const probe = norm(q).split(' ').slice(0, 8).join(' ');
    const hits = com.filter(c => c[1].includes(probe));
    if (!hits.length) { none++; console.log('NOSRC   ' + where(k, lab) + ' ' + name + ': ' + q.slice(0, 90)); return; }
    const right = hits.filter(h => key[name.toLowerCase()].test(h[0]));
    if (!right.length) { wrong++; console.log('FATHER  ' + where(k, lab) + ' says ' + name + ', Catena credits ' + hits.map(h => h[0]).join(' / ')); return; }
    ok++;
    for (const sent of q.split(/(?<=[.?!;])\s+/)) {
      const w = norm(sent); if (w.split(' ').length < 4) continue;
      if (!right.some(h => h[1].includes(w))) { drift++; console.log('DRIFT   ' + where(k, lab) + ' ' + name + ': ' + sent.slice(0, 100)); }
    }
  });
}
console.log(`\n${B}: KJV clauses to read ${kjvMiss} · Fathers quoted ${ok} · wrong Father ${wrong} · no source ${none} · drifted sentences ${drift}`);
