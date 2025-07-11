import React from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-golang';
import 'ace-builds/src-noconflict/mode-rust';
import 'ace-builds/src-noconflict/mode-php';
import 'ace-builds/src-noconflict/mode-ruby';
import 'ace-builds/src-noconflict/mode-scala';
import 'ace-builds/src-noconflict/mode-swift';
import 'ace-builds/src-noconflict/mode-kotlin';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/theme-tomorrow_night';
import 'ace-builds/src-noconflict/ext-language_tools';

const languageMap = {
  python: 'python',
  javascript: 'javascript',
  java: 'java',
  cpp: 'c_cpp',
  c: 'c_cpp',
  go: 'golang',
  rust: 'rust',
  php: 'php',
  ruby: 'ruby',
  scala: 'scala',
  swift: 'swift',
  kotlin: 'kotlin',
};

export default function CodeEditor({ 
  value, 
  onChange, 
  language = 'python', 
  theme = 'monokai', 
  height = '600px',
  width = '100%',
  ...props 
}) {
  return (
    <AceEditor
      mode={languageMap[language] || 'python'}
      theme={theme}
      value={value}
      onChange={onChange}
      name="code-editor"
      width={width}
      height={height}
      fontSize={14}
      fontFamily="'Fira Code', 'Monaco', 'Menlo', 'Ubuntu Mono', monospace"
      setOptions={{ 
        useWorker: false,
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: true,
        showLineNumbers: true,
        tabSize: 2,
        showPrintMargin: false,
        highlightActiveLine: true,
        showGutter: true,
        displayIndentGuides: true,
      }}
      editorProps={{ 
        $blockScrolling: true,
        $highlightActiveLine: true,
      }}
      style={{
        borderRadius: '8px',
        border: '1px solid #e0e0e0',
        minWidth: '800px',
      }}
      {...props}
    />
  );
} 