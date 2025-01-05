const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }
  root() {
    return this.rootNode;
  }

  add(value) {
    this.rootNode = addInTo(this.rootNode, value);

    function addInTo(node, value) {
      if(!node) {
        return new Node(value);
      }

      if (node.data === value) {
        return node;
      }

      if (value < node.data) {
        node.left = addInTo(node.left, value);
      } else {
        node.right = addInTo(node.right, value);
      }
      return node;
    }
  }

  has(value) {
    return searchInNode(this.rootNode, value);

    function searchInNode(node, value) {
      if(!node) {
        return false;
      }

      if (node.data === value) {
        return true;
      }

      return value < node.data ? 
        searchInNode(node.left, value) :
        searchInNode(node.right, value);
    }
  }

  find(data) {
    let node = this.rootNode;
    while (node) {
      if (node.data === data) {
        return node;
      } else if (node.data < data) {
        node = node.right;
      } else {
        node = node.left;
      }
    }
    return null;
    
  }

  remove(data) {
    this.rootNode = removeNode(this.rootNode, data);

    function removeNode(node, value) {
      if (!node) {
        return null;
      }

      if (value < node.data) {
        node.left = removeNode(node.left, value);
        return node;
      } else if (node.data < value) {
        node.right = removeNode(node.right, value);
        return node;
      } else {
        if (!node.left && !node.right) {
          return null;
        }
        if (!node.left) {
          node = node.right;
          return node;
        }
        if (!node.right) {
          node = node.left;
          return node;
        }

        let minOnRight = node.right;
        while (minOnRight.left) {
          minOnRight = minOnRight.left
        }
        node.data = minOnRight.data;

        node.right = removeNode(node.right, minOnRight.data);

        return node;
      }
    }
  }

  min() {
    if (!this.rootNode) {
      return;
    }

    let node = this.rootNode;
    while (node.left) {
      node = node.left;
    }

    return node.data;
  }

  max() {
    if (!this.rootNode) {
      return;
    }
    let node = this.rootNode;
    while(node.right) {
      node = node.right;
    }

    return node.data;
  }
}

module.exports = {
  BinarySearchTree
};