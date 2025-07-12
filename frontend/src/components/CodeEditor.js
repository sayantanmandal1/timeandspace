import React, { useState, useEffect } from 'react';
import AceEditor from 'react-ace';
import { Box, FormControl, InputLabel, Select, MenuItem, Paper } from '@mui/material';
import { languageExamples } from './languageExamples';

// Import Ace Editor modes for different languages
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/mode-php';
import 'ace-builds/src-noconflict/mode-sql';
import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/mode-css';
import 'ace-builds/src-noconflict/mode-typescript';
import 'ace-builds/src-noconflict/mode-csharp';
import 'ace-builds/src-noconflict/mode-go';
import 'ace-builds/src-noconflict/mode-rust';
import 'ace-builds/src-noconflict/mode-ruby';
import 'ace-builds/src-noconflict/mode-scala';
import 'ace-builds/src-noconflict/mode-kotlin';
import 'ace-builds/src-noconflict/mode-swift';
import 'ace-builds/src-noconflict/mode-dart';
import 'ace-builds/src-noconflict/mode-r';
import 'ace-builds/src-noconflict/mode-matlab';
import 'ace-builds/src-noconflict/mode-julia';
import 'ace-builds/src-noconflict/mode-haskell';
import 'ace-builds/src-noconflict/mode-clojure';
import 'ace-builds/src-noconflict/mode-elixir';
import 'ace-builds/src-noconflict/mode-erlang';
import 'ace-builds/src-noconflict/mode-fsharp';
import 'ace-builds/src-noconflict/mode-ocaml';
import 'ace-builds/src-noconflict/mode-perl';
import 'ace-builds/src-noconflict/mode-lua';
import 'ace-builds/src-noconflict/mode-nim';
import 'ace-builds/src-noconflict/mode-crystal';
import 'ace-builds/src-noconflict/mode-d';
import 'ace-builds/src-noconflict/mode-zig';
import 'ace-builds/src-noconflict/mode-v';
import 'ace-builds/src-noconflict/mode-odin';
import 'ace-builds/src-noconflict/mode-j';
import 'ace-builds/src-noconflict/mode-racket';
import 'ace-builds/src-noconflict/mode-scheme';
import 'ace-builds/src-noconflict/mode-common_lisp';
import 'ace-builds/src-noconflict/mode-coffeescript';
import 'ace-builds/src-noconflict/mode-livescript';
import 'ace-builds/src-noconflict/mode-elm';
import 'ace-builds/src-noconflict/mode-purescript';
import 'ace-builds/src-noconflict/mode-reason';
import 'ace-builds/src-noconflict/mode-nimrod';
import 'ace-builds/src-noconflict/mode-cobol';
import 'ace-builds/src-noconflict/mode-fortran';
import 'ace-builds/src-noconflict/mode-pascal';
import 'ace-builds/src-noconflict/mode-ada';
import 'ace-builds/src-noconflict/mode-assembly_x86';
import 'ace-builds/src-noconflict/mode-assembly_6502';
import 'ace-builds/src-noconflict/mode-assembly_arm';
import 'ace-builds/src-noconflict/mode-verilog';
import 'ace-builds/src-noconflict/mode-vhdl';
import 'ace-builds/src-noconflict/mode-tcl';
import 'ace-builds/src-noconflict/mode-groovy';
import 'ace-builds/src-noconflict/mode-gradle';
import 'ace-builds/src-noconflict/mode-maven';
import 'ace-builds/src-noconflict/mode-xml';
import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/mode-yaml';
import 'ace-builds/src-noconflict/mode-toml';
import 'ace-builds/src-noconflict/mode-ini';
import 'ace-builds/src-noconflict/mode-properties';
import 'ace-builds/src-noconflict/mode-dockerfile';
import 'ace-builds/src-noconflict/mode-sh';
import 'ace-builds/src-noconflict/mode-batchfile';
import 'ace-builds/src-noconflict/mode-makefile';
import 'ace-builds/src-noconflict/mode-diff';
import 'ace-builds/src-noconflict/mode-gitignore';
import 'ace-builds/src-noconflict/mode-markdown';
import 'ace-builds/src-noconflict/mode-text';

// Import Ace Editor themes
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/theme-tomorrow';
import 'ace-builds/src-noconflict/theme-kuroir';
import 'ace-builds/src-noconflict/theme-twilight';
import 'ace-builds/src-noconflict/theme-xcode';
import 'ace-builds/src-noconflict/theme-textmate';
import 'ace-builds/src-noconflict/theme-solarized_dark';
import 'ace-builds/src-noconflict/theme-solarized_light';
import 'ace-builds/src-noconflict/theme-terminal';

// Import Ace Editor extensions
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/ext-searchbox';
import 'ace-builds/src-noconflict/ext-spellcheck';

const languageModes = {
  // Core DSA Languages
  python: 'python',
  javascript: 'javascript',
  java: 'java',
  cpp: 'c_cpp',
  c: 'c_cpp',
  csharp: 'csharp',
  go: 'golang',
  rust: 'rust',
  php: 'php',
  ruby: 'ruby',
  sql: 'sql',
  html: 'html',
  css: 'css',
  typescript: 'typescript',
  
  // Modern Languages
  scala: 'scala',
  kotlin: 'kotlin',
  swift: 'swift',
  dart: 'dart',
  r: 'r',
  matlab: 'matlab',
  julia: 'julia',
  
  // Functional Languages
  haskell: 'haskell',
  clojure: 'clojure',
  elixir: 'elixir',
  erlang: 'erlang',
  fsharp: 'fsharp',
  ocaml: 'ocaml',
  elm: 'elm',
  purescript: 'purescript',
  reason: 'reason',
  
  // Scripting Languages
  perl: 'perl',
  lua: 'lua',
  nim: 'nimrod',
  crystal: 'crystal',
  coffeescript: 'coffeescript',
  livescript: 'livescript',
  
  // Systems Languages
  d: 'd',
  zig: 'zig',
  v: 'v',
  odin: 'odin',
  j: 'j',
  
  // Lisp Family
  racket: 'racket',
  scheme: 'scheme',
  common_lisp: 'common_lisp',
  
  // Legacy Languages
  cobol: 'cobol',
  fortran: 'fortran',
  pascal: 'pascal',
  ada: 'ada',
  
  // Assembly Languages
  assembly_x86: 'assembly_x86',
  assembly_6502: 'assembly_6502',
  assembly_arm: 'assembly_arm',
  
  // Hardware Description
  verilog: 'verilog',
  vhdl: 'vhdl',
  
  // Configuration & Build
  xml: 'xml',
  json: 'json',
  yaml: 'yaml',
  toml: 'toml',
  ini: 'ini',
  properties: 'properties',
  dockerfile: 'dockerfile',
  sh: 'sh',
  batchfile: 'batchfile',
  makefile: 'makefile',
  diff: 'diff',
  gitignore: 'gitignore',
  markdown: 'markdown',
  
  // Fallback
  text: 'text'
};

const themes = [
  { value: 'monokai', label: 'Monokai (Dark)' },
  { value: 'github', label: 'GitHub (Light)' },
  { value: 'tomorrow', label: 'Tomorrow (Light)' },
  { value: 'kuroir', label: 'Kuroir (Light)' },
  { value: 'twilight', label: 'Twilight (Dark)' },
  { value: 'xcode', label: 'Xcode (Light)' },
  { value: 'textmate', label: 'Textmate (Light)' },
  { value: 'solarized_dark', label: 'Solarized Dark' },
  { value: 'solarized_light', label: 'Solarized Light' },
  { value: 'terminal', label: 'Terminal (Dark)' }
];



export default function CodeEditor({ 
  value, 
  onChange, 
  language = 'python', 
  height = '400px',
  width = '100%',
  showLanguageSelector = true,
  showThemeSelector = true,
  placeholder = "Enter your code here..."
}) {
  const [selectedLanguage, setSelectedLanguage] = useState(language);
  const [selectedTheme, setSelectedTheme] = useState('monokai');
  const [editorValue, setEditorValue] = useState(value || languageExamples[language] || '');

  useEffect(() => {
    if (value !== undefined) {
      setEditorValue(value);
    }
  }, [value]);

  useEffect(() => {
    if (language && languageExamples[language] && !value) {
      setEditorValue(languageExamples[language]);
    }
  }, [language, value]);

  const handleLanguageChange = (event) => {
    const newLanguage = event.target.value;
    setSelectedLanguage(newLanguage);
    if (languageExamples[newLanguage] && !value) {
      setEditorValue(languageExamples[newLanguage]);
    }
    if (onChange) {
      onChange(languageExamples[newLanguage] || '');
    }
  };

  const handleThemeChange = (event) => {
    setSelectedTheme(event.target.value);
  };

  const handleEditorChange = (newValue) => {
    setEditorValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      {/* Language and Theme Selectors */}
      <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
        {showLanguageSelector && (
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Language</InputLabel>
            <Select
              value={selectedLanguage}
              label="Language"
              onChange={handleLanguageChange}
              size="small"
            >
                             <MenuItem value="python">Python</MenuItem>
               <MenuItem value="javascript">JavaScript</MenuItem>
               <MenuItem value="java">Java</MenuItem>
               <MenuItem value="cpp">C++</MenuItem>
               <MenuItem value="c">C</MenuItem>
               <MenuItem value="csharp">C#</MenuItem>
               <MenuItem value="go">Go</MenuItem>
               <MenuItem value="rust">Rust</MenuItem>
               <MenuItem value="php">PHP</MenuItem>
               <MenuItem value="ruby">Ruby</MenuItem>
               <MenuItem value="sql">SQL</MenuItem>
               <MenuItem value="html">HTML</MenuItem>
               <MenuItem value="css">CSS</MenuItem>
               <MenuItem value="typescript">TypeScript</MenuItem>
               <MenuItem value="scala">Scala</MenuItem>
               <MenuItem value="kotlin">Kotlin</MenuItem>
               <MenuItem value="swift">Swift</MenuItem>
               <MenuItem value="haskell">Haskell</MenuItem>
               <MenuItem value="clojure">Clojure</MenuItem>
               <MenuItem value="perl">Perl</MenuItem>
               <MenuItem value="lua">Lua</MenuItem>
               <MenuItem value="assembly_x86">Assembly (x86)</MenuItem>
               <MenuItem value="json">JSON</MenuItem>
               <MenuItem value="text">Text</MenuItem>
            </Select>
          </FormControl>
        )}
        
        {showThemeSelector && (
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Theme</InputLabel>
            <Select
              value={selectedTheme}
              label="Theme"
              onChange={handleThemeChange}
              size="small"
            >
              {themes.map((theme) => (
                <MenuItem key={theme.value} value={theme.value}>
                  {theme.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </Box>

      {/* Code Editor */}
      <Paper 
        elevation={3} 
        sx={{ 
          borderRadius: 2, 
          overflow: 'hidden',
          border: '1px solid #e0e0e0'
        }}
      >
        <AceEditor
          mode={languageModes[selectedLanguage] || 'text'}
          theme={selectedTheme}
          value={editorValue}
          onChange={handleEditorChange}
          name="code-editor"
          editorProps={{ $blockScrolling: true }}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
            showLineNumbers: true,
            tabSize: 2,
            fontSize: 14,
            showPrintMargin: false,
            highlightActiveLine: true,
            showGutter: true,
            wrap: false,
            cursorStyle: 'smooth',
            animatedScroll: true,
            displayIndentGuides: true,
            showInvisibles: false,
            useSoftTabs: true,
            enableEmmet: true,
            enableMultiselect: true,
            enableBlockSelect: true,
            enableAutoIndent: true,
            enableAutoInsert: true,
            enableAutoPair: true,
            enableAutoSurround: true,
            enableAutoWrap: true,
            enableBackspace: true,
            enableDelete: true,
            enableEnter: true,
            enableEscape: true,
            enableHome: true,
            enableEnd: true,
            enablePageUp: true,
            enablePageDown: true,
            enableUp: true,
            enableDown: true,
            enableLeft: true,
            enableRight: true,
            enableTab: true,
            enableShiftTab: true,
            enableCtrlA: true,
            enableCtrlC: true,
            enableCtrlV: true,
            enableCtrlX: true,
            enableCtrlZ: true,
            enableCtrlY: true,
            enableCtrlF: true,
            enableCtrlH: true,
            enableCtrlG: true,
            enableCtrlL: true,
            enableCtrlD: true,
            enableCtrlK: true,
            enableCtrlU: true,
            enableCtrlSlash: true,
            enableCtrlShiftK: true,
            enableCtrlShiftL: true,
            enableCtrlShiftUp: true,
            enableCtrlShiftDown: true,
            enableCtrlShiftLeft: true,
            enableCtrlShiftRight: true,
            enableCtrlShiftHome: true,
            enableCtrlShiftEnd: true,
            enableCtrlShiftPageUp: true,
            enableCtrlShiftPageDown: true,
            enableAltUp: true,
            enableAltDown: true,
            enableAltLeft: true,
            enableAltRight: true,
            enableAltHome: true,
            enableAltEnd: true,
            enableAltPageUp: true,
            enableAltPageDown: true,
            enableAltShiftUp: true,
            enableAltShiftDown: true,
            enableAltShiftLeft: true,
            enableAltShiftRight: true,
            enableAltShiftHome: true,
            enableAltShiftEnd: true,
            enableAltShiftPageUp: true,
            enableAltShiftPageDown: true,
            enableCtrlAltUp: true,
            enableCtrlAltDown: true,
            enableCtrlAltLeft: true,
            enableCtrlAltRight: true,
            enableCtrlAltHome: true,
            enableCtrlAltEnd: true,
            enableCtrlAltPageUp: true,
            enableCtrlAltPageDown: true,
            enableCtrlAltShiftUp: true,
            enableCtrlAltShiftDown: true,
            enableCtrlAltShiftLeft: true,
            enableCtrlAltShiftRight: true,
            enableCtrlAltShiftHome: true,
            enableCtrlAltShiftEnd: true,
            enableCtrlAltShiftPageUp: true,
            enableCtrlAltShiftPageDown: true
          }}
          width={width}
          height={height}
          placeholder={placeholder}
          style={{
            fontFamily: '"Fira Code", "Monaco", "Menlo", "Ubuntu Mono", monospace',
            fontWeight: 400
          }}
        />
      </Paper>
    </Box>
  );
} 