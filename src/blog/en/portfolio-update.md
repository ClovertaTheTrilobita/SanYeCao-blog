---
title: "A Homepage Redesign"
pubDate: 2026-10-09
description: "But I don't know the first thing about design?!"
author: "Cloverta"
image:
    url: "https://files.seeusercontent.com/2026/10/08/6Cnw/pasted-image-1791493186458.webp"
    alt: "screenshot"
tags: ["Reflections"]
---

<p style="font-size: 0.85rem;"><i><sub>Content translated by <a href="https://chatgpt.com/">ChatGPT</a>.</sub></i></p>

Homepage: <b>[Cloverta -More About Me-](https://cloverta.top)</b>

My old homepage had been around for quite a long time.

No... It may feel like a long time ago, but it was actually only last year, when I happened to come across an article by the great <b>[Idealclover](https://idealclover.top/)</b> on WeChat.

<img src="https://files.seeusercontent.com/2026/10/08/3liR/pasted-image-1791493374282.webp" alt="pasted-image-1791493374282.webp" title="pasted-image-1791493374282.webp" style="zoom: 25%; display: block; margin: 0 auto;" >

It immediately caught my eye. More importantly, it was <b>[open source on GitHub](https://github.com/idealclover/Homepage)</b>!

At the time, I thought, “I want a personal homepage of my own too.”

So I simply forked his website and used it. (

<img src="https://files.seeusercontent.com/2026/10/08/y4yD/pasted-image-1791493630195.webp" alt="pasted-image-1791493630195.webp" title="pasted-image-1791493630195.webp" style="zoom:20%; display: block; margin: 0 auto;" >

DeepSeek was all the rage at the time. With AI's help, I made many changes to the source code, including displaying the GitHub Star count in real time through an API I had built myself, as well as updating posts in real time through the WordPress API. (I was still using WordPress for my blog back then.)

At that point, I was a complete beginner when it came to deploying websites. I did not even know what a build was or how servers worked.

The only thing I knew came from a sophomore-year web frontend class, where our teacher from India taught us `npm run dev` in curry-flavored English.

Then I directly reverse-proxied `localhost:4321` to port `80`.

Absolutely cursed.

After I excitedly showed it to a classmate, they asked me, “Why is there this thing called Astro Dev Toolbar at the bottom of your website?”

That was when I realized something was wrong. So I went to ask Mr. D.

Mr. D told me that an Astro project had to be built first, after which the static pages should be placed on the server.

What are you even talking about? You mean `npm` can also `run build`?

So I pulled the code onto the server. Every time I finished editing locally, I would `ssh` into the server, run `git pull`, then `npm run build`, and finally `cp ./dist /www/wwwroot/cloverta.top`.

Absolutely cursed...

I must have thought I was so clever back then.

But gradually, the Java server running the API expired, and I forgot all about it. Later still, I stopped using WordPress. My (questionably) personal homepage entered a half-dead state.

## It Was Time for a Change!

I had wanted to redesign my homepage for quite some time.

But as I am sure everyone can tell from the frontend of this blog, my taste in design is terrible. (covers face) (holds head) (crouches down)

For a website whose main purpose is publishing articles, all of that is secondary. But for a personal homepage...

**Looking good** is its primary function.

So I went to Bilibili to watch some graphic design courses.

Wow, that is long. Is there a TL;DR version?

Oh, this one looks good. It is only four minutes long: <b>[Typography Knowledge Even Non-Designers Should Learn: Visual Flow - oooooohmygosh](https://www.bilibili.com/video/BV1FZ4y1g74Y/)</b>

Hmmm...

I used to have a bad habit whenever I worked on frontend development: I would jump straight into writing code! Design? Come on, art students are a dime a dozen in China! (gets beaten up)

That was until I took a course called <b>[Human Computer Interaction](https://opas.peppi.oulu.fi/en/course/521145A/4249?period=2025-2026)</b> while I was on exchange in Finland.

In class, our teacher had us work step by step: first, use <b>[Figma](figma.com)</b> to put our design inspirations—that is, a collection of images matching our concept—together; then sketch the rough structure of the webpage by hand; then assemble a visual mockup of the website in Figma; and finally turn it into an actual webpage with code.

I was pretty confused at first. Why were we being asked to register for a graphic-design website right at the start? Where was my IDE? Where was my code? I was studying engineering, not art... right?

But only after the course ended did I realize that websites made with this workflow—even ones thrown together just to get an assignment done—looked better than the ones I made on my own... (oof!)

After all that rambling, what I mean is that this time, I decided to start with Canva.

<img src="https://files.seeusercontent.com/2026/10/08/g1mH/pasted-image-1791495660551.webp" alt="pasted-image-1791495660551.webp" title="pasted-image-1791495660551.webp" style="zoom:20%;  display: block; margin: 0 auto;" >

<p align="center"><sup>I had only ever used Canva to make flyers for student clubs and... some mysterious Photoshops.</sup></p>

I have always liked card-based web design. I wanted my personal homepage to look like a postcard.

Postcards feel full of stories. I like that.

So I tried dragging in that profile picture I like.

<img src="https://files.seeusercontent.com/2026/10/08/Ucx9/pasted-image-1791496175202.webp" alt="pasted-image-1791496175202.webp" title="pasted-image-1791496175202.webp" style="zoom:20%;  display: block; margin: 0 auto;" >

Canva showed me a suggested placement box. That was nice—the position carefully designed by actual designers was bound to look better than somewhere I picked out of thin air.

What next?

Since this was a personal homepage, what I wanted most was for people to see my name as soon as they arrived. So I needed to put this screen name in the most prominent position!

<img src="https://files.seeusercontent.com/2026/10/08/q1Za/pasted-image-1791496417144.webp" alt="pasted-image-1791496417144.webp" title="pasted-image-1791496417144.webp" style="zoom:20%;  display: block; margin: 0 auto;">

The bottom-left corner felt empty, so I added a corner brace (for real) to give it a stronger sense of boundaries!

<img src="https://files.seeusercontent.com/2026/10/08/Mpd2/pasted-image-1791496616095.webp" alt="pasted-image-1791496616095.webp" title="pasted-image-1791496616095.webp " style="zoom: 33%; display: block; margin: 0px auto;">

It looked strange, and none of it felt connected at all, did it?!

In that four-minute crash course, the uploader mentioned a theory of visual flow. In other words, people's attention is first captured by the most prominent element, after which their gaze gradually sweeps across the page along with the content. This means that we need to create some continuity in the content so visitors can comfortably browse the entire website.

Should I adjust the positions a little, then?

<img src="https://files.seeusercontent.com/2026/10/08/kk9L/pasted-image-1791496902690.webp" alt="pasted-image-1791496902690.webp" title="pasted-image-1791496902690.webp" style="zoom: 33%; display: block; margin: 0px auto;">

Placing the social links below the profile picture should feel more intuitive. Beneath that, I added a brief introduction. This was essential: visitors needed to know whose website they were looking at.

Below the introduction, I used the footnote and ICP registration box to create the lower boundary.

Then came the feature modules. Since this was a homepage, it naturally needed navigation leading to other content.

<img src="https://files.seeusercontent.com/2026/10/08/u5Fj/pasted-image-1791497256787.webp" title="pasted-image-1791497178528.webp" style="zoom: 33%; display: block; margin: 0px auto;">

Done!

At least it looked pretty good!

This way, visitors would first notice the big “ClovertaTheTrilobita” and the only colorful, eye-catching profile picture. Their gaze would then naturally move downward along the profile picture, notice the introduction, gain a basic understanding, and finally turn to the left and discover the navigation menu.

Alternatively, their eyes could follow the prominent black text from the profile picture, through the nickname, to the menu, and finally arrive at the faintest element: the introduction.

The empty space in the middle could be reserved for interactive elements.

<img src="https://files.seeusercontent.com/2026/10/08/0kBt/pasted-image-1791497576419.webp" alt="pasted-image-1791497576419.webp" title="pasted-image-1791497576419.webp" style="zoom:20%;  display: block; margin: 0 auto;">

Now the only—and most troublesome—problem was...

I had no idea what I should put in the “About Me” section. (falls over)

Yes, I sat in front of my computer and racked my brain for more than an hour, only to come up with absolutely nothing...
