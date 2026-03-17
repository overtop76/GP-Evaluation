const fs = require('fs');
function replaceFile(path, regex, replacement) {
  let content = fs.readFileSync(path, 'utf8');
  content = content.replace(regex, replacement);
  fs.writeFileSync(path, content);
}
replaceFile('./components/Report.tsx', /#fef2f2/g, "rgba(239, 68, 68, 0.1)");
replaceFile('./components/Login.tsx', /#fef2f2/g, "rgba(239, 68, 68, 0.1)");
replaceFile('./components/AuditLog.tsx', /#fef2f2/g, "rgba(239, 68, 68, 0.1)");
replaceFile('./constants.tsx', /#fef2f2/g, "rgba(239, 68, 68, 0.1)");
replaceFile('./index.css', /#fef2f2/g, "rgba(239, 68, 68, 0.1)");
