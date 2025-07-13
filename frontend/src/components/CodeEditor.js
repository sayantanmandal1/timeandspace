import React, { useState, useEffect } from 'react';
import AceEditor from 'react-ace';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  CircularProgress,
} from '@mui/material';
import { languageExamples } from './languageExamples';

// Import Ace Editor themes
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/theme-tomorrow';
import 'ace-builds/src-noconflict/theme-twilight';
import 'ace-builds/src-noconflict/theme-solarized_dark';
import 'ace-builds/src-noconflict/theme-solarized_light';

// Import Ace Editor extensions
import 'ace-builds/src-noconflict/ext-language_tools';

// Dynamic mode loading function
const loadMode = async (modeName) => {
  try {
    // Validate mode name
    if (!modeName || typeof modeName !== 'string') {
      console.warn('Invalid mode name:', modeName);
      await import('ace-builds/src-noconflict/mode-text');
      return;
    }

    switch (modeName) {
      case 'python':
        await import('ace-builds/src-noconflict/mode-python');
        break;
      case 'javascript':
        await import('ace-builds/src-noconflict/mode-javascript');
        break;
      case 'java':
        await import('ace-builds/src-noconflict/mode-java');
        break;
      case 'c_cpp':
        await import('ace-builds/src-noconflict/mode-c_cpp');
        break;
      case 'php':
        await import('ace-builds/src-noconflict/mode-php');
        break;
      case 'sql':
        await import('ace-builds/src-noconflict/mode-sql');
        break;
      case 'html':
        await import('ace-builds/src-noconflict/mode-html');
        break;
      case 'css':
        await import('ace-builds/src-noconflict/mode-css');
        break;
      case 'typescript':
        await import('ace-builds/src-noconflict/mode-typescript');
        break;
      case 'csharp':
        await import('ace-builds/src-noconflict/mode-csharp');
        break;
      case 'golang':
        await import('ace-builds/src-noconflict/mode-golang');
        break;
      case 'rust':
        await import('ace-builds/src-noconflict/mode-rust');
        break;
      case 'ruby':
        await import('ace-builds/src-noconflict/mode-ruby');
        break;
      case 'scala':
        await import('ace-builds/src-noconflict/mode-scala');
        break;
      case 'kotlin':
        await import('ace-builds/src-noconflict/mode-kotlin');
        break;
      case 'swift':
        await import('ace-builds/src-noconflict/mode-swift');
        break;
      case 'haskell':
        await import('ace-builds/src-noconflict/mode-haskell');
        break;
      case 'clojure':
        await import('ace-builds/src-noconflict/mode-clojure');
        break;
      case 'perl':
        await import('ace-builds/src-noconflict/mode-perl');
        break;
      case 'lua':
        await import('ace-builds/src-noconflict/mode-lua');
        break;
      case 'assembly_x86':
        await import('ace-builds/src-noconflict/mode-assembly_x86');
        break;
      case 'json':
        await import('ace-builds/src-noconflict/mode-json');
        break;
      case 'text':
        await import('ace-builds/src-noconflict/mode-text');
        break;
      default:
        console.warn(`Unknown mode: ${modeName}, falling back to text mode`);
        await import('ace-builds/src-noconflict/mode-text');
    }
  } catch (error) {
    console.warn(`Failed to load mode: ${modeName}`, error);
    // Fallback to text mode
    try {
      await import('ace-builds/src-noconflict/mode-text');
    } catch (fallbackError) {
      console.error('Failed to load fallback text mode:', fallbackError);
    }
  }
};

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

  // Functional Languages
  haskell: 'haskell',
  clojure: 'clojure',

  // Scripting Languages
  perl: 'perl',
  lua: 'lua',

  // Assembly Languages
  assembly_x86: 'assembly_x86',

  // Configuration & Build
  json: 'json',

  // Fallback
  text: 'text',
};

const themes = [
  { value: 'monokai', label: 'Monokai (Dark)' },
  { value: 'github', label: 'GitHub (Light)' },
  { value: 'tomorrow', label: 'Tomorrow (Light)' },
  { value: 'twilight', label: 'Twilight (Dark)' },
  { value: 'solarized_dark', label: 'Solarized Dark' },
  { value: 'solarized_light', label: 'Solarized Light' },
];

export default function CodeEditor({
  value,
  onChange,
  language = 'python',
  height = '400px',
  width = '100%',
  showLanguageSelector = true,
  showThemeSelector = true,
  placeholder = 'Enter your code here...',
}) {
  // Validate and sanitize props
  const validLanguage =
    language && typeof language === 'string' ? language : 'python';
  const validHeight = height && typeof height === 'string' ? height : '400px';
  const validWidth = width && typeof width === 'string' ? width : '100%';
  const validPlaceholder =
    placeholder && typeof placeholder === 'string'
      ? placeholder
      : 'Enter your code here...';

  const [selectedLanguage, setSelectedLanguage] = useState(validLanguage);
  const [selectedTheme, setSelectedTheme] = useState('monokai');
  const [editorValue, setEditorValue] = useState(
    value || languageExamples[validLanguage] || ''
  );
  const [editorError, setEditorError] = useState(false);
  const [modeLoaded, setModeLoaded] = useState(false);

  useEffect(() => {
    if (value !== undefined) {
      setEditorValue(value);
    }
  }, [value]);

  useEffect(() => {
    if (validLanguage && languageExamples[validLanguage] && !value) {
      setEditorValue(languageExamples[validLanguage]);
    }
  }, [validLanguage, value]);

  // Load initial mode
  useEffect(() => {
    const loadInitialMode = async () => {
      try {
        const modeName = languageModes[selectedLanguage] || 'text';
        await loadMode(modeName);
        setModeLoaded(true);
      } catch (error) {
        console.error('Failed to load initial language mode:', error);
        setModeLoaded(true); // Still set to true to show fallback
      }
    };

    loadInitialMode();
  }, []); // Only run once on mount

  // Load mode when language changes
  useEffect(() => {
    const loadLanguageMode = async () => {
      setModeLoaded(false);
      try {
        const modeName = languageModes[selectedLanguage] || 'text';
        await loadMode(modeName);
        setModeLoaded(true);
      } catch (error) {
        console.error('Failed to load language mode:', error);
        setModeLoaded(true); // Still set to true to show fallback
      }
    };

    loadLanguageMode();
  }, [selectedLanguage]);

  const handleLanguageChange = (event) => {
    const newLanguage = event.target.value;
    // Validate the new language
    if (
      newLanguage &&
      typeof newLanguage === 'string' &&
      languageModes[newLanguage]
    ) {
      setSelectedLanguage(newLanguage);
      if (languageExamples[newLanguage] && !value) {
        setEditorValue(languageExamples[newLanguage]);
      }
      if (onChange) {
        onChange(languageExamples[newLanguage] || '');
      }
    } else {
      console.warn('Invalid language selected:', newLanguage);
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

  const getMode = (language) => {
    try {
      return languageModes[language] || 'text';
    } catch (error) {
      console.warn(`Failed to load mode for language: ${language}`, error);
      return 'text';
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
          border: '1px solid #e0e0e0',
        }}
      >
        {!editorError && modeLoaded ? (
          <AceEditor
            mode={getMode(selectedLanguage)}
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
              enableMultiselect: true,
              enableBlockSelect: true,
              enableAutoIndent: true,
            }}
            width={validWidth}
            height={validHeight}
            placeholder={validPlaceholder}
            style={{
              fontFamily:
                '"Fira Code", "Monaco", "Menlo", "Ubuntu Mono", monospace',
              fontWeight: 400,
            }}
            onLoad={(editor) => {
              // Successfully loaded
              setEditorError(false);
            }}
            onError={(error) => {
              console.error('Ace Editor error:', error);
              setEditorError(true);
            }}
          />
        ) : !modeLoaded ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: validHeight,
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <textarea
            value={editorValue}
            onChange={(e) => handleEditorChange(e.target.value)}
            placeholder={validPlaceholder}
            style={{
              width: validWidth,
              height: validHeight,
              fontFamily:
                '"Fira Code", "Monaco", "Menlo", "Ubuntu Mono", monospace',
              fontSize: '14px',
              border: 'none',
              outline: 'none',
              resize: 'none',
              padding: '10px',
              backgroundColor: '#272822',
              color: '#f8f8f2',
            }}
          />
        )}
      </Paper>
    </Box>
  );
}
