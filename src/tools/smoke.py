#!/usr/bin/env python3
"""Open the built reader in headless Chromium and prove it renders: counts icon images, checks
every src decodes (new Image() per src — img.complete lies under loading=lazy), reports console
errors, and for each PASSAGE_ID:MARKER_INDEX:NAME opens the passage, switches to *Deciphering
the Icon*, clicks that marker and screenshots .hotwrap to OUTDIR/shot_NAME.png.  Usage:

    make serve &   (or python3 -m http.server 8731 --bind 127.0.0.1)
    python3 src/tools/smoke.py OUTDIR pilate:4:pilate demoniacs8:2:gad

Needs `pip install playwright`; the browser is at /opt/pw-browsers on the web runner."""
import asyncio, sys
from playwright.async_api import async_playwright
S=sys.argv[1]; args=sys.argv[2:]
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(executable_path='/opt/pw-browsers/chromium-1194/chrome-linux/chrome')
        pg=await b.new_page(viewport={'width':1440,'height':960})
        errs=[]; pg.on('console',lambda m: errs.append(m.text) if m.type=='error' else None); pg.on('pageerror',lambda e: errs.append(str(e)))
        await pg.goto('http://127.0.0.1:8731/Matthew%20Reader.html',wait_until='load',timeout=120000)
        await pg.wait_for_timeout(1500)
        n=await pg.evaluate("document.querySelectorAll('img').length")
        broken=await pg.evaluate("""async()=>{const srcs=[...new Set([...document.querySelectorAll('img')].map(i=>i.getAttribute('src')))];let bad=0;await Promise.all(srcs.map(s=>new Promise(r=>{const im=new Image();im.onload=()=>r();im.onerror=()=>{bad++;r()};im.src=s;})));return [srcs.length,bad]}""")
        print('imgs',n,'unique',broken[0],'broken',broken[1])
        for pid,idx,name in [a.split(':') for a in args]:
            await pg.locator('#p-'+pid+' button.card').first.scroll_into_view_if_needed(); await pg.locator('#p-'+pid+' button.card').first.click(); await pg.wait_for_timeout(400)
            await pg.get_by_text('Deciphering the Icon').first.click(); await pg.wait_for_timeout(400)
            hots=await pg.locator('.hotwrap .hot').count()
            await pg.locator('.hotwrap .hot').nth(int(idx)).click(); await pg.wait_for_timeout(300)
            lab=await pg.locator('.hotlist button[aria-current=true] .l').inner_text()
            await pg.locator('.hotwrap').screenshot(path=f'{S}/shot_{name}.png')
            print(pid,'markers',hots,'selected',idx,'->',lab)
            await pg.keyboard.press('Escape'); await pg.wait_for_timeout(200)
        print('console errors',len(errs)); [print(' ',e[:200]) for e in errs[:5]]
        await b.close()
asyncio.run(main())
