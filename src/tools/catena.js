// Grep the Catena Aurea on the book (BOOK=matthew or BOOK=john) by chapter, verse range and keyword, so that what is
// written about an icon can be checked against what the Fathers actually said about the
// passage it depicts.
//
//   node src/tools/catena.js <chapter> [vFrom-vTo] [regexp]
//
// Pseudo-Chrysostom, the Glossa, the Carolingians, Origen and Eusebius are printed too, but
// marked "(not in the reader's whitelist)" — see fathers.js for why they are excluded there.
const c=require(require('../book.js').file('catena.json'));
const [ch,range,rx]=process.argv.slice(2);
const [a,b]=(range||'1-999').split('-').map(Number);
const re=rx?new RegExp(rx,'i'):null;
const skip=/pseudo|gloss|rabanus|remig|haymo|origen|euseb/i;
for(const blk of c[ch]||[]){
  if(blk.v[blk.v.length-1]<a||blk.v[0]>(b||a)) continue;
  for(const cm of blk.comments){
    if(re&&!re.test(cm.text)) continue;
    console.log(`[${blk.v.join(',')}] ${cm.attr}${skip.test(cm.attr)?' (not in the reader’s whitelist)':''}\n    ${cm.text.replace(/\s+/g,' ')}\n`);
  }
}
