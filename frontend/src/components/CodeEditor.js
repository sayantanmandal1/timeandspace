import React, { useState, useEffect } from 'react';
import AceEditor from 'react-ace';
import { Box, Typography, FormControl, InputLabel, Select, MenuItem, Paper } from '@mui/material';

// Import Ace Editor modes for different languages
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/mode-csharp';
import 'ace-builds/src-noconflict/mode-go';
import 'ace-builds/src-noconflict/mode-rust';
import 'ace-builds/src-noconflict/mode-php';
import 'ace-builds/src-noconflict/mode-ruby';
import 'ace-builds/src-noconflict/mode-sql';
import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/mode-css';
import 'ace-builds/src-noconflict/mode-typescript';

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
  python: 'python',
  javascript: 'javascript',
  java: 'java',
  cpp: 'c_cpp',
  c: 'c_cpp',
  csharp: 'csharp',
  go: 'go',
  rust: 'rust',
  php: 'php',
  ruby: 'ruby',
  sql: 'sql',
  html: 'html',
  css: 'css',
  typescript: 'typescript'
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

const languageExamples = {
  python: `def fibonacci(n):
    """Calculate the nth Fibonacci number"""
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

def bubble_sort(arr):
    """Sort array using bubble sort algorithm"""
    n = len(arr)
    for i in range(n):
        for j in range(0, n-i-1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
    return arr

# Example usage
print(fibonacci(10))
print(bubble_sort([64, 34, 25, 12, 22, 11, 90]))`,
  
  javascript: `function fibonacci(n) {
    // Calculate the nth Fibonacci number
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

function bubbleSort(arr) {
    // Sort array using bubble sort algorithm
    const n = arr.length;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return arr;
}

// Example usage
console.log(fibonacci(10));
console.log(bubbleSort([64, 34, 25, 12, 22, 11, 90]));`,
  
  java: `public class Algorithms {
    // Calculate the nth Fibonacci number
    public static int fibonacci(int n) {
        if (n <= 1) return n;
        return fibonacci(n - 1) + fibonacci(n - 2);
    }
    
    // Sort array using bubble sort algorithm
    public static void bubbleSort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
    }
    
    public static void main(String[] args) {
        System.out.println(fibonacci(10));
        int[] arr = {64, 34, 25, 12, 22, 11, 90};
        bubbleSort(arr);
        for (int num : arr) {
            System.out.print(num + " ");
        }
    }
}`,
  
  cpp: `#include <iostream>
#include <vector>
using namespace std;

// Calculate the nth Fibonacci number
int fibonacci(int n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

// Sort array using bubble sort algorithm
void bubbleSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
            }
        }
    }
}

int main() {
    cout << fibonacci(10) << endl;
    vector<int> arr = {64, 34, 25, 12, 22, 11, 90};
    bubbleSort(arr);
    for (int num : arr) {
        cout << num << " ";
    }
    return 0;
}`,
  
  c: `#include <stdio.h>

// Calculate the nth Fibonacci number
int fibonacci(int n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

// Sort array using bubble sort algorithm
void bubbleSort(int arr[], int n) {
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}

int main() {
    printf("%d\\n", fibonacci(10));
    int arr[] = {64, 34, 25, 12, 22, 11, 90};
    int n = sizeof(arr) / sizeof(arr[0]);
    bubbleSort(arr, n);
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    return 0;
}`,
  
  go: `package main

import "fmt"

// Calculate the nth Fibonacci number
func fibonacci(n int) int {
    if n <= 1 {
        return n
    }
    return fibonacci(n-1) + fibonacci(n-2)
}

// Sort array using bubble sort algorithm
func bubbleSort(arr []int) []int {
    n := len(arr)
    for i := 0; i < n; i++ {
        for j := 0; j < n-i-1; j++ {
            if arr[j] > arr[j+1] {
                arr[j], arr[j+1] = arr[j+1], arr[j]
            }
        }
    }
    return arr
}

func main() {
    fmt.Println(fibonacci(10))
    arr := []int{64, 34, 25, 12, 22, 11, 90}
    bubbleSort(arr)
    fmt.Println(arr)
}`,
  
  rust: `fn fibonacci(n: u32) -> u32 {
    // Calculate the nth Fibonacci number
    if n <= 1 {
        return n;
    }
    fibonacci(n - 1) + fibonacci(n - 2)
}

fn bubble_sort(arr: &mut [i32]) {
    // Sort array using bubble sort algorithm
    let n = arr.len();
    for i in 0..n {
        for j in 0..n - i - 1 {
            if arr[j] > arr[j + 1] {
                arr.swap(j, j + 1);
            }
        }
    }
}

fn main() {
    println!("{}", fibonacci(10));
    let mut arr = [64, 34, 25, 12, 22, 11, 90];
    bubble_sort(&mut arr);
    println!("{:?}", arr);
}`,
  
  php: `<?php

// Calculate the nth Fibonacci number
function fibonacci($n) {
    if ($n <= 1) return $n;
    return fibonacci($n - 1) + fibonacci($n - 2);
}

// Sort array using bubble sort algorithm
function bubbleSort(&$arr) {
    $n = count($arr);
    for ($i = 0; $i < $n; $i++) {
        for ($j = 0; $j < $n - $i - 1; $j++) {
            if ($arr[$j] > $arr[$j + 1]) {
                $temp = $arr[$j];
                $arr[$j] = $arr[$j + 1];
                $arr[$j + 1] = $temp;
            }
        }
    }
}

// Example usage
echo fibonacci(10) . "\\n";
$arr = [64, 34, 25, 12, 22, 11, 90];
bubbleSort($arr);
echo implode(" ", $arr) . "\\n";

?>`,
  
  ruby: `# Calculate the nth Fibonacci number
def fibonacci(n)
  return n if n <= 1
  fibonacci(n - 1) + fibonacci(n - 2)
end

# Sort array using bubble sort algorithm
def bubble_sort(arr)
  n = arr.length
  (0...n).each do |i|
    (0...n - i - 1).each do |j|
      if arr[j] > arr[j + 1]
        arr[j], arr[j + 1] = arr[j + 1], arr[j]
      end
    end
  end
  arr
end

# Example usage
puts fibonacci(10)
puts bubble_sort([64, 34, 25, 12, 22, 11, 90]).join(" ")`,
  
  sql: `-- Create a table for storing numbers
CREATE TABLE numbers (
    id INT PRIMARY KEY,
    value INT NOT NULL
);

-- Insert sample data
INSERT INTO numbers (id, value) VALUES 
(1, 64), (2, 34), (3, 25), (4, 12), (5, 22), (6, 11), (7, 90);

-- Sort numbers in ascending order
SELECT value 
FROM numbers 
ORDER BY value ASC;

-- Find the maximum value
SELECT MAX(value) as max_value FROM numbers;

-- Find the minimum value
SELECT MIN(value) as min_value FROM numbers;

-- Calculate average
SELECT AVG(value) as average_value FROM numbers;`,
  
  html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DSA Code Analysis</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
            background-color: #f5f5f5;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .algorithm {
            margin: 20px 0;
            padding: 15px;
            border: 1px solid #ddd;
            border-radius: 5px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Data Structures & Algorithms</h1>
        
        <div class="algorithm">
            <h2>Fibonacci Sequence</h2>
            <p>Calculate the nth Fibonacci number</p>
            <pre><code>function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n-1) + fibonacci(n-2);
}</code></pre>
        </div>
        
        <div class="algorithm">
            <h2>Bubble Sort</h2>
            <p>Sort an array using bubble sort algorithm</p>
            <pre><code>function bubbleSort(arr) {
    const n = arr.length;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n-i-1; j++) {
            if (arr[j] > arr[j+1]) {
                [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
            }
        }
    }
    return arr;
}</code></pre>
        </div>
    </div>
</body>
</html>`,
  
  css: `/* Modern CSS for DSA Code Analysis Platform */

/* Reset and base styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    line-height: 1.6;
    color: #333;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
}

/* Container styles */
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

/* Card styles */
.card {
    background: white;
    border-radius: 12px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.1);
    padding: 24px;
    margin: 16px 0;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 40px rgba(0,0,0,0.15);
}

/* Button styles */
.btn {
    background: linear-gradient(45deg, #667eea, #764ba2);
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.2s ease;
}

.btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

/* Code editor styles */
.code-editor {
    border: 2px solid #e1e5e9;
    border-radius: 8px;
    overflow: hidden;
    background: #1e1e1e;
}

/* Responsive design */
@media (max-width: 768px) {
    .container {
        padding: 10px;
    }
    
    .card {
        padding: 16px;
        margin: 8px 0;
    }
}`,
  
  typescript: `// TypeScript implementation of common algorithms

interface SortableArray<T> {
    data: T[];
    length: number;
}

// Calculate the nth Fibonacci number
function fibonacci(n: number): number {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

// Sort array using bubble sort algorithm
function bubbleSort<T extends number>(arr: T[]): T[] {
    const n = arr.length;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return arr;
}

// Binary search implementation
function binarySearch<T>(arr: T[], target: T): number {
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (arr[mid] === target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}

// Example usage
console.log(fibonacci(10));
console.log(bubbleSort([64, 34, 25, 12, 22, 11, 90]));
console.log(binarySearch([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 7));`
};

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
              <MenuItem value="go">Go</MenuItem>
              <MenuItem value="rust">Rust</MenuItem>
              <MenuItem value="php">PHP</MenuItem>
              <MenuItem value="ruby">Ruby</MenuItem>
              <MenuItem value="sql">SQL</MenuItem>
              <MenuItem value="html">HTML</MenuItem>
              <MenuItem value="css">CSS</MenuItem>
              <MenuItem value="typescript">TypeScript</MenuItem>
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