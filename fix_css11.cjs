const fs = require('fs');
function replaceFile(path, regex, replacement) {
  let content = fs.readFileSync(path, 'utf8');
  content = content.replace(regex, replacement);
  fs.writeFileSync(path, content);
}
replaceFile('./components/AuditLog.tsx', /#dbeafe/g, "rgba(59, 130, 246, 0.1)");
replaceFile('./utils/helpers.ts', /#dbeafe/g, "rgba(59, 130, 246, 0.1)");
replaceFile('./index.css', /#dbeafe/g, "rgba(59, 130, 246, 0.1)");
