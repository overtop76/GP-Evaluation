const fs = require('fs');
function replaceFile(path, regex, replacement) {
  let content = fs.readFileSync(path, 'utf8');
  content = content.replace(regex, replacement);
  fs.writeFileSync(path, content);
}
replaceFile('./components/AuditLog.tsx', /#fee2e2/g, "rgba(239, 68, 68, 0.1)");
replaceFile('./components/Settings.tsx', /#fee2e2/g, "rgba(239, 68, 68, 0.1)");
replaceFile('./utils/helpers.ts', /#fee2e2/g, "rgba(239, 68, 68, 0.1)");
replaceFile('./index.css', /#fee2e2/g, "rgba(239, 68, 68, 0.1)");
