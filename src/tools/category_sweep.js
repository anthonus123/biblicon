#!/usr/bin/env node
// Match every icon gap's keywords against the CATEGORY names in pool.json, not the file titles.
// Every earlier gap search grepped titles, and three "dead ends" (Nain, and the widow's mite in
// Mark and Luke) sat in the pool all along under categories whose files' titles never repeat the
// keyword (2026-11-01e). Usage, from the repo root:
//
//     node src/tools/category_sweep.js            # all four books
//     node src/tools/category_sweep.js luke       # one book
//
// For each passage that names a subject in assign.js but has no picks.js entry, it prints the
// matching categories with their pooled file counts. A hit is a lead, not an icon: most of what it
// prints is Western art, and every survivor still has to be looked at.
const fs = require('fs'), path = require('path');
const SRC = path.join(__dirname, '..');
const pool = JSON.parse(fs.readFileSync(path.join(__dirname, 'pool.json'), 'utf8'));
const cats = {};
for (const [t, cs] of Object.entries(pool)) for (const c of cs) (cats[c] = cats[c] || []).push(t);
const names = Object.keys(cats);
const books = process.argv[2] ? [process.argv[2]] : ['matthew', 'mark', 'luke', 'john'];
for (const b of books) {
  const A = require(path.join(SRC, 'books', b, 'assign.js'));
  const P = require(path.join(SRC, 'books', b, 'picks.js'));
  for (const [id, a] of Object.entries(A)) {
    if (!a.subj || P[id]) continue;
    const hits = names.filter(c => (a.kw || []).some(kw => kw.every(w => c.toLowerCase().includes(w.toLowerCase()))));
    console.log(`${b}/${id} (${a.subj}): ` + (hits.length ? hits.map(c => `${c} [${cats[c].length}]`).join(' ; ') : '-'));
  }
}
