import React, { useState } from 'react';

const ICONS = { js: '🟨', jsx: '⚛️', ts: '🔷', tsx: '⚛️', css: '🎨', html: '🌐', json: '📋', py: '🐍', md: '📝', txt: '📄' };

function Sidebar({ files, activeFile, onFileClick, onNewFile, onDeleteFile }) {
  const [search, setSearch] = useState('');
  const filtered = files.filter(f => f.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <span>EXPLORER</span>
        <button onClick={onNewFile} title="New File">+</button>
      </div>
      <div className="sidebar-search">
        <input placeholder="Search files..." value={search} onChange={e => setSearch(e.target.value)} />
      </div>
      <div className="file-list">
        {filtered.map(file => (
          <div key={file.id} className={`file-item ${activeFile?.id === file.id ? 'active' : ''}`} onClick={() => onFileClick(file)}>
            <div className="file-item-left">
              <span>{ICONS[file.name.split('.').pop()] || '📄'}</span>
              <span>{file.name}</span>
            </div>
            <button className="file-delete" onClick={e => { e.stopPropagation(); onDeleteFile(file.id); }}>🗑</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
