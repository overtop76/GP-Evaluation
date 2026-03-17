const fs = require('fs');
let css = fs.readFileSync('index.css', 'utf8');
css += `
.dark .b-ex { background: rgba(22, 101, 52, 0.2); color: #4ade80; border-color: rgba(74, 222, 128, 0.2); }
.dark .b-pr { background: rgba(30, 64, 175, 0.2); color: #60a5fa; border-color: rgba(96, 165, 250, 0.2); }
.dark .b-dev { background: rgba(146, 64, 14, 0.2); color: #fbbf24; border-color: rgba(251, 191, 36, 0.2); }
.dark .b-uns { background: rgba(153, 27, 27, 0.2); color: #f87171; border-color: rgba(248, 113, 113, 0.2); }
.dark .b-draft { background: rgba(194, 65, 12, 0.2); color: #fb923c; border-color: rgba(251, 146, 60, 0.2); }
`;
fs.writeFileSync('index.css', css);
