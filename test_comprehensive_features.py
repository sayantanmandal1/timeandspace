#!/usr/bin/env python3
"""
Comprehensive Test Suite for DSA Code Analysis Platform
Tests all major features and ensures robustness
"""

import asyncio
import json
import sys
import time
from pathlib import Path
from typing import Dict, Any, List

# Add backend to path
sys.path.append(str(Path(__file__).parent / "backend"))

try:
    import requests
    import pytest
    from fastapi.testclient import TestClient
    from backend.main import app
    from backend.app.core.config import settings
except ImportError as e:
    print(f"❌ Missing dependencies: {e}")
    print("Please install: pip install requests pytest fastapi")
    sys.exit(1)

class TestDSAPlatform:
    """Comprehensive test suite for DSA Platform"""
    
    def __init__(self):
        self.client = TestClient(app)
        self.base_url = "http://localhost:8000"
        self.api_url = f"{self.base_url}/api/v1"
        self.test_results = []
        
    def log_test(self, test_name: str, success: bool, details: str = ""):
        """Log test results"""
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} {test_name}")
        if details:
            print(f"   {details}")
        self.test_results.append({
            "test": test_name,
            "success": success,
            "details": details
        })
        
    def test_health_endpoints(self):
        """Test all health endpoints"""
        print("\n🏥 Testing Health Endpoints...")
        
        # Test basic health
        try:
            response = self.client.get("/health")
            assert response.status_code == 200
            data = response.json()
            assert "status" in data
            assert "version" in data
            self.log_test("Basic Health Check", True)
        except Exception as e:
            self.log_test("Basic Health Check", False, str(e))
            
        # Test API health
        try:
            response = self.client.get(f"{self.api_url}/health/")
            assert response.status_code == 200
            self.log_test("API Health Check", True)
        except Exception as e:
            self.log_test("API Health Check", False, str(e))
            
        # Test detailed health
        try:
            response = self.client.get(f"{self.api_url}/health/detailed")
            assert response.status_code == 200
            self.log_test("Detailed Health Check", True)
        except Exception as e:
            self.log_test("Detailed Health Check", False, str(e))
            
    def test_language_endpoints(self):
        """Test language support endpoints"""
        print("\n🌐 Testing Language Support...")
        
        # Test supported languages
        try:
            response = self.client.get(f"{self.api_url}/languages/supported")
            assert response.status_code == 200
            data = response.json()
            assert isinstance(data, dict)
            assert "python" in data
            self.log_test("Supported Languages", True, f"Found {len(data)} languages")
        except Exception as e:
            self.log_test("Supported Languages", False, str(e))
            
        # Test specific language info
        try:
            response = self.client.get(f"{self.api_url}/languages/python")
            assert response.status_code == 200
            data = response.json()
            assert "extensions" in data
            assert "executor" in data
            self.log_test("Python Language Info", True)
        except Exception as e:
            self.log_test("Python Language Info", False, str(e))
            
    def test_analysis_endpoints(self):
        """Test code analysis endpoints"""
        print("\n🔍 Testing Code Analysis...")
        
        test_code = """
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

print(fibonacci(10))
"""
        
        # Test basic analysis
        try:
            response = self.client.post(
                f"{self.api_url}/analysis/analyze",
                json={
                    "code": test_code,
                    "language": "python",
                    "analysis_type": "basic"
                }
            )
            assert response.status_code == 200
            data = response.json()
            assert "analysis_id" in data
            self.log_test("Basic Code Analysis", True)
        except Exception as e:
            self.log_test("Basic Code Analysis", False, str(e))
            
        # Test AST analysis
        try:
            response = self.client.post(
                f"{self.api_url}/analysis/analyze",
                json={
                    "code": test_code,
                    "language": "python",
                    "analysis_type": "ast"
                }
            )
            assert response.status_code == 200
            data = response.json()
            assert "analysis_id" in data
            self.log_test("AST Analysis", True)
        except Exception as e:
            self.log_test("AST Analysis", False, str(e))
            
        # Test complexity analysis
        try:
            response = self.client.post(
                f"{self.api_url}/analysis/analyze",
                json={
                    "code": test_code,
                    "language": "python",
                    "analysis_type": "complexity"
                }
            )
            assert response.status_code == 200
            data = response.json()
            assert "analysis_id" in data
            self.log_test("Complexity Analysis", True)
        except Exception as e:
            self.log_test("Complexity Analysis", False, str(e))
            
    def test_execution_endpoints(self):
        """Test code execution endpoints"""
        print("\n⚡ Testing Code Execution...")
        
        test_code = """
def hello_world():
    return "Hello, World!"

result = hello_world()
print(result)
"""
        
        # Test code execution
        try:
            response = self.client.post(
                f"{self.api_url}/execution/execute",
                json={
                    "code": test_code,
                    "language": "python",
                    "input_data": "",
                    "timeout": 30
                }
            )
            assert response.status_code == 200
            data = response.json()
            assert "execution_id" in data
            self.log_test("Code Execution", True)
        except Exception as e:
            self.log_test("Code Execution", False, str(e))
            
        # Test code testing
        try:
            response = self.client.post(
                f"{self.api_url}/execution/test",
                json={
                    "code": test_code,
                    "language": "python",
                    "test_cases": [
                        {"input": "", "expected_output": "Hello, World!"}
                    ]
                }
            )
            assert response.status_code == 200
            data = response.json()
            assert "test_results" in data
            self.log_test("Code Testing", True)
        except Exception as e:
            self.log_test("Code Testing", False, str(e))
            
    def test_optimization_endpoints(self):
        """Test optimization endpoints"""
        print("\n🚀 Testing Code Optimization...")
        
        test_code = """
def slow_fibonacci(n):
    if n <= 1:
        return n
    return slow_fibonacci(n-1) + slow_fibonacci(n-2)
"""
        
        # Test optimization suggestions
        try:
            response = self.client.post(
                f"{self.api_url}/optimization/suggest",
                json={
                    "code": test_code,
                    "language": "python",
                    "optimization_type": "performance"
                }
            )
            assert response.status_code == 200
            data = response.json()
            assert "suggestions" in data
            self.log_test("Optimization Suggestions", True)
        except Exception as e:
            self.log_test("Optimization Suggestions", False, str(e))
            
    def test_batch_endpoints(self):
        """Test batch processing endpoints"""
        print("\n📦 Testing Batch Processing...")
        
        test_files = [
            {
                "filename": "test1.py",
                "code": "print('Hello from file 1')"
            },
            {
                "filename": "test2.py", 
                "code": "print('Hello from file 2')"
            }
        ]
        
        # Test batch analysis
        try:
            response = self.client.post(
                f"{self.api_url}/analysis/batch-analyze",
                json={
                    "files": test_files,
                    "analysis_type": "basic"
                }
            )
            assert response.status_code == 200
            data = response.json()
            assert "batch_id" in data
            self.log_test("Batch Analysis", True)
        except Exception as e:
            self.log_test("Batch Analysis", False, str(e))
            
    def test_error_handling(self):
        """Test error handling and edge cases"""
        print("\n🛡️ Testing Error Handling...")
        
        # Test invalid code
        try:
            response = self.client.post(
                f"{self.api_url}/analysis/analyze",
                json={
                    "code": "invalid python code {",
                    "language": "python"
                }
            )
            # Should handle gracefully
            assert response.status_code in [200, 400, 422]
            self.log_test("Invalid Code Handling", True)
        except Exception as e:
            self.log_test("Invalid Code Handling", False, str(e))
            
        # Test unsupported language
        try:
            response = self.client.post(
                f"{self.api_url}/analysis/analyze",
                json={
                    "code": "print('test')",
                    "language": "unsupported_lang"
                }
            )
            # Should handle gracefully
            assert response.status_code in [200, 400, 422]
            self.log_test("Unsupported Language Handling", True)
        except Exception as e:
            self.log_test("Unsupported Language Handling", False, str(e))
            
        # Test missing parameters
        try:
            response = self.client.post(
                f"{self.api_url}/analysis/analyze",
                json={}
            )
            # Should return validation error
            assert response.status_code == 422
            self.log_test("Missing Parameters Handling", True)
        except Exception as e:
            self.log_test("Missing Parameters Handling", False, str(e))
            
    def test_performance(self):
        """Test performance and response times"""
        print("\n⚡ Testing Performance...")
        
        test_code = "print('Performance test')"
        
        # Test response time
        try:
            start_time = time.time()
            response = self.client.post(
                f"{self.api_url}/analysis/analyze",
                json={
                    "code": test_code,
                    "language": "python"
                }
            )
            end_time = time.time()
            response_time = end_time - start_time
            
            assert response.status_code == 200
            assert response_time < 5.0  # Should respond within 5 seconds
            
            self.log_test("Response Time", True, f"Response time: {response_time:.2f}s")
        except Exception as e:
            self.log_test("Response Time", False, str(e))
            
    def test_frontend_connectivity(self):
        """Test frontend connectivity"""
        print("\n🌐 Testing Frontend Connectivity...")
        
        try:
            # Test if frontend can reach backend
            response = requests.get(f"{self.base_url}/health", timeout=5)
            assert response.status_code == 200
            self.log_test("Frontend-Backend Connectivity", True)
        except Exception as e:
            self.log_test("Frontend-Backend Connectivity", False, str(e))
            
    def run_all_tests(self):
        """Run all tests"""
        print("🧪 Starting Comprehensive Test Suite")
        print("=" * 50)
        
        self.test_health_endpoints()
        self.test_language_endpoints()
        self.test_analysis_endpoints()
        self.test_execution_endpoints()
        self.test_optimization_endpoints()
        self.test_batch_endpoints()
        self.test_error_handling()
        self.test_performance()
        self.test_frontend_connectivity()
        
        # Summary
        print("\n" + "=" * 50)
        print("📊 Test Summary")
        print("=" * 50)
        
        total_tests = len(self.test_results)
        passed_tests = sum(1 for result in self.test_results if result["success"])
        failed_tests = total_tests - passed_tests
        
        print(f"Total Tests: {total_tests}")
        print(f"✅ Passed: {passed_tests}")
        print(f"❌ Failed: {failed_tests}")
        print(f"Success Rate: {(passed_tests/total_tests)*100:.1f}%")
        
        if failed_tests > 0:
            print("\n❌ Failed Tests:")
            for result in self.test_results:
                if not result["success"]:
                    print(f"  - {result['test']}: {result['details']}")
                    
        return failed_tests == 0

def main():
    """Main test runner"""
    print("🚀 DSA Code Analysis Platform - Comprehensive Test Suite")
    print("=" * 60)
    
    # Check if backend is running
    try:
        response = requests.get("http://localhost:8000/health", timeout=5)
        if response.status_code != 200:
            print("❌ Backend is not running or not responding correctly")
            print("Please start the backend server first:")
            print("cd backend && python main.py")
            return False
    except Exception:
        print("❌ Cannot connect to backend server")
        print("Please start the backend server first:")
        print("cd backend && python main.py")
        return False
        
    # Run tests
    tester = TestDSAPlatform()
    success = tester.run_all_tests()
    
    if success:
        print("\n🎉 All tests passed! The platform is working correctly.")
    else:
        print("\n⚠️ Some tests failed. Please check the issues above.")
        
    return success

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1) 