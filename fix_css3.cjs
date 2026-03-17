const fs = require('fs');

function replaceFile(path, regex, replacement) {
  let content = fs.readFileSync(path, 'utf8');
  content = content.replace(regex, replacement);
  fs.writeFileSync(path, content);
}

replaceFile('./components/Report.tsx', /background: '#f1f5f9'/g, "background: 'var(--bg)'");
replaceFile('./components/Report.tsx', /fill: '#f1f5f9'/g, "fill: 'var(--bg)'");
replaceFile('./components/UserManagement.tsx', /background: '#f1f5f9'/g, "background: 'var(--bg)'");
replaceFile('./components/EvaluationForm.tsx', /stroke="#f1f5f9"/g, 'stroke="var(--border)"');
replaceFile('./components/TeacherDirectory.tsx', /background: '#f1f5f9'/g, "background: 'var(--bg)'");
