const fs = require('fs');
let css = fs.readFileSync('index.css', 'utf8');
css = css.replace(/background: #fff;/g, 'background: var(--white);');
fs.writeFileSync('index.css', css);
