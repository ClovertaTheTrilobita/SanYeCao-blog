---
title: "[Study Notes] Patching the Native Binary Tree—-Threading a Binary Tree"
pubDate: 2026-08-04
description: 'Searching forward and backward in a binary tree—the solution programmers came up with is...?!'
author: "Cloverta"
image:
  url: "https://files.seeusercontent.com/2026/08/04/fkE6/pasted-image-1785836458506.webp"
  alt: "bintree"
tags: ["Study Notes", "Data Structures"]
---

<p style="font-size: 0.85rem;"><i><sub>Content translated by <a href="https://chatgpt.com/">ChatGPT</a>.</sub></i></p>
Good morning, afternoon, and evening, everyone.

Summer has already arrived, bringing us into the hottest season of the year. For Hainan Island, where the author lives, however, this is merely another ordinary day between March and December. The year-round heat feels like an endless August. (lol

I changed the article's URL to a summary of the article title (just like many of my friends' blog settings), I hope this will help others get a better sense of the article's overview:)

## Before We Begin, Here Is What You Need to Know—Binary Tree Traversal

Putting facts aside, suppose there happens to be a binary tree right in front of you. How should you obtain all of its nodes?

<img src="https://files.seeusercontent.com/2026/08/04/cyJ5/drawio.png" alt="Untitled drawing.drawio.png" title="Untitled drawing.drawio.png" style="display: block; margin: 0 auto;">

<del>The answer is to count them one by one from top to bottom. (gets beaten up</del>

From a computer's perspective, however, for a binary tree defined like this:

```c
#define ElemType int
typedef struct BiTNode{
  ElemType data;
  struct BiTNode *lchild, *rchild; // Left and right children
}BiTNode, *BiTree;
```

After you give the program a root node, all it knows is this **root node**, along with the **address of its left child** and the **address of its right child**.

From a brute-force-solves-everything perspective, we could indeed read every left and right subtree one by one, store each of them separately in memory, and then use other variables to specify their relationships... But! That would be extremely inelegant. Besides, if we are going to go through all that trouble anyway, then what was the point of designing this binary tree to optimize performance in the first place? (

Therefore, we first need to learn the elegant traversal methods that real programmers should use—preorder, inorder, and postorder traversal.

### Traversal

Imagine that we first obtain node $A$. There are three things we can do: **read its value**, **explore its left child**, and **explore its right child**.

For preorder traversal, we first read the value and then explore the left and right children.

```c
void PreOrder(BiTree T) {
  if (T!=NULL) { // When the passed-in node T is not empty
    visit(T); // Visit this node
    PreOrder(T->lchild); // Enter ♂ its left child
    PreOrder(T->rchild); //	Enter the right child
  }
}

void visit(BiTree T) {
  print(T->data);
}
```

This is obviously a [recursive](https://zh.wikipedia.org/zh-cn/递归) approach. Explaining this thing is rather tedious, and it is not the topic of this article. If you have questions about the code, you can refer to this video:

<iframe   src="https://player.bilibili.com/player.html?isOutside=true&aid=92191094&bvid=BV1b7411N798&cid=317873196&p=46&autoplay=0"   scrolling="no"   frameborder="3"   allowfullscreen="true"   loading="lazy"   style="     display: block;     width: min(70%, 960px);     aspect-ratio: 16 / 9;     height: auto;     margin: 1.5rem auto;     border: 0;   " ></iframe>

It is definitely not because I am lazy. Nope.

Similarly, inorder traversal simply places `visit()` in the middle.

```c
void PreOrder(BiTree T) {
  if (T!=NULL) { // When the passed-in node T is not empty
    PreOrder(T->lchild); // Enter the left child
    visit(T); // Visit this node
    PreOrder(T->rchild); //	Enter the right child
  }
}
```

There is no need for me to elaborate on postorder traversal either.

```c
void PreOrder(BiTree T) {
  if (T!=NULL) { // When the passed-in node T is not empty
    PreOrder(T->lchild); // Enter the left child
    PreOrder(T->rchild); //	Enter the right child
    visit(T); // Visit this node
  }
}
```

## Threading a Binary Tree

We are now faced with a new problem: once we obtain a node, how do we get the node that comes before it in the traversal sequence?

Surely we cannot traverse the entire tree from the beginning every single time. That would be far too troublesome.

Look, the left or right children of some nodes in the tree are still empty. Could we perhaps make use of them?

### The Idea

We use the unused pointers in the binary tree to establish indexes, making them point to their own predecessor or successor nodes.

<b>Convention:</b> In a threaded binary tree, the **left thread pointer points to the predecessor node**, while the **right thread pointer points to the successor node**.

For this tree:

<img src="https://files.seeusercontent.com/2026/08/04/cyJ5/drawio.png" alt="Untitled drawing.drawio.png" title="Untitled drawing.drawio.png" style="display: block; margin: 0 auto;">

Its preorder sequence is: $ABDEFGC$

We can therefore establish thread pointers so that the left child of $D$ points to $B$, while its right child points to $E$. Similarly, the left child of $F$ points to $E$, while its right child points to $G$.

In the end, we obtain the following diagram:

<img src="https://files.seeusercontent.com/2026/08/04/0jrH/drawio.png" alt="Preorder-threaded binary tree.drawio.png" title="Preorder-threaded binary tree.drawio.png" style="display: block; margin: 0 auto;">

Since there is no node after $C$, the right child of $C$ points to `NULL`.

Pretty simple, right? Let us consider how to implement it in code.

### Code

#### Threading a Preorder Traversal

We need to maintain two additional variables in the binary tree structure.

```c
typedef struct ThreadNode {
  ElemType data;
  struct ThreadNode *lchild, *rchild;
  int ltag, rtag;
}ThreadNode, *ThreadTree;
```

If `ltag` is `0`, it means that the left child is an ordinary binary-tree node. If it is `1`, it means that the pointer is a thread.

Suppose we have now reached node $D$. From the program's perspective, how can we obtain its predecessor and successor nodes?

For the predecessor node, we need to define an additional global pointer variable. This way, when we move to the next node, we know who its predecessor is.

```c
ThreadNode *pre = NULL;
```

Then it is very simple. The predecessor of this node is obviously `pre`.

```c
void visit(ThreadNode p){
  if (p->lchild == NULL) { // If the left child of this node is empty
    p->lchild = pre; // Point the left pointer to pre, indicating that the predecessor of p is the node pointed to by pre
    p->ltag = 1; // Set ltag to 1, indicating that this is a thread pointer
  }
  pre = p; // Move pre to the current p, and continue exploring the next node
}
```

How do we find the successor?

It is very simple. Since the predecessor of `p` is `pre`, then the successor of `pre` must be `p`. Therefore:

```c
void visit(ThreadNode p){
  if (p->lchild == NULL) { 
    p->lchild = pre; 
    p->ltag = 1; 
  }
  if (pre != NULL && pre->rchild == NULL){ // If pre is not empty and the right child of pre is empty
    pre->rchild = p; // Point the right pointer of pre to p, indicating that the successor of the node pointed to by pre is p
    pre->rtag = 1; // Set rtag to 1, indicating that this is a thread pointer
  }
  pre = p; 
}
```

After all nodes have been traversed, we arrive at the final node, $C$.

Obviously, both `pre` and `p` now point to $C$. We can directly set the `rtag` of $C$ to `1`, indicating that its successor node is `NULL`.

The recursive code is very similar to ordinary preorder traversal, but there is one point that requires attention. When we visit the left child of a node, we need to check whether that left child is already a defined thread pointer.

```c
void PreThread(ThreadTree T) {
  if (T != NULL) {
    visit(T); // Visit T. If the left child of T is NULL, point it to its predecessor. If the right child of T's predecessor is NULL, point the right pointer of pre to T.
    if (T->ltag != 1) PreThread(T->lchild); // Enter the left child only if it is not a thread pointer
    PreThread(T->rchild); // There is no need to worry about the right child, because we have not yet processed the successor of this node
  }
}
```

Putting the code together gives us:

```c
typedef struct ThreadNode {
  ElemType data;
  struct ThreadNode *lchild, *rchild;
  int ltag, rtag; // A value of 0 indicates that the corresponding left/right pointer points to an ordinary node, while 1 indicates that the corresponding pointer is a thread pointer.
}ThreadNode, *ThreadTree;

ThreadNode *pre = NULL;

void visit(ThreadNode p){
  if (p->lchild == NULL) { // If the left child of this node is empty
    p->lchild = pre; // Point the left pointer to pre, indicating that the predecessor of p is the node pointed to by pre
    p->ltag = 1; // Set ltag to 1, indicating that this is a thread pointer
  }
  if (pre != NULL && pre->rchild == NULL){ // If pre is not empty and the right child of pre is empty
    pre->rchild = p; // Point the right pointer of pre to p, indicating that the successor of the node pointed to by pre is p
    pre->rtag = 1; // Set rtag to 1, indicating that this is a thread pointer
  }
  pre = p; // Move pre to the current p, and continue exploring the next node
}

void PreThread(ThreadTree T) {
  if (T != NULL) {
    visit(T); // Visit T. If the left child of T is NULL, point it to its predecessor. If the right child of T's predecessor is NULL, point the right pointer of pre to T.
    if (T->ltag != 1) PreThread(T->lchild); // Enter the left child only if it is not a thread pointer
    PreThread(T->rchild); // There is no need to worry about the right child, because we have not yet processed the successor of this node
  }
}

void CreatePreThread(ThreadTree T){
  pre = NULL; // Initialize the pre pointer
  if (T != NULL) {
    PreThread(T); // Begin recursion
    if (pre->rchild==NULL) 
      // After the preorder traversal recursion ends, pre should point to the final node C, which will never have a right child under any circumstances.
      // However, in a postorder traversal, pre would actually point to A rather than C, and the right child of A is not empty, so it cannot be used directly as a thread.
      // Therefore, for the sake of code reusability, we add this check.
      pre->rtag=1; // If it has no right child, directly indicate that its successor node is NULL
  }
}
```

#### Threading Inorder and Postorder Traversals

The underlying idea is actually very similar. Only the visiting order differs, while the specific `visit()` code remains the same, so I will not elaborate further here.

**Inorder threading**:

```c
void InThread(ThreadTree T){
	if (T!=NULL){
    InThread(T->lchild);
    visit(T);
    InThread(T->rchild);
  }	
}
```

**Postorder threading**:

```c
void PostThread(ThreadTree T) {
  if (T!=NULL) {
    PostThread(T->lchild);
    PostThread(T->rchild);
    visit(T);
  }
}
```



## Using a Threaded Binary Tree to Find Predecessors and Successors

Ahem... What was our original goal again...? Right, given a node, find its predecessor and successor!

### Inorder-Threaded Binary Tree

Here, we will first introduce how to find predecessors and successors in an **inorder-threaded binary tree**. Preorder and postorder have certain special characteristics, which we will discuss later.

<img src="https://files.seeusercontent.com/2026/08/04/O5ts/drawio.png" alt="Inorder threads.drawio.png" title="Inorder threads.drawio.png" style="display: block; margin: 0 auto;">

For convenience, I have gone ahead and posted the inorder-threaded binary tree here. Those who are interested can work it out for themselves. (

Obviously, if a node has both a left thread and a right thread, then the left thread is its predecessor and the right thread is its successor. For example, we can tell at a glance that the predecessor of $D$ is `NULL`, while its successor is $B$. Absolutely poggers!

But what about a node without any thread pointers? For example, how do we find the predecessor and successor of $A$?

#### The Successor

It is actually very simple. Since the order of inorder traversal is:

$$
Left \ Root \ Right
$$

The successor of node $A$ must be located in its right subtree. Expanding the right subtree gives us:

$$
Left \ Root \ (Left \ Root \ Right)
$$

The highest-priority candidate for the successor of this node must therefore be the leftmost leaf node in the right subtree.

If no left leaf node exists, then we have:

$$
Left \ Root \ (Root \ Right)
$$

In other words, the root node of that subtree is the successor.

What? You are asking about the right node? If the root node does not exist, how could there possibly be a right node? Therefore, we do not need to consider the right node of the citrus tree.

Thus:

```c
ThreadNode *FirstNode(ThreadNode *p) {  // This is the second step; the first step is the function below
	while(p->ltag==0) p = p->lchild; // Keep going deeper into the left subtree until the leftmost node is found—in other words, a node without a left child
  return p; // This node is the successor we are looking for
}

ThreadNode *NextNode(ThreadNode *p) {
  if (p->rtag==0) return Firstnode(p->rchild); // If a right child exists, enter the right subtree
  else return p->rchild;  // If the right pointer is a thread pointer, then the node it points to is the successor
}
```

#### The Predecessor

The idea is similar to that of finding the successor. The predecessor must be in the left subtree of node $A$. Expanding the left subtree gives us:

$$
(Left \ Root \ Right) \ Root \ Right
$$

As we can see, the highest-priority candidate for the predecessor is the rightmost leaf node in the left subtree.

If no right leaf node exists, then we have:

$$
(Left \ Root) \ Root \ Right
$$

Similarly, our approach is to find the rightmost node in the left subtree:

```c
ThreadNode *LastNode(ThreadNode *p){ // This is the second step; the first step is the function below
	while(p->rtag==0) p = p->rchild; // Keep going deeper into the right subtree until the rightmost node is found—in other words, a node without a right child
  return p;
}

ThreadNode *PreNode(ThreadNode *p){
  if (p->ltag==0) return LastNode(p->lchild); // If there is a left child, enter the left subtree
  else return p->lchild; // Is there a thread on the left? Then it has already told us the predecessor
}
```

### Preorder-Threaded Binary Tree

#### The Successor

This is actually similar to inorder traversal. We know that the order of preorder traversal is:

$$
Root \ Left \ Right
$$

Therefore, the successor in preorder traversal should be found in the left subtree. Expanding the left subtree gives us:

$$
Root \ (Root \ Left \ Right) \ Right
$$

In other words, when a left child exists, the successor is simply the left child! Pretty simple, right?

<b>What if there is no left child?</b>

$$
Root \ Right
$$

In this case, we look at its right child:

$$
Root \ (Root \ Left \ Right)
$$

Obviously, its successor is the right child.

<b>What if there is no right child either?</b>

Even better. Would that not mean its right pointer is a thread? The right pointer points directly to its successor node.

#### The Predecessor

If the node has no left child, then its left pointer points to its predecessor. This is very simple.

But what if it has a left child?

Oh dear, now things get troublesome. Since the preorder traversal order is:

$$
Root \ Left \ Right
$$

The elements in the left and right subtrees must be visited after the root. Unless we traverse the entire tree again from the beginning, there is no way to directly find the predecessor of the root using the current data structure.

<b>But rules are made to be broken!</b> (booming voice

We can modify this binary tree into a <b>ternary tree</b>.

> **Ternary tree**: Compared with an ordinary binary tree, it has one additional pointer that points to the parent node.

If we know its parent node, the situation becomes different.

##### The Root Node Is the Left Child of Its Parent

In this case, the traversal order is:

$$
Parent \ Root \ Right\ Sibling
$$

Therefore, the predecessor of the root is its parent node.

##### The Root Is the Right Child of Its Parent

The traversal order then becomes:

$$
Parent \ Left\ Sibling \ Root
$$

Expanding the left subtree of the parent node gives us:

$$
Parent \ (Left\ Sibling \ Left's\ Left \ Left's\ Right) \ Root
$$

Does this look familiar? We need to find the rightmost node within the left sibling's subtree. The process is similar to inorder traversal, so I will not elaborate on it here.

I hope the word “left” still looks familiar to you.

### Postorder-Threaded Binary Tree

It is exactly the opposite of preorder.

#### The Predecessor

Since the traversal order is:

$$
Left \ Right \ Root
$$

You know what I am about to say. Give it a try yourself.

#### The Successor

We also need to turn it into a <b>ternary tree</b>, and we need to know its parent node in advance.

##### The Root Is the Parent's Left Child

I trust that you understand what this subheading means. (trying not to laugh

The traversal order is:

$$
Root \ Right\ Sibling \ Parent
$$

Obviously, we need to expand the subtree of the right sibling:

$$
Root\ (Right's\ Left \ Right's\ Right \ Right\ Sibling) \ Parent
$$

That is, we need to find the leftmost node in the right sibling's subtree.

##### The Root Is the Parent's Right Child

$$
Left\ Sibling \ Root \ Parent
$$

Then it is obvious that the successor of the root node is its parent node.