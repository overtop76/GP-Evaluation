const fs = require('fs');
function replaceFile(path, regex, replacement) {
  let content = fs.readFileSync(path, 'utf8');
  content = content.replace(regex, replacement);
  fs.writeFileSync(path, content);
}
replaceFile('./utils/helpers.ts', /#fef3c7/g, "rgba(245, 158, 11, 0.1)");
replaceFile('./index.css', /#fef3c7/g, "rgba(245, 158, 11, 0.1)");
