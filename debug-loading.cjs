const { chromium } = require('playwright');

(async () => {
  const b = await chromium.launch({ headless: true });
  const c = await b.newContext({ viewport: { width: 1280, height: 720 } });
  const p = await c.newPage();
  
  p.on('console', m => console.log('BROWSER LOG:', m.text().substring(0, 100)));
  
  await p.goto('http://localhost:3000', { waitUntil: 'domcontentloaded', timeout: 15000 }).catch(() => {});
  
  console.log('Monitorando carregamento...\n');
  
  for (let i = 0; i < 25; i++) {
    const info = await p.evaluate(() => {
      const len = document.querySelectorAll('*').length;
      const hasRoot = !!document.getElementById('root');
      const html = document.documentElement.innerHTML.substring(0, 200);
      const loading = document.querySelector('[class*="load"]');
      const visible = document.querySelectorAll('*:not([style*="display:none"]):not([style*="visibility:hidden"])').length;
      return { len, hasRoot, visible, hasLoading: !!loading };
    });
    
    const title = await p.title();
    console.log(`${i}s: Elements=${info.len}, Visible=${info.visible}, HasRoot=${info.hasRoot}, HasLoading=${info.hasLoading}`);
    
    if (info.len > 50 && info.visible > 30) {
      console.log('\n✓ Página carregada!');
      break;
    }
    
    await p.waitForTimeout(1000);
  }
  
  await b.close();
})();
