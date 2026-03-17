const fs = require('fs');
let css = fs.readFileSync('index.css', 'utf8');
css = css.replace(/--slate-dark: #475569;/g, '--slate-dark: #475569;\n  --slate-darker: #334155;');
css = css.replace(/--slate-dark: #cbd5e1;/g, '--slate-dark: #cbd5e1;\n  --slate-darker: #f1f5f9;');
fs.writeFileSync('index.css', css);

function replaceFile(path, regex, replacement) {
  let content = fs.readFileSync(path, 'utf8');
  content = content.replace(regex, replacement);
  fs.writeFileSync(path, content);
}
replaceFile('./components/Report.tsx', /#334155/g, "var(--slate-darker)");
replaceFile('./components/Dashboard.tsx', /#334155/g, "var(--slate-darker)");
replaceFile('./index.css', /#334155/g, "var(--slate-darker)");
