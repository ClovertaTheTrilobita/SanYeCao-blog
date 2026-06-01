---
title: "[学习笔记]奇怪的撬棍符号∫——不定积分篇"
pubDate: 2026-06-02
description: '一群快乐的大学生vs一个长得像撬棍的奇怪符号，谁会赢？'
author: "三叶"
image: 
    url: "https://files.seeusercontent.com/2026/06/01/7ggO/pasted-image-1780316784165.webp"
    alt: "meme"
tags:  ["学习笔记", "高等数学", "积分"]
---

## 开始之前

假设你在夜之城的发电站中安放了电磁炸弹，企图通过毁坏发电站产生的冲击波将义体医生所在的飞行艇击落。但问题是，冲击波的威力范围非常巨大，你必须要逃到安全距离才能避免受到波及。可惜的是，由于干扰无人机和NCPD无形的大手，你无法通过卫星地图查看自己的位置，你应该怎么办呢？

好消息是，你可以记录车子仪表盘上显示的速度曲线，叫惹人厌的强尼帮你计算出表达车速的函数表达式。“这太简单了，v。”强尼说，“我们用不定积分就可以轻松求出时间和行驶路程的函数关系。”

<img src="https://files.seeusercontent.com/2026/06/01/lLx9/pasted-image-1780316213606.webp" alt="pasted-image-1780316213606.webp" style="display: block; margin: 0 auto;"/>

### 什么是积分

首先我们知道，**微分**是把函数切分成极小的变化量，以计算函数在局部的变化规律；而**积分**是微分的对立面，积分将函数极小的变化量一个个累加起来，得到一个整体。

从抽象的函数角度来看，当我们将函数 $y=f(x)$ 微分后的两个极小变化量 $dy$ 和 $dx$ 相除，便可得到函数在该点的瞬时变化率（导数）
$$
f'(x)=\frac{\mathrm{d}y}{\mathrm{d}x}
$$
积分所做的事情，就是将每一小段内产生的微小变化量累加起来，从而得到整体的变化量
$$
f(x_1)-f(x_0)=\sum \Delta y
$$
当区间被划分得越来越细时，每一小段内的实际变化量 $Δy$ 可以用微分 $dy$ 表示。那么将 $x_0$ 到 $x_1$ 内的所有微小变化量 $dy$ 累加起来，你就可以获取到从 $x_0$ 到 $x_1$ 的函数变化量，也就是导函数在该区间上的**定积分**:
$$
f(x_1) - f(x_0)= \int_{x_0}^{x_1} \, dy = \int_{x_0}^{x_1} f'(x) \, \mathrm{d}x
$$
关于定积分的细节和几何理解我们下一节再仔细聊聊，现在我们把公式移项
$$
f(x_1) = f(x_0) + \int_{x_0}^{x_1} f'(x) \, \mathrm{d}x
$$
其中，起点处的函数值 $f(x_0)$ 是一个常数。若不指定初始值，就可以把它写成任意常数 $C$
$$
f(x_1) = C + \int_{x_0}^{x_1} f'(x) \, \mathrm{d}x
$$
当我们不以固定的已知 $x_1$ 为定积分上限，而是用变量 $x$ ，那么我们就能得到**不定积分公式**：
$$
\int f'(x) \, \mathrm{d}x = f(x) + C
$$
变上限定积分给出一个具体的原函数；不定积分则是在这个原函数的基础上加上任意常数 $C$，表示所有可能的原函数。

## 不定积分的基本概念

### 定义

在引言里我们虽然用一通花里胡哨看也看不懂的方法推出了不定积分公式，但引言毕竟是引言~~就算完全不看也没啥大问题。~~

所以不定积分有什么用呢？

> **定义：**$f(x)$的**原函数**的全体称为 $f(x)$ 的**不定积分**。

没错，不定积分，本质上就是：**已知一个函数的导数，反过来找它原来的函数。**

相较于微分，微分是把一个函数拆成它的局部变化规律；不定积分是根据局部变化规律，恢复原来的函数。

### 定理

“很好，v” 强尼挑起他（自以为）帅气的墨镜 “那你知道为什么f(x)在区间I内连续就必定在区间内存在原函数吗？”

> **定理**：若 $f(x)$ 在区间 $I$ 上连续，则 $f(x)$ 在区间 $I$ 上一定存在原函数。

举个例子吧，强尼说，他将视线落回车子的仪表盘。

我们若定义一个车速与时间相关的函数
$$
v(t)
$$
那我们可以轻松定义
$$
s(t)=\int_{t_0}^{t}v(u) \, \mathrm{d}u
$$
它表示从 $t_0$ 到 $t$ 的位移。

那么我们开车经过了一段很短的时间 $\Delta t$ ，那么新增的路程可以近似为
$$
\Delta s \approx v(t) \Delta t
$$
即
$$
\frac{\Delta s}{\Delta t} \approx v(t)
$$
当 $\Delta t → 0$ 时，就可以将上式看作
$$
\frac{\mathrm{d}s}{\mathrm{d}t} = s'(t) = v(t)
$$
即变上限积分的求导公式
$$
(\int_{t_0}^{t}v(u) \, \mathrm{d}u)'=v(t)
$$
那么就能说明对任意连续的速度函数 $v(t)$，至少存在一个位置函数 $s(t)$，它的导数正好是 $v(t)$。

直觉上来讲，我们开车的时候，连续变化的车速让我们在每一小段时间内必定有一个已知的路程增量让我们的路程函数存在。

那么当 $f(x)$ 不连续时呢？

> **定理**：$f(x)$ 在区间 $I$ 上有第一类间断点，则 $f(x)$ 在区间 $I$ 上没有原函数。

其实通过我们高中学习的知识就可以知道，对于
$$
f(x) = |x|
$$
$f(x)$ 在 $x=0$ 处不可导。

直观上理解就是，导数作为函数切线的斜率，在这么一个尖端上不存在切线，那么自然不存在导数。

那么反过来想，对于
$$
f(x)=
\begin{cases}
1, & x \geq 0, \\
-1,  & x < 0.
\end{cases}
$$
也就不存在原函数。

如果我们强行假设它有一个原函数 $F(x)$ ，那么
$$
\lim_{x \to 0^+} F'(x) = 1 \\
\lim_{x \to 0^-} F'(x) = -1
$$
于是，$F'(x)$ 在 $x=0$ 处从 $-1$ 跳到 $1$。但是根据[达布定理](https://zh.wikipedia.org/wiki/%E8%BE%BE%E5%B8%83%E5%AE%9A%E7%90%86)，导函数具有介值性，即必须在 $-1$ 到 $1$ 之间存在某一点使其导数取 $0$ ，以及 $-1$ 和 $1$ 之间的其他数值。

然而在这个 $F'(x)$ 上只能取到 $1$ 和 $-1$ ，因此产生矛盾，所以 $f(x)$ 不存在原函数。



## 怎么算不定积分

“v，现在你已经知道什么是不定积分了，手里拿到一个公式你知道怎么算出来它的原函数吗。”强尼在无人机射出的枪林弹雨中朝你大吼。

“很简单！”他不知道从哪掏出一片草稿纸。“首先你要放到脑袋里的是……”

### 不定积分基本公式

<details>
  <summary>(点击展开)</summary>


1. $\displaystyle \int 0,\mathrm{d}x=C$

2. $\displaystyle \int x^\alpha,\mathrm{d}x=\frac{1}{\alpha+1}x^{\alpha+1}+C \qquad (\alpha\neq -1)$

3. $\displaystyle \int \frac{1}{x},\mathrm{d}x=\ln |x|+C$

4. $\displaystyle \int a^x,\mathrm{d}x=\frac{a^x}{\ln a}+C \qquad (a>0,\ a\neq 1)$

5. $\displaystyle \int e^x,\mathrm{d}x=e^x+C$

6. $\displaystyle \int \sin x,\mathrm{d}x=-\cos x+C$

7. $\displaystyle \int \cos x,\mathrm{d}x=\sin x+C$

8. $\displaystyle \int \sec^2 x,\mathrm{d}x=\tan x+C$

9. $\displaystyle \int \csc^2 x,\mathrm{d}x=-\cot x+C$

10. $\displaystyle \int \sec x\tan x,\mathrm{d}x=\sec x+C$

11. $\displaystyle \int \csc x\cot x,\mathrm{d}x=-\csc x+C$

12. $\displaystyle \int \frac{1}{\sqrt{1-x^2}},\mathrm{d}x=\arcsin x+C$

13. $\displaystyle \int \frac{1}{1+x^2},\mathrm{d}x=\arctan x+C$

14. $\displaystyle \int \frac{\mathrm{d}x}{\sqrt{a^2-x^2}}=\arcsin \frac{x}{a}+C$

15. $\displaystyle \int \frac{\mathrm{d}x}{a^2+x^2}=\frac{1}{a}\arctan \frac{x}{a}+C$

16. $\displaystyle \int \frac{\mathrm{d}x}{x^2-a^2}=\frac{1}{2a}\ln \left|\frac{x-a}{x+a}\right|+C$

17. $\displaystyle \int \frac{\mathrm{d}x}{\sqrt{x^2+a^2}}=\ln \left(x+\sqrt{x^2+a^2}\right)+C$

18. $\displaystyle \int \frac{\mathrm{d}x}{\sqrt{x^2-a^2}}=\ln \left|x+\sqrt{x^2-a^2}\right|+C$

19. $\displaystyle \int \sec x,\mathrm{d}x=\ln |\sec x+\tan x|+C$

20. $\displaystyle \int \csc x,\mathrm{d}x=-\ln |\csc x+\cot x|+C$

</details>

“记住，无论你碰到什么样的积分，你的首要任务就是将代数式往这些基本积分公式上凑，明白吗。”强尼将草稿纸塞到你手里。

### 第一换元积分法

在微分学习中，我们很清楚
$$
\frac{\mathrm{d}y}{\mathrm{d}x}=f'(x)
$$
即
$$
\mathrm{d}y = \mathrm{d}f(x) = f'(x)\mathrm{d}x
$$
那么很显然
$$
\int f[\varphi(x)]\varphi'(x) \, \mathrm{d}x = \int f[\varphi(x)] \, \mathrm{d} \varphi(x) = F[\varphi(x)] + C
$$
我们也可以从链式求导的角度理解它

我们对嵌套函数 $F(\varphi(x))$ 求导易得
$$
F[\varphi(x)]' = F'[\varphi(x)]\varphi'(x) = f[\varphi(x)]\varphi'(x)
$$
那么反过来对它积分就可得上式。

<details>
  <summary>常见的凑微分形式(点击展开)</summary>


1. $\displaystyle \int f(ax+b),\mathrm{d}x=\frac{1}{a}\int f(ax+b),\mathrm{d}(ax+b)$

2. $\displaystyle \int x^m f!\left(ax^{m+1}+b\right),\mathrm{d}x=\frac{1}{(m+1)a}\int f!\left(ax^{m+1}+b\right),\mathrm{d}!\left(ax^{m+1}+b\right)\quad (m\neq -1)$

3. $\displaystyle \int f(\sqrt{x})\frac{\mathrm{d}x}{\sqrt{x}}=2\int f(\sqrt{x}),\mathrm{d}(\sqrt{x})$

4. $\displaystyle \int f(e^x)e^x,\mathrm{d}x=\int f(e^x),\mathrm{d}(e^x)$

5. $\displaystyle \int f(\ln x)\frac{1}{x},\mathrm{d}x=\int f(\ln x),\mathrm{d}(\ln x)$

6. $\displaystyle \int f(\sin x)\cos x,\mathrm{d}x=\int f(\sin x),\mathrm{d}(\sin x)$

7. $\displaystyle \int f(\cos x)\sin x,\mathrm{d}x=-\int f(\cos x),\mathrm{d}(\cos x)$

8. $\displaystyle \int f(\tan x)\frac{1}{\cos^2 x},\mathrm{d}x=\int f(\tan x),\mathrm{d}(\tan x)$

9. $\displaystyle \int f(\arcsin x)\frac{1}{\sqrt{1-x^2}},\mathrm{d}x=\int f(\arcsin x),\mathrm{d}(\arcsin x)$

10. $\displaystyle \int f(\arctan x)\frac{1}{1+x^2},\mathrm{d}x=\int f(\arctan x),\mathrm{d}(\arctan x)$

</details>

看着很眼熟？像这样的积分正在全国各地上演！而你可能就是下一个☝️

这些积分并不需要专门去背诵，多做些定积分题目自然就会了（逃



### 第二换元积分法

有的时候，现有的式子无法满足我们直接使用第一类换元积分法，比如说这个例子：
$$
\int \frac{x^2}{\sqrt{a^2-x^2}}\,\mathrm{d}x
$$
乍一看，这个怎么求啊，别急，这时候我们可以适当选择 $x = \phi(t)$ 来代换掉式子中的 $x$。

最最常用的变量代换有如下三种：

#### 1. 三角代换

(1) 被积函数有 $\sqrt{a^2-x^2}$ ，令 $x = asint$ 或 $acost$。

(2) 被积函数有 $\sqrt{a^2+x^2}$ ，令 $x = atant$ 。

(3) 被积函数有 $\sqrt{x^2 - a^2}$ ，令 $x = asect$ 。

那么上式我们可以一眼丁真，将 $x = asint$ 带入可得
$$
\begin{aligned}
\text{原式}
&= \int \frac{a^2\sin^2 t}{a\cos t}\,\mathrm{d}(a\sin t) \\
&= \int \frac{a^2\sin^2 t}{a\cos t}\cdot a\cos t\,\mathrm{d}t \\
&= \int a^2\sin^2 t\,\mathrm{d}t
\end{aligned}
$$

接下来的步骤就简单了。

“三角函数在积分中非常重要。”强尼翘起二郎腿，从兜里掏出一根雪茄。“v，你应该对这类方法多留意一些。”

真是臭屁。

#### 2. 根式代换

当被积函数含有 $\sqrt[n]{ax + b}$ 时，我们可以令 $t = \sqrt[n]{ax + b}$ ，那么这时有 $x = \frac{1}{a}(t^n - b)$ 。

#### 3. 倒代换

当被积函数分母的最高次数高于分子的最高次数时，可令 $x = \frac{1}{t}$。

### 分部积分法

在我们记忆深处，有某个公式埋藏在这里

设 $u(x)$ 、 $v(x)$ 均有连续的导数，那么有
$$
(uv)' = u'v + uv'
$$
现在我们将它变变形
$$
uv'= (uv)' - u'v
$$
接下来对两边同时积分
$$
\int uv'\,\mathrm{d}x = \int (uv)' - u'v \, \mathrm{d}x
$$
整理可得
$$
\int u \, \mathrm{d}v = uv - \int v \, \mathrm{d}u
$$
没错！这就是大名鼎鼎的**分部积分法**！适用于两个代数式相乘的情况

“哼，这么简单就推出来了吗。”强尼不屑地弹了弹烟灰，“要是我出生在那个年代，发现者无疑会是我。”

分部积分法的奇妙之处在于，当你对一大坨乱了吧唧的代数式发愁时，它可以将其转换为非常容易积分的形态。

还记得这个式子吗：
$$
\int \frac{1}{1+x^2} \, \mathrm{d}x = \arctan x + C
$$
那我问你，
$$
\int \arctan x \, \mathrm{d}x = ?
$$
“你想破脑袋也没法积出来的” 强尼从鼻子里哼出这句话。

除非……

没错！使用分部积分法！

那么原式可以转为
$$
\begin{aligned}
\text{原式}
&= x\cdot\arctan x + \int x \, \mathrm{d}(\arctan x)\\
&= x\cdot\arctan x + \int x \frac{1}{1+x^2} \, \mathrm{d}x \\
\end{aligned}
$$
哦对的对的，这下子看懂了，那么接下来只要做有基本理函数积分即可
$$
\begin{aligned}
\text{原式}
&= x\cdot\arctan x + \frac{1}{2} \int \frac{1}{1+x^2} \, \mathrm{d}x^2 \\
&= x\cdot\arctan x + \frac{1}{2} \ln(1+x^2)
\end{aligned}
$$
怎么样，是不是很神奇？！



### 三角有理式积分

“我说过……”

啊…这个男人又开始了，，，

“v，三角有理式在不定积分问题中非常重要。”强尼将雪茄指着你。

如果我们碰到形如 $\int R(\sin x, \cos x) \, \mathrm{d}x$ （含 $\sin^n x \cdot \cos^m x$ ）的积分，我们可以考虑用如下换元法。

- 当函数中 $\sin x$ 奇次，$\cos x$ 偶次，那我们可以考虑凑 $\mathrm{d}(\cos x)$ 或 $\mathrm{d}(\sec x)$

- 当函数中 $\sin x$ 偶次，$\cos x$ 奇次，那考虑凑 $\mathrm{d}(\sin x)$ 或 $\mathrm{d}(\csc x)$

- 若 $\sin x$ 和 $\cos x$ 同为奇次/偶次，那么凑 $\mathrm{d}(\tan x)$ 或 $\mathrm{d}(\cot x)$ 

那么接下来我们看这道题
$$
\int \frac{1}{3+\sin^2x} \mathrm{d}(x) = ?
$$
通过我们惊人的注意力，我们注意到此函数的 $\sin x$ 为 $2$ 次，而 $\cos x$ 为 $0$ 次，那么说明函数中 $\sin x$ 和 $\cos x$ 均为偶次，那我们要考虑凑出 $\mathrm{d}(\tan x)$ 或者 $\mathrm{d}(\cot x)$ ，怎么做呢？

我们注意到原式中有 $\sin x$，那为了凑出目标代数式……

就分号上下同时除以 $\cos^2 x$ 吧！
$$
\begin{aligned}
\text{原式}
&= \int \frac{\sec^2 x}{3\sec^2x + \frac{\sin^2x}{\cos^2x}} \,\mathrm{d}x \\
&= \int \frac{\sec^2 x}{3\sec^2x + \tan^2x} \,\mathrm{d}x
\end{aligned}
$$
嗯哼，下一步怎么做呢？

翻阅不定积分基本公式，我们用惊人的注意力注意到 $\sec^2 x$ 和 $\tan x$ 好像有猫腻！

没错，那么接下来可以
$$
\begin{aligned}
\text{原式}
&= \int \frac{(\tan x)'}{3(\tan^2 x + 1) + \tan^2x} \, \mathrm{d}x
\end{aligned}
$$
哎哟我，这下子不看懂了吗
$$
\begin{aligned}
\text{原式}
&= \int \frac{1}{4\tan^2 x + 3} \, \mathrm{d}(\tan x) \\
&= \frac{1}{2} \int \frac{1}{(2\tan x)^2 + (\sqrt{3})^2} \, \mathrm{d}(2\tan x)
\end{aligned}
$$
为了方便理解，这里我们令 $2\tan x = u$ ，那么有
$$
\begin{aligned}
\text{原式}
&= \frac{1}{2} \int \frac{1}{(u)^2 + (\sqrt{3})^2} \, \mathrm{d}(u)
\end{aligned}
$$
查阅基本积分公式可得积分结果为
$$
\begin{aligned}
\text{原式}
&= \frac{1}{2\sqrt3}\arctan(\frac{u}{\sqrt3}) + C \\
&= \frac{1}{2\sqrt3}\arctan(\frac{2\tan x}{\sqrt3}) + C
\end{aligned}
$$


### 有理函数积分

“光知道三角函数可不行，v，三角函数会让你的脑袋变得尖尖的。”

“想成为夜之城真正的积佬，你必须还能应对有理函数的积分。”

> **定理：**对于形如 $\frac{P(x)}{Q(x)} = \frac{P(x)}{c_0(x-a)^k(x^2+px+q)^l}$ 的有理真分式 ($k$, $l$为正整数, $p^2-4q < 0$)，可以唯一地分解为有限个最简有理分式之和。

即可以分解为
$$
\frac{P(x)}{Q(x)} = \frac{A_1}{x-a} + \frac{A_2}{(x-a)^2} + ... + \frac{A_k}{(x-a)^k}+\frac{B_1x+D_1}{x^2+px+q}+\frac{B_2x+D_2}{(x^2+px+q)^2}+...+\frac{B_lx+D_l}{(x^2+px+q)^l}
$$
这个时候式子里就只剩下最简的代数式了，我们只需要依次对他们求积分就行了……吗？

“nonono，上面的待定系数可没那么好求。”强尼冷笑地解释道。

“和在一起力大飞砖算多项式吗，别傻了，像我们这样的情况，每一秒都非常珍贵，我们没有那么多时间来算这些东西。”

“那么就由大名鼎鼎的我来告诉你应该怎么应对这样的情况吧😎☝️”

#### 特殊解法一：x代入特殊值

争取每代入一个值，都仅剩一个系数

举个栗子🌰
$$
求\int \frac{x-3}{(x-1)(x^2 - 1)} \, \mathrm{d}x
$$
那么我们不难得出
$$
\begin{aligned}
\text{原式}
&= \frac{Ax+B}{(x-1)^2} + \frac{D}{x+1} \\
&= \frac{(Ax+B)(x+1) + D(x-1)^2}{(x-1)^2(x+1)}
\end{aligned}
$$
即，我们需要计算出
$$
x - 3 = (Ax+B)(x+1) + D(x-1)^2
$$
通过我们惊人的注意力，我们可以先令 $x = -1$，那么可得
$$
-1-3=D(-1-1)^2 \\
D=-1
$$
之后令 $x=0$ 那么同时把 $D = -1$ 代入可得
$$
-3 = B - 1\\
B=-2
$$
最后随便代个 $x = 1$ 可得 $A = 1$。

#### 特殊解法二：留数法+求x->∞的极限

我们来看这道题
$$
求 \int \frac{x-3}{(x-1)(x^2-1)} \, \mathrm{d}x
$$
易知
$$
\frac{x-3}{(x-1)(x^2-1)}  = \frac{A}{x-1} + \frac{B}{(x-1)^2} + \frac{D}{x+1}
$$
首先我们可以两边同时乘 $x+1$，那么就能得到
$$
\frac{x-3}{(x-1)^2} = [\frac{A}{x-1} + \frac{B}{(x-1)^2}](x+1) + D
$$
这时候眼尖的小伙伴们就发现了，我们仅需令 $x=-1$ 就能把右边的两坨东西删掉！即
$$
\frac{-1-3}{(-1-1)^2} = 0 + D \\
D = -2
$$
那剩下的A和B怎么办呢？

B我们可以如法炮制，两边同时乘 $(x-1)^2$ ，可以算出 $B = -1$。

那么A怎么算呢？

这时候请极限法出场。

左右两边同时乘 $x$ 并令 $x \to ∞$。
$$
\lim_{x \to \infty} \frac{(x-3)x}{(x-1)(x^2-1)}  = \lim_{x \to \infty} \frac{Ax}{x-1} + \lim_{x \to \infty} \frac{Bx}{(x-1)^2} + \lim_{x \to \infty} \frac{Dx}{x+1}
$$
那么根据求极限的结果，我们不难得出
$$
0=A+0+D
$$
带入 $D = -1$ 得 $A=1$。



## 在那之后

“好，到这里应该OK了。”强尼朝你喊道。你们的车停在山头上，在这里可以俯瞰整个发电站，一座座高耸入云的尖塔整齐排列。傍晚渐浓的夜色中，远处的夜之城闪烁着霓虹的光芒。

“真是宁静”强尼揶揄道“在我们等待义体医生的飞船来之前，不如先做两道不定积分练练手吧”。
$$
1.若不定积分\int \frac{x^2+ax+2}{(x+1)(x^2+1)} \, \mathrm{d}x的结果中不含反正切函数，则a=?
$$

<details>
  <summary>》〉点击展开查看解析〈《</summary>
哦v你看出来了吗，至少伟大的强尼银手能一眼看出，这是一道有理数积分问题，那么让我们先按部就班地走。

先用待定系数法将原函数分解，就像前面我提到的一样。
$$
\frac{x^2+ax+2}{(x+1)(x^2+1)} = \frac{A}{x+1}+\frac{Mx+N}{x^2+1}
$$
那么怎么优雅地求 $A$ , $M$ 和 $N$ 呢？

题目中提到了结果不含正切函数，那么必然不会出现形如 $\frac{t}{x^2+1} (t \in \mathbb{R})$ 的项，因此可以轻易得到 $N = 0$。

接下来我们管你这那的直接和到一起去，得到
$$
\frac{x^2+ax+2}{(x+1)(x^2+1)} = \frac{(A+M)x^2+Mx+A}{(x+1)(x^2+1)}
$$
易知 $A+M=1$ ; $M=a$ ;$A = 2$,

那么 $a = -1$。

什么？你说这是在力大飞砖？我管你这那的哪个简单我用哪个。 
</details>


$$
2. \int \frac{\sqrt{x+1}+2}{(x+1)^2-\sqrt{x+1}} \, \mathrm{d}x =?
$$

<details>
  <summary>》〉点击展开查看解析〈《</summary>
v，还记不记得，我们在上面的某个零人在意的角落里说过这么一句话

>当被积函数含有 $\sqrt[n]{ax + b}$ 时，我们可以令 $t = \sqrt[n]{ax + b}$ ，那么这时有 $x = \frac{1}{a}(t^n - b)$ 。

现在就是使用它的时候！

我们令 $t = \sqrt{x+1}$ ，则 $x = t^2 + 1$ ，那么 $\mathrm{d}x = 2t\mathrm{d}t$，于是
$$
\begin{aligned}
\text{I}
&= \int \frac{t+2}{t^4-t}2t \, \mathrm{d}t \\
&= 2\int \frac{t+2}{t^3-1} \, \mathrm{d}t
\end{aligned}
$$
那么现在这道题就是一道有理函数积分，按照惯例我们将其化为
$$
\begin{aligned}
\text{原式}
&= 2\int \frac{t+2}{(t-1)(t^2+t+1)} \, \mathrm{d}t \\
&= 2\int (\frac{1}{t-1} - \frac{t+1}{t^2+t+1}) \, \mathrm{d}t
\end{aligned}
$$
接下来怎么办呢？我们的大致思路是：凑出分母，并直接积分。

观察到有一个单独的 $t+1$，那我们是不是可以凑出 $(t^2 + t + 1)'$ ？

好，那我们开始行动。
$$
\begin{aligned}
\text{原式}
&= 2\int \frac{1}{t-1} \, \mathrm{d}t - \frac{1}{2} \int \frac{2t+2}{t^2+t+1} \, \mathrm{d}t\\
&= 2\int \frac{1}{t-1} \, \mathrm{d}t - \frac{1}{2} \int \frac{2t+1}{t^2+t+1} \, \mathrm{d}t - \int \frac{1}{t^2+t+1} \, \mathrm{d}t \\
&= 2\int \frac{1}{t-1} \, \mathrm{d}t - \frac{1}{2} \int \frac{\mathrm{d}(t^2+t+1)}{t^2+t+1}  - \int \frac{\mathrm{d}(t+\frac{1}{2})}{(t+\frac{1}{2})^2 + (\frac{\sqrt3}{2})^2} \\
&=2\ln|t-1|-\ln|t^2+t+1|-\frac{2}{\sqrt3}\arctan{\frac{2t+1}{\sqrt{3}}}+C
\end{aligned}
$$
最后将 $t = \sqrt{x+1}$ 代入可得出答案
</details>


$$
3. I_1=\int\cos^4x\,\mathrm{dx}=?, \ I_2=\int\sin^4x\,\mathrm{dx}=?
$$

<details>
  <summary>》〉点击展开查看解析〈《</summary>

Hmmm... v，这道题看起来有点蹊跷不是吗。

我猜你一定想破脑袋也没想出来 $\int\cos^4x\,\mathrm{dx}$ 到底怎么积分。

什么？你居然做出来了😧？！可恶，当时我可是想了一个多小时怎么凑出 $\mathrm{d}(\tan x)$ 来😩，好吧，那我们来对对答案。

我们需要跳出以往的惯性思维。这道题有两个变量 $I_1$ 和 $I_2$，那我们将他们相加得
$$
\begin{aligned}
 I_1 + I_2 &= \int [(\sin^2x+\cos^2x)^2 - \frac{1}{2}\sin^22x] \, \mathrm{d}x \\
 &= \frac{3}{4}x+\frac{1}{16}\sin4x +C_1
\end{aligned}
$$
同理我们将他们俩相减可得
$$
I_1 - I_2 = \frac{1}{2}\sin2x + C_2
$$
那么就很容易得到
$$
I_1 = \frac{1}{2}[(I_1+I_2) + (I_1 - I_2)] = \frac{3}{8}x+\frac{1}{32}\sin4x + \frac{1}{4}\sin2x +C_3 \\
I_2 = \frac{1}{2}[(I_1+I_2) - (I_1 - I_2)] = \frac{3}{8}x+\frac{1}{32}\sin4x - \frac{1}{4}\sin2x +C_4
$$
注意两个任意常数 $C$ 未必相等。

</details>
