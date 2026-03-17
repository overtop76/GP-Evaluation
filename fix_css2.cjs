const fs = require('fs');
let css = fs.readFileSync('index.css', 'utf8');
css = css.replace(/\.icon-btn:hover {\n  background: #f1f5f9;/g, '.icon-btn:hover {\n  background: var(--bg);');
css = css.replace(/border-bottom: 1px solid #f1f5f9;/g, 'border-bottom: 1px solid var(--border);');
css = css.replace(/\.tbar {\n  background: #f1f5f9;/g, '.tbar {\n  background: var(--bg);');
css = css.replace(/\.ind-ev {\n  background: #f1f5f9;/g, '.ind-ev {\n  background: var(--bg);');
fs.writeFileSync('index.css', css);
