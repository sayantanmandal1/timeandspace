import React from 'react';
import { Box, Paper, Typography, Button, Chip, Tabs, Tab } from '@mui/material';

const pythonProblems = [
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
];

const javaProblems = [
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
    title: 'Queue Implementation',
    description: 'Simple queue implementation using LinkedList in Java.',
    difficulty: 'Easy',
    language: 'java',
    code: `import java.util.*;

public class QueueExample {
    public static void main(String[] args) {
        Queue<Integer> queue = new LinkedList<>();
        
        // Enqueue elements
        queue.offer(1);
        queue.offer(2);
        queue.offer(3);
        queue.offer(4);
        queue.offer(5);
        
        System.out.println("Queue: " + queue);
        
        // Dequeue elements
        while (!queue.isEmpty()) {
            System.out.println("Dequeued: " + queue.poll());
        }
        
        System.out.println("Queue is empty: " + queue.isEmpty());
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
    title: 'Tree Traversal',
    description: 'In-order, pre-order, and post-order tree traversal in Java.',
    difficulty: 'Medium',
    language: 'java',
    code: `class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    
    TreeNode(int val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

public class TreeTraversal {
    public static void inOrder(TreeNode root) {
        if (root != null) {
            inOrder(root.left);
            System.out.print(root.val + " ");
            inOrder(root.right);
        }
    }
    
    public static void preOrder(TreeNode root) {
        if (root != null) {
            System.out.print(root.val + " ");
            preOrder(root.left);
            preOrder(root.right);
        }
    }
    
    public static void postOrder(TreeNode root) {
        if (root != null) {
            postOrder(root.left);
            postOrder(root.right);
            System.out.print(root.val + " ");
        }
    }
    
    public static void main(String[] args) {
        // Create a simple tree
        TreeNode root = new TreeNode(1);
        root.left = new TreeNode(2);
        root.right = new TreeNode(3);
        root.left.left = new TreeNode(4);
        root.left.right = new TreeNode(5);
        
        System.out.print("In-order: ");
        inOrder(root);
        System.out.println();
        
        System.out.print("Pre-order: ");
        preOrder(root);
        System.out.println();
        
        System.out.print("Post-order: ");
        postOrder(root);
        System.out.println();
    }
}`,
  },
];

export default function FAANGProblems({
  onSelectExample,
  selectedLanguage = 'python',
}) {
  const [activeTab, setActiveTab] = React.useState(0);

  const problems = activeTab === 0 ? pythonProblems : javaProblems;
  const currentLanguage = activeTab === 0 ? 'python' : 'java';

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        FAANG Interview Problems
      </Typography>

      <Tabs
        value={activeTab}
        onChange={(e, v) => setActiveTab(v)}
        sx={{ mb: 2 }}
      >
        <Tab label="Python" />
        <Tab label="Java" />
      </Tabs>

      {problems.map((p, idx) => (
        <Paper key={idx} sx={{ p: 2, mb: 2 }} variant="outlined">
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Typography variant="subtitle1">
                <b>{p.title}</b>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {p.description}
              </Typography>
              <Box display="flex" gap={1} mt={1}>
                <Chip
                  label={p.difficulty}
                  color={p.difficulty === 'Easy' ? 'success' : 'warning'}
                  size="small"
                />
                <Chip
                  label={currentLanguage}
                  color="primary"
                  size="small"
                  variant="outlined"
                />
              </Box>
            </Box>
            <Button
              variant="contained"
              onClick={() => onSelectExample(p.code, currentLanguage)}
              sx={{ ml: 2 }}
            >
              Load Example
            </Button>
          </Box>
        </Paper>
      ))}
    </Box>
  );
}
