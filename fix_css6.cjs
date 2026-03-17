const fs = require('fs');
let content = fs.readFileSync('./components/Dashboard.tsx', 'utf8');
content = content.replace(/#fff7ed/g, 'rgba(245, 158, 11, 0.1)');
fs.writeFileSync('./components/Dashboard.tsx', content);
