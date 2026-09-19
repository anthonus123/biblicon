// Which Gospel is being built. `BOOK=john make` (or `node src/assemble.js` with BOOK set)
// selects src/books/<book>/; the default is Matthew. Everything a reader has of its own —
// pericopes, text, commentary, icon choices, readings, markers — lives in that folder. The
// image pool (src/img, data/image_meta.json, data/pick_keys.json) is shared: an icon of the
// Entry into Jerusalem is the same icon whichever Gospel's account it stands beside.
const fs=require('fs'),path=require('path');
const id=(process.env.BOOK||'matthew').toLowerCase();
const dir=path.join(__dirname,'books',id);
if(!fs.existsSync(path.join(dir,'book.json'))){
  console.error('unknown book "'+id+'": no src/books/'+id+'/book.json');
  process.exit(1);
}
const meta=JSON.parse(fs.readFileSync(path.join(dir,'book.json'),'utf8'));
module.exports={...meta, dir, file:n=>path.join(dir,n), has:n=>fs.existsSync(path.join(dir,n))};
