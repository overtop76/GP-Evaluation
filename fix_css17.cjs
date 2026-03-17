const fs = require('fs');
function replaceFile(path, regex, replacement) {
  let content = fs.readFileSync(path, 'utf8');
  content = content.replace(regex, replacement);
  fs.writeFileSync(path, content);
}
replaceFile('./components/Report.tsx', /#94a3b8/g, "var(--slate)");
replaceFile('./components/Login.tsx', /#94a3b8/g, "var(--slate)");
replaceFile('./components/AuditLog.tsx', /#94a3b8/g, "var(--slate)");
replaceFile('./components/Settings.tsx', /#94a3b8/g, "var(--slate)");
replaceFile('./components/EvaluationForm.tsx', /#94a3b8/g, "var(--slate)");
replaceFile('./components/TeacherDirectory.tsx', /#94a3b8/g, "var(--slate)");
replaceFile('./index.css', /#94a3b8/g, "var(--slate)");
