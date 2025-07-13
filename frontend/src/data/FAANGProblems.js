const FAANGProblems = [
  {
    title: 'Palindrome Checker (Stack)',
    description:
      'Check if a string is a palindrome using a stack. Classic interview question for string/data structure understanding.',
    difficulty: 'Easy',
    language: 'python',
    code: `def is_palindrome(s):
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
test_string = "A man, a plan, a canal: Panama"
result = is_palindrome(test_string)
print(f"'{test_string}' is palindrome: {result}")`,
  },
  {
    title: 'Two Sum',
    description:
      'Find indices of two numbers that add up to a target. Common in FAANG phone screens.',
    difficulty: 'Easy',
    language: 'python',
    code: `def two_sum(nums, target):
    lookup = {}
    for i, num in enumerate(nums):
        if target - num in lookup:
            return [lookup[target - num], i]
        lookup[num] = i
    return []

# Test
nums = [2, 7, 11, 15]
target = 9
result = two_sum(nums, target)
print(f"Indices for target {target}: {result}")`,
  },
  {
    title: 'Binary Search',
    description:
      'Efficiently search a sorted array. Classic algorithm question.',
    difficulty: 'Medium',
    language: 'python',
    code: `def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return -1

# Test
arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
target = 7
result = binary_search(arr, target)
print(f"Target {target} found at index: {result}")`,
  },
  {
    title: 'BFS on Graph',
    description:
      'Breadth-first search traversal of a graph. Key for graph questions.',
    difficulty: 'Medium',
    language: 'python',
    code: `from collections import deque

def bfs(graph, start):
    visited = set()
    queue = deque([start])
    order = []
    
    while queue:
        node = queue.popleft()
        if node not in visited:
            visited.add(node)
            order.append(node)
            queue.extend(graph[node])
    
    return order

# Test
graph = {0: [1, 2], 1: [2], 2: [0, 3], 3: [3]}
start_node = 2
result = bfs(graph, start_node)
print(f"BFS traversal from node {start_node}: {result}")`,
  },
  {
    title: 'Bubble Sort',
    description:
      'Simple sorting algorithm. Good for understanding sorting concepts.',
    difficulty: 'Easy',
    language: 'python',
    code: `def bubble_sort(arr):
    n = len(arr)
    
    for i in range(n):
        swapped = False
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        
        if not swapped:
            break
    
    return arr

# Test
arr = [64, 34, 25, 12, 22, 11, 90]
sorted_arr = bubble_sort(arr.copy())
print(f"Original: {arr}")
print(f"Sorted: {sorted_arr}")`,
  },
  {
    title: 'Fibonacci with Memoization',
    description:
      'Dynamic programming example with memoization. Common optimization question.',
    difficulty: 'Medium',
    language: 'python',
    code: `def fibonacci(n, memo={}):
    if n in memo:
        return memo[n]
    
    if n <= 1:
        return n
    
    memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo)
    return memo[n]

# Test
n = 10
result = fibonacci(n)
print(f"Fibonacci({n}) = {result}")`,
  },
  {
    title: 'Palindrome Checker (Stack)',
    description: 'Check if a string is a palindrome using a stack in Java.',
    difficulty: 'Easy',
    language: 'java',
    code: `import java.util.*;

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
        String testString = "A man, a plan, a canal: Panama";
        boolean result = isPalindrome(testString);
        System.out.println("'" + testString + "' is palindrome: " + result);
    }
}`,
  },
  {
    title: 'Two Sum',
    description: 'Find indices of two numbers that add up to a target in Java.',
    difficulty: 'Easy',
    language: 'java',
    code: `import java.util.*;

public class TwoSum {
    public static int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> lookup = new HashMap<>();
        
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (lookup.containsKey(complement)) {
                return new int[]{lookup.get(complement), i};
            }
            lookup.put(nums[i], i);
        }
        
        return new int[]{};
    }
    
    public static void main(String[] args) {
        int[] nums = {2, 7, 11, 15};
        int target = 9;
        int[] result = twoSum(nums, target);
        System.out.println("Indices for target " + target + ": [" + result[0] + ", " + result[1] + "]");
    }
}`,
  },
  {
    title: 'Binary Search',
    description: 'Efficiently search a sorted array in Java.',
    difficulty: 'Medium',
    language: 'java',
    code: `public class BinarySearch {
    public static int binarySearch(int[] arr, int target) {
        int left = 0;
        int right = arr.length - 1;
        
        while (left <= right) {
            int mid = left + (right - left) / 2;
            
            if (arr[mid] == target) {
                return mid;
            } else if (arr[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        
        return -1;
    }
    
    public static void main(String[] args) {
        int[] arr = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
        int target = 7;
        int result = binarySearch(arr, target);
        System.out.println("Target " + target + " found at index: " + result);
    }
}`,
  },
  {
    title: 'Bubble Sort',
    description: 'Simple sorting algorithm implementation in Java.',
    difficulty: 'Easy',
    language: 'java',
    code: `import java.util.Arrays;

public class BubbleSort {
    public static void bubbleSort(int[] arr) {
        int n = arr.length;
        
        for (int i = 0; i < n; i++) {
            boolean swapped = false;
            
            for (int j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    // Swap elements
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                    swapped = true;
                }
            }
            
            if (!swapped) {
                break;
            }
        }
    }
    
    public static void main(String[] args) {
        int[] arr = {64, 34, 25, 12, 22, 11, 90};
        System.out.println("Original array: " + Arrays.toString(arr));
        
        bubbleSort(arr);
        System.out.println("Sorted array: " + Arrays.toString(arr));
    }
}`,
  },
  {
    title: 'Quick Sort',
    description: 'Efficient sorting algorithm in JavaScript.',
    difficulty: 'Medium',
    language: 'javascript',
    code: `function quickSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }
    
    const pivot = arr[Math.floor(arr.length / 2)];
    const left = arr.filter(x => x < pivot);
    const middle = arr.filter(x => x === pivot);
    const right = arr.filter(x => x > pivot);
    
    return [...quickSort(left), ...middle, ...quickSort(right)];
}

// Test
const arr = [64, 34, 25, 12, 22, 11, 90];
console.log("Original:", arr);
console.log("Sorted:", quickSort(arr));`,
  },
  {
    title: 'Binary Tree Traversal',
    description: 'Tree traversal algorithms in JavaScript.',
    difficulty: 'Medium',
    language: 'javascript',
    code: `class TreeNode {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

function inorderTraversal(root) {
    const result = [];
    
    function inorder(node) {
        if (node) {
            inorder(node.left);
            result.push(node.val);
            inorder(node.right);
        }
    }
    
    inorder(root);
    return result;
}

// Test
const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
root.left.right = new TreeNode(5);

console.log("Inorder traversal:", inorderTraversal(root));`,
  },
  {
    title: 'Merge Sort',
    description: 'Divide and conquer sorting algorithm in C++.',
    difficulty: 'Medium',
    language: 'cpp',
    code: `#include <iostream>
#include <vector>
using namespace std;

void merge(vector<int>& arr, int left, int mid, int right) {
    vector<int> temp(right - left + 1);
    int i = left, j = mid + 1, k = 0;
    
    while (i <= mid && j <= right) {
        if (arr[i] <= arr[j]) {
            temp[k++] = arr[i++];
        } else {
            temp[k++] = arr[j++];
        }
    }
    
    while (i <= mid) {
        temp[k++] = arr[i++];
    }
    
    while (j <= right) {
        temp[k++] = arr[j++];
    }
    
    for (i = 0; i < k; i++) {
        arr[left + i] = temp[i];
    }
}

void mergeSort(vector<int>& arr, int left, int right) {
    if (left < right) {
        int mid = left + (right - left) / 2;
        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);
        merge(arr, left, mid, right);
    }
}

int main() {
    vector<int> arr = {64, 34, 25, 12, 22, 11, 90};
    cout << "Original array: ";
    for (int num : arr) cout << num << " ";
    cout << endl;
    
    mergeSort(arr, 0, arr.size() - 1);
    
    cout << "Sorted array: ";
    for (int num : arr) cout << num << " ";
    cout << endl;
    
    return 0;
}`,
  },
];

export default FAANGProblems; 