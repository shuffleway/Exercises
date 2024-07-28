/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

  minDepth() {
    if (!this.root) return 0;
  
    const queue = [[this.root, 1]];
  
    while (queue.length) {
      let [node, depth] = queue.shift();
  
      if (!node.left && !node.right) return depth;
      if (node.left) queue.push([node.left, depth + 1]);
      if (node.right) queue.push([node.right, depth + 1]);
    }
  }
  

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

  maxDepth() {
    const maxDepthHelper = (node) => {
      if (!node) return 0;
      return 1 + Math.max(maxDepthHelper(node.left), maxDepthHelper(node.right));
    };
  
    return maxDepthHelper(this.root);
  }
  

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

  maxSum() {
    // If the tree is empty, return 0
    if (!this.root) return 0;

    let maxSum = -Infinity;

    const maxSumHelper = (node) => {
      if (!node) return 0;

      // Compute the maximum sum of paths through the left and right children
      const leftSum = Math.max(maxSumHelper(node.left), 0);
      const rightSum = Math.max(maxSumHelper(node.right), 0);

      // Update the maximum sum considering the current node's value
      const currentSum = node.val + leftSum + rightSum;
      maxSum = Math.max(maxSum, currentSum);

      // Return the maximum sum of the path extending through the current node
      return node.val + Math.max(leftSum, rightSum);
    };

    maxSumHelper(this.root);
    return maxSum;
  }
  

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

  nextLarger(lowerBound) {
    if (!this.root) return null;
  
    let queue = [this.root];
    let nextLarger = null;
  
    while (queue.length) {
      let node = queue.shift();
  
      if (node.val > lowerBound && (nextLarger === null || node.val < nextLarger)) {
        nextLarger = node.val;
      }
  
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  
    return nextLarger;
  }
  

  /** Further study!
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents. ) */

  areCousins(node1, node2) {
    if (!this.root) return false;
  
    const getNodeInfo = (node, target, depth = 0, parent = null) => {
      if (!node) return null;
      if (node === target) return { depth, parent };
  
      return getNodeInfo(node.left, target, depth + 1, node) || 
             getNodeInfo(node.right, target, depth + 1, node);
    };
  
    const info1 = getNodeInfo(this.root, node1);
    const info2 = getNodeInfo(this.root, node2);
  
    return info1 && info2 && info1.depth === info2.depth && info1.parent !== info2.parent;
  }
  

  /** Further study!
   * serialize(tree): serialize the BinaryTree object tree into a string. */

  static serialize(tree) {
    const serializeHelper = (node) => {
      if (!node) return "null";
      return `${node.val},${serializeHelper(node.left)},${serializeHelper(node.right)}`;
    };
  
    return serializeHelper(tree.root);
  }
  
  /** Further study!
   * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */

  static deserialize(data) {
    const deserializeHelper = (nodes) => {
      if (nodes[0] === "null") {
        nodes.shift();
        return null;
      }
  
      let root = new BinaryTreeNode(parseInt(nodes.shift()));
      root.left = deserializeHelper(nodes);
      root.right = deserializeHelper(nodes);
  
      return root;
    };
  
    return new BinaryTree(deserializeHelper(data.split(",")));
  }
  

  /** Further study!
   * lowestCommonAncestor(node1, node2): find the lowest common ancestor
   * of two nodes in a binary tree. */

  lowestCommonAncestor(node1, node2) {
    const lcaHelper = (node, p, q) => {
      if (!node || node === p || node === q) return node;
  
      let left = lcaHelper(node.left, p, q);
      let right = lcaHelper(node.right, p, q);
  
      if (left && right) return node;
      return left || right;
    };
  
    return lcaHelper(this.root, node1, node2);
  }
  
}

module.exports = { BinaryTree, BinaryTreeNode };
