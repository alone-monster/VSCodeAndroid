import React, { useEffect, useRef } from 'react';
import { Terminal as XTerm } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';

function Terminal() {
  const termRef = useRef(null);

  useEffect(() => {
    const term = new XTerm({
      theme: { background: '#1e1e1e', foreground: '#d4d4d4', cursor: '#d4d4d4' },
      fontSize: 13,
      fontFamily: 'monospace',
      cursorBlink: true,
    });
    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);
    term.open(termRef.current);
    fitAddon.fit();
    term.writeln('\x1b[32mVSCode Mobile Terminal\x1b[0m');
    term.write('\x1b[33m$ \x1b[0m');
    let command = '';
    term.onKey(({ key, domEvent }) => {
      if (domEvent.keyCode === 13) {
        term.writeln('');
        if (command.trim()) term.writeln(`\x1b[31m${command}: command not found\x1b[0m`);
        command = '';
        term.write('\x1b[33m$ \x1b[0m');
      } else if (domEvent.keyCode === 8) {
        if (command.length > 0) { command = command.slice(0, -1); term.write('\b \b'); }
      } else { command += key; term.write(key); }
    });
    return () => term.dispose();
  }, []);

  return <div className="terminal-pane" ref={termRef} />;
}

export default Terminal;
