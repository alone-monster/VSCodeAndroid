import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import EditorPane from './components/EditorPane';
import Terminal from './components/Terminal';
import TabBar from './components/TabBar';
import StatusBar from './components/StatusBar';
import './App.css';

function App() {
  const [files, setFiles] = useState([
    { id: 1, name: 'index.js', language: 'javascript', content: '// Welcome to VSCode Mobile\nconsole.log("Hello World!");' },
    { id: 2, name: 'style.css', language: 'css', content: 'body {\n  margin: 0;\n}' },
    { id: 3, name: 'index.html', language: 'html', content: '<!DOCTYPE html>\n<html>\n<body>\n</body>\n</html>' },
  ]);
  const [activeFile, setActiveFile] = useState(null);
  const [openTabs, setOpenTabs] = useState([]);
  const [showTerminal, setShowTerminal] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const openFile = (file) => {
    if (!openTabs.find(t => t.id === file.id)) {
      setOpenTabs(prev => [...prev, file]);
    }
    setActiveFile(file);
  };

  const closeTab = (fileId) => {
    const newTabs = openTabs.filter(t => t.id !== fileId);
    setOpenTabs(newTabs);
    if (activeFile && activeFile.id === fileId) {
      setActiveFile(newTabs.length > 0 ? newTabs[newTabs.length - 1] : null);
    }
  };

  const updateFileContent = (content) => {
    if (!activeFile) return;
    setFiles(prev => prev.map(f => f.id === activeFile.id ? { ...f, content } : f));
    setActiveFile(prev => ({ ...prev, content }));
    setOpenTabs(prev => prev.map(t => t.id === activeFile.id ? { ...t, content } : t));
  };

  const createNewFile = () => {
    const name = `untitled-${files.length + 1}.js`;
    const newFile = { id: Date.now(), name, language: 'javascript', content: '' };
    setFiles(prev => [...prev, newFile]);
    openFile(newFile);
  };

  const deleteFile = (fileId) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
    closeTab(fileId);
  };

  return (
    <div className="app">
      <div className="titlebar">
        <div className="titlebar-left">
          <span className="app-name">⚡ VSCode Mobile</span>
        </div>
        <div className="titlebar-actions">
          <button onClick={() => setSidebarOpen(!sidebarOpen)}>☰</button>
          <button onClick={() => setShowTerminal(!showTerminal)}>⌨️</button>
          <button onClick={createNewFile}>＋</button>
        </div>
      </div>
      <div className="main-layout">
        {sidebarOpen && (
          <Sidebar files={files} activeFile={activeFile} onFileClick={openFile} onNewFile={createNewFile} onDeleteFile={deleteFile} />
        )}
        <div className="editor-area">
          <TabBar tabs={openTabs} activeFile={activeFile} onTabClick={setActiveFile} onTabClose={closeTab} />
          {activeFile ? (
            <EditorPane file={activeFile} onChange={updateFileContent} showTerminal={showTerminal} />
          ) : (
            <div className="welcome-screen">
              <div className="welcome-content">
                <div className="welcome-icon">⚡</div>
                <h1>VSCode Mobile</h1>
                <p>Open a file from explorer to start editing</p>
                <button className="welcome-btn" onClick={createNewFile}>＋ New File</button>
              </div>
            </div>
          )}
          {showTerminal && <Terminal />}
        </div>
      </div>
      <StatusBar activeFile={activeFile} fileCount={files.length} />
    </div>
  );
}

export default App;
