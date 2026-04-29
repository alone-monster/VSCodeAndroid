import React from 'react';

const LANGS = { js: 'JavaScript', jsx: 'React', ts: 'TypeScript', css: 'CSS', html: 'HTML', py: 'Python', json: 'JSON', md: 'Markdown' };

function StatusBar({ activeFile, fileCount }) {
  const ext = activeFile?.name?.split('.').pop() || '';
  const lang = LANGS[ext] || 'Plain Text';

  return (
    <div className="statusbar">
      <span>⚡ VSCode Mobile</span>
      <span>{activeFile ? activeFile.name : 'No file open'}</span>
      <span>{activeFile ? lang : ''}</span>
      <span>{fileCount} files</span>
      <span>UTF-8</span>
    </div>
  );
}

export default StatusBar;
