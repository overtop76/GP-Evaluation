const fs = require('fs');
function replaceFile(path, regex, replacement) {
  let content = fs.readFileSync(path, 'utf8');
  content = content.replace(regex, replacement);
  fs.writeFileSync(path, content);
}
replaceFile('./components/Report.tsx', /#f0fdf4/g, "rgba(16, 185, 129, 0.1)");
replaceFile('./components/AuditLog.tsx', /#f0fdf4/g, "rgba(16, 185, 129, 0.1)");
replaceFile('./components/Dashboard.tsx', /#f0fdf4/g, "rgba(16, 185, 129, 0.1)");
replaceFile('./constants.tsx', /#f0fdf4/g, "rgba(16, 185, 129, 0.1)");
replaceFile('./index.css', /#f0fdf4/g, "rgba(16, 185, 129, 0.1)");
