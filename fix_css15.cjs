const fs = require('fs');
function replaceFile(path, regex, replacement) {
  let content = fs.readFileSync(path, 'utf8');
  content = content.replace(regex, replacement);
  fs.writeFileSync(path, content);
}
replaceFile('./components/Report.tsx', /#e2e8f0/g, "var(--border)");
replaceFile('./components/Settings.tsx', /#e2e8f0/g, "var(--border)");
replaceFile('./components/EvaluationForm.tsx', /#e2e8f0/g, "var(--border)");
replaceFile('./components/Dashboard.tsx', /#e2e8f0/g, "var(--border)");
replaceFile('./components/AuditLog.tsx', /#e2e8f0/g, "var(--border)");
