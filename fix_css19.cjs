const fs = require('fs');
let css = fs.readFileSync('index.css', 'utf8');
css = css.replace(/--slate: #64748b;/g, '--slate: #64748b;\n  --slate-dark: #475569;');
css = css.replace(/--slate: #94a3b8;/g, '--slate: #94a3b8;\n  --slate-dark: #cbd5e1;');
fs.writeFileSync('index.css', css);

function replaceFile(path, regex, replacement) {
  let content = fs.readFileSync(path, 'utf8');
  content = content.replace(regex, replacement);
  fs.writeFileSync(path, content);
}
replaceFile('./components/Report.tsx', /#475569/g, "var(--slate-dark)");
replaceFile('./components/AuditLog.tsx', /#475569/g, "var(--slate-dark)");
replaceFile('./components/UserManagement.tsx', /#475569/g, "var(--slate-dark)");
replaceFile('./components/TeacherDirectory.tsx', /#475569/g, "var(--slate-dark)");
replaceFile('./index.css', /#475569/g, "var(--slate-dark)");
