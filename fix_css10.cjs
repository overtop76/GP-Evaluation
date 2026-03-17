const fs = require('fs');
function replaceFile(path, regex, replacement) {
  let content = fs.readFileSync(path, 'utf8');
  content = content.replace(regex, replacement);
  fs.writeFileSync(path, content);
}
replaceFile('./components/AuditLog.tsx', /#dcfce7/g, "rgba(16, 185, 129, 0.1)");
replaceFile('./utils/helpers.ts', /#dcfce7/g, "rgba(16, 185, 129, 0.1)");
replaceFile('./index.css', /#dcfce7/g, "rgba(16, 185, 129, 0.1)");
