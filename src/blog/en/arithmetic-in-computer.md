---
title: "How to Teach a Computer Arithmetic?? Addition and Subtraction"
pubDate: 2026-09-18
description: "Welcome to Cirno's Perfect Math Class. Let us start with... addition and subtraction!"
author: "Cloverta"
image:
    url: "https://files.seeusercontent.com/2026/09/17/Dn5p/_20260917235541_13_363.webp"
    alt: "ciruno"
tags: ["Study Notes", "Computer Organization"]
---

<p style="font-size: 0.85rem;"><i><sub>Content translated by <a href="https://chatgpt.com/">ChatGPT</a>.</sub></i></p>

What is 1+1?

This question has troubled people for many years.

Some say one plus one equals 1, because two pieces of maltose candy stuck together are still one piece of maltose candy.

Some say one plus one equals 2, because if you double-click `Calculator.exe`, enter 1+1, the output is 2.

Some say...

<br>

...I have run out of things to make up.

So, good morning, afternoon, and evening to all the kids and grown-ups out there. Today, we are going to teach a computer how to perform addition and subtraction.

It is that simple.

Huh? It is not actually simple?

## Zero: Let Us Start from Zero

Suppose your mom yells from the kitchen, “Kiddo, come eat! The food is getting coooold!” But you cannot rush to the dining table right away, because you are busy secretly using your mom's Alipay to buy *That Game 6*! The only thing within reach is the mysterious switch for the dining-room chandelier. How can you convey a message to your mom?

Easy! Just control whether the light is on! We treat a lit bulb as `True` (or, more simply, `1`) and an unlit bulb as `False` (or `0`). That way, you can transmit information efficiently!

You then resolutely switch off the dining-room light.

Bad ending: your mom knows nothing about the arcane mysteries of computer organization. From her point of view...

<i>This little brat is asking for a beating again. (grabs a clothes hanger)</i>

What now? The end of the world is at hand! But do not panic: your mom still has ten seconds before she bursts through the door, which is more than enough time for us to begin the next section.

## One: How Numbers Are Represented in a Computer

### 1. Binary

Now, imagine that you are holding an electrical wire. Yes, the very wire connected to the dining-room chandelier. Think back: how did you transmit a signal through the wire?

Like this: powered means `1`, and unpowered means `0`.

But that can represent only two states. The world is not simply black and white, so what if we need to represent four states?

Easy. Add another wire.

Now we can control the two wires to represent the four states `00`, `01`, `10`, and `11`. Let us number them!

`00` represents `0`; `01` represents `1`; `10` represents `01+01`, carrying one to the next place, so it is `2`; and `11` is `10+01`, so it is `3`.

That is right: this is how **binary** represents data.

In computers, we generally use binary for basic operations. The reason is actually quite obvious: if we used decimal, we would need to design ten different circuits for ten different states. Binary is much simpler—with a basic electrical wire, powered means 1 and unpowered means 0.

#### Converting Binary

Suppose you are given a random **binary number**, `010110`. How do we know what number it corresponds to?

Let us first look at a decimal number.

Take any decimal number, such as `21367`. It can be broken down intuitively as
$$
2\times10^4+1\times10^3+3\times10^2+6\times10^1+7\times10^0=21367
$$
Then, intuitively, for the <b>base-$r$</b> number `21367`, we can write
$$
2\times r^4+1\times r^3+3\times r^2+6\times r^1+7\times r^0=21367_r
$$
More generally, a <b>base-$r$ number</b> $K_nK_{n-1}K_{n-2}...K_1K_0$ can be expressed as
$$
K_nr^n+K_{n-1}r^{n-1}+K_{n-2}r^{n-2}+...+K_1r^1+K_0r^0
$$
Feeling dizzy? Let us use the **binary number** `010110` directly as an example:
$$
010110 = 0\times2^5+1\times2^4+0\times2^3+1\times2^2+1\times2^1+0\times2^0
$$
So its corresponding decimal value is $2^4+2^2+2^1=16+4+2=22$.

See? Is that not simple?

#### Hexadecimal Numbers

You must have heard the terms **32-bit operating system** and **64-bit operating system**.

That is right: a **32-bit operating system** means that an `int`-type variable has a total of 32 **bits** for storing a number.

In other words, an integer binary number can be up to 32 bits long.

That is a lot! Surely programmers debugging a program cannot point at the zeros and ones on the screen and count them one by one with their fingers?

And so we introduce **hexadecimal numbers**.

We define $A$ as $10$, $B$ as $11$, $C$ as $12$, and so on, up to $F$ as $15$.

Thus, the complete set of single hexadecimal digits is $0123456789ABCDEF$.

Your astonishing powers of observation must have noticed that this corresponds exactly to a **4-bit binary number**!

Therefore, we can group the long **binary number** `01101011` into two **hexadecimal digits**, `6B`.

### 2. Encoded Representations of Binary Numbers

#### Machine Numbers

By now, you must be able to perform addition and subtraction with binary numbers proficiently. So let us consider the following situation.

Suppose a computer register has only eight positions—that is, it can store only eight zeros or ones. How should we store positive and negative numbers?

Easy. Take the first position and define it as follows:

<b>If the first position stores 0, the number is positive; if it stores 1, the number is negative.</b>

The smallest number we can represent is therefore `11111111`, or $-127$.

The largest is `01111111`, or `127`.

But now we have a headache: how do we perform operations on them?

#### Sign-Magnitude vs. Two's Complement

We know that, to simplify the components inside the CPU as much as possible and maximize resource utilization, the basic components of our CPU can perform only addition.

For two positive numbers, calculation is easy. For example, $1+1$:
$$
1+1=0000\ 0001+0000\ 0001 = 0000\ 0010
$$
Let us try making the numbers a little larger:
$$
127+3=0111\ 1111+0000\ 0011= 1000\ 0010
$$
There is an extra bit! Unfortunately, our computer can store only <b>8 bits</b>, so although we put the extra `1` in the sign bit, that is incorrect. After removing the sign bit, the result is
$$
000\ 0010 = 2
$$
This is an <b>overflow</b> during computation, causing the computed result to differ from the actual result.

But your astonishing powers of observation have spotted something else: the result is 2... and that happens to be...?!
$$
130\bmod 128=2
$$
That is right. Calculating this way is exactly equivalent to taking the result <b>[modulo](https://zh.wikipedia.org/zh-cn/%E6%A8%A1%E7%AE%97%E6%95%B8)</b> $256$. Could we cleverly exploit this property to implement subtraction through addition?

For example, suppose we have two numbers, $50$ and $30$, and need to calculate $50-30$.

Since, on this computer, all of our results are
$$
(A+B) \bmod 128
$$
we can regard $50-30$ as
$$
\begin{aligned}
[50+(-30)]\bmod 128
&=[50+(-30\bmod 128)]\bmod 128\\
&=[50+98]\bmod 128\\
&=148\bmod 128\\
&=20
\end{aligned}
$$
Wow! Genius! <del>The audience erupts in delight!</del>

How do we represent this with binary numbers?

Here, we introduce the concept of **two's complement**.

The sign-magnitude binary representation of $-30$ is `1001 1110`.

Now invert every bit except the sign bit to obtain the one's complement: `1110 0001`.

Then add one to the last bit to obtain the **two's complement** representation: `1110 0010`.

For positive numbers, we define their **two's complement representation as the number itself**.

Thus, for $50-30$, we can use $[50]_{\text{two's complement}}+[-30]_{\text{two's complement}}$ during the operation, turning the calculation into
$$
0011 \ 0010 + 1110\ 0010 = 1\ 0001\ 0100
$$
Discarding the overflowing highest bit gives us `0001 0100`, which is $20$.

#### Other Benefits of Two's Complement

If we use sign-magnitude representation, we encounter an awkward situation: zero has two representations.

That is, `1000 0000` represents `-0`, while `0000 0000` represents `+0`.

With two's complement, however, we can define `1000 0000` as $-128$. This lets us store one more number than sign-magnitude representation can! The range also expands to $-128$–$127$.

#### Signed vs. Unsigned Numbers

The signed numbers above are called **signed numbers**. They are stored in computers in **two's complement** form.

For some other needs, however, we do not require signed numbers. In that case, we store them directly in the computer in **sign-magnitude** form, with **no sign bit**.

For example, on an 8-bit operating system, if you write

```c
unsigned int i = 129;
```

then it directly stores `1000 0001`. Because no sign bit needs to be stored, the storage range of an unsigned number on an 8-bit machine is 0–255.

## Two: Addition and Subtraction Circuits

In a computer, a **traditional** **arithmetic unit** consists of an **arithmetic logic unit (ALU)**, a **shifter**, a **program status word (PSW) register**, a **general-purpose register set**, and other components.

But let us not worry about all that yet. First, let us look at the ALU. The core component of an ALU is the **adder**.

### 1. One-Bit Full Adder

Let us recall how we calculate by hand.

When calculating $1011101+0101100$, we use column addition:
$$
\begin{array}{r}
  1011101 \\
+\,0101100 \\
\hline
 10001001
\end{array}
$$
That is, we add each pair of digits separately; if the sum is at least 2, we carry 1 into the next higher place.

A computer performs addition using the same idea. Let us first imagine the simplest addition circuit: a **one-bit full adder**.

When performing addition for a single position, we need to process **three inputs**: addend $A_i$, addend $B_i$, and the carry $C_{i-1}$ from the lower position. It also produces **two outputs**: the current-position sum $S_i$ and the carry $C_i$ to the higher position.

Let us first analyze how to calculate $S_i$:

- When $A_i$ and $B_i$ are the same, the current-position digit of their sum must be `0`. After all, $0+0=0$ and $1+1=10$.
- When $A_i$ and $B_i$ differ, the current-position digit of their sum must be `1`.

Following this idea, the binary calculation $A_i+B_i$ can be represented by the XOR logic circuit, namely $A_i \oplus B_i$.

Now let us put the carry $C_i$ into this addition expression in the same way: if $(A_i \oplus B_i)$ and $C_i$ are the same, the result is `0`; if $(A_i \oplus B_i)$ and $C_i$ differ, the result is `1`. In other words, the calculation can be represented as $(A_i \oplus B_i) \oplus C_i$. Therefore:
$$
S_i = A_i \oplus B_i \oplus C_{i-1}
$$
Next, let us look at the carry $C_i$:

- When both $A_i$ and $B_i$ are `1`, a carry is produced. After all, $1+1=10$.
- When only one of $A_i$ and $B_i$ is `1`:
  - If the carry $C_{i-1}$ from the previous position's operation is `1`, a carry is produced.
  - If $C_{i-1}$ is `0`, then $1+0=1$, so there is certainly no carry.

In terms of the result: $A_i$ is `1` **and** $B_i$ is `1`; **or** $A_i$ and $B_i$ **differ** **and** $C_i$ is `1`.

Written as a logical expression, this is
$$
C_i=A_iB_i+(A_i \oplus B)C_{i-1}
$$

The logical structure of a one-bit full adder is therefore shown below.

<img src="https://files.seeusercontent.com/2026/09/17/s8Ns/eeb551b.png" alt="One-bit full adder.png" title="One-bit full adder" style="display: block; margin: 0px auto; zoom: 50%;">

If we encapsulate it and expose only its inputs and outputs, its logic symbol is:

<img src="https://files.seeusercontent.com/2026/09/17/Ut1i/drawio.png" alt="One-bit full adder.png" title="One-bit full adder" style="display: block; margin: 0px auto; zoom: 67%;">

### 2. Ripple-Carry Adder

Cascading $n$ full adders forms an $n$-bit <b>serial-carry adder</b> (also called a ripple-carry adder), as shown below.

<img src="https://files.seeusercontent.com/2026/09/17/V1ov/drawio.png" alt="One-bit full adder.png" title="One-bit full adder" style="display: block; margin: 0px auto; zoom: 67%;">

Chaining them together this way makes it easy to add two binary numbers.

Encapsulating them as a single unit gives us a traditional **adder**.

### 3. Adder with Flags

For an $n$-bit adder, besides obtaining the result, we often need to know whether overflow occurred during the calculation, whether the result is positive or negative, whether the result is zero, and so on.

We require the adder to generate the following flags:

- $OF$: **overflow flag**. `1` indicates overflow, while `0` indicates no overflow. $OF=C_n \oplus C_{n-1}$
- $SF$: **sign flag**. It equals the most significant bit of the result; `1` indicates negative, while `0` indicates positive. $SF=S_{n-1}$
- $ZF$: **zero flag**. `1` indicates that the result of the addition or subtraction is $0$. It is set to `1` when every bit is `0`.
- $CF$: <b>carry/borrow flag</b>. It is used to determine whether overflow occurred in an unsigned addition or subtraction. `1` indicates overflow, while `0` indicates no overflow.

The adder's symbol can be represented as follows:

<img src="https://files.seeusercontent.com/2026/09/17/tE8g/_20260918000903_15_363.webp" alt="One-bit full adder.png" title="One-bit full adder" style="display: block; margin: 0px auto; zoom: 18%;">

#### Methods for Detecting Overflow

We know that addition and subtraction using two's complement can overflow only when **adding numbers with the same sign** or **subtracting numbers with different signs**. This is easy to understand intuitively, because when two numbers with the same sign are subtracted, the absolute value of the result must be smaller than the absolute value of either the subtrahend or the minuend.

On an 8-bit machine, when a result exceeds 127, it wraps around to -128. For example, $127+3=-126$. Based on this, we can devise a very intuitive detection method: **when two numbers have the same sign, overflow has occurred if the sign of the result differs from theirs**.

##### 1) **Using One Sign Bit**

Suppose the sign bits of the two numbers taking part in the operation are $A_i$ and $B_i$, respectively, and the sign bit of the result is $S_i$. We obtain the overflow logic expression:
$$
V=A_iB_i\overline{S_i}+\overline{A_i}\overline{B_i}S_i
$$

##### 2) Using **One Sign Bit** Together with the **Carry**

- If both numbers are positive, their sign bits are both `0`, so they certainly do not produce a carry into the next position.
  - If the second-highest position does not carry into it, the sign has not changed, and the sign bit remains `0`.
  - If the second-highest position does carry into it, the sign bit becomes `1`; the sign has changed, so overflow has occurred.
- The same principle applies when both numbers are negative. Their sign bits are both `1`, so they necessarily produce a carry into the next position, while the current-position digit after addition is `0`.
  - If the second-highest position carries `1` into it, the sign bit remains `1`, and no overflow has occurred.
  - If the second-highest position does not carry into it, the sign bit is `0`; the sign has changed, so overflow has occurred.

To summarize, **overflow occurs if the carry from the highest position differs from the carry from the second-highest position**.

In other words, suppose the carry produced by the sign bit after the calculation is $C_n$, and the carry produced by the second-highest position (the highest value bit) is $C_{n-1}$. If $C_n$ differs from $C_{n-1}$, overflow is indicated.
$$
V=C_{i} \oplus C_{i-1}
$$

## Three: Addition and Subtraction Circuit

Finally! Here comes the big one! But before that, we need to cover a small interlude.

### 1. MUX Multiplexer

In an addition and subtraction circuit, we need a **2-to-1 multiplexer (MUX)** to control whether addition or subtraction is performed.

The idea is simple: for subtraction, take the additive inverse of the subtrahend. That is,
$$
X-Y \rightarrow X+(-Y)
$$
We feed both $Y$ and $\overline{Y}$ into the MUX and give it a signal, Sub.

- If Sub is `0`, addition is being performed, so the MUX selects $Y$ as its output.
- If Sub is `1`, subtraction is being performed, so the MUX selects $\overline{Y}$ as its output.

> $\overline{Y}$ is the <b>inversion</b> of $Y$. If $Y=1010$, then $\overline{Y}=0101$.

<img src="https://files.seeusercontent.com/2026/09/18/mTy9/drawio.png" alt="One-bit full adder.png" title="One-bit full adder" style="display: block; margin: 0px auto; zoom: 67%;">

### 2. Arithmetic Circuit

Connecting the MUX to one end of the adder gives us the following circuit:

<img src="https://files.seeusercontent.com/2026/09/18/Yw6j/drawio.png" alt="One-bit full adder.png" title="One-bit full adder" style="display: block; margin: 0px auto; zoom: 67%;">

In a computer, addition and subtraction of both signed and unsigned numbers are implemented using this same circuit. Its inputs include two $n$-bit operands, $X$ and $Y$, as well as a control signal, $Sub$.

The control signal $Sub$ not only determines which data path enters the adder; when subtraction is performed (when $Sub$ is `1`), it also serves as the carry input to the lowest bit.

Now everything is ready. Let us analyze, step by step, how addition and subtraction work.

#### Addition

- $X$ is fed directly into the adder.
- $Sub$ is `0`, so the MUX selects $Y$ and feeds it into the adder.
- The adder directly computes $X+Y+C_{in}$, outputs the $n$-bit result $F$ and the carry output $C_{out}$, and generates the status flags.

It is worth noting that if $X$ and $Y$ are unsigned numbers, then the result is $F=(X+Y)\mod2^n$. If $X+Y\ge2^n$, a carry is produced, so $C_{out}=1$, indicating that unsigned overflow has occurred.

#### Subtraction

- $X$ is fed directly into the adder.
- $Sub$ is `1`, so the MUX selects $\overline{Y}$ and feeds it into the adder.
- The adder computes $X+\overline{Y}+C_{in}$, namely $X+\overline{Y}+1$.

If we are calculating the subtraction of signed numbers, then inverting $[Y]_{\text{two's complement}}$ and adding 1 gives exactly $[-Y]_{\text{two's complement}}$, so the operation is equivalent to $X+(-Y)$.

In addition, when calculating unsigned subtraction, we define the **overflow flag OF as the inverse of $C_{out}$**. That is, $OF=\overline{C_{out}}$. This is exactly the opposite of unsigned addition.

This is because the operation is equivalent to $X-Y+2^n$. Therefore:

- When $X\ge Y$, $X-Y+2^n \ge 2^n$, so there is a carry.
- When $X<Y$, $X-Y+2^n < 2^n$, so there is no carry and $C_{out}=0$. At this point, $OF=\overline{C_{out}}=1$, indicating overflow.

## Epilogue

Your mom bursts through the door and glares furiously at your computer screen—but by now, you have [Cloverta's Blog](https://blog.cloverta.top) open!

It turns out that you were learning binary addition and subtraction. She nods in satisfaction. This person's blog is pretty good, so remember to add its RSS feed to your subscriptions.

<img src="https://files.seeusercontent.com/2026/09/18/H6qn/100px-THBWiki-LOGO.gif" alt="One-bit full adder.png" title="One-bit full adder" style="display: block; margin: 0px auto; zoom: 67%;">
