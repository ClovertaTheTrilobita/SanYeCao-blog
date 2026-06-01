---
title: "[Study Notes] The Weird Crowbar-Looking Symbol ∫ — Indefinite Integrals"
pubDate: 2026-06-02
description: 'A bunch of happy college students vs. a weird symbol that looks like a crowbar. Who would win?'
author: "Cloverta"
image: 
    url: "https://files.seeusercontent.com/2026/06/01/7ggO/pasted-image-1780316784165.webp"
    alt: "meme"
tags:  ["Study Notes", "Calculus", "Integrals"]
---

<p style="font-size: 0.85rem;"><i><sub>Content translated by <a href="https://chatgpt.com/">ChatGPT</a>.</sub></i></p>

## Before We Begin

Suppose you plant an electromagnetic bomb inside a power station in Night City, attempting to use the shockwave produced by destroying the station to bring down the AV carrying the ripperdoc. The problem is that the shockwave has an enormous blast radius, so you must escape to a safe distance to avoid getting caught in it. Unfortunately, because of interference drones and the invisible hand of the NCPD, you cannot use satellite maps to check your location. What should you do?

The good news is that you can record the velocity curve displayed on your car's dashboard and ask the ever-annoying Johnny to calculate a function describing your speed. “This is easy, V,” Johnny says. “We can use indefinite integrals to effortlessly find the functional relationship between time and distance travelled.”

<img src="https://files.seeusercontent.com/2026/06/01/lLx9/pasted-image-1780316213606.webp" alt="pasted-image-1780316213606.webp" style="display: block; margin: 0 auto;"/>

### What Is an Integral?

First of all, we know that **differentiation** breaks a function down into infinitesimal changes in order to calculate how the function changes locally. **Integration**, on the other hand, is the opposite of differentiation: it accumulates the infinitesimal changes of a function one by one to obtain the whole.

From the abstract perspective of functions, when we differentiate the function $y=f(x)$ and divide the two infinitesimal changes $dy$ and $dx$, we obtain the instantaneous rate of change of the function at that point, which is the derivative:
$$
f'(x)=\frac{\mathrm{d}y}{\mathrm{d}x}
$$
What integration does is accumulate the tiny changes produced within each small segment, thereby obtaining the overall change:
$$
f(x_1)-f(x_0)=\sum \Delta y
$$
As the interval is divided into increasingly finer segments, the actual change $Δy$ within each segment can be represented by the differential $dy$. By adding up all the infinitesimal changes $dy$ from $x_0$ to $x_1$, we can obtain the change in the function from $x_0$ to $x_1$. In other words, this is the **definite integral** of the derivative function over that interval:
$$
f(x_1) - f(x_0)= \int_{x_0}^{x_1} , dy = \int_{x_0}^{x_1} f'(x) , \mathrm{d}x
$$
We will discuss the details and geometric interpretation of definite integrals more carefully in the next section. For now, let us rearrange the formula:
$$
f(x_1) = f(x_0) + \int_{x_0}^{x_1} f'(x) , \mathrm{d}x
$$
Here, the function value at the starting point, $f(x_0)$, is a constant. If no initial value is specified, we can write it as an arbitrary constant $C$:
$$
f(x_1) = C + \int_{x_0}^{x_1} f'(x) , \mathrm{d}x
$$
When we stop using a fixed, known $x_1$ as the upper limit of the definite integral and replace it with a variable $x$, we obtain the **formula for indefinite integrals**:
$$
\int f'(x) , \mathrm{d}x = f(x) + C
$$
A definite integral with a variable upper limit gives us one specific antiderivative. An indefinite integral adds an arbitrary constant $C$ to that antiderivative, representing all possible antiderivatives.

## Basic Concepts of Indefinite Integrals

### Definition

Although we derived the formula for indefinite integrals in the introduction through a whole bunch of flashy steps that nobody can understand anyway, an introduction is still just an introduction. ~~It is not a big deal if you skip the entire thing.~~

So, what are indefinite integrals useful for?

> **Definition:** The collection of all **antiderivatives** of $f(x)$ is called the **indefinite integral** of $f(x)$.

That is right. An indefinite integral is essentially this: **given the derivative of a function, work backwards to find the original function.**

Compared with differentiation, differentiation breaks a function down into its local pattern of change. An indefinite integral restores the original function from that local pattern of change.

### Theorem

“Very good, V.” Johnny tilts up his sunglasses, which he thinks make him look cool. “Then do you know why a function $f(x)$ that is continuous on an interval $I$ must have an antiderivative on that interval?”

> **Theorem:** If $f(x)$ is continuous on an interval $I$, then $f(x)$ must have an antiderivative on the interval $I$.

Let us take an example, Johnny says, turning his gaze back to the car's dashboard.

Suppose we define a function relating velocity to time:
$$
v(t)
$$
Then we can easily define:
$$
s(t)=\int_{t_0}^{t}v(u) , \mathrm{d}u
$$
It represents the displacement from $t_0$ to $t$.

Suppose we drive for a very short amount of time $\Delta t$. The additional distance travelled can be approximated by:
$$
\Delta s \approx v(t) \Delta t
$$
That is:
$$
\frac{\Delta s}{\Delta t} \approx v(t)
$$
As $\Delta t → 0$, we can treat the expression above as:
$$
\frac{\mathrm{d}s}{\mathrm{d}t} = s'(t) = v(t)
$$
This is the differentiation formula for an integral with a variable upper limit:
$$
(\int_{t_0}^{t}v(u) , \mathrm{d}u)'=v(t)
$$
This shows that for any continuous velocity function $v(t)$, there exists at least one position function $s(t)$ whose derivative is exactly $v(t)$.

Intuitively, when we drive, a continuously changing velocity gives us a known increment in distance during every tiny interval of time, which ensures that our distance function exists.

Then what happens when $f(x)$ is not continuous?

> **Theorem:** If $f(x)$ has a discontinuity of the first kind on an interval $I$, then $f(x)$ has no antiderivative on the interval $I$.

In fact, from what we learned in high school, we already know that for:
$$
f(x) = |x|
$$
$f(x)$ is not differentiable at $x=0$.

Intuitively, the derivative is the slope of the tangent line of a function. At a sharp corner like this, there is no tangent line, so naturally the derivative does not exist.

Now let us think in reverse. For:
$$
f(x)=
\begin{cases}
1, & x \geq 0, \
-1,  & x < 0.
\end{cases}
$$
there is no antiderivative either.

If we forcibly assume that it has an antiderivative $F(x)$, then:
$$
\lim_{x \to 0^+} F'(x) = 1 \
\lim_{x \to 0^-} F'(x) = -1
$$
Therefore, $F'(x)$ jumps from $-1$ to $1$ at $x=0$. However, according to [Darboux's theorem](https://en.wikipedia.org/wiki/Darboux%27s_theorem_%28analysis%29), derivatives have the intermediate value property. In other words, there must be some point between $-1$ and $1$ where the derivative takes the value $0$, as well as points where it takes the other values between $-1$ and $1$.

However, this $F'(x)$ can only take the values $1$ and $-1$. This produces a contradiction, so $f(x)$ has no antiderivative.

## How to Calculate Indefinite Integrals

“V, now that you know what an indefinite integral is, do you know how to find the antiderivative when someone hands you a formula?” Johnny shouts at you through a hail of bullets fired by the drones.

“Easy!” He pulls a scrap of paper out of nowhere. “The first thing you need to hammer into your head is...”

### Basic Formulas for Indefinite Integrals

<details>
  <summary>(Click to expand)</summary>

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

“Remember, no matter what kind of integral you encounter, your first priority is to manipulate the algebraic expression until it matches one of these basic integral formulas. Got it?” Johnny shoves the scrap of paper into your hands.

### Integration by Substitution: The First Method

When studying differentiation, we clearly know that:
$$
\frac{\mathrm{d}y}{\mathrm{d}x}=f'(x)
$$
That is:
$$
\mathrm{d}y = \mathrm{d}f(x) = f'(x)\mathrm{d}x
$$
Then it is obvious that:
$$
\int f[\varphi(x)]\varphi'(x) , \mathrm{d}x = \int f[\varphi(x)] , \mathrm{d} \varphi(x) = F[\varphi(x)] + C
$$
We can also understand this from the perspective of the chain rule.

If we differentiate the composite function $F(\varphi(x))$, we easily obtain:
$$
F[\varphi(x)]' = F'[\varphi(x)]\varphi'(x) = f[\varphi(x)]\varphi'(x)
$$
Therefore, integrating it in reverse gives us the formula above.

<details>
  <summary>Common Patterns for Completing the Differential (Click to expand)</summary>

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

Looks familiar? Integrals like these are happening all across the country, and you could be next ☝️

There is no need to memorize these formulas specifically. Just do more definite integral exercises and you will naturally get used to them. *(runs away)*


### Method 2: Substitution (Second Type)

Sometimes the expression we have cannot be directly handled by the first substitution method. For example:
$$
\int \frac{x^2}{\sqrt{a^2-x^2}},\mathrm{d}x
$$
At first glance, how do we solve this? Don’t panic — here we can pick a suitable substitution $x = \phi(t)$ to replace $x$ in the integral.

The three most commonly used substitutions are:

#### 1. Trigonometric Substitution

1. If the integrand has $\sqrt{a^2-x^2}$, set $x = a \sin t$ or $x = a \cos t$.

2. If the integrand has $\sqrt{a^2+x^2}$, set $x = a \tan t$.

3. If the integrand has $\sqrt{x^2 - a^2}$, set $x = a \sec t$.

Then for the integral above, we can immediately spot the solution. Substituting $x = a \sin t$ gives:
$$
\begin{aligned}
\text{Original Integral}
&= \int \frac{a^2\sin^2 t}{a\cos t},\mathrm{d}(a\sin t) \
&= \int \frac{a^2\sin^2 t}{a\cos t}\cdot a\cos t,\mathrm{d}t \
&= \int a^2\sin^2 t,\mathrm{d}t
\end{aligned}
$$

The next steps are straightforward.

“Trig functions are super important in integrals.” Johnny crosses his legs and pulls out a cigar. “V, you should pay extra attention to methods like this.”

What a show-off.

#### 2. Radical Substitution

When the integrand contains $\sqrt[n]{ax + b}$, we can set $t = \sqrt[n]{ax + b}$, so that $x = \frac{1}{a}(t^n - b)$.

#### 3. Reciprocal Substitution

When the degree of the polynomial in the denominator is higher than in the numerator, we can set $x = \frac{1}{t}$.

### Integration by Parts

Somewhere in our memory, there’s a formula buried:

If $u(x)$ and $v(x)$ both have continuous derivatives, then
$$
(uv)' = u'v + uv'
$$
Now we can rearrange:
$$
uv' = (uv)' - u'v
$$
Integrate both sides:
$$
\int uv',\mathrm{d}x = \int (uv)' - u'v , \mathrm{d}x
$$
Rewriting gives:
$$
\int u , \mathrm{d}v = uv - \int v , \mathrm{d}u
$$
Yes! This is the famous **integration by parts**! Useful for products of two algebraic expressions.

“Hmph, that was so easy to derive.” Johnny flicks ash off his cigar disdainfully. “If I had been born back then, I would’ve discovered it for sure.”

The beauty of integration by parts is that it can transform a messy, chaotic expression into something much easier to integrate.

Remember this one?
$$
\int \frac{1}{1+x^2} , \mathrm{d}x = \arctan x + C
$$
Now, what about:
$$
\int \arctan x , \mathrm{d}x = ?
$$
“You won’t crack this by brute force,” Johnny snorts.

Unless…

Exactly! Use integration by parts!

The integral becomes:
$$
\begin{aligned}
\text{Original Integral}
&= x\cdot\arctan x - \int x , \mathrm{d}(\arctan x)\
&= x\cdot\arctan x - \int x \frac{1}{1+x^2} , \mathrm{d}x \
\end{aligned}
$$
Ah, now it makes sense. Then we just use basic integral formulas:
$$
\begin{aligned}
\text{Original Integral}
&= x\cdot\arctan x + \frac{1}{2} \int \frac{1}{1+x^2} , \mathrm{d}(x^2) \
&= x\cdot\arctan x + \frac{1}{2} \ln(1+x^2)
\end{aligned}
$$
Magic, right?!

### Integrals of Rational Trig Functions

“I told you…”

Ah… here he goes again…

“V, rational trig functions are super important in indefinite integrals.” Johnny points his cigar at you.

If we encounter integrals of the form $\int R(\sin x, \cos x) , \mathrm{d}x$ (including $\sin^n x \cdot \cos^m x$), we can consider the following substitutions:

* If $\sin x$ is raised to an odd power and $\cos x$ to an even power, try to extract $\mathrm{d}(\cos x)$ or $\mathrm{d}(\sec x)$.

* If $\sin x$ is even and $\cos x$ is odd, try to extract $\mathrm{d}(\sin x)$ or $\mathrm{d}(\csc x)$.

* If both $\sin x$ and $\cos x$ are odd/even, try to extract $\mathrm{d}(\tan x)$ or $\mathrm{d}(\cot x)$.

Now consider:
$$
\int \frac{1}{3+\sin^2x} \mathrm{d}x = ?
$$
With sharp attention, we notice that $\sin x$ has power 2, and $\cos x$ has power 0. So both $\sin x$ and $\cos x$ are even powers. Then we try to form $\mathrm{d}(\tan x)$ or $\mathrm{d}(\cot x)$. How?

We notice the integrand contains $\sin x$, so to extract the target expression…

Divide both numerator and denominator by $\cos^2 x$:
$$
\begin{aligned}
\text{Original Integral}
&= \int \frac{\sec^2 x}{3\sec^2x + \frac{\sin^2x}{\cos^2x}} ,\mathrm{d}x \
&= \int \frac{\sec^2 x}{3\sec^2x + \tan^2x} ,\mathrm{d}x
\end{aligned}
$$
Next step?

Check the basic integral formulas — notice $\sec^2 x$ and $\tan x$ are suspiciously convenient.

Exactly. Then:
$$
\begin{aligned}
\text{Original Integral}
&= \int \frac{(\tan x)'}{3(\tan^2 x + 1) + \tan^2x} , \mathrm{d}x
\end{aligned}
$$
Whoa, tricky!

$$
\begin{aligned}
\text{Original Integral}
&= \int \frac{1}{4\tan^2 x + 3} , \mathrm{d}(\tan x) \
&= \frac{1}{2} \int \frac{1}{(2\tan x)^2 + (\sqrt{3})^2} , \mathrm{d}(2\tan x)
\end{aligned}
$$
For convenience, let $2\tan x = u$, then:
$$
\begin{aligned}
\text{Original Integral}
&= \frac{1}{2} \int \frac{1}{u^2 + (\sqrt{3})^2} , \mathrm{d}u
\end{aligned}
$$
Using the basic formula, the integral evaluates to:
$$
\begin{aligned}
\text{Original Integral}
&= \frac{1}{2\sqrt3}\arctan\left(\frac{u}{\sqrt3}\right) + C \
&= \frac{1}{2\sqrt3}\arctan\left(\frac{2\tan x}{\sqrt3}\right) + C
\end{aligned}
$$

### Integrals of Rational Functions

“Knowing trig functions alone isn’t enough, V. Too much trig will make your brain all pointy.”

“To become a true integral chad of Night City, you also need to know how to deal with integrals of rational functions.”

> **Theorem:** A proper rational fraction of the form $\frac{P(x)}{Q(x)} = \frac{P(x)}{c_0(x-a)^k(x^2+px+q)^l}$, where $k$ and $l$ are positive integers and $p^2-4q < 0$, can be uniquely decomposed into the sum of a finite number of partial fractions in their simplest forms.

That is, it can be decomposed as:
$$
\frac{P(x)}{Q(x)} = \frac{A_1}{x-a} + \frac{A_2}{(x-a)^2} + ... + \frac{A_k}{(x-a)^k}+\frac{B_1x+D_1}{x^2+px+q}+\frac{B_2x+D_2}{(x^2+px+q)^2}+...+\frac{B_lx+D_l}{(x^2+px+q)^l}
$$
At this point, the expression contains nothing but the simplest algebraic terms. All we need to do is integrate them one by one... right?

“No, no, no. Solving for the undetermined coefficients above isn’t that easy,” Johnny explains with a sneer.

“Are you seriously planning to mash everything together and brute-force the polynomial coefficients? Don’t be stupid. In a situation like ours, every second counts. We don’t have time for that.”

“So allow the legendary Johnny Silverhand himself to tell you how to handle cases like this 😎☝️”

#### Special Method 1: Substitute Special Values for x

Try to choose each substituted value so that only one coefficient remains.

Here’s a chestnut 🌰:
$$
\text{Find }\int \frac{x-3}{(x-1)(x^2 - 1)} , \mathrm{d}x
$$
It is not difficult to obtain:
$$
\begin{aligned}
\text{Original Expression}
&= \frac{Ax+B}{(x-1)^2} + \frac{D}{x+1} \
&= \frac{(Ax+B)(x+1) + D(x-1)^2}{(x-1)^2(x+1)}
\end{aligned}
$$
That is, we need to calculate:
$$
x - 3 = (Ax+B)(x+1) + D(x-1)^2
$$
Using our astonishing powers of observation, we can first set $x = -1$. Then:
$$
-1-3=D(-1-1)^2 \
D=-1
$$
Next, set $x=0$ and substitute $D = -1$:
$$
-3 = B - 1\
B=-2
$$
Finally, just substitute $x = 1$, and we obtain $A = 1$.

#### Special Method 2: The Residue Method + Taking the Limit as x -> ∞

Consider this problem:
$$
\text{Find } \int \frac{x-3}{(x-1)(x^2-1)} , \mathrm{d}x
$$
It is easy to see that:
$$
\frac{x-3}{(x-1)(x^2-1)}  = \frac{A}{x-1} + \frac{B}{(x-1)^2} + \frac{D}{x+1}
$$
First, multiply both sides by $x+1$. This gives:
$$
\frac{x-3}{(x-1)^2} = [\frac{A}{x-1} + \frac{B}{(x-1)^2}](x+1) + D
$$
At this point, sharp-eyed readers will notice that we only need to set $x=-1$ to delete both of those chunks on the right-hand side! Thus:
$$
\frac{-1-3}{(-1-1)^2} = 0 + D \
D = -2
$$
Then what about the remaining $A$ and $B$?

We can deal with $B$ in the same way: multiply both sides by $(x-1)^2$, and we obtain $B = -1$.

Then how do we calculate $A$?

It is time for the limit method to enter the stage.

Multiply both sides by $x$ and let $x \to ∞$:
$$
\lim_{x \to \infty} \frac{(x-3)x}{(x-1)(x^2-1)}  = \lim_{x \to \infty} \frac{Ax}{x-1} + \lim_{x \to \infty} \frac{Bx}{(x-1)^2} + \lim_{x \to \infty} \frac{Dx}{x+1}
$$
Based on the resulting limits, it is not difficult to obtain:
$$
0=A+0+D
$$
Substituting $D = -1$ gives $A=1$.

## After That

“All right, that should do it.” Johnny shouts at you. Your car has stopped on a hilltop overlooking the entire power station, where towering spires rise into the clouds in orderly rows. As dusk deepens into night, the distant lights of Night City flicker with neon brilliance.

“How peaceful,” Johnny says sarcastically. “While we wait for the ripperdoc’s AV to arrive, how about doing a couple of indefinite integral exercises for practice?”
$$
1.\text{ If the result of the indefinite integral }\int \frac{x^2+ax+2}{(x+1)(x^2+1)} , \mathrm{d}x\text{ does not contain an inverse tangent function, then }a=?
$$

<details>
  <summary>》〉Click to expand the solution〈《</summary>
Oh, V, did you spot it? At the very least, the great Johnny Silverhand can tell at a glance that this is a rational-function integral. So let us take it step by step.

First, use the method of undetermined coefficients to decompose the original function, just as I mentioned earlier:
$$
\frac{x^2+ax+2}{(x+1)(x^2+1)} = \frac{A}{x+1}+\frac{Mx+N}{x^2+1}
$$
Then how do we elegantly determine $A$, $M$, and $N$?

The problem states that the result does not contain an inverse tangent function. Therefore, there cannot be a term of the form $\frac{t}{x^2+1} \ (t \in \mathbb{R})$, so we can easily obtain $N = 0$.

Next, forget all that fancy stuff and just mash everything together:
$$
\frac{x^2+ax+2}{(x+1)(x^2+1)} = \frac{(A+M)x^2+Mx+A}{(x+1)(x^2+1)}
$$
It is easy to see that $A+M=1$; $M=a$; and $A = 2$.

Therefore, $a = -1$.

What? You’re saying this is just brute-forcing it with raw horsepower? I don’t care. I’ll use whichever method is easiest.

</details>

$$
2. \int \frac{\sqrt{x+1}+2}{(x+1)^2-\sqrt{x+1}} , \mathrm{d}x =?
$$

<details>
  <summary>》〉Click to expand the solution〈《</summary>
V, do you remember that somewhere in a forgotten corner above, we said this?

> When the integrand contains $\sqrt[n]{ax + b}$, we can set $t = \sqrt[n]{ax + b}$, so that $x = \frac{1}{a}(t^n - b)$.

Now is the time to use it!

Let $t = \sqrt{x+1}$. Then $x = t^2 + 1$, so $\mathrm{d}x = 2t\mathrm{d}t$. Thus:
$$
\begin{aligned}
\text{I}
&= \int \frac{t+2}{t^4-t}2t , \mathrm{d}t \
&= 2\int \frac{t+2}{t^3-1} , \mathrm{d}t
\end{aligned}
$$
Now this problem has become an integral of a rational function. As usual, we rewrite it as:
$$
\begin{aligned}
\text{Original Expression}
&= 2\int \frac{t+2}{(t-1)(t^2+t+1)} , \mathrm{d}t \
&= 2\int (\frac{1}{t-1} - \frac{t+1}{t^2+t+1}) , \mathrm{d}t
\end{aligned}
$$
What do we do next? Our general idea is to complete the denominator and integrate directly.

We notice that there is a standalone $t+1$. Can we use it to construct $(t^2 + t + 1)'$?

All right, let us get to work:
$$
\begin{aligned}
\text{Original Expression}
&= 2\int \frac{1}{t-1} , \mathrm{d}t - \frac{1}{2} \int \frac{2t+2}{t^2+t+1} , \mathrm{d}t\
&= 2\int \frac{1}{t-1} , \mathrm{d}t - \frac{1}{2} \int \frac{2t+1}{t^2+t+1} , \mathrm{d}t - \int \frac{1}{t^2+t+1} , \mathrm{d}t \
&= 2\int \frac{1}{t-1} , \mathrm{d}t - \frac{1}{2} \int \frac{\mathrm{d}(t^2+t+1)}{t^2+t+1}  - \int \frac{\mathrm{d}(t+\frac{1}{2})}{(t+\frac{1}{2})^2 + (\frac{\sqrt3}{2})^2} \
&=2\ln|t-1|-\ln|t^2+t+1|-\frac{2}{\sqrt3}\arctan{\frac{2t+1}{\sqrt{3}}}+C
\end{aligned}
$$
Finally, substitute $t = \sqrt{x+1}$ to obtain the answer.

</details>

$$
3. I_1=\int\cos^4x,\mathrm{dx}=?, \ I_2=\int\sin^4x,\mathrm{dx}=?
$$

<details>
  <summary>》〉Click to expand the solution〈《</summary>

Hmmm... V, this problem looks a little suspicious, doesn’t it?

I bet you racked your brains and still could not figure out how to integrate $\int\cos^4x,\mathrm{dx}$.

What? You actually solved it 😧?! Damn it. Back then, I spent over an hour trying to figure out how to complete $\mathrm{d}(\tan x)$ 😩. Fine, let us compare answers.

We need to break out of our usual way of thinking. This problem has two variables, $I_1$ and $I_2$. Add them together:
$$
\begin{aligned}
I_1 + I_2 &= \int [(\sin^2x+\cos^2x)^2 - \frac{1}{2}\sin^22x] , \mathrm{d}x \
&= \frac{3}{4}x+\frac{1}{16}\sin4x +C_1
\end{aligned}
$$
Similarly, subtracting them gives:
$$
I_1 - I_2 = \frac{1}{2}\sin2x + C_2
$$
Then it is easy to obtain:
$$
I_1 = \frac{1}{2}[(I_1+I_2) + (I_1 - I_2)] = \frac{3}{8}x+\frac{1}{32}\sin4x + \frac{1}{4}\sin2x +C_3 \
I_2 = \frac{1}{2}[(I_1+I_2) - (I_1 - I_2)] = \frac{3}{8}x+\frac{1}{32}\sin4x - \frac{1}{4}\sin2x +C_4
$$
Note that the two arbitrary constants $C$ are not necessarily equal.

</details>

<br>

## Final Notes

Thank you so much for reading this far! This is my first attempt at writing a math-related blog post. If there are any oversights or mistakes, I would greatly appreciate it if you could discuss them and point them out in the comments section. 🙏🫪
