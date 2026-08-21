# 660px WebP, the same width every icon in src/img already uses. Variants are shown at the
# same size as the icon they sit beside and open in the same full-size view, so they are
# encoded the same way — a softer variant under a "see it at full size" promise would lie.
import json,os,hashlib
from PIL import Image
D=os.path.dirname(os.path.abspath(__file__))
REPO='/home/anthony/Documents/GitRepos/biblicon/'
res=json.load(open(D+'/new_fetch.json'))
meta=json.load(open(REPO+'src/data/image_meta.json'))
keys=json.load(open(REPO+'src/data/pick_keys.json'))
sizes=[]
for x in res['ok']:
    k=x['key']; t=x['title']
    assert k==hashlib.md5(t.encode()).hexdigest()[:12], t
    im=Image.open(x['file']).convert('RGB')
    if im.width!=660:
        im=im.resize((660,round(im.height*660/im.width)),Image.LANCZOS)
    out=REPO+'src/img/%s.webp'%k
    im.save(out,'WEBP',quality=80,method=6)
    sizes.append(os.path.getsize(out))
    meta[t]=res['meta'][t]
    keys[t]=k
json.dump(meta,open(REPO+'src/data/image_meta.json','w'),indent=1,ensure_ascii=False)
json.dump(keys,open(REPO+'src/data/pick_keys.json','w'),indent=1,ensure_ascii=False)
print('encoded',len(sizes),'avg KB',round(sum(sizes)/len(sizes)/1024),'total MB',round(sum(sizes)/1048576,2))
