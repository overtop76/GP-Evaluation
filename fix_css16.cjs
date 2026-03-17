const fs = require('fs');
let css = fs.readFileSync('index.css', 'utf8');
css = css.replace(/--border: #e2e8f0;/g, '--border: #e2e8f0;\n  --border-hover: #cbd5e1;');
css = css.replace(/--border: #334155;/g, '--border: #334155;\n  --border-hover: #475569;');
fs.writeFileSync('index.css', css);

function replaceFile(path, regex, replacement) {
  let content = fs.readFileSync(path, 'utf8');
  content = content.replace(regex, replacement);
  fs.writeFileSync(path, content);
}
replaceFile('./components/Login.tsx', /#cbd5e1/g, "var(--border-hover)");
replaceFile('./components/AuditLog.tsx', /#cbd5e1/g, "var(--border-hover)");
replaceFile('./components/EvaluationForm.tsx', /#cbd5e1/g, "var(--border-hover)");
replaceFile('./components/TeacherDirectory.tsx', /#cbd5e1/g, "var(--border-hover)");
replaceFile('./components/Dashboard.tsx', /#cbd5e1/g, "var(--border-hover)");
replaceFile('./index.css', /#cbd5e1/g, "var(--border-hover)");
