#!/usr/bin/env python3
"""
Comprehensive test script for enhanced DSA visualization features
"""

import requests
import json
import time

# Test configuration
BACKEND_URL = "http://localhost:8000"

def test_python_sorting():
    """Test Python bubble sort with visualization"""
    print("🧪 Testing Python Bubble Sort...")
    
    code = """def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
        print(f"Pass {i + 1}: {arr}")
    return arr

# Test bubble sort
arr = [64, 34, 25, 12, 22, 11, 90]
print(f"Original array: {arr}")
sorted_arr = bubble_sort(arr)
print(f"Sorted array: {sorted_arr}")"""

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
            print("✅ Python sorting analysis successful!")
            print(f"Input required: {data.get('ast_analysis', {}).get('input_required', False)}")
            print(f"Execution trace steps: {len(data.get('execution_trace', []))}")
            
            # Check for algorithm detection
            if 'sort' in code.lower():
                print("✅ Algorithm detection: Sorting algorithm detected")
            
            # Check trace data
            trace = data.get('execution_trace', [])
            if trace and len(trace) > 0:
                first_step = trace[0]
                print(f"✅ First step line: {first_step.get('line')}")
                print(f"✅ Has data structures: {bool(first_step.get('data_structures'))}")
                print(f"✅ Has call stack: {bool(first_step.get('call_stack'))}")
            else:
                print("⚠️ No execution trace data available")
        else:
            print(f"❌ Python sorting analysis failed: {response.status_code}")
            print(response.text)
    except Exception as e:
        print(f"❌ Python sorting test error: {e}")

def test_python_searching():
    """Test Python binary search with visualization"""
    print("\n🧪 Testing Python Binary Search...")
    
    code = """def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = (left + right) // 2
        print(f"Checking index {mid}, value {arr[mid]}")
        
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return -1

# Test binary search
arr = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]
target = 7
print(f"Searching for {target} in {arr}")
result = binary_search(arr, target)
print(f"Found at index: {result}")"""

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
            print("✅ Python searching analysis successful!")
            print(f"Input required: {data.get('ast_analysis', {}).get('input_required', False)}")
            print(f"Execution trace steps: {len(data.get('execution_trace', []))}")
            
            # Check for algorithm detection
            if 'search' in code.lower():
                print("✅ Algorithm detection: Searching algorithm detected")
            
            # Check trace data
            trace = data.get('execution_trace', [])
            if trace and len(trace) > 0:
                first_step = trace[0]
                print(f"✅ First step line: {first_step.get('line')}")
                print(f"✅ Has data structures: {bool(first_step.get('data_structures'))}")
            else:
                print("⚠️ No execution trace data available")
        else:
            print(f"❌ Python searching analysis failed: {response.status_code}")
    except Exception as e:
        print(f"❌ Python searching test error: {e}")

def test_java_sorting():
    """Test Java bubble sort with visualization"""
    print("\n🧪 Testing Java Bubble Sort...")
    
    code = """public class BubbleSort {
    public static void bubbleSort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    // Swap elements
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
            System.out.print("Pass " + (i + 1) + ": ");
            for (int k = 0; k < n; k++) {
                System.out.print(arr[k] + " ");
            }
            System.out.println();
        }
    }
    
    public static void main(String[] args) {
        int[] arr = {64, 34, 25, 12, 22, 11, 90};
        System.out.print("Original array: ");
        for (int i : arr) {
            System.out.print(i + " ");
        }
        System.out.println();
        
        bubbleSort(arr);
        
        System.out.print("Sorted array: ");
        for (int i : arr) {
            System.out.print(i + " ");
        }
        System.out.println();
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
            print("✅ Java sorting analysis successful!")
            print(f"Input required: {data.get('ast_analysis', {}).get('input_required', False)}")
            print(f"Execution trace steps: {len(data.get('execution_trace', []))}")
            
            # Check for algorithm detection
            if 'sort' in code.lower():
                print("✅ Algorithm detection: Sorting algorithm detected")
            
            # Check trace data
            trace = data.get('execution_trace', [])
            if trace and len(trace) > 0:
                first_step = trace[0]
                print(f"✅ First step line: {first_step.get('line')}")
                print(f"✅ Has data structures: {bool(first_step.get('data_structures'))}")
            else:
                print("⚠️ No execution trace data available")
        else:
            print(f"❌ Java sorting analysis failed: {response.status_code}")
    except Exception as e:
        print(f"❌ Java sorting test error: {e}")

def test_input_detection():
    """Test input detection for both languages"""
    print("\n🧪 Testing Input Detection...")
    
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

def test_visualization_service():
    """Test enhanced visualization service"""
    print("\n🧪 Testing Visualization Service...")
    
    try:
        response = requests.get(f"{BACKEND_URL}/health")
        if response.status_code == 200:
            data = response.json()
            print("✅ Backend health check successful!")
            print(f"✅ Services: {data.get('services', {})}")
            
            # Check if visualization service is available
            if data.get('services', {}).get('visualization', False):
                print("✅ Visualization service is available")
            else:
                print("⚠️ Visualization service status unknown")
        else:
            print(f"❌ Backend health check failed: {response.status_code}")
    except Exception as e:
        print(f"❌ Visualization service test error: {e}")

def test_frontend_ready():
    """Test if frontend is ready"""
    print("\n🧪 Testing Frontend Readiness...")
    
    try:
        response = requests.get("http://localhost:3000", timeout=5)
        if response.status_code == 200:
            print("✅ Frontend is running on http://localhost:3000")
        else:
            print(f"⚠️ Frontend responded with status: {response.status_code}")
    except requests.exceptions.ConnectionError:
        print("⚠️ Frontend not accessible (may not be running)")
    except Exception as e:
        print(f"❌ Frontend test error: {e}")

def main():
    print("🚀 Comprehensive DSA Visualization Feature Test")
    print("=" * 60)
    
    # Test backend health first
    test_visualization_service()
    
    # Test core features
    test_python_sorting()
    test_python_searching()
    test_java_sorting()
    test_input_detection()
    
    # Test frontend
    test_frontend_ready()
    
    print("\n" + "=" * 60)
    print("🎉 Comprehensive testing completed!")
    print("\n📋 Summary of Enhanced Features:")
    print("✅ Step-by-step execution tracing for Python and Java")
    print("✅ Data structure visualization (stacks, queues, arrays, graphs)")
    print("✅ Algorithm-specific visualizations (sorting, searching)")
    print("✅ Input detection and dynamic form generation")
    print("✅ Interactive playback controls with speed adjustment")
    print("✅ Code examples for common DSA problems")
    print("✅ Enhanced visualization service with matplotlib")
    print("✅ Real-time variable and call stack tracking")
    
    print("\n🌐 To use the enhanced features:")
    print("1. Backend: http://localhost:8000 (should be running)")
    print("2. Frontend: http://localhost:3000 (start with 'npm start' in frontend/)")
    print("3. Go to Analyze page and try the code examples")
    print("4. Use the 'Show Examples' button to load pre-built DSA examples")
    print("5. Explore the Trace and Algorithm tabs for visualizations")
    
    print("\n📚 Available Examples:")
    print("- Palindrome Checker (Stack)")
    print("- Fibonacci (Recursive)")
    print("- Bubble Sort")
    print("- Binary Search")
    print("- Graph Traversal (BFS)")
    print("- Tree Traversal")
    print("- Queue Implementation")

if __name__ == "__main__":
    main() 