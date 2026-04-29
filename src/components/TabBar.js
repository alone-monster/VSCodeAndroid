import React from 'react';

const ICONS = { js: '🟨', jsx: '⚛️', ts: '🔷', css: '🎨', html: '🌐', json: '📋', py: '🐍', md: '📝' };

function TabBar({ tabs, activeFile, onTabClick, onTabClose }) {
  return (
    <div className="tabbar">
      {tabs.map(tab => (
        <div key={tab.id} className={`tab ${activeFile?.id === tab.id ? 'active' : ''}`} onClick={() => onTabClick(tab)}>
          <span>{ICONS[tab.name.split('.').pop()] || '📄'}</span>
          <span>{tab.name}</span>
          <button className="tab-close" onClick={e => { e.stopPropagation(); onTabClose(tab.id); }}>×</button>
        </div>
      ))}
    </div>
  );
}

export default TabBar;
