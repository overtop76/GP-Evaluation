const fs = require('fs');
function replaceFile(path, regex, replacement) {
  let content = fs.readFileSync(path, 'utf8');
  content = content.replace(regex, replacement);
  fs.writeFileSync(path, content);
}
replaceFile('./components/UserManagement.tsx', /#f3e8ff/g, "rgba(168, 85, 247, 0.1)");
replaceFile('./components/Dashboard.tsx', /#f3e8ff/g, "rgba(168, 85, 247, 0.1)");
