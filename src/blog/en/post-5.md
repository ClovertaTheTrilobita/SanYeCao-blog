---
title: "[Study Notes] How the Banker's Algorithm Prevents Deadlock"
pubDate: 2025-06-14
description: "Study notes on the Banker's Algorithm"
author: "Cloverta"
image:
    url: "https://files.seeusercontent.com/2026/03/30/Ni8j/6143de1ea4b0cc47fb117543e5baad09.webp"
    alt: "img"
tags:  ["Algorithms", "Operating Systems", "Study Notes"]
---

<p style="font-size: 0.85rem;"><i><sub>Content translated by <a href="https://www.deepseek.com/">DeepSeek</a>.</sub></i></p>

The Banker's Algorithm was first proposed by the computer science legend Edsger Dijkstra, aiming to solve the problem where a bank sometimes cannot lend money rationally.

Its core idea is that **the system predicts a resource allocation strategy before actually allocating resources, to avoid situations where allocated resources are less than the remaining resource demands.**

Before we start, we need to introduce a concept: the Safe Sequence.

## Safe Sequence

A safe sequence refers to a sequence of processes such that if the system allocates resources according to this sequence, each process can complete successfully.

This is the "predicted resource allocation strategy" mentioned earlier.

As long as we can find one safe sequence, the system is in a **safe state**. Conversely, if after a resource allocation, the system cannot find any safe sequence, then the system enters an **unsafe state**. A system in an unsafe state **might experience deadlock**.

Therefore, we need to predict whether a resource allocation request would lead the system into an unsafe state before granting it, to decide whether to approve the request.

So, how do we calculate this safe sequence?

## The Banker's Algorithm

Let's take an example 

> > Assume the system has 5 processes P0～P4 and 3 types of resources R0～R2. The initial quantities of these resources are (10, 5, 7). At a certain moment, the situation is:

| Process       | Max Need (Max) | Allocated (Allocation) | Still Needs (Need) |
| ------------- | -------------- | ---------------------- | ------------------ |
| P0            | (7, 5, 3)      | (0, 1, 0)              | (7, 4, 3)          |
| P1            | (3, 2, 2)      | (2, 0, 0)              | (1, 2, 2)          |
| P2            | (9, 0, 2)      | (3, 0, 2)              | (6, 0, 0)          |
| P3            | (2, 2, 2)      | (2, 1, 1)              | (0, 1, 1)          |
| P4            | (4, 3, 3)      | (0, 0, 2)              | (4, 3, 1)          |

In what order should we allocate resources to these processes to prevent deadlock?

First, we can calculate that at this moment, the remaining resources in the system are:

```
(10, 5, 7) - (0, 1, 0) - (2, 0, 0) - (3, 0, 2) - (2, 1, 1) - (0, 0, 2) = (3, 3, 2)
```

Next, we compare sequentially.

Clearly, allocating to P0 is not feasible. Its maximum required resources exceed the available resources. If we allocate all available resources to it, P0 still cannot complete its work, and no other process would get any resources.

Let's look at P1. The resources P1 needs (1, 2, 2) are less than the system's available resources (3, 3, 2). Therefore, the system can allocate resources to P1. Since P1 obtains all the resources it needs, it can definitely complete its task smoothly and release the resources.

So, if we allocate resources to P1, after P1 finishes running, the resources we can control become:

```
(3, 3, 2) + (2, 0, 0) = (5, 3, 2)
```

Following this logic, we continue searching.

P2 needs some resources that exceed what we hold, so we skip it for now.

P3 needs resources less than what we hold, so we can allocate resources to P3. After P3 finishes, the system reclaims the resources held by P3. At this point, the free resources become:

```
(5, 3, 2) + (2, 1, 1) = (7, 4, 3)
```

Now, the system's free resources are all greater than or equal to what the remaining processes need. We simply need to allocate resources to P0, P2, and P4 in sequence and reclaim them afterwards.

Thus, we have successfully obtained a safe sequence:

```mermaid
%% This is actually a flowchart!!
%% If you see this comment, it means the flowchart plugin might be glitching. Refreshing the page should fix it QwQ

graph LR;
P1[P1  ]:::rose --> P3[P3  ]:::rose
P3 --> P0[P0 ]:::rose
P0 --> P2[P2 ]:::rose
P2 --> P4[P4 ]:::rose

classDef rose fill:#C98986,stroke:#C98986,color:black;
classDef blue fill:#82A7A6,stroke:#82A7A6,color:black
classDef taupe fill:#785964,stroke:#785964,color:white
classDef note fill:#F4F4F4,stroke:#F4F4F4,color:black
classDef beaver fill:#9A8873,stroke:#9A8873,color:white
```

Of course, if you want to change it to:

```mermaid
%% This is actually a flowchart!!
%% If you see this comment, it means the flowchart plugin might be glitching. Refreshing the page should fix it QwQ

graph LR;
P1[P1 ]:::rose --> P3[P3 ]:::rose
P3 --> P2[P2 ]:::rose
P2 --> P0[P0 ]:::rose
P0 --> P4[P4 ]:::rose

classDef rose fill:#C98986,stroke:#C98986,color:black;
classDef blue fill:#82A7A6,stroke:#82A7A6,color:black
classDef taupe fill:#785964,stroke:#785964,color:white
classDef note fill:#F4F4F4,stroke:#F4F4F4,color:black
classDef beaver fill:#9A8873,stroke:#9A8873,color:white
```

Or any other order, it doesn't matter, because **there can be multiple safe sequences**. 