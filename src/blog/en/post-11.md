---
title: "[Study Notes] The First Boss outside the Tutorial Village—The KMP Algorithm"
pubDate: 2026-06-28
description: 'Great, now that you know how to print Hello World in Cpp, hurry up and deal with this adorable little thing!'
author: "Cloverta"
image:
  url: "https://files.seeusercontent.com/2026/06/28/oA7c/pasted-image-1782643695107.webp"
  alt: "meme"
tags: ["Study Notes", "Algorithms"]
---

## Preface

A mysterious alumnus who had already graduated shoved a hard drive into your hands. Stored inside were nearly ten years’ worth of original final exam papers! Unfortunately, however, the files were encrypted, and the study materials could only be viewed by entering the correct password.

There were only two other `.txt` files on the hard drive, each containing a string. One of them was a whopping 2 MB in size! The other was an adorable little thing containing only around a hundred characters.

“Find every occurrence of the substring!” The alumnus’s words echoed in your ears. “Concatenate all the resulting positions, and you’ll get the password for extracting the study materials!”

What are we supposed to do?! The final exam starts in only eight hours. How can we get our hands on those study materials?!

## Brute-Force Matching

When we think about performing pattern matching between two strings, the first idea that pops into our heads is obviously...

Compare them one by one! 🤓☝️

Take every substring of length (m) from the text string and compare each of them with the pattern string in sequence, until a perfectly matching substring is found or every substring has failed to match.

This is way too easy. Suppose we have two strings, `abacccaaccba` and `ccb`, and we want to find every occurrence of `ccb` in the text string. We can simply compare the substring against the text string one position at a time, starting from the beginning.

First, we compare the first three characters of the text string, namely `aba`. Unfortunately, it is not `ccb`;

Next, we compare the second through fourth characters of the text string, namely `bac`. Unfortunately, that is not `ccb` either;

But that is fine. As long as we continue matching them one by one like this, we will eventually find it.

Let’s write the code in one go!

```c
typedef struct {     // Define the structure used to represent a string
	char ch[MaxLen]; // Array used to store the characters in the string
  int length;        // Length of the string
}SString; 

int Index(SString S, SString T) {
  int i=1,j=1; // Initialize two index pointers: i marks the current character in the text string, while j marks the current character in the substring
  while(i<=S.length && j<=T.length) { // Continue looping while i and j remain within their respective strings
    if (S.ch[i]==T.ch[j]){ // If the characters currently pointed to by i and j are identical
      i++; j++;            // Move both i and j one position backward and begin comparing the next characters in their respective strings
    }
    else {                 // If the two characters are different
      i=i-j+2;             // Move i to the character after the starting position of the current comparison; for example, if we just started matching from the first character of the text string, i now returns to the second character
      j=1;                 // Move j back to the first character of the substring
    }
  }
  if (j>T.length) return i-T.length; // If j is greater than the length of the substring, the entire substring has been matched successfully, so return its position in the text string
  return 0;  // Otherwise, return 0 to indicate that the match failed
}
```

So Easy! Just as you are about to happily press “Compile and Run,” your intuition stops your fingertip in its tracks.

Something is wrong.

Oh no. No, no, no. This is not right!

**When matching the substring and the text string using this method, suppose the text string has a length of (m) and the substring has a length of (n). In the worst-case scenario, matching the entire text string requires (m \times n) time! Its time complexity is (O(mn))!** But you only have eight hours left, and reading through all the exam papers will take at least seven and a half hours. This method obviously will not work.

So what are we supposed to do?

This is where the famous KMP algorithm makes its grand entrance.

## The KMP Algorithm

### 1. The Idea

Could we come up with a method that does not move the `j` pointer all the way back to the beginning of the substring whenever a mismatch occurs?

Hmm... That seems possible. After all, the substring may contain repeated parts. Let’s try an example first.

Suppose we have a partially matched text string `ababab??????` and the pattern string `abababcdef`.

When we reach the seventh character:

```txt
      i
      ↓
ababab??????
abababcdef
      ↑
      j
```

Suppose the match fails at this point. According to the brute-force matching approach, we would need to move `i` back to the second position of the text string and move `j` back to the first position of the substring.

But that is far too slow.

Let us activate our astonishing powers of observation. We notice that the first six characters of the substring are `ababab`, which consists of `ab` repeated three times.

Intuitively, could we not simply do this instead?

```txt
      i
      ↓
ababab??????
  abababcdef
      ↑
      j
```

The position of `i` remains unchanged, while `j` moves back only to the fifth character. Clearly, `i` no longer needs to backtrack, and `j` does not need to return to the beginning every single time. The matching efficiency immediately improves by a huge amount!

But how do we know where `j` should return to in each situation? We cannot exactly take a glance at the strings every time and personally tell the computer where to go, can we?

### 2. The `next` Array

We need to store the character position to which `j` should backtrack in the `next` array.

In other words, we calculate such an array in advance. Suppose a mismatch occurs when `j` reaches the seventh character of the substring. We only need to check the `next` array, obtain the value stored in `next[7]`, and directly change `j` to that value.

That is to say, we only need to determine how many characters at the beginning of the string before the current character—the prefix—are identical to the same number of characters at the end—the suffix.

<details>
  <summary>》〉What is the prefix & suffix of a string?〈《</summary>

- A prefix of a string is a substring that begins with the first character of the string, but it cannot be as long as the original string itself. For example, the prefixes of `abab` may be `a`, `ab`, and `aba`, but not `abab`.
- A suffix of a string is a substring that ends with the final character of the string, but it cannot be as long as the original string itself. For example, the suffixes of `abab` may be `b`, `ab`, and `bab`.

</details>

For the substring `abababcdef` in our example, when we reach the seventh character, `c`, the characters before `c` form the string `ababab`. It is easy to see that the **prefix** formed by the first four characters and the **suffix** formed by the final four characters are identical: both are `abab`.

Therefore, when the seventh character fails to match, we only need to move `j` back to position (4+1). In other words, we continue matching from the fifth character.

```txt
abababcdef
    ↑
    j
```

Now let’s try calculating the entire `next` array for this substring~

For the first character, we find that there are no characters before it. We therefore define its corresponding `next[1]` as 0. This makes it convenient to directly perform `++j` during the next round of the algorithm, which causes matching to restart from the first character of the substring.

For the second character, there is only one character before it: `a`. Therefore, it has no prefix or suffix. During the next comparison, we must begin matching from the first character, so we define `next[2]` as `0+1=1`.

For the third character, the preceding string is `ab`. There is still no identical prefix and suffix when counting from the beginning and the end. During the next comparison, we must still start from the beginning, so we define `next[3]=1`.

For the fourth character, the preceding string is `aba`. We find that a prefix of length `1` and a suffix of length `1` are identical: both are `a`. Therefore, during the next comparison, we can directly begin matching from the second character, so we define `next[4]` as `1+1=2`.

For the fifth character, the preceding string is `abab`. It has an identical prefix and suffix of length `2`, both of which are `ab`. Therefore, we define `next[5]` as `2+1=3`.

For the sixth character, the preceding string is `ababa`, so we define `next[6]=3+1=4`.

When we reach the eighth character, the preceding string is `abababc`. At this point, there is no identical prefix and suffix, so we define `next[8]=0+1=1`.

Got it? Then let’s move on to the code.

```c
void GetNext(SString T, int next[]){
  int i = 1, j = 0; // At the very beginning, initialize i and j
  next[1] = 0; // Define the first element of the next array as 0
  while (i < T.length) { // Continue looping while i has not exceeded the total length of the string
    if (j == 0 || T.ch[i] == T.ch[j]){ // If j is 0, or if the two characters pointed to by i and j are identical
      ++i; ++j;                        // Increment i and j by 1
      next[i] = j;                     // Set the i-th element of the next array to j
    }
    else j = next[j];                  // If they are different, move j back to the backtracking position stored for the current character
  }
}
```

You can understand the code above as matching the substring against itself, except that `j` begins one position behind `i`.

When the first iteration begins, `j` is `0`, so the condition is satisfied. Both `i` and `j` are incremented by 1, and `next[i]`, which is `next[2]`, is set to 1.

```txt
  i
  ↓
 ababcdef
 ababcdef
 ↑
 j
```

The second iteration then begins. At this point, `i=2` and `j=1`, and the characters they point to are different, so the condition is not satisfied. Therefore, `j` returns to `next[1]`, which is position 0.

```txt
  i
  ↓
 ababcdef
 ababcdef
↑
j
```

During the third iteration, `j` is `0`, so `i++; j++;` is performed. At this point, `j=1`, `i=3`, and `next[3]=1`.

```txt
   i
   ↓
 ababcdef
 ababcdef
 ↑
 j
```

During the fourth iteration, we find that the characters pointed to by the two pointers are identical, so `i++; j++;` is performed. At this point, `j=2`, `i=4`, and `next[4]=2`.

```txt
    i
    ↓
 ababcdef
 ababcdef
  ↑
  j
```

Continuing in the same way, we can obtain the entire `next` array for the substring.

### 3. The Code

After整理一下—after putting our ideas in order—we obtain the complete code:

```c
int IndexKMP(SString S, SString T, int next[]){
  int i=1,j=1; // At the beginning, both i and j point to the first character
  int next[T.length+1]; // Following the convention used by most textbooks, index 0 of the next array is left unused so that each array index matches the ordinal position of its corresponding element
  GetNext(T, next); // Calculate the next array
  while(i <= S.length && j <= T.length) { // Continue looping while i and j have not exceeded the lengths of their respective strings
    if (j==0 || S.ch[i]==T.ch[j]){ // If j is 0, or if the characters pointed to by the two pointers are identical
      ++i; ++j;                    // Move both i and j one position backward
    }
    else j = next[j];              // Otherwise, move j back to the backtracking position stored in the next array
  }
  
  if (j>T.length) return i-T.length; // If j has traversed the entire substring, the match has succeeded, so return the position of the substring in the text string
  return 0; // Otherwise, return 0 to indicate failure
}

void GetNext(SString T, int next[]){
  int i = 1, j = 0; // Initialize i and j
  next[1] = 0; // Define the first element of the next array as 0
  while (i < T.length) { // Continue looping while i has not exceeded the total length of the string
    if (j == 0 || T.ch[i] == T.ch[j]){ // If j is 0, or if the two characters pointed to by i and j are identical
      ++i; ++j;                        // Increment i and j by 1
      next[i] = j;                     // Set the i-th element of the next array to j
    }
    else j = next[j];                  // If they are different, move j back to the backtracking position stored for the current character
  }
}
```

### 4. Optimizing the KMP Array

Being the clever person you are, you must already have noticed that the current algorithm is not optimal...

Why are you looking at me in such horror? `(ﾟдﾟ≡ﾟдﾟ)` The optimization is actually very simple. It requires only one tiny trick.

Look at `abababcdef`. Its `next` array is:

$$
\boxed{\text{next}=[0,1,1,2,3,4,5,1,1,1]}
$$

Now think about what happens if we reach the third character and discover a mismatch. We look up `next[3]=1`, meaning that we need to return to the first character and try matching again.

However, we already know that the first character is identical to the third character. Since the third character failed to match, the first character must also fail to match. We would then have to consult the array once again and jump to `next[1]=0`.

So why can we not simply jump directly to 0?

Exactly. After a mismatch, the original KMP algorithm may sometimes jump to a position containing the same character, meaning that the next comparison is guaranteed to fail again. `nextval` directly skips over this useless comparison.

Simple, right? Let’s go straight to the code.

```c
void GetNextVal(SString T, int next[], int nextval[]) {
    nextval[1] = 0; // Similarly, define the first element as 0

    for (int i = 2; i <= T.length; ++i) { // Check each element in sequence, beginning with the second element
        int j = next[i];                  

        if (T.ch[i] != T.ch[j]) {         // If the character at the backtracking position stored in the next array differs from the current character
            nextval[i] = j;               // Keep it unchanged
        } else {
            nextval[i] = nextval[j];      // Otherwise, replace the j-th element with the i-th element
        }
    }
}
```

You have now mastered the KMP algorithm. At last, you can proudly retrieve the password!

Your phone rings.

The alumnus, who had left more than 99 of your messages on read, suddenly sends you a message.

“Um, I forgot to tell you. My password string is actually indexed starting from 0, so you’ll need to rewrite the algorithm as a zero-based version.”

“And you absolutely must not just subtract 1 before `return`, or a big burly top will come pounding on your dorm-room door tonight 😠”

“I’m sure you can figure it out.”

<img src="https://files.seeusercontent.com/2026/06/28/K0sd/pasted-image-1782642667317.webp" alt="pasted-image-1782642667317.webp" title="pasted-image-1782642667317.webp" style="display: block; margin: 0px auto; zoom: 33%;">