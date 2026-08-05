---
title: "[学习笔记]给原生二叉树打上补丁——二叉树的线索化"
pubDate: 2026-08-04
description: '二叉树的向前和向后搜索，程序员们给出的解决方法是……？！'
author: "三叶"
image: 
    url: "https://files.seeusercontent.com/2026/08/04/fkE6/pasted-image-1785836458506.webp"
    alt: "bintree"
tags:  ["学习笔记", "数据结构"]
---

各位早上中午晚上好。

时间已然进入夏天，进入了全年最炎热的季节。而对于笔者所在的海南岛来说则又是3月至12月的寻常一天罢了，全年的高温就好似漫无止境的八月一般（笑

我把文章的url改为了文章标题的概括（和许多朋友的博客设定一样），希望这有助于其他人更好的了解文章概览:)

## 在开始之前，你需要知道的——二叉树的遍历

抛开事实不谈，假如你面前正好有一颗二叉树，你应该怎么获取它全部的节点呢？

<img src="https://files.seeusercontent.com/2026/08/04/cyJ5/drawio.png" alt="未命名绘图.drawio.png" title="未命名绘图.drawio.png" style="display: block; margin: 0 auto;">

<del>答案是从上到下一个一个数（挨打</del>。

但是从计算机的角度来看，对于一个如此定义的二叉树:

```c
#define ElemType int
typedef struct BiTNode{
  ElemType data;
  struct BiTNode *lchild, *rchild; // 左右孩子
}BiTNode, *BiTree;
```

当你给了程序一个根节点之后，它所知道的只有这个**根节点**还有它的**左孩子的地址**与**右孩子的地址**。

从某种力大砖飞的角度来说，我们确实可以一个一个读它所有的左右子树并且把它们都单独存在内存中并再存其他变量来指定它们的关系……但是！这非常的不优雅，而且既然都大费周章的这样搞了那我们设计这个二叉树来优化性能的目的是什么（

所以我们需要先了解一下真正程序员应该做的优雅遍历方式——先序、中序和后序遍历。

### 遍历

试想当我们首先拿到A节点，我们可以做的事情有3个：**读取它的值**、**探索它的左孩子**、**探索它的右孩子**。

对于先序遍历来说，我们首先读取值，再探索左右孩子

```c
void PreOrder(BiTree T) {
  if (T!=NULL) { // 当传入的节点T非空时
    visit(T); // 访问这个节点
    PreOrder(T->lchild); // 进入♂它的左孩子
    PreOrder(T->rchild); //	进入右孩子
  }
}

void visit(BiTree T) {
  print(T->data);
}
```

这显然是一种[递归](https://zh.wikipedia.org/zh-cn/%E9%80%92%E5%BD%92)的思想。这玩意儿讲解起来挺繁琐的，而且本文章的主题并不是这个，如果你对代码有疑惑可以参考这个视频：

<iframe
  src="https://player.bilibili.com/player.html?isOutside=true&aid=92191094&bvid=BV1b7411N798&cid=317873196&p=46&autoplay=0"
  scrolling="no"
  frameborder="3"
  allowfullscreen="true"
  loading="lazy"
  style="
    display: block;
    width: min(70%, 960px);
    aspect-ratio: 16 / 9;
    height: auto;
    margin: 1.5rem auto;
    border: 0;
  "
></iframe>


绝对不是因为我懒，嗯。

同理中序遍历就是把`visit()`放在中间

```c
void PreOrder(BiTree T) {
  if (T!=NULL) { // 当传入的节点T非空时
    PreOrder(T->lchild); // 进入左孩子
    visit(T); // 访问这个节点
    PreOrder(T->rchild); //	进入右孩子
  }
}
```

后序遍历也就不用我赘述

```c
void PreOrder(BiTree T) {
  if (T!=NULL) { // 当传入的节点T非空时
    PreOrder(T->lchild); // 进入左孩子
    PreOrder(T->rchild); //	进入右孩子
    visit(T); // 访问这个节点
  }
}
```

## 二叉树的线索化

现在我们面临了一个新的难题：拿到了一个节点，我们该如何获取遍历序列中它的上一个节点？

我们总不能每一次都从头再遍历一遍吧，这太麻烦了。

你看，树上有些节点的左孩子/右孩子还是空的，那我们是不是可以对它稍加利用？

### 思想

我们利用二叉树空出来的指针建立起索引，让它们指向自己的前驱/后继节点。

<b>规定：</b>线索二叉树的**左索引指针指向前驱节点**，**右索引指针指向后继节点**。

对于这颗树来说

<img src="https://files.seeusercontent.com/2026/08/04/cyJ5/drawio.png" alt="未命名绘图.drawio.png" title="未命名绘图.drawio.png" style="display: block; margin: 0 auto;">

它的先序序列为：$ABDEFGC$

那么我们可以建立起索引指针，让 $D$ 的左孩子指向 $B$ ，右孩子指向 $E$ 。同理，$F$ 的左孩子指向 $E$，右孩子指向 $G$。

最终我们可以得到如下的图

<img src="https://files.seeusercontent.com/2026/08/04/0jrH/drawio.png" alt="先序线索二叉树.drawio.png" title="先序线索二叉树.drawio.png" style="display: block; margin: 0 auto;">

由于 $C$ 之后没有节点了，所以 $C$ 的右孩子指向`NULL`。

很简单对吧？我们来考虑下代码怎么实现。

### 代码

#### 先序遍历的线索化

我们需要在二叉树的结构体中额外维护两个变量

```c
typedef struct ThreadNode {
  ElemType data;
  struct ThreadNode *lchild, *rchild;
  int ltag, rtag;
}ThreadNode, *ThreadTree;
```

`ltag`若为`0`则代表左孩子是普通的二叉树节点，如果为`1`则代表是线索节点。

假如我们现在拿到了 $D$ 节点。试想一下从程序的角度我们怎么获取它的前驱和后继节点？

对于前驱节点来说，我们需要额外定义一个全局的指针变量，这样我们移动到下一个节点时就知道下个节点的前驱是谁了。

```c
ThreadNode *pre = NULL;
```

那么很简单，这个节点的前驱显而易见就是`pre`了。

```c
void visit(ThreadNode p){
  if (p->lchild == NULL) { // 如果这个节点的左孩子空着
    p->lchild = pre; // 把左指针指向pre，表示p的前驱是pre指向的节点
    p->ltag = 1; // 把ltag设置为1，表示这是个索引指针
  }
  pre = p; // pre指向下一位p，我们继续探索下一个节点
}
```

怎么寻找后继呢？

很简单，既然`p`的前驱是`pre`，那`pre`的后继就肯定是`p`呀，那么就有

```c
void visit(ThreadNode p){
  if (p->lchild == NULL) { 
    p->lchild = pre; 
    p->ltag = 1; 
  }
  if (pre != NULL && pre->rchild == NULL){ // 如果pre非空且pre的右孩子为空
    pre->rchild = p; // 把pre的右指针指向p，表示pre指向的节点的后继是p
    pre->rtag = 1; // rtag设置为1，表示这是个索引指针
  }
  pre = p; 
}
```

当所有的节点遍历结束，我们来到了最后一个节点 $C$。

很显然此时`pre`和`p`都指向 $C$，我们直接将 $C$ 的`rtag`标为`1`即可，表明它的后继节点是`NULL`。

递归代码和普通先序遍历很接近，但是有一个点需要注意一下。当我们访问节点的左孩子时，我们需要检查一下这个左孩子是不是一个已经定义好的线索指针。

```c
void PreThread(ThreadTree T) {
  if (T != NULL) {
    visit(T); // 访问T，如果T的左孩子为NULL则将其指向前驱，如果T的前驱的右孩子为NULL则将pre的右指针指向T。
    if (T->ltag != 1) PreThread(T->lchild); // 如果左孩子不是线索指针才进入左孩子
    PreThread(T->rchild); // 右孩子不必担心，因为此时我们并未处理该节点的后继
  }
}
```

整理一下代码可以得到

```c
typedef struct ThreadNode {
  ElemType data;
  struct ThreadNode *lchild, *rchild;
  int ltag, rtag; // 为0则表明对应的左/右指针指向普通节点，为1则表明对应指针是线索指针。
}ThreadNode, *ThreadTree;

ThreadNode *pre = NULL;

void visit(ThreadNode p){
  if (p->lchild == NULL) { // 如果这个节点的左孩子空着
    p->lchild = pre; // 把左指针指向pre，表示p的前驱是pre指向的节点
    p->ltag = 1; // 把ltag设置为1，表示这是个索引指针
  }
  if (pre != NULL && pre->rchild == NULL){ // 如果pre非空且pre的右孩子为空
    pre->rchild = p; // 把pre的右指针指向p，表示pre指向的节点的后继是p
    pre->rtag = 1; // rtag设置为1，表示这是个索引指针
  }
  pre = p; // pre指向下一位p，我们继续探索下一个节点
}

void PreThread(ThreadTree T) {
  if (T != NULL) {
    visit(T); // 访问T，如果T的左孩子为NULL则将其指向前驱，如果T的前驱的右孩子为NULL则将pre的右指针指向T。
    if (T->ltag != 1) PreThread(T->lchild); // 如果左孩子不是线索指针才进入左孩子
    PreThread(T->rchild); // 右孩子不必担心，因为此时我们并未处理该节点的后继
  }
}

void CreatePreThread(ThreadTree T){
  pre = NULL; // 初始化pre指针
  if (T != NULL) {
    PreThread(T); // 开始递归
    if (pre->rchild==NULL) 
      // 先序遍历递归结束后，pre应当指向的是最后一个节点C,它在任何情况下都不会有右孩子。
      // 但若是后序遍历，那么pre指向的其实是A而不是C，而A的右孩子非空，不可直接用作索引。
      // 所以为了代码的可复用性我们加上这一个判断。
      pre->rtag=1; // 若它没有右孩子，我们直接表示它的后继节点是NULL
  }
}
```

#### 中序、后序遍历的线索化

其实思路非常相近，只是访问次序不一样，且具体的`visit()`代码是一样的，在这里我就不过多赘述。

**中序线索化**：

```c
void InThread(ThreadTree T){
	if (T!=NULL){
    InThread(T->lchild);
    visit(T);
    InThread(T->rchild);
  }	
}
```

**后序线索化**：

```c
void PostThread(ThreadTree T) {
  if (T!=NULL) {
    PostThread(T->lchild);
    PostThread(T->rchild);
    visit(T);
  }
}
```



## 利用线索二叉树寻找前驱后继

咳咳……我们最初的目的是什么来着……！对，给定一个节点找它的前驱和后继！

### 中序线索二叉树

这里我们先介绍**中序线索二叉树**寻找前驱后继的方法，先序和后序具有特殊性，这一点我们后面再讲。

<img src="https://files.seeusercontent.com/2026/08/04/O5ts/drawio.png" alt="中序线索.drawio.png" title="中序线索.drawio.png" style="display: block; margin: 0 auto;">

那么为了方便，我就先把中序线索的二叉树贴出来了，感兴趣的可以去计算一下（

显而易见地，如果一个节点存在左线索和右线索，那么左线索就是前驱，右线索就是后继，就像我们一眼就能看出 $D$ 的前驱是`NULL`，后继是 $B$ ，蒸蚌！

但对于一个没有线索指针的节点呢？比如说 $A$，我们怎么寻找它的前驱后继？

#### 对于后继

其实很简单，由于我们中序遍历的顺序是
$$
左 \ \ 根 \ \ 右
$$
那 $A$ 节点的后继必然是在它的右子树中，把右子树展开来看
$$
左 \ \ 根 \ \ (左\ \ 根\ \ 右)
$$
该节点的后继必然最优先是右子树中的最左叶子节点。

如果左叶子节点不存在，则是
$$
左\ \ 根\ \ ( 根\ \ 右)
$$
即该子树的根节点。

什么？你问右节点？根节点如果不存在，怎么可能会有右节点嘛，所以柚子树的右节点我们不纳入考虑。

于是乎有

```c
ThreadNode *FirstNode(ThreadNode *p) {  // 这是第二步，第一步是下面那个函数
  while(p->ltag==0) p = p->lchild; // 不断向左子树深入，直到找到最左的节点，换言之不存在左孩子的节点
  return p; // 这个节点就是我们要找的后继
}

ThreadNode *NextNode(ThreadNode *p) {
  if (p->rtag==0) return Firstnode(p->rchild); // 如果存在右孩子，则进入右子树
  else return p->rchild;  // 如果右指针是个索引指针，那它指向的就是后继
}
```

#### 对于前驱

和后继思想相似，前驱肯定在 $A$ 节点的左子树中，那我们把左子树展开
$$
(左\ \ 根\ \ 右)\ \ 根\ \ 右
$$
可以看到，该节点的前驱最优先是左子树中的右叶子节点。

如果右叶子节点不存在则有
$$
(左\ \ 根 )\ \ 根\ \ 右
$$
同样，我们的思路就是在左子树中找到最右节点：

```c
ThreadNode *LastNode(ThreadNode *p){ // 这是第二步，第一步是下面那个函数
  while(p->rtag==0) p = p->rchild; // 不断向右子树深入，直到找到最靠右的节点，即不存在右孩子的节点
  return p;
}

ThreadNode *PreNode(ThreadNode *p){
  if (p->ltag==0) return LastNode(p->lchild); // 有左孩子就进入左子树
  else return p->lchild; // 左边有索引？那前驱已经告诉我们了
}
```

### 先序线索二叉树

#### 对于后继

和中序其实类似，我们知道先序遍历的顺序是
$$
根\ \ 左\ \ 右
$$
那么先序的后继其实要从左子树中找，我们把左子树展开
$$
根\ \ (根\ \ 左\ \ 右)\ \ 右
$$
即当左孩子存在时，它的后继其实就是左孩子！很简单吧？

<b>如果没有左孩子呢？</b>
$$
根\ \ 右
$$
这时候我们看他的右孩子
$$
根\ \ (根\ \ 左\ \ 右)
$$
显而易见，它的后继就是右孩子。

<b>如果没有右孩子呢？</b>

那太好了，那它的右指针不就是索引嘛？右指针指向的就是后继节点。

#### 对于前驱

如果节点没有左孩子，那么左指针指向的就是前驱。这很简单。

但如果有左孩子呢？

啊呀呀这下子麻烦了，既然先序遍历的顺序是
$$
根\ \ 左\ \ 右
$$
那么左右子树中的元素必定在根之后被访问。除非我们从头来遍历一遍，否则无法在现有数据结构内直接找到根的前驱。

<b>但是规则就是用来打破的！</b>（震声

我们可以把这个二叉树修改为<b>三叉树</b>。

> **三叉树**：比普通二叉树多了一个指向父节点的指针。

如果我们知道它的父节点，那么情况就不一样了。

##### 根节点是父节点的左孩子

在此情况下，遍历顺序是
$$
父 \ \ 根\ \ 右兄弟
$$
那么根的前驱就是父节点

##### 根是父节点的右孩子

那么遍历顺序变成了
$$
父\ \ 左兄弟\ \ 根
$$
把父节点的左子树展开
$$
父\ \ (左兄弟\ \ 左的左\ \ 左的右)\ \ 根
$$
是不是很眼熟？那我们就需要找左兄弟节点中的最右节点，过程和中序遍历相似，在这里我就不展开赘述。

希望你还认识“左”这个字。

### 后序线索二叉树

和先序刚好相反。

#### 对于前驱

因为遍历顺序是
$$
左\ \ 右\ \ 根
$$
你知道我要说什么。动手来试试吧。

#### 对于后继

我们也需要将其设置为<b>三叉树</b>。并且需要提前知道它的父节点。

##### 根是父的左

我相信你能看懂这个小标题是什么意思（憋笑）

那遍历顺序就是
$$
根\ \ 右兄弟\ \ 父
$$
显然需要展开右兄弟的子树
$$
根\ \ (右的左\ \ 右的右\ \ 右兄弟)\ \ 父
$$
那也就是在右兄弟的子树中找到最靠左的节点。

##### 根是父右

$$
左兄弟\ \ 根\ \ 父
$$

那显而易见根节点的后继就是它的父节点。