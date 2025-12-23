---
title: LeetCode刷题小结
published: 2025-07-18
description: Some notes about Algorithm
tags: [Binary Tree, Hash, Two pointers]
category: Algorithm
draft: false
---

知识来源：[labuladong的算法笔记](https://labuladong.online/algo/data-structure-basic/binary-tree-basic/)

==考虑通过pdf阅览的方式，把笔记传上去==


# 二叉树
### 满二叉树(Perfect Binary Tree)
所有父节点都有两个子节点
节点数：等比数列求和 n = 2^h - 1，h代表树的深度

### 完全二叉树(Complete Binary Tree)
每一层的节点都紧凑靠左排列，且除了最后一层，其他每层都必须是满的。

其性质决定它可以用数组来存储，不需要真的构建链式节点。

且 完全二叉树的左右子树中，至少有一棵是满二叉树
### 二叉搜索树(Binary Search Tree) BST
对于树中的每个节点，其左子树的每个节点的值都要小于这个节点的值，右子树的每个节点的值都要大于这个节点的值。你可以简单记为「左小右大」
### 高度平衡二叉树(Height-Balanced Binary Tree)

每个节点左右子树高度差不得超过1

假设高度平衡二叉树中共有 N 个节点，那么高度平衡二叉树的高度是 O(logN)

如果能保证树的高度为 O(logN)，那么这些数据结构的增删查改效率就会很高。

### 自平衡二叉树(Self-Balanced Binary Tree)
通过左旋右旋，让树的高度始终是平衡的
例子：红黑树

### 二叉树的实现方法

常规方法：
```cpp
class TreeNode {
public:
    int val;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

// 你可以这样构建一棵二叉树：
TreeNode* root = new TreeNode(1);
root->left = new TreeNode(2);
root->right = new TreeNode(3);
root->left->left = new TreeNode(4);
root->right->left = new TreeNode(5);
root->right->right = new TreeNode(6);

// 构建出来的二叉树是这样的：
//     1
//    / \
//   2   3
//  /   / \
// 4   5   6
```

其他方法：

用哈希表表示二叉树，键存父节点id，值存子节点id (又称 邻接表)
```cpp
// 1 -> {2, 3}
// 2 -> {4}
// 3 -> {5, 6}

unordered_map<int, vector<int>> tree;
tree[1] = {2, 3};
tree[2] = {4};
tree[3] = {5, 6};
```
还有二叉堆、并查集

## 二叉树的递归/层序遍历
递归->DFS, 层序->BFS

### 递归遍历
先序、中序、后序（记忆父节点的访问时机）：
中左右、左中右、左右中

而对于框架的修改，先、中、后的区别只有操作代码在traverse中的的位置
#### 二叉树递归遍历的框架
```cpp
// 基本的二叉树节点
class TreeNode {
public:
    int val;
    TreeNode* left;
    TreeNode* right;

    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

// 二叉树的递归遍历框架
void traverse(TreeNode* root) {
    if (root == nullptr) {
        return;
    }
    //先序位置
    traverse(root->left);
    //中序位置
    traverse(root->right);
    //后序位置
}
```
其中，BST的中序遍历是有序的

### 层序遍历（BFS）
用的比较多的写法：
```cpp
void levelOrderTraverse(TreeNode* root) {
    if (root == nullptr) {
        return;
    }
    queue<TreeNode*> q;
    q.push(root);
    // 记录当前遍历到的层数（根节点视为第 1 层）
    int depth = 1;

    while (!q.empty()) {
        // 队列的长度
        int sz = q.size();
        for (int i = 0; i < sz; i++) {
            TreeNode* cur = q.front();
            q.pop();
            // 访问 cur 节点，同时知道它所在的层数
            cout << "depth = " << depth << ", val = " << cur->val << endl;

            // 把 cur 的左右子节点加入队列
            if (cur->left != nullptr) {
                q.push(cur->left);
            }
            if (cur->right != nullptr) {
                q.push(cur->right);
            }
        }
        depth++;
    }
}
```
## [111. 二叉树的最小深度](https://leetcode.cn/problems/minimum-depth-of-binary-tree/)

核心思想：层序遍历BFS，使用队列，当第一次遇到叶子结点时，此时的深度就是最小深度。

```cpp
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    int minDepth(TreeNode* root) {
        if(root == nullptr){
            return 0;
        }
        int depth = 1;
        queue<TreeNode*> q;
        q.push(root);
        while(!q.empty()){
            int sz = q.size();
            // cout<<sz<<endl;
            for(int i=0; i<sz; i++){
                TreeNode* cur = q.front();
                q.pop();
                if(cur->left == nullptr && cur->right == nullptr){
                    return depth;
                }
                if(cur->left != nullptr){
                    q.push(cur->left);
                }
                if(cur->right != nullptr){
                    q.push(cur->right);
                }
            }
            depth++;
        }
        return 0;
    }
};
```
## 104. 二叉树的最大深度
核心思想：盲猜应该是DFS，对的

递归，进入结点时增加深度。退出结点时减少深度。在这个过程中用两个外部变量记录，取max
```cpp
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    int res = 0;
    int depth = 0;

    int maxDepth(TreeNode* root) {
        traverse(root);
        return res;
    }
    void traverse(TreeNode* root){
        if(root == nullptr) return;

        depth++;
        if(root->left == nullptr && root->right == nullptr) res = std::max(depth,res);
        traverse(root->left);
        traverse(root->right);
        depth--;
    }
};
```
# 哈希表

## 1. 两数之和
利用unordered_map<int, int> hashmap;
核心是，哈希表的键和值可以是各种数据类型，所以如果让key存数组的value，value存数组的下标，在查数的时候，就可以用O(1)的时间复杂度，利用哈希表快速找到数对应索引下标。

```cpp
#include <vector>
#include <unordered_map>
class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> hashmap;
        for(int i = 0; i < nums.size(); i++){
            int compliment = target - nums[i];
            if(hashmap.count(compliment)){
                return {hashmap[compliment],i};
            }
            else{
                hashmap[nums[i]] = i;
            }
        }
        return {};
    }
};
```
## 49. 字母异位分词
哈希表的遍历方法：
for(auto& pair : hash)

key: pair.first

value: pair.second

```cpp
class Solution {
public:
    vector<vector<string>> groupAnagrams(vector<string>& strs) {
        unordered_map<string, vector<string>> hash;
        for(string& s : strs){
            string sorted_s = s;
            ranges::sort(sorted_s); //排序
            hash[sorted_s].push_back(s);
        }
        vector<vector<string>> ans;
        for(auto& pair : hash){
            ans.push_back(pair.second);
        }
        return ans;
    }
};
```

# 双指针
适用场景：原地操作

## 11. 乘更多的水
贪心思想，每次都向里移动高度较小的那一条边
```cpp
#include<algorithm>
class Solution {
public:
    int maxArea(vector<int>& height) {
        //关键在于，一定要从两边开始往里边移动，这样可以保证宽度是递减的
        int left = 0, right = height.size()-1;
        int maxArea = 0;
        while(left != right){
            int short_ = min(height[left], height[right]);
            int v = (right - left) * short_;
            maxArea = max(maxArea, v);
            if(short_ == height[left]){
                left++;
            }
            else{
                right--;
            }
        }
        return maxArea;
    }
};

```

# 滑动窗口



# 字符串、子串



# 动态规划

