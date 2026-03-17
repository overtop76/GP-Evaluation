const fs = require('fs');
function replaceFile(path, regex, replacement) {
  let content = fs.readFileSync(path, 'utf8');
  content = content.replace(regex, replacement);
  fs.writeFileSync(path, content);
}
replaceFile('./components/Report.tsx', /#64748b/g, "var(--slate)");
replaceFile('./components/AuditLog.tsx', /#64748b/g, "var(--slate)");
replaceFile('./components/UserManagement.tsx', /#64748b/g, "var(--slate)");
replaceFile('./components/Settings.tsx', /#64748b/g, "var(--slate)");
replaceFile('./components/EvaluationForm.tsx', /#64748b/g, "var(--slate)");
replaceFile('./components/TeacherDirectory.tsx', /#64748b/g, "var(--slate)");
replaceFile('./components/Dashboard.tsx', /#64748b/g, "var(--slate)");
replaceFile('./index.css', /#64748b/g, "var(--slate)");
