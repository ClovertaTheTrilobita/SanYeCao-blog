---
title: "[Study Notes] The Classic Readers-Writers Problem"
pubDate: 2025-06-13
description: 'Study notes on the Readers-Writers algorithm'
author: "Cloverta"
image:
    url: "https://files.seeusercontent.com/2026/03/30/dV0l/107875694_p0-scaled.webp"
    alt: "img"
tags:  ["Algorithms", "Operating Systems", "Study Notes"]
---

<p style="font-size: 0.85rem;"><i><sub>Content translated by <a href="https://www.deepseek.com/">DeepSeek</a>.</sub></i></p>

## First, let's understand the concepts of Readers and Writers

In computing, there are two concurrent processes: **Readers** and **Writers**, sharing a single file.

Multiple reader processes are allowed to access the shared data simultaneously, but a writer process is not allowed to operate concurrently with any other process.

**Therefore, the requirements are:**

1️⃣ Allow multiple readers to perform read operations on the file concurrently.

2️⃣ Allow only one writer to write information to the file at a time.

3️⃣ Any writer must not allow other readers or writers to work until it completes its write operation.

4️⃣ Before a writer performs a write operation, all existing readers and writers must exit.

In other words, **reader processes can be concurrent with other reader processes, while writer processes are mutually exclusive with both reader and writer processes**.

## How can we implement this?

## One Possible Approach

We can easily think of placing a read-write lock on the buffer. When a writer process starts writing data to the buffer, it acquires the lock, preventing other processes from accessing the buffer.

But how do we achieve concurrent reading for reader processes?

We set up a semaphore `count`. Each reader process increments `count` when it starts reading and decrements it when it finishes.

Then it becomes simple. The first reader process acquires the lock when it starts reading, and the last reader process releases the lock when it finishes.

Let's look at the code.

```c++
semaphore rw = 1; // Read-write lock for mutual exclusion of shared process access
int count = 0; // Records how many reader processes are accessing the file
semaphore mutex = 1; // Lock for 'count' to prevent two readers accessing count simultaneously, which could cause a deadlock

writer () {
    while(1){
        P(rw); // Lock the buffer (P operation, rw--)
        Write to file;
        V(rw); // Unlock the buffer (V operation, rw++)
    }
}

reader () {
    while(1){
        P(mutex); // Lock 'count' to prevent two readers simultaneously reading count==0, which could cause a deadlock.
        if (count == 0){
            P(rw); // If count is 0, check if the buffer is locked. If locked, wait. If unlocked, lock the buffer.
        }
        count++;
        V(mutex); // Unlock 'count'
        Read file;
        P(mutex); // Lock 'count' again to prevent two processes simultaneously reading count==0, which could cause rw to be incremented twice abnormally.
        count--;
        if (count == 0){
            V(rw); // If count is 0, this process is the last reader, so unlock the buffer.
        }
        V(mutex);
    }
}
```

**However, we will find a problem with this approach.**

**What if reader processes keep arriving?**

If reader processes keep requesting to read the buffer (which is very common in operating systems), then `count` will never be 0. This will cause writer processes to be stuck waiting indefinitely, leading to **starvation**. **This algorithm gives reader processes the highest priority.**

### Another Approach for Fairness

Since writers cannot write if the reader queue is not empty, let's try this:

When a writer process requests buffer resources, **block all reader processes that arrive *after* this writer process** from entering the reader queue.

Wait until the existing reader queue is exhausted. After the writer finishes writing data to the buffer, then allow the later reader processes to enter.

Let's look at the code:

```c++
semaphore rw = 1;
int count = 0;
semaphore mutex = 1;
semaphore w = 1; // Used to implement writer-priority

writer () {
    while (1) {
        P(w); // Writer first locks 'w'. After locking, subsequent reader processes must wait for this writer to unlock.
        P(rw); // Lock the buffer
        Write to file;
        V(rw);
        V(w); // Unlock, allowing reader processes to join the queue.
    }
}

reader () {
    while (1) {
        P(w); // When a new reader joins, first check if the 'w' lock is held. If locked, block and wait. If unlocked, lock it first.
        P(mutex);
        if (count == 0)
            P(rw);
        count++;
        V(mutex);
        V(w); // After the reader joins the queue, unlock the 'w' lock, ensuring the atomicity of the join operation.
        Read file;
        P(mutex);
        count--;
        if (count == 0)
            V(rw);
        V(mutex);
    }
}
```

By adding a new lock `w`, the priority of writer processes is significantly increased, implementing a **first-come, first-served** fairness. 