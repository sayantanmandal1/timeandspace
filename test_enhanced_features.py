#!/usr/bin/env python3
"""
Test script for enhanced Python and Java execution tracing features
"""

import requests
import json

# Test configuration
BACKEND_URL = "http://localhost:8000"

def test_python_palindrome():
    """Test Python palindrome checker with step-by-step tracing"""
    print("Testing Python palindrome checker...")
    
    code = """def is_palindrome(s):
    # Remove non-alphanumeric characters and convert to lowercase
    s = ''.join(c.lower() for c in s if c.isalnum())
    
    # Use stack to check palindrome
    stack = []
    n = len(s)
    
    # Push first half of characters onto stack
    for i in range(n // 2):
        stack.append(s[i])
    
    # Compare with second half
    start = n // 2 + (1 if n % 2 == 1 else 0)
    for i in range(start, n):
        if stack.pop() != s[i]:
            return False
    
    return True

# Test the function
test_string = "racecar"
result = is_palindrome(test_string)
print(f"'{test_string}' is palindrome: {result}")"""

    payload = {
        "code": code,
        "language": "python",
        "input_data": [],
        "analysis_type": "full"
    }
    
    try:
        response = requests.post(f"{BACKEND_URL}/api/v1/analysis/analyze", json=payload)
        if response.status_code == 200:
            data = response.json()
            print("✅ Python analysis successful!")
            print(f"Input required: {data.get('ast_analysis', {}).get('input_required', False)}")
            print(f"Execution trace steps: {len(data.get('execution_trace', []))}")
            
            # Check if we have detailed trace data
            trace = data.get('execution_trace', [])
            if trace and len(trace) > 0:
                first_step = trace[0]
                print(f"First step line: {first_step.get('line')}")
                print(f"Has data structures: {bool(first_step.get('data_structures'))}")
                print(f"Has call stack: {bool(first_step.get('call_stack'))}")
            else:
                print("No execution trace data available")
        else:
            print(f"❌ Python analysis failed: {response.status_code}")
            print(response.text)
    except Exception as e:
        print(f"❌ Python test error: {e}")
        import traceback
        traceback.print_exc()

def test_java_palindrome():
    """Test Java palindrome checker with step-by-step tracing"""
    print("\nTesting Java palindrome checker...")
    
    code = """import java.util.*;

public class PalindromeChecker {
    public static boolean isPalindrome(String s) {
        // Remove non-alphanumeric characters and convert to lowercase
        s = s.replaceAll("[^a-zA-Z0-9]", "").toLowerCase();
        
        // Use stack to check palindrome
        Stack<Character> stack = new Stack<>();
        int n = s.length();
        
        // Push first half of characters onto stack
        for (int i = 0; i < n / 2; i++) {
            stack.push(s.charAt(i));
        }
        
        // Compare with second half
        int start = n / 2 + (n % 2 == 1 ? 1 : 0);
        for (int i = start; i < n; i++) {
            if (stack.pop() != s.charAt(i)) {
                return false;
            }
        }
        
        return true;
    }
    
    public static void main(String[] args) {
        String testString = "racecar";
        boolean result = isPalindrome(testString);
        System.out.println("'" + testString + "' is palindrome: " + result);
    }
}"""

    payload = {
        "code": code,
        "language": "java",
        "input_data": [],
        "analysis_type": "full"
    }
    
    try:
        response = requests.post(f"{BACKEND_URL}/api/v1/analysis/analyze", json=payload)
        if response.status_code == 200:
            data = response.json()
            print("✅ Java analysis successful!")
            print(f"Input required: {data.get('ast_analysis', {}).get('input_required', False)}")
            print(f"Execution trace steps: {len(data.get('execution_trace', []))}")
            
            # Check if we have detailed trace data
            trace = data.get('execution_trace', [])
            if trace and len(trace) > 0:
                first_step = trace[0]
                print(f"First step line: {first_step.get('line')}")
                print(f"Has data structures: {bool(first_step.get('data_structures'))}")
                print(f"Has call stack: {bool(first_step.get('call_stack'))}")
            else:
                print("No execution trace data available")
        else:
            print(f"❌ Java analysis failed: {response.status_code}")
            print(response.text)
    except Exception as e:
        print(f"❌ Java test error: {e}")
        import traceback
        traceback.print_exc()

def test_input_detection():
    """Test input detection for both languages"""
    print("\nTesting input detection...")
    
    # Python code with input
    python_code = """def greet(name):
    return f"Hello, {name}!"

name = input("Enter your name: ")
result = greet(name)
print(result)"""
    
    payload = {
        "code": python_code,
        "language": "python",
        "input_data": [],
        "analysis_type": "full"
    }
    
    try:
        response = requests.post(f"{BACKEND_URL}/api/v1/analysis/analyze", json=payload)
        if response.status_code == 200:
            data = response.json()
            print("✅ Python input detection successful!")
            print(f"Input required: {data.get('ast_analysis', {}).get('input_required', False)}")
            print(f"Input schema: {data.get('ast_analysis', {}).get('input_schema', [])}")
        else:
            print(f"❌ Python input detection failed: {response.status_code}")
    except Exception as e:
        print(f"❌ Python input detection error: {e}")

if __name__ == "__main__":
    print("🧪 Testing Enhanced DSA Visualization Features")
    print("=" * 50)
    
    test_python_palindrome()
    test_java_palindrome()
    test_input_detection()
    
    print("\n" + "=" * 50)
    print("🎉 Testing completed!")
    print("\nTo test the frontend:")
    print("1. Make sure the backend is running on http://localhost:8000")
    print("2. Make sure the frontend is running on http://localhost:3000")
    print("3. Open http://localhost:3000 in your browser")
    print("4. Go to the Analyze page and try the code examples") 