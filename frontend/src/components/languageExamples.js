// Comprehensive DSA examples for all major programming languages
export const languageExamples = {
  // Core DSA Languages
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

def binary_search(arr, target):
    """Binary search implementation"""
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

# Example usage
print(fibonacci(10))
print(bubble_sort([64, 34, 25, 12, 22, 11, 90]))
print(binary_search([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 7))`,

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

function binarySearch(arr, target) {
    // Binary search implementation
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
console.log(binarySearch([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 7));`,

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
    
    // Binary search implementation
    public static int binarySearch(int[] arr, int target) {
        int left = 0, right = arr.length - 1;
        while (left <= right) {
            int mid = (left + right) / 2;
            if (arr[mid] == target) return mid;
            if (arr[mid] < target) left = mid + 1;
            else right = mid - 1;
        }
        return -1;
    }
    
    public static void main(String[] args) {
        System.out.println(fibonacci(10));
        int[] arr = {64, 34, 25, 12, 22, 11, 90};
        bubbleSort(arr);
        for (int num : arr) System.out.print(num + " ");
        System.out.println();
        System.out.println(binarySearch(new int[]{1,2,3,4,5,6,7,8,9,10}, 7));
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

// Binary search implementation
int binarySearch(vector<int>& arr, int target) {
    int left = 0, right = arr.size() - 1;
    while (left <= right) {
        int mid = (left + right) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}

int main() {
    cout << fibonacci(10) << endl;
    vector<int> arr = {64, 34, 25, 12, 22, 11, 90};
    bubbleSort(arr);
    for (int num : arr) cout << num << " ";
    cout << endl;
    cout << binarySearch(arr, 25) << endl;
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

// Binary search implementation
int binarySearch(int arr[], int n, int target) {
    int left = 0, right = n - 1;
    while (left <= right) {
        int mid = (left + right) / 2;
        if (arr[mid] == target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}

int main() {
    printf("%d\\n", fibonacci(10));
    int arr[] = {64, 34, 25, 12, 22, 11, 90};
    int n = sizeof(arr) / sizeof(arr[0]);
    bubbleSort(arr, n);
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\\n");
    printf("%d\\n", binarySearch(arr, n, 25));
    return 0;
}`,

  csharp: `using System;
using System.Collections.Generic;

class Algorithms {
    // Calculate the nth Fibonacci number
    public static int Fibonacci(int n) {
        if (n <= 1) return n;
        return Fibonacci(n - 1) + Fibonacci(n - 2);
    }
    
    // Sort array using bubble sort algorithm
    public static void BubbleSort(int[] arr) {
        int n = arr.Length;
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
    
    // Binary search implementation
    public static int BinarySearch(int[] arr, int target) {
        int left = 0, right = arr.Length - 1;
        while (left <= right) {
            int mid = (left + right) / 2;
            if (arr[mid] == target) return mid;
            if (arr[mid] < target) left = mid + 1;
            else right = mid - 1;
        }
        return -1;
    }
    
    static void Main() {
        Console.WriteLine(Fibonacci(10));
        int[] arr = {64, 34, 25, 12, 22, 11, 90};
        BubbleSort(arr);
        foreach (int num in arr) Console.Write(num + " ");
        Console.WriteLine();
        Console.WriteLine(BinarySearch(arr, 25));
    }
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

// Binary search implementation
func binarySearch(arr []int, target int) int {
    left, right := 0, len(arr)-1
    for left <= right {
        mid := (left + right) / 2
        if arr[mid] == target {
            return mid
        } else if arr[mid] < target {
            left = mid + 1
        } else {
            right = mid - 1
        }
    }
    return -1
}

func main() {
    fmt.Println(fibonacci(10))
    arr := []int{64, 34, 25, 12, 22, 11, 90}
    bubbleSort(arr)
    fmt.Println(arr)
    fmt.Println(binarySearch(arr, 25))
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

fn binary_search(arr: &[i32], target: i32) -> Option<usize> {
    let mut left = 0;
    let mut right = arr.len() - 1;
    
    while left <= right {
        let mid = (left + right) / 2;
        if arr[mid] == target {
            return Some(mid);
        } else if arr[mid] < target {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    None
}

fn main() {
    println!("{}", fibonacci(10));
    let mut arr = [64, 34, 25, 12, 22, 11, 90];
    bubble_sort(&mut arr);
    println!("{:?}", arr);
    println!("{:?}", binary_search(&arr, 25));
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

// Binary search implementation
function binarySearch($arr, $target) {
    $left = 0;
    $right = count($arr) - 1;
    
    while ($left <= $right) {
        $mid = (int)(($left + $right) / 2);
        if ($arr[$mid] == $target) return $mid;
        if ($arr[$mid] < $target) $left = $mid + 1;
        else $right = $mid - 1;
    }
    return -1;
}

// Example usage
echo fibonacci(10) . "\\n";
$arr = [64, 34, 25, 12, 22, 11, 90];
bubbleSort($arr);
echo implode(" ", $arr) . "\\n";
echo binarySearch($arr, 25) . "\\n";

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

# Binary search implementation
def binary_search(arr, target)
  left = 0
  right = arr.length - 1
  
  while left <= right
    mid = (left + right) / 2
    if arr[mid] == target
      return mid
    elsif arr[mid] < target
      left = mid + 1
    else
      right = mid - 1
    end
  end
  -1
end

# Example usage
puts fibonacci(10)
arr = [64, 34, 25, 12, 22, 11, 90]
bubble_sort(arr)
puts arr.join(" ")
puts binary_search(arr, 25)`,

  sql: `-- Create a table for storing numbers
CREATE TABLE numbers (
    id INT PRIMARY KEY,
    value INT NOT NULL
);

-- Insert sample data
INSERT INTO numbers (id, value) VALUES 
(1, 64), (2, 34), (3, 25), (4, 12), (5, 22), (6, 11), (7, 90);

-- Sort numbers in ascending order (equivalent to bubble sort)
SELECT value 
FROM numbers 
ORDER BY value ASC;

-- Find the maximum value
SELECT MAX(value) as max_value FROM numbers;

-- Find the minimum value
SELECT MIN(value) as min_value FROM numbers;

-- Calculate average
SELECT AVG(value) as average_value FROM numbers;

-- Binary search equivalent using window functions
WITH sorted_numbers AS (
    SELECT value, ROW_NUMBER() OVER (ORDER BY value) as rn
    FROM numbers
)
SELECT value, rn
FROM sorted_numbers
WHERE rn = (SELECT COUNT(*) FROM numbers) / 2;`,

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
console.log(binarySearch([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 7));`,

  // Modern Languages
  scala: `object Algorithms {
  // Calculate the nth Fibonacci number
  def fibonacci(n: Int): Int = {
    if (n <= 1) n
    else fibonacci(n - 1) + fibonacci(n - 2)
  }
  
  // Sort array using bubble sort algorithm
  def bubbleSort(arr: Array[Int]): Array[Int] = {
    val n = arr.length
    for (i <- 0 until n) {
      for (j <- 0 until n - i - 1) {
        if (arr(j) > arr(j + 1)) {
          val temp = arr(j)
          arr(j) = arr(j + 1)
          arr(j + 1) = temp
        }
      }
    }
    arr
  }
  
  // Binary search implementation
  def binarySearch(arr: Array[Int], target: Int): Int = {
    var left = 0
    var right = arr.length - 1
    
    while (left <= right) {
      val mid = (left + right) / 2
      if (arr(mid) == target) return mid
      if (arr(mid) < target) left = mid + 1
      else right = mid - 1
    }
    -1
  }
  
  def main(args: Array[String]): Unit = {
    println(fibonacci(10))
    val arr = Array(64, 34, 25, 12, 22, 11, 90)
    bubbleSort(arr)
    arr.foreach(print(_ + " "))
    println()
    println(binarySearch(arr, 25))
  }
}`,

  kotlin: `fun fibonacci(n: Int): Int {
    return if (n <= 1) n else fibonacci(n - 1) + fibonacci(n - 2)
}

fun bubbleSort(arr: IntArray) {
    val n = arr.size
    for (i in 0 until n) {
        for (j in 0 until n - i - 1) {
            if (arr[j] > arr[j + 1]) {
                val temp = arr[j]
                arr[j] = arr[j + 1]
                arr[j + 1] = temp
            }
        }
    }
}

fun binarySearch(arr: IntArray, target: Int): Int {
    var left = 0
    var right = arr.size - 1
    
    while (left <= right) {
        val mid = (left + right) / 2
        when {
            arr[mid] == target -> return mid
            arr[mid] < target -> left = mid + 1
            else -> right = mid - 1
        }
    }
    return -1
}

fun main() {
    println(fibonacci(10))
    val arr = intArrayOf(64, 34, 25, 12, 22, 11, 90)
    bubbleSort(arr)
    arr.forEach { print("$it ") }
    println()
    println(binarySearch(arr, 25))
}`,

  swift: `import Foundation

// Calculate the nth Fibonacci number
func fibonacci(_ n: Int) -> Int {
    if n <= 1 { return n }
    return fibonacci(n - 1) + fibonacci(n - 2)
}

// Sort array using bubble sort algorithm
func bubbleSort(_ arr: inout [Int]) {
    let n = arr.count
    for i in 0..<n {
        for j in 0..<n - i - 1 {
            if arr[j] > arr[j + 1] {
                arr.swapAt(j, j + 1)
            }
        }
    }
}

// Binary search implementation
func binarySearch(_ arr: [Int], target: Int) -> Int? {
    var left = 0
    var right = arr.count - 1
    
    while left <= right {
        let mid = (left + right) / 2
        if arr[mid] == target { return mid }
        if arr[mid] < target { left = mid + 1 }
        else { right = mid - 1 }
    }
    return nil
}

// Example usage
print(fibonacci(10))
var arr = [64, 34, 25, 12, 22, 11, 90]
bubbleSort(&arr)
print(arr)
print(binarySearch(arr, 25) ?? -1)`,

  // Functional Languages
  haskell: `-- Calculate the nth Fibonacci number
fibonacci :: Integer -> Integer
fibonacci n
  | n <= 1 = n
  | otherwise = fibonacci (n - 1) + fibonacci (n - 2)

-- Sort list using bubble sort algorithm
bubbleSort :: [Int] -> [Int]
bubbleSort [] = []
bubbleSort xs = bubbleSort (init sorted) ++ [last sorted]
  where
    sorted = bubblePass xs
    bubblePass [] = []
    bubblePass [x] = [x]
    bubblePass (x:y:xs)
      | x > y = y : bubblePass (x:xs)
      | otherwise = x : bubblePass (y:xs)

-- Binary search implementation
binarySearch :: [Int] -> Int -> Maybe Int
binarySearch [] _ = Nothing
binarySearch xs target = binarySearchHelper xs target 0 (length xs - 1)
  where
    binarySearchHelper xs target left right
      | left > right = Nothing
      | otherwise = let mid = (left + right) \`div\` 2
                    in case compare (xs !! mid) target of
                         EQ -> Just mid
                         LT -> binarySearchHelper xs target (mid + 1) right
                         GT -> binarySearchHelper xs target left (mid - 1)

-- Example usage
main :: IO ()
main = do
  print $ fibonacci 10
  print $ bubbleSort [64, 34, 25, 12, 22, 11, 90]
  print $ binarySearch [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] 7`,

  clojure: `(ns algorithms.core)

;; Calculate the nth Fibonacci number
(defn fibonacci [n]
  (if (<= n 1)
    n
    (+ (fibonacci (- n 1)) (fibonacci (- n 2)))))

;; Sort vector using bubble sort algorithm
(defn bubble-sort [coll]
  (let [n (count coll)]
    (loop [i 0
           arr (vec coll)]
      (if (>= i n)
        arr
        (recur (inc i)
               (loop [j 0
                      arr arr]
                 (if (>= j (- n i 1))
                   arr
                   (recur (inc j)
                          (if (> (get arr j) (get arr (inc j)))
                            (assoc arr j (get arr (inc j)) (inc j) (get arr j))
                            arr)))))))))

;; Binary search implementation
(defn binary-search [coll target]
  (loop [left 0
         right (dec (count coll))]
    (if (> left right)
      -1
      (let [mid (quot (+ left right) 2)
            mid-val (get coll mid)]
        (cond
          (= mid-val target) mid
          (< mid-val target) (recur (inc mid) right)
          :else (recur left (dec mid)))))))

;; Example usage
(println (fibonacci 10))
(println (bubble-sort [64 34 25 12 22 11 90]))
(println (binary-search [1 2 3 4 5 6 7 8 9 10] 7))`,

  // Scripting Languages
  perl: `#!/usr/bin/perl
use strict;
use warnings;

# Calculate the nth Fibonacci number
sub fibonacci {
    my ($n) = @_;
    return $n if $n <= 1;
    return fibonacci($n - 1) + fibonacci($n - 2);
}

# Sort array using bubble sort algorithm
sub bubble_sort {
    my (@arr) = @_;
    my $n = @arr;
    for my $i (0..$n-1) {
        for my $j (0..$n-$i-2) {
            if ($arr[$j] > $arr[$j+1]) {
                ($arr[$j], $arr[$j+1]) = ($arr[$j+1], $arr[$j]);
            }
        }
    }
    return @arr;
}

# Binary search implementation
sub binary_search {
    my ($arr_ref, $target) = @_;
    my @arr = @$arr_ref;
    my $left = 0;
    my $right = @arr - 1;
    
    while ($left <= $right) {
        my $mid = int(($left + $right) / 2);
        if ($arr[$mid] == $target) { return $mid; }
        if ($arr[$mid] < $target) { $left = $mid + 1; }
        else { $right = $mid - 1; }
    }
    return -1;
}

# Example usage
print fibonacci(10), "\\n";
my @arr = (64, 34, 25, 12, 22, 11, 90);
my @sorted = bubble_sort(@arr);
print join(" ", @sorted), "\\n";
print binary_search(\\@sorted, 25), "\\n";`,

  lua: `-- Calculate the nth Fibonacci number
function fibonacci(n)
    if n <= 1 then
        return n
    end
    return fibonacci(n - 1) + fibonacci(n - 2)
end

-- Sort array using bubble sort algorithm
function bubbleSort(arr)
    local n = #arr
    for i = 1, n do
        for j = 1, n - i do
            if arr[j] > arr[j + 1] then
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
            end
        end
    end
    return arr
end

-- Binary search implementation
function binarySearch(arr, target)
    local left = 1
    local right = #arr
    
    while left <= right do
        local mid = math.floor((left + right) / 2)
        if arr[mid] == target then
            return mid
        elseif arr[mid] < target then
            left = mid + 1
        else
            right = mid - 1
        end
    end
    return -1
end

-- Example usage
print(fibonacci(10))
local arr = {64, 34, 25, 12, 22, 11, 90}
bubbleSort(arr)
for i, v in ipairs(arr) do
    io.write(v .. " ")
end
print()
print(binarySearch(arr, 25))`,

  // Assembly (x86)
  assembly_x86: `; x86 Assembly - Fibonacci and Bubble Sort
section .data
    fib_msg db 'Fibonacci(10) = ', 0
    fib_msg_len equ $ - fib_msg
    sort_msg db 'Sorted array: ', 0
    sort_msg_len equ $ - sort_msg
    newline db 10, 0
    
section .bss
    array resd 7  ; Array for bubble sort
    
section .text
    global _start

_start:
    ; Calculate Fibonacci(10)
    mov eax, 10
    call fibonacci
    ; Print result (simplified)
    
    ; Initialize array for bubble sort
    mov dword [array], 64
    mov dword [array+4], 34
    mov dword [array+8], 25
    mov dword [array+12], 12
    mov dword [array+16], 22
    mov dword [array+20], 11
    mov dword [array+24], 90
    
    ; Call bubble sort
    mov ecx, 7
    lea edx, [array]
    call bubble_sort
    
    ; Exit
    mov eax, 1
    xor ebx, ebx
    int 80h

fibonacci:
    ; Calculate fibonacci(n) in eax
    cmp eax, 1
    jle .done
    push eax
    dec eax
    call fibonacci
    pop ebx
    push eax
    mov eax, ebx
    sub eax, 2
    call fibonacci
    pop ebx
    add eax, ebx
.done:
    ret

bubble_sort:
    ; Bubble sort implementation
    ; ecx = array length, edx = array pointer
    push ebp
    mov ebp, esp
    
    mov esi, 0  ; i = 0
.outer_loop:
    cmp esi, ecx
    jge .done
    
    mov edi, 0  ; j = 0
.inner_loop:
    mov eax, ecx
    sub eax, esi
    dec eax
    cmp edi, eax
    jge .inner_done
    
    ; Compare arr[j] and arr[j+1]
    mov eax, [edx + edi*4]
    mov ebx, [edx + edi*4 + 4]
    cmp eax, ebx
    jle .no_swap
    
    ; Swap elements
    mov [edx + edi*4], ebx
    mov [edx + edi*4 + 4], eax
    
.no_swap:
    inc edi
    jmp .inner_loop
    
.inner_done:
    inc esi
    jmp .outer_loop
    
.done:
    pop ebp
    ret`,

  // Configuration & Build
  json: `{
  "algorithms": {
    "fibonacci": {
      "description": "Calculate the nth Fibonacci number",
      "time_complexity": "O(2^n)",
      "space_complexity": "O(n)",
      "implementation": {
        "python": "def fibonacci(n): return n if n <= 1 else fibonacci(n-1) + fibonacci(n-2)",
        "javascript": "function fibonacci(n) { return n <= 1 ? n : fibonacci(n-1) + fibonacci(n-2); }",
        "java": "public static int fibonacci(int n) { return n <= 1 ? n : fibonacci(n-1) + fibonacci(n-2); }"
      }
    },
    "bubble_sort": {
      "description": "Sort array using bubble sort algorithm",
      "time_complexity": "O(n²)",
      "space_complexity": "O(1)",
      "implementation": {
        "python": "def bubble_sort(arr): [arr[j], arr[j+1]] = [arr[j+1], arr[j]] if arr[j] > arr[j+1] else [arr[j], arr[j+1]] for i in range(len(arr)) for j in range(len(arr)-i-1)",
        "javascript": "function bubbleSort(arr) { for(let i=0; i<arr.length; i++) for(let j=0; j<arr.length-i-1; j++) if(arr[j]>arr[j+1]) [arr[j],arr[j+1]]=[arr[j+1],arr[j]]; return arr; }",
        "java": "public static void bubbleSort(int[] arr) { for(int i=0; i<arr.length; i++) for(int j=0; j<arr.length-i-1; j++) if(arr[j]>arr[j+1]) { int temp=arr[j]; arr[j]=arr[j+1]; arr[j+1]=temp; } }"
      }
    },
    "binary_search": {
      "description": "Binary search implementation",
      "time_complexity": "O(log n)",
      "space_complexity": "O(1)",
      "implementation": {
        "python": "def binary_search(arr, target): left, right = 0, len(arr)-1; return mid if arr[mid]==target else binary_search(arr[mid+1:], target) if arr[mid]<target else binary_search(arr[:mid], target) while left<=right: mid=(left+right)//2",
        "javascript": "function binarySearch(arr, target) { let left=0, right=arr.length-1; while(left<=right) { let mid=Math.floor((left+right)/2); if(arr[mid]===target) return mid; arr[mid]<target ? left=mid+1 : right=mid-1; } return -1; }",
        "java": "public static int binarySearch(int[] arr, int target) { int left=0, right=arr.length-1; while(left<=right) { int mid=(left+right)/2; if(arr[mid]==target) return mid; if(arr[mid]<target) left=mid+1; else right=mid-1; } return -1; }"
      }
    }
  },
  "data_structures": {
    "array": "Linear collection of elements",
    "linked_list": "Linear collection with pointers",
    "stack": "LIFO data structure",
    "queue": "FIFO data structure",
    "tree": "Hierarchical data structure",
    "graph": "Network of connected nodes",
    "hash_table": "Key-value mapping structure"
  },
  "complexity_classes": {
    "O(1)": "Constant time",
    "O(log n)": "Logarithmic time",
    "O(n)": "Linear time",
    "O(n log n)": "Linearithmic time",
    "O(n²)": "Quadratic time",
    "O(2ⁿ)": "Exponential time",
    "O(n!)": "Factorial time"
  }
}`,

  // Fallback for unsupported languages
  text: `# DSA Code Analysis Platform

This is a comprehensive platform for analyzing Data Structures and Algorithms code.

## Supported Languages:
- Python, JavaScript, Java, C++, C, C#
- Go, Rust, PHP, Ruby, SQL
- HTML, CSS, TypeScript
- Scala, Kotlin, Swift, Dart
- Haskell, Clojure, Elixir, Erlang
- Perl, Lua, Assembly
- And many more...

## Features:
- Multi-language AST parsing
- Real-time code execution
- Complexity analysis
- Interactive visualizations
- Optimization suggestions

## Example Algorithms:
1. Fibonacci Sequence
2. Bubble Sort
3. Binary Search
4. Quick Sort
5. Merge Sort
6. Graph Traversal
7. Tree Traversal

Start coding in your preferred language!`,
};
