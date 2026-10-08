---
title: "记一次主页重新设计"
pubDate: 2026-09-18
description: '但是我一点设计都不会？！'
author: "三叶"
image: 
    url: "https://files.seeusercontent.com/2026/10/08/6Cnw/pasted-image-1791493186458.webp"
    alt: "screenshot"
tags:  ["随笔"]
---

主页网址：<b>[三叶草 -More About Me-](https://cloverta.top)</b>

我之前那个主页已经是很久以前弄的了。

不……虽然感觉是很久以前，但其实就是去年的时候，我偶然在微信公众号上刷到了<b>[翠翠](https://idealclover.top/)</b>大佬发的一篇文章。

<img src="https://files.seeusercontent.com/2026/10/08/3liR/pasted-image-1791493374282.webp" alt="pasted-image-1791493374282.webp" title="pasted-image-1791493374282.webp" style="zoom: 25%; display: block; margin: 0 auto;" >

十分的眼前一亮，并且值得注意的是，<b>[在GitHub上开源](https://github.com/idealclover/Homepage)</b>！

当时我就想着，我也想要一个自己的个人主页。

于是我就直接把他的网站fork过来用了（

<img src="https://files.seeusercontent.com/2026/10/08/y4yD/pasted-image-1791493630195.webp" alt="pasted-image-1791493630195.webp" title="pasted-image-1791493630195.webp" style="zoom:20%; display: block; margin: 0 auto;" >

当时正值DeepSeek大火，在AI的帮助下，我对源代码做出了很多改造，包括GitHub Star数量通过当时自己做的一个API实时显示，还有文章也实时通过Wordpress API实时更新（那时候我还在使用Wordpress搭建博客）。

当时我对网页部署完全是小白，也不知道什么是构建服务器是怎么运作的。

唯一知道的就是大二web前端课，印度来的老师操着咖喱味的英语教我们`npm run dev`。

然后我直接把`localhost:4321`反代到了`80`端口。

神必。

兴冲冲地展示给同学之后，同学问我：“为什么你的网站下面有这个叫Astro开发工具的东西啊。”

我这才意识到不对劲。于是乎就去问大D老师。

D老师说Astro项目要先构建然后把静态的页面放到服务器上。

什么跟什么啊，原来`npm`还可以`run build`吗？

于是我把代码拉到服务器上，本地每次编辑完再`ssh`到服务器上，先`git pull`再`npm run build`最后`cp ./dist /www/wwwroot/cloverta.top`。

神必，，，

我当时一定觉得自己可聪明了。

但后面逐渐的，那台运行API的Java服务器到期了，我也忘记了这件事情。再后来，我也不用Wordpress了，我的（存疑）个人主页进入了半死不活的状态。

## 该做出改变了！

我从有一段时间之前就想重新设计一个主页。

但是想必大家从这个博客的前端都能看出来，我的设计品味非常糟糕（捂脸）（抱头）（蹲下）。

对于一个主要功能是发布文章的网站来说，这些都是次要的，但是对于个人主页来说。

**好看**，是它的首要功能。

于是我跑到B站上去看平面设计课。

哇好长，有没有省流版的。

哦这个不错，只有4分钟。<b>[非设计师也该学的排版知识：视觉动线篇 - oooooohmygosh](https://www.bilibili.com/video/BV1FZ4y1g74Y/)</b>

Hmmm...

我之前在写前端的时候一直有一个毛病，那就是——直接上手写代码！设计？老钟的美术生最不值钱了！（挨打）

直到我在芬兰交换的时候上了一门课，叫做<b>[Human Computer Interaction](https://opas.peppi.oulu.fi/en/course/521145A/4249?period=2025-2026)</b>。

在课上老师叫我们一步步先用<b>[Figma](figma.com)</b>把设计灵感（就是一系列符合构思的图片）贴在一起，再手绘网页大致框架，然后用Figma拼出网站的样式图，最后再用代码把网页写出来。

最开始还挺懵的，怎么一上来让我们注册一个平面设计网站？我的IDE呢？我的代码呢？我学的是工科不是艺术对吧？

但结束后才发现，用这样的工作流完成的网站，就算是随便应付作业的也比我自己写的好看……（呃！）

碎碎念了这么多，我想说的是，我这一次决定从可画开始。

<img src="https://files.seeusercontent.com/2026/10/08/g1mH/pasted-image-1791495660551.webp" alt="pasted-image-1791495660551.webp" title="pasted-image-1791495660551.webp" style="zoom:20%;  display: block; margin: 0 auto;" >

<p align="center"><sup>我以前只拿可画做过协会宣传单和……一些神秘的p图</sup></p>

我一直很喜欢卡片的网页设计，我想让我的个人主页像一张明信片一样。

明信片很有故事感，我喜欢。

于是我尝试把我喜欢的那张头像拖上去

<img src="https://files.seeusercontent.com/2026/10/08/Ucx9/pasted-image-1791496175202.webp" alt="pasted-image-1791496175202.webp" title="pasted-image-1791496175202.webp" style="zoom:20%;  display: block; margin: 0 auto;" >

Canva给出了设计提示框，这很好，设计师们精心设计出来的位置肯定比我凭空一放要好看。

那之后呢？

既然是个人主页，那么我最希望的，就是人们一进来就看到我的名字，于是，我要把这个网名放在最显眼的位置！

<img src="https://files.seeusercontent.com/2026/10/08/q1Za/pasted-image-1791496417144.webp" alt="pasted-image-1791496417144.webp" title="pasted-image-1791496417144.webp" style="zoom:20%;  display: block; margin: 0 auto;">

感觉左下角空荡荡的，放一个角撑（迫真）让它更有边界感吧！

<img src="https://files.seeusercontent.com/2026/10/08/Mpd2/pasted-image-1791496616095.webp" alt="pasted-image-1791496616095.webp" title="pasted-image-1791496616095.webp " style="zoom: 33%; display: block; margin: 0px auto;">

怪怪的，而且这样子完全备有连接起来吧？！

在那个四分钟的速成课，up有提到一个视觉动线理论，也就是说，人们会被最显眼的东西抓住注意力，随后视线会随着内容逐渐划过页面。也就是说，我们需要创造一些连续的内容，使得访问者们能舒适地阅览完整个网站的内容。

那我是不是应该稍微调整一下位置？

<img src="https://files.seeusercontent.com/2026/10/08/kk9L/pasted-image-1791496902690.webp" alt="pasted-image-1791496902690.webp" title="pasted-image-1791496902690.webp" style="zoom: 33%; display: block; margin: 0px auto;">

把社交链接放到头像下方，应该更加符合直觉，在此之下加上一个简短的介绍。这非常有必要，访问者需要知道他们在看谁的网站。

介绍下方，用脚注和ICP备案框处下边界。

然后是功能模块。既然是主页，肯定需要通往其他内容的导航。

<img src="https://files.seeusercontent.com/2026/10/08/u5Fj/pasted-image-1791497256787.webp" title="pasted-image-1791497178528.webp" style="zoom: 33%; display: block; margin: 0px auto;">

完成！

至少看上去还不错！

这样访问者会首先注意到大大的"ClovertaTheTrilobita"和唯一有色彩而瞩目的头像，随后视线沿着头像自然向下，察觉到介绍，有初步了解之后再看向左边，发现导航栏。

也可以顺着醒目的黑色字体，从头像出发，经过昵称，到菜单，最后看到最淡的介绍。

中间空出来的留白可以作为交互预留空间。

<img src="https://files.seeusercontent.com/2026/10/08/0kBt/pasted-image-1791497576419.webp" alt="pasted-image-1791497576419.webp" title="pasted-image-1791497576419.webp" style="zoom:20%;  display: block; margin: 0 auto;">

现在唯一也是最头疼的问题是……

我不知道应该在"About Me"里面写什么内容（跌倒）

是的，我坐在电脑前冥思苦想了一个多小时，最后什么也没想出来，，

