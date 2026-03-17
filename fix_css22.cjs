const fs = require('fs');
let content = fs.readFileSync('./components/Login.tsx', 'utf8');
content = content.replace(/#fecaca/g, 'rgba(239, 68, 68, 0.2)');
fs.writeFileSync('./components/Login.tsx', content);
