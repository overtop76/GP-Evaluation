const fs = require('fs');

function replaceFile(path, regex, replacement) {
  let content = fs.readFileSync(path, 'utf8');
  content = content.replace(regex, replacement);
  fs.writeFileSync(path, content);
}

replaceFile('./components/UserManagement.tsx', /#eff6ff/g, "rgba(37, 99, 235, 0.1)");
replaceFile('./components/Settings.tsx', /#eff6ff/g, "rgba(37, 99, 235, 0.1)");
replaceFile('./components/TeacherDirectory.tsx', /#eff6ff/g, "rgba(37, 99, 235, 0.1)");
replaceFile('./components/Dashboard.tsx', /#eff6ff/g, "rgba(37, 99, 235, 0.1)");
replaceFile('./constants.tsx', /#eff6ff/g, "rgba(37, 99, 235, 0.1)");
