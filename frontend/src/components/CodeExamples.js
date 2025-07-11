import React from 'react';
import { Box, Typography, Card, CardContent, Button, Grid } from '@mui/material';

const examples = {
  python: {
    palindrome: {
      title: "Palindrome Checker (Stack)",
      description: "Check if a string is a palindrome using stack data structure",
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
print(f"'{test_string}' is palindrome: {result}")`
    },
    fibonacci: {
      title: "Fibonacci (Recursive)",
      description: "Calculate Fibonacci numbers using recursion",
      code: `def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

# Test the function
n = 10
result = fibonacci(n)
print(f"Fibonacci({n}) = {result}")`
    },
    graph: {
      title: "Graph Traversal (BFS)",
      description: "Breadth-first search on a graph",
      code: `from collections import defaultdict, deque

def bfs(graph, start):
    visited = set()
    queue = deque([start])
    visited.add(start)
    result = []
    
    while queue:
        vertex = queue.popleft()
        result.append(vertex)
        
        for neighbor in graph[vertex]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
    
    return result

# Create a sample graph
graph = defaultdict(list)
graph[0] = [1, 2]
graph[1] = [0, 3, 4]
graph[2] = [0, 5]
graph[3] = [1]
graph[4] = [1]
graph[5] = [2]

# Test BFS
result = bfs(graph, 0)
print(f"BFS traversal: {result}")`
    },
    sorting: {
      title: "Bubble Sort",
      description: "Simple sorting algorithm with step-by-step visualization",
      code: `def bubble_sort(arr):
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
print(f"Sorted array: {sorted_arr}")`
    },
    searching: {
      title: "Binary Search",
      description: "Efficient searching algorithm for sorted arrays",
      code: `def binary_search(arr, target):
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
print(f"Found at index: {result}")`
    },
    tree: {
      title: "Binary Tree Traversal",
      description: "In-order, pre-order, and post-order tree traversals",
      code: `class TreeNode:
    def __init__(self, val=0):
        self.val = val
        self.left = None
        self.right = None

def inorder_traversal(root):
    if root:
        inorder_traversal(root.left)
        print(root.val, end=" ")
        inorder_traversal(root.right)

def preorder_traversal(root):
    if root:
        print(root.val, end=" ")
        preorder_traversal(root.left)
        preorder_traversal(root.right)

def postorder_traversal(root):
    if root:
        postorder_traversal(root.left)
        postorder_traversal(root.right)
        print(root.val, end=" ")

# Create a sample tree
root = TreeNode(1)
root.left = TreeNode(2)
root.right = TreeNode(3)
root.left.left = TreeNode(4)
root.left.right = TreeNode(5)

print("In-order traversal:", end=" ")
inorder_traversal(root)
print()
print("Pre-order traversal:", end=" ")
preorder_traversal(root)
print()
print("Post-order traversal:", end=" ")
postorder_traversal(root)
print()`
    }
  },
  java: {
    palindrome: {
      title: "Palindrome Checker (Stack)",
      description: "Check if a string is a palindrome using Stack",
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
        String testString = "racecar";
        boolean result = isPalindrome(testString);
        System.out.println("'" + testString + "' is palindrome: " + result);
    }
}`
    },
    fibonacci: {
      title: "Fibonacci (Recursive)",
      description: "Calculate Fibonacci numbers using recursion",
      code: `public class Fibonacci {
    public static int fibonacci(int n) {
        if (n <= 1) {
            return n;
        }
        return fibonacci(n-1) + fibonacci(n-2);
    }
    
    public static void main(String[] args) {
        int n = 10;
        int result = fibonacci(n);
        System.out.println("Fibonacci(" + n + ") = " + result);
    }
}`
    },
    queue: {
      title: "Queue Implementation",
      description: "Simple queue implementation using LinkedList",
      code: `import java.util.*;

public class QueueExample {
    public static void main(String[] args) {
        Queue<String> queue = new LinkedList<>();
        
        // Enqueue elements
        queue.add("First");
        queue.add("Second");
        queue.add("Third");
        
        System.out.println("Queue: " + queue);
        
        // Dequeue elements
        while (!queue.isEmpty()) {
            String element = queue.poll();
            System.out.println("Dequeued: " + element);
        }
    }
}`
    },
    sorting: {
      title: "Bubble Sort",
      description: "Bubble sort implementation with step-by-step output",
      code: `public class BubbleSort {
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
}`
    },
    searching: {
      title: "Binary Search",
      description: "Binary search implementation for sorted arrays",
      code: `public class BinarySearch {
    public static int binarySearch(int[] arr, int target) {
        int left = 0;
        int right = arr.length - 1;
        
        while (left <= right) {
            int mid = (left + right) / 2;
            System.out.println("Checking index " + mid + ", value " + arr[mid]);
            
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
        int[] arr = {1, 3, 5, 7, 9, 11, 13, 15, 17, 19};
        int target = 7;
        
        System.out.print("Searching for " + target + " in: ");
        for (int i : arr) {
            System.out.print(i + " ");
        }
        System.out.println();
        
        int result = binarySearch(arr, target);
        System.out.println("Found at index: " + result);
    }
}`
    },
    tree: {
      title: "Binary Tree Implementation",
      description: "Binary tree with traversal methods",
      code: `public class BinaryTree {
    static class TreeNode {
        int val;
        TreeNode left, right;
        
        TreeNode(int val) {
            this.val = val;
            left = right = null;
        }
    }
    
    public static void inorderTraversal(TreeNode root) {
        if (root != null) {
            inorderTraversal(root.left);
            System.out.print(root.val + " ");
            inorderTraversal(root.right);
        }
    }
    
    public static void preorderTraversal(TreeNode root) {
        if (root != null) {
            System.out.print(root.val + " ");
            preorderTraversal(root.left);
            preorderTraversal(root.right);
        }
    }
    
    public static void postorderTraversal(TreeNode root) {
        if (root != null) {
            postorderTraversal(root.left);
            postorderTraversal(root.right);
            System.out.print(root.val + " ");
        }
    }
    
    public static void main(String[] args) {
        // Create a sample tree
        TreeNode root = new TreeNode(1);
        root.left = new TreeNode(2);
        root.right = new TreeNode(3);
        root.left.left = new TreeNode(4);
        root.left.right = new TreeNode(5);
        
        System.out.print("In-order traversal: ");
        inorderTraversal(root);
        System.out.println();
        
        System.out.print("Pre-order traversal: ");
        preorderTraversal(root);
        System.out.println();
        
        System.out.print("Post-order traversal: ");
        postorderTraversal(root);
        System.out.println();
    }
}`
    }
  }
};

export default function CodeExamples({ language, onSelectExample }) {
  const languageExamples = examples[language.toLowerCase()] || examples.python;

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Code Examples ({language})
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Click on an example to load it into the editor
      </Typography>
      
      <Grid container spacing={2}>
        {Object.entries(languageExamples).map(([key, example]) => (
          <Grid item xs={12} md={6} key={key}>
            <Card variant="outlined" sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {example.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {example.description}
                </Typography>
                <Button 
                  variant="contained" 
                  size="small"
                  onClick={() => onSelectExample(example.code)}
                  fullWidth
                >
                  Load Example
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
} 