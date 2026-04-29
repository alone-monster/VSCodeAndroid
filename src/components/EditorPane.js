import React from 'react';
import Editor from '@monaco-editor/react';

function EditorPane({ file, onChange, showTerminal }) {
  const height = showTerminal ? 'calc(100vh - 240px)' : 'calc(100vh - 100px)';

  return (
    <div className="editor-pane" style={{ height }}>
      <Editor
        height="100%"
        language={file.language}
        value={file.content}
        theme="vs-dark"
        onChange={value => onChange(value || '')}
        options={{
          fontSize: 14,
          fontFamily: 'monospace',
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          wordWrap: 'on',
          automaticLayout: true,
          tabSize: 2,
          formatOnPaste: true,
          formatOnType: true,
          quickSuggestions: true,
          folding: true,
          lineNumbers: 'on',
          renderLineHighlight: 'all',
          cursorBlinking: 'blink',
          smoothScrolling: true,
        }}
      />
    </div>
  );
}

export default EditorPane;
