const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, 'index.css');
let css = fs.readFileSync(cssPath, 'utf8');

css = css.replace(/margin-left/g, 'margin-inline-start');
css = css.replace(/margin-right/g, 'margin-inline-end');
css = css.replace(/padding-left/g, 'padding-inline-start');
css = css.replace(/padding-right/g, 'padding-inline-end');
css = css.replace(/border-left/g, 'border-inline-start');
css = css.replace(/border-right/g, 'border-inline-end');
css = css.replace(/border-top-left-radius/g, 'border-start-start-radius');
css = css.replace(/border-top-right-radius/g, 'border-start-end-radius');
css = css.replace(/border-bottom-left-radius/g, 'border-end-start-radius');
css = css.replace(/border-bottom-right-radius/g, 'border-end-end-radius');
css = css.replace(/left:/g, 'inset-inline-start:');
css = css.replace(/right:/g, 'inset-inline-end:');

fs.writeFileSync(cssPath, css);
console.log('CSS updated to logical properties');
