const defaultInputFormat =
  "Read the input from standard input. The first line contains the size or count needed for the problem. The remaining lines contain the values described in the statement.";

const defaultOutputFormat =
  "Print the required answer to standard output on a single line unless stated otherwise.";

function makeProblem({
  title,
  difficulty,
  points,
  description,
  sampleInput,
  sampleOutput,
  inputFormat = defaultInputFormat,
  outputFormat = defaultOutputFormat,
}) {
  return {
    title,
    description,
    inputFormat,
    outputFormat,
    sampleInput,
    sampleOutput,
    difficulty,
    points,
  };
}

export const dsaProblems = [
  makeProblem({
    title: "Two Sum",
    difficulty: "easy",
    points: 50,
    description:
      "Given an array of integers and a target value, return the indices of two numbers whose sum is exactly equal to the target.",
    sampleInput: "4 9\n2 7 11 15",
    sampleOutput: "0 1",
  }),
  makeProblem({
    title: "Palindrome Number",
    difficulty: "easy",
    points: 50,
    description:
      "Determine whether a given non-negative integer reads the same from left to right and right to left.",
    sampleInput: "121",
    sampleOutput: "true",
  }),
  makeProblem({
    title: "Valid Parentheses",
    difficulty: "easy",
    points: 50,
    description:
      "Check whether a string containing only brackets is balanced and properly nested.",
    sampleInput: "()[]{}",
    sampleOutput: "true",
  }),
  makeProblem({
    title: "Maximum Subarray",
    difficulty: "easy",
    points: 50,
    description:
      "Find the contiguous subarray with the largest possible sum and print that maximum sum.",
    sampleInput: "9\n-2 1 -3 4 -1 2 1 -5 4",
    sampleOutput: "6",
  }),
  makeProblem({
    title: "Best Time to Buy and Sell Stock",
    difficulty: "easy",
    points: 50,
    description:
      "Given daily stock prices, find the maximum profit obtainable by performing exactly one buy and one sell.",
    sampleInput: "6\n7 1 5 3 6 4",
    sampleOutput: "5",
  }),
  makeProblem({
    title: "Contains Duplicate",
    difficulty: "easy",
    points: 50,
    description:
      "Determine whether any value appears at least twice in the array.",
    sampleInput: "4\n1 2 3 1",
    sampleOutput: "true",
  }),
  makeProblem({
    title: "Binary Search",
    difficulty: "easy",
    points: 50,
    description:
      "Search for a target value in a sorted array and print its index or -1 if it does not exist.",
    sampleInput: "6 9\n-1 0 3 5 9 12",
    sampleOutput: "4",
  }),
  makeProblem({
    title: "Reverse String",
    difficulty: "easy",
    points: 50,
    description:
      "Reverse a string and print the reversed sequence.",
    sampleInput: "devarena",
    sampleOutput: "aneraved",
  }),
  makeProblem({
    title: "Merge Sorted Arrays",
    difficulty: "easy",
    points: 50,
    description:
      "Given two sorted arrays, merge them into one sorted array.",
    sampleInput: "3 3\n1 2 4\n1 3 4",
    sampleOutput: "1 1 2 3 4 4",
  }),
  makeProblem({
    title: "Climbing Stairs",
    difficulty: "easy",
    points: 50,
    description:
      "Count the number of distinct ways to reach the top if you can climb either 1 or 2 steps at a time.",
    sampleInput: "5",
    sampleOutput: "8",
  }),
  makeProblem({
    title: "Single Number",
    difficulty: "easy",
    points: 50,
    description:
      "In an array where every element appears twice except one, print the element that appears exactly once.",
    sampleInput: "5\n2 2 1 4 4",
    sampleOutput: "1",
  }),
  makeProblem({
    title: "Missing Number",
    difficulty: "easy",
    points: 50,
    description:
      "Given n distinct numbers from the range 0 to n with one missing, find the missing number.",
    sampleInput: "3\n3 0 1",
    sampleOutput: "2",
  }),
  makeProblem({
    title: "Move Zeroes",
    difficulty: "easy",
    points: 50,
    description:
      "Move all zeroes to the end of the array while maintaining the relative order of non-zero elements.",
    sampleInput: "5\n0 1 0 3 12",
    sampleOutput: "1 3 12 0 0",
  }),
  makeProblem({
    title: "Intersection of Two Arrays",
    difficulty: "easy",
    points: 50,
    description:
      "Print the unique intersection of two integer arrays in sorted order.",
    sampleInput: "4 4\n1 2 2 1\n2 2 3 4",
    sampleOutput: "2",
  }),
  makeProblem({
    title: "Valid Anagram",
    difficulty: "easy",
    points: 50,
    description:
      "Check whether two lowercase strings are anagrams of each other.",
    sampleInput: "listen\nsilent",
    sampleOutput: "true",
  }),
  makeProblem({
    title: "First Unique Character",
    difficulty: "easy",
    points: 50,
    description:
      "Return the index of the first non-repeating character in a string, or -1 if none exists.",
    sampleInput: "leetcode",
    sampleOutput: "0",
  }),
  makeProblem({
    title: "Fizz Buzz",
    difficulty: "easy",
    points: 50,
    description:
      "Print the sequence from 1 to n where multiples of 3 become Fizz, multiples of 5 become Buzz, and multiples of both become FizzBuzz.",
    sampleInput: "5",
    sampleOutput: "1 2 Fizz 4 Buzz",
  }),
  makeProblem({
    title: "Roman to Integer",
    difficulty: "easy",
    points: 50,
    description:
      "Convert a Roman numeral string into its integer value.",
    sampleInput: "MCMXCIV",
    sampleOutput: "1994",
  }),
  makeProblem({
    title: "Length of Last Word",
    difficulty: "easy",
    points: 50,
    description:
      "Given a sentence, compute the length of the last word.",
    sampleInput: "Hello World",
    sampleOutput: "5",
  }),
  makeProblem({
    title: "Pascal Triangle Row",
    difficulty: "easy",
    points: 50,
    description:
      "Generate the kth row of Pascal's Triangle.",
    sampleInput: "3",
    sampleOutput: "1 3 3 1",
  }),
  makeProblem({
    title: "Plus One",
    difficulty: "easy",
    points: 50,
    description:
      "Given a non-empty array of digits representing a non-negative integer, increment the integer by one.",
    sampleInput: "3\n1 2 9",
    sampleOutput: "1 3 0",
  }),
  makeProblem({
    title: "Sqrt Floor",
    difficulty: "easy",
    points: 50,
    description:
      "Find the floor value of the square root of a non-negative integer.",
    sampleInput: "17",
    sampleOutput: "4",
  }),
  makeProblem({
    title: "Power of Two",
    difficulty: "easy",
    points: 50,
    description:
      "Determine whether a given integer is a power of two.",
    sampleInput: "16",
    sampleOutput: "true",
  }),
  makeProblem({
    title: "Count Set Bits",
    difficulty: "easy",
    points: 50,
    description:
      "Count the number of set bits in the binary representation of a positive integer.",
    sampleInput: "13",
    sampleOutput: "3",
  }),
  makeProblem({
    title: "Next Greater Element I",
    difficulty: "easy",
    points: 50,
    description:
      "For each value in the first array, find its next greater element in the second array.",
    sampleInput: "3 4\n4 1 2\n1 3 4 2",
    sampleOutput: "-1 3 -1",
  }),
  makeProblem({
    title: "Queue Using Stacks",
    difficulty: "easy",
    points: 50,
    description:
      "Design a queue using two stacks and answer push, pop, peek, and empty queries.",
    sampleInput: "5\npush 1\npush 2\npeek\npop\nempty",
    sampleOutput: "1\n1\nfalse",
  }),
  makeProblem({
    title: "Stack Using Queues",
    difficulty: "easy",
    points: 50,
    description:
      "Design a stack using queues and answer push, pop, top, and empty queries.",
    sampleInput: "5\npush 1\npush 2\ntop\npop\nempty",
    sampleOutput: "2\n2\nfalse",
  }),
  makeProblem({
    title: "Symmetric Tree",
    difficulty: "easy",
    points: 50,
    description:
      "Determine whether a binary tree is symmetric around its center.",
    sampleInput: "7\n1 2 2 3 4 4 3",
    sampleOutput: "true",
  }),
  makeProblem({
    title: "Invert Binary Tree",
    difficulty: "easy",
    points: 50,
    description:
      "Invert a binary tree by swapping the left and right child of every node and print level order traversal.",
    sampleInput: "7\n4 2 7 1 3 6 9",
    sampleOutput: "4 7 2 9 6 3 1",
  }),
  makeProblem({
    title: "Min Stack",
    difficulty: "easy",
    points: 50,
    description:
      "Implement a stack that supports push, pop, top, and retrieving the minimum element in constant time.",
    sampleInput: "6\npush -2\npush 0\npush -3\ngetMin\npop\ntop",
    sampleOutput: "-3\n0",
  }),
  makeProblem({
    title: "Ransom Note",
    difficulty: "easy",
    points: 50,
    description:
      "Check whether the first string can be constructed using the characters of the second string.",
    sampleInput: "aa\naab",
    sampleOutput: "true",
  }),
  makeProblem({
    title: "Relative Ranks",
    difficulty: "easy",
    points: 50,
    description:
      "Assign ranks to athletes based on scores, using medal names for the top three.",
    sampleInput: "5\n5 4 3 2 1",
    sampleOutput: "Gold Medal Silver Medal Bronze Medal 4 5",
  }),
  makeProblem({
    title: "Majority Element",
    difficulty: "easy",
    points: 50,
    description:
      "Find the element that appears more than n/2 times in the array.",
    sampleInput: "7\n2 2 1 1 1 2 2",
    sampleOutput: "2",
  }),
  makeProblem({
    title: "Remove Duplicates from Sorted Array",
    difficulty: "easy",
    points: 50,
    description:
      "Remove duplicates from a sorted array in-place and print the number of unique elements followed by the compacted array.",
    sampleInput: "6\n1 1 2 2 3 3",
    sampleOutput: "3\n1 2 3",
  }),
  makeProblem({
    title: "Isomorphic Strings",
    difficulty: "easy",
    points: 50,
    description:
      "Determine whether two strings are isomorphic.",
    sampleInput: "egg\nadd",
    sampleOutput: "true",
  }),
  makeProblem({
    title: "Range Sum Query Immutable",
    difficulty: "easy",
    points: 50,
    description:
      "Preprocess an array and answer sum queries for inclusive ranges.",
    sampleInput: "6\n-2 0 3 -5 2 -1\n1\n0 2",
    sampleOutput: "1",
  }),
  makeProblem({
    title: "Flood Fill",
    difficulty: "easy",
    points: 50,
    description:
      "Recolor a connected component in a matrix and print the updated matrix.",
    sampleInput: "3 3\n1 1 1\n1 1 0\n1 0 1\n1 1 2",
    sampleOutput: "2 2 2\n2 2 0\n2 0 1",
  }),
  makeProblem({
    title: "Find Pivot Index",
    difficulty: "easy",
    points: 50,
    description:
      "Return the leftmost pivot index where the sum on the left equals the sum on the right.",
    sampleInput: "6\n1 7 3 6 5 6",
    sampleOutput: "3",
  }),
  makeProblem({
    title: "Transpose Matrix",
    difficulty: "easy",
    points: 50,
    description:
      "Print the transpose of a given matrix.",
    sampleInput: "2 3\n1 2 3\n4 5 6",
    sampleOutput: "1 4\n2 5\n3 6",
  }),
  makeProblem({
    title: "Find the Difference",
    difficulty: "easy",
    points: 50,
    description:
      "Given two strings where the second is formed by shuffling the first and adding one extra character, print that extra character.",
    sampleInput: "abcd\nabcde",
    sampleOutput: "e",
  }),
  makeProblem({
    title: "Longest Common Prefix",
    difficulty: "easy",
    points: 50,
    description:
      "Find the longest common prefix among a set of strings.",
    sampleInput: "3\nflower flow flight",
    sampleOutput: "fl",
  }),
  makeProblem({
    title: "Product of Array Except Self",
    difficulty: "medium",
    points: 100,
    description:
      "For each position, print the product of all other elements without using division.",
    sampleInput: "4\n1 2 3 4",
    sampleOutput: "24 12 8 6",
  }),
  makeProblem({
    title: "3Sum",
    difficulty: "medium",
    points: 100,
    description:
      "Find all unique triplets in the array that sum to zero and print them in lexicographic order.",
    sampleInput: "6\n-1 0 1 2 -1 -4",
    sampleOutput: "-1 -1 2\n-1 0 1",
  }),
  makeProblem({
    title: "Container With Most Water",
    difficulty: "medium",
    points: 100,
    description:
      "Given line heights, determine the maximum water container area.",
    sampleInput: "9\n1 8 6 2 5 4 8 3 7",
    sampleOutput: "49",
  }),
  makeProblem({
    title: "Longest Substring Without Repeating Characters",
    difficulty: "medium",
    points: 100,
    description:
      "Find the length of the longest substring containing no repeated characters.",
    sampleInput: "abcabcbb",
    sampleOutput: "3",
  }),
  makeProblem({
    title: "Group Anagrams",
    difficulty: "medium",
    points: 100,
    description:
      "Group words that are anagrams and print each group on a new line.",
    sampleInput: "6\neat tea tan ate nat bat",
    sampleOutput: "eat tea ate\ntan nat\nbat",
  }),
  makeProblem({
    title: "Top K Frequent Elements",
    difficulty: "medium",
    points: 100,
    description:
      "Print the k most frequent elements from the array.",
    sampleInput: "6 2\n1 1 1 2 2 3",
    sampleOutput: "1 2",
  }),
  makeProblem({
    title: "Sort Colors",
    difficulty: "medium",
    points: 100,
    description:
      "Sort an array containing only 0, 1, and 2 in linear time.",
    sampleInput: "6\n2 0 2 1 1 0",
    sampleOutput: "0 0 1 1 2 2",
  }),
  makeProblem({
    title: "Find Duplicate Number",
    difficulty: "medium",
    points: 100,
    description:
      "In an array containing n + 1 integers from 1 to n, find the duplicated value.",
    sampleInput: "5\n1 3 4 2 2",
    sampleOutput: "2",
  }),
  makeProblem({
    title: "Set Matrix Zeroes",
    difficulty: "medium",
    points: 100,
    description:
      "If any cell in a matrix is zero, set its entire row and column to zero and print the resulting matrix.",
    sampleInput: "3 3\n1 1 1\n1 0 1\n1 1 1",
    sampleOutput: "1 0 1\n0 0 0\n1 0 1",
  }),
  makeProblem({
    title: "Spiral Matrix",
    difficulty: "medium",
    points: 100,
    description:
      "Print the elements of a matrix in spiral order.",
    sampleInput: "3 3\n1 2 3\n4 5 6\n7 8 9",
    sampleOutput: "1 2 3 6 9 8 7 4 5",
  }),
  makeProblem({
    title: "Rotate Image",
    difficulty: "medium",
    points: 100,
    description:
      "Rotate a square matrix by 90 degrees clockwise and print the rotated matrix.",
    sampleInput: "3\n1 2 3\n4 5 6\n7 8 9",
    sampleOutput: "7 4 1\n8 5 2\n9 6 3",
  }),
  makeProblem({
    title: "Search in Rotated Sorted Array",
    difficulty: "medium",
    points: 100,
    description:
      "Search for a target in a rotated sorted array and print its index or -1.",
    sampleInput: "7 0\n4 5 6 7 0 1 2",
    sampleOutput: "4",
  }),
  makeProblem({
    title: "Find Minimum in Rotated Sorted Array",
    difficulty: "medium",
    points: 100,
    description:
      "Find the minimum element in a rotated sorted array.",
    sampleInput: "5\n3 4 5 1 2",
    sampleOutput: "1",
  }),
  makeProblem({
    title: "Koko Eating Bananas",
    difficulty: "medium",
    points: 100,
    description:
      "Find the minimum eating speed needed to finish all banana piles within h hours.",
    sampleInput: "4 8\n3 6 7 11",
    sampleOutput: "4",
  }),
  makeProblem({
    title: "Capacity To Ship Packages Within D Days",
    difficulty: "medium",
    points: 100,
    description:
      "Find the minimum ship capacity required to send all packages within the given number of days.",
    sampleInput: "10 5\n1 2 3 4 5 6 7 8 9 10",
    sampleOutput: "15",
  }),
  makeProblem({
    title: "Daily Temperatures",
    difficulty: "medium",
    points: 100,
    description:
      "For each day, calculate how many days must pass until a warmer temperature occurs.",
    sampleInput: "8\n73 74 75 71 69 72 76 73",
    sampleOutput: "1 1 4 2 1 1 0 0",
  }),
  makeProblem({
    title: "Evaluate Reverse Polish Notation",
    difficulty: "medium",
    points: 100,
    description:
      "Evaluate the arithmetic expression written in Reverse Polish Notation.",
    sampleInput: "5\n2 1 + 3 *",
    sampleOutput: "9",
  }),
  makeProblem({
    title: "Generate Parentheses",
    difficulty: "medium",
    points: 100,
    description:
      "Generate all valid combinations of n pairs of parentheses.",
    sampleInput: "3",
    sampleOutput: "((())) (()()) (())() ()(()) ()()()",
  }),
  makeProblem({
    title: "Permutations",
    difficulty: "medium",
    points: 100,
    description:
      "Print all permutations of the given distinct integers in lexicographic order.",
    sampleInput: "3\n1 2 3",
    sampleOutput: "1 2 3\n1 3 2\n2 1 3\n2 3 1\n3 1 2\n3 2 1",
  }),
  makeProblem({
    title: "Subsets",
    difficulty: "medium",
    points: 100,
    description:
      "Generate all subsets of a set of distinct integers.",
    sampleInput: "3\n1 2 3",
    sampleOutput: "[] [1] [2] [3] [1,2] [1,3] [2,3] [1,2,3]",
  }),
  makeProblem({
    title: "Combination Sum",
    difficulty: "medium",
    points: 100,
    description:
      "Find all unique combinations of candidates where the chosen numbers sum to the target.",
    sampleInput: "4 7\n2 3 6 7",
    sampleOutput: "2 2 3\n7",
  }),
  makeProblem({
    title: "Letter Combinations of a Phone Number",
    difficulty: "medium",
    points: 100,
    description:
      "Generate all possible letter combinations represented by a digit string from 2 to 9.",
    sampleInput: "23",
    sampleOutput: "ad ae af bd be bf cd ce cf",
  }),
  makeProblem({
    title: "Word Search",
    difficulty: "medium",
    points: 100,
    description:
      "Determine whether a target word exists in the grid by moving horizontally or vertically without reusing a cell.",
    sampleInput: "3 4\nA B C E\nS F C S\nA D E E\nABCCED",
    sampleOutput: "true",
  }),
  makeProblem({
    title: "Number of Islands",
    difficulty: "medium",
    points: 100,
    description:
      "Count the number of islands in a binary grid.",
    sampleInput: "4 5\n1 1 1 1 0\n1 1 0 1 0\n1 1 0 0 0\n0 0 0 0 0",
    sampleOutput: "1",
  }),
  makeProblem({
    title: "Pacific Atlantic Water Flow",
    difficulty: "medium",
    points: 100,
    description:
      "Find all cells from which water can flow to both the Pacific and Atlantic edges of the matrix.",
    sampleInput: "3 3\n1 2 2\n3 2 3\n2 4 5",
    sampleOutput: "0 2\n1 2\n2 0\n2 1\n2 2",
  }),
  makeProblem({
    title: "Clone Graph",
    difficulty: "medium",
    points: 100,
    description:
      "Given an undirected connected graph, create a deep copy and print its adjacency list.",
    sampleInput: "4 4\n1 2\n1 4\n2 3\n3 4",
    sampleOutput: "1:2,4\n2:1,3\n3:2,4\n4:1,3",
  }),
  makeProblem({
    title: "Course Schedule",
    difficulty: "medium",
    points: 100,
    description:
      "Given course prerequisites, determine whether all courses can be completed.",
    sampleInput: "2 1\n1 0",
    sampleOutput: "true",
  }),
  makeProblem({
    title: "Course Schedule II",
    difficulty: "medium",
    points: 100,
    description:
      "Given course prerequisites, print one valid ordering of courses if it exists.",
    sampleInput: "4 4\n1 0\n2 0\n3 1\n3 2",
    sampleOutput: "0 1 2 3",
  }),
  makeProblem({
    title: "Longest Consecutive Sequence",
    difficulty: "medium",
    points: 100,
    description:
      "Find the length of the longest consecutive sequence in an unsorted array.",
    sampleInput: "6\n100 4 200 1 3 2",
    sampleOutput: "4",
  }),
  makeProblem({
    title: "Longest Increasing Subsequence",
    difficulty: "medium",
    points: 100,
    description:
      "Print the length of the longest strictly increasing subsequence.",
    sampleInput: "8\n10 9 2 5 3 7 101 18",
    sampleOutput: "4",
  }),
  makeProblem({
    title: "Coin Change",
    difficulty: "medium",
    points: 100,
    description:
      "Given coin denominations and an amount, find the minimum number of coins needed to make that amount.",
    sampleInput: "3 11\n1 2 5",
    sampleOutput: "3",
  }),
  makeProblem({
    title: "House Robber",
    difficulty: "medium",
    points: 100,
    description:
      "Find the maximum amount of money you can rob from non-adjacent houses.",
    sampleInput: "4\n1 2 3 1",
    sampleOutput: "4",
  }),
  makeProblem({
    title: "House Robber II",
    difficulty: "medium",
    points: 100,
    description:
      "Find the maximum amount you can rob from circularly arranged houses.",
    sampleInput: "3\n2 3 2",
    sampleOutput: "3",
  }),
  makeProblem({
    title: "Decode Ways",
    difficulty: "medium",
    points: 100,
    description:
      "Count the number of ways to decode a digit string where 1 maps to A and 26 maps to Z.",
    sampleInput: "226",
    sampleOutput: "3",
  }),
  makeProblem({
    title: "Jump Game",
    difficulty: "medium",
    points: 100,
    description:
      "Determine whether you can reach the last index from the first index.",
    sampleInput: "5\n2 3 1 1 4",
    sampleOutput: "true",
  }),
  makeProblem({
    title: "Jump Game II",
    difficulty: "medium",
    points: 100,
    description:
      "Find the minimum number of jumps needed to reach the last index.",
    sampleInput: "5\n2 3 1 1 4",
    sampleOutput: "2",
  }),
  makeProblem({
    title: "Partition Equal Subset Sum",
    difficulty: "medium",
    points: 100,
    description:
      "Determine whether the array can be partitioned into two subsets with equal sum.",
    sampleInput: "4\n1 5 11 5",
    sampleOutput: "true",
  }),
  makeProblem({
    title: "Unique Paths",
    difficulty: "medium",
    points: 100,
    description:
      "Count the number of unique paths from the top-left to the bottom-right corner of an m x n grid.",
    sampleInput: "3 7",
    sampleOutput: "28",
  }),
  makeProblem({
    title: "Minimum Path Sum",
    difficulty: "medium",
    points: 100,
    description:
      "Find the minimum sum path from the top-left to the bottom-right corner of a grid.",
    sampleInput: "3 3\n1 3 1\n1 5 1\n4 2 1",
    sampleOutput: "7",
  }),
  makeProblem({
    title: "Target Sum",
    difficulty: "medium",
    points: 100,
    description:
      "Count the number of ways to assign plus and minus signs to reach the target value.",
    sampleInput: "5 3\n1 1 1 1 1",
    sampleOutput: "5",
  }),
  makeProblem({
    title: "Partition Labels",
    difficulty: "medium",
    points: 100,
    description:
      "Partition a string so that each letter appears in at most one part and print the part lengths.",
    sampleInput: "ababcbacadefegdehijhklij",
    sampleOutput: "9 7 8",
  }),
  makeProblem({
    title: "Reorganize String",
    difficulty: "medium",
    points: 100,
    description:
      "Rearrange a string so that no two adjacent characters are equal, or print IMPOSSIBLE.",
    sampleInput: "aab",
    sampleOutput: "aba",
  }),
  makeProblem({
    title: "Kth Largest Element in an Array",
    difficulty: "medium",
    points: 100,
    description:
      "Find the kth largest element in an unsorted array.",
    sampleInput: "6 2\n3 2 1 5 6 4",
    sampleOutput: "5",
  }),
  makeProblem({
    title: "Find Peak Element",
    difficulty: "medium",
    points: 100,
    description:
      "Find any peak element and print its index.",
    sampleInput: "4\n1 2 3 1",
    sampleOutput: "2",
  }),
  makeProblem({
    title: "Time Based Key Value Store",
    difficulty: "medium",
    points: 100,
    description:
      "Implement a time-based key-value store and answer set/get queries.",
    sampleInput: "4\nset foo bar 1\nget foo 1\nget foo 3\nget foo 0",
    sampleOutput: "bar\nbar\n",
  }),
  makeProblem({
    title: "Add Two Numbers",
    difficulty: "medium",
    points: 100,
    description:
      "Add two numbers represented by linked lists in reverse order and print the resulting list.",
    sampleInput: "3\n2 4 3\n3\n5 6 4",
    sampleOutput: "7 0 8",
  }),
  makeProblem({
    title: "Remove Nth Node From End of List",
    difficulty: "medium",
    points: 100,
    description:
      "Remove the nth node from the end of a linked list and print the updated list.",
    sampleInput: "5 2\n1 2 3 4 5",
    sampleOutput: "1 2 3 5",
  }),
  makeProblem({
    title: "Reorder List",
    difficulty: "medium",
    points: 100,
    description:
      "Reorder a linked list in the pattern L0, Ln, L1, Ln-1 and print the updated list.",
    sampleInput: "4\n1 2 3 4",
    sampleOutput: "1 4 2 3",
  }),
  makeProblem({
    title: "Copy List With Random Pointer",
    difficulty: "medium",
    points: 100,
    description:
      "Deep copy a linked list where each node has a random pointer and print the copied list structure.",
    sampleInput: "3\n7 -1\n13 0\n11 4",
    sampleOutput: "7 -1\n13 0\n11 4",
  }),
  makeProblem({
    title: "LRU Cache",
    difficulty: "medium",
    points: 100,
    description:
      "Implement an LRU cache and answer put/get queries.",
    sampleInput: "6 2\nput 1 1\nput 2 2\nget 1\nput 3 3\nget 2\nget 3",
    sampleOutput: "1\n-1\n3",
  }),
  makeProblem({
    title: "Binary Tree Level Order Traversal",
    difficulty: "medium",
    points: 100,
    description:
      "Print the level order traversal of a binary tree.",
    sampleInput: "5\n3 9 20 null null 15 7",
    sampleOutput: "3\n9 20\n15 7",
  }),
  makeProblem({
    title: "Validate Binary Search Tree",
    difficulty: "medium",
    points: 100,
    description:
      "Determine whether a binary tree is a valid binary search tree.",
    sampleInput: "3\n2 1 3",
    sampleOutput: "true",
  }),
  makeProblem({
    title: "Kth Smallest Element in a BST",
    difficulty: "medium",
    points: 100,
    description:
      "Find the kth smallest value in a binary search tree.",
    sampleInput: "6 3\n5 3 6 2 4 null null 1",
    sampleOutput: "3",
  }),
  makeProblem({
    title: "Construct Binary Tree from Preorder and Inorder Traversal",
    difficulty: "medium",
    points: 100,
    description:
      "Construct the binary tree using preorder and inorder traversals and print its postorder traversal.",
    sampleInput: "3\n3 9 20\n3\n9 3 20",
    sampleOutput: "9 20 3",
  }),
  makeProblem({
    title: "Lowest Common Ancestor of a Binary Search Tree",
    difficulty: "medium",
    points: 100,
    description:
      "Find the lowest common ancestor of two nodes in a BST.",
    sampleInput: "6 2 8\n6 2 8 0 4 7 9",
    sampleOutput: "6",
  }),
  makeProblem({
    title: "Binary Tree Right Side View",
    difficulty: "medium",
    points: 100,
    description:
      "Print the values visible when the binary tree is viewed from the right side.",
    sampleInput: "5\n1 2 3 null 5 null 4",
    sampleOutput: "1 3 4",
  }),
  makeProblem({
    title: "Diameter of Binary Tree",
    difficulty: "medium",
    points: 100,
    description:
      "Find the diameter of a binary tree.",
    sampleInput: "5\n1 2 3 4 5",
    sampleOutput: "3",
  }),
  makeProblem({
    title: "Balanced Binary Tree",
    difficulty: "medium",
    points: 100,
    description:
      "Determine whether a binary tree is height-balanced.",
    sampleInput: "5\n3 9 20 null null 15 7",
    sampleOutput: "true",
  }),
  makeProblem({
    title: "Serialize and Deserialize Binary Tree",
    difficulty: "hard",
    points: 150,
    description:
      "Design algorithms to serialize and deserialize a binary tree. Print the serialized representation after rebuilding the tree.",
    sampleInput: "1 2 3 null null 4 5",
    sampleOutput: "1 2 3 null null 4 5",
  }),
];
