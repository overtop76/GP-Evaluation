const fs = require('fs');
let content = fs.readFileSync('./components/Dashboard.tsx', 'utf8');
content = content.replace(/#1e293b/g, 'var(--navy2)');
fs.writeFileSync('./components/Dashboard.tsx', content);
