---
layout: post
title: Day Four at RC (friday!)
date: 2015-05-30T00:29:01-04:00
tags:
    - GnuPG
    - recurse center
    - nyc
    - git
    - privacy
---

I'm now done with the first week at RC, and I think to celebrate I'll
write a blog post that is actually substantial!

This morning I rode in. I'm sort of amazed by the traffic here - everyone
just seems sort of used to this crazy situation. At least people are calm
about it, in Boston you'd think that people had never waited in traffic or
for a red light before.

Today I resubmitted task 01 of the Eudyptula challenge. I think I posted
before that I got the kernel module working (pretty quickly, actually, it
only took an hour or so) but I got tripped up on the Makefile. I have to
admit, first off, that I've never really bothered to learn about make
'from the ground up', mainly because the manual is COLOSSAL and a couple
simple template Makefiles seem to serve well enough. 

The challenge basically wanted a Makefile that could be compiled against
the source for the currently running kernel or against an arbitrary
kernel. I think I gave it what it wanted? Little takes a while to reply,
so we'll see.

I worked more on my git printer. I still feel like I'm just fighting with
C to get it to do what I want, but I got another feature working! I can
now get the hash of all the parents of a given commit. Along with getting
the top commit (the commit referenced in .git/refs/heads/master, usually)
I think I'm getting close to finishing that up. Which is exciting! I need
to think pretty carefully about the best way to print stuff out, though,
which I'm going to hopefully do this weekend.

I also visited the [Bluestockings](http://bluestockings.com/) bookstore,
which is just a couple of blocks from RC. I bought a Delaney novel,
a patch, and a sticker with Zapatistas on it. Good stuff!

I spent some more time working on the Matasano stuff - I'm a little
embarrassed I'm still on the first problem, but I feel like this has
mostly to do with my decision to do the problems in C...

I need to use a language that's easier for me! I think for these problems
going forward I'll stick to Python.

After leaving RC for the day I biked up towards Central Park to see
a great [talk about
GnuPG](http://www.meetup.com/nylug-meetings/events/221826531/) put on by
the NYC GNU/Linux users group. I learned a lot about the current state of
GPG, what's being worked on and planned for the future, and some practical
stuff about key signing, storing and sharing keys, and some fancy stuff
one can do with a GPG key. It's good also to put some of criticism of
GPG/OpenPGP in context - dkg made the point repeatedly that although the
adoption of GPG for email encryption is low (like really really low) GPG
is a critical piece of the software distribution infrastructure, and so
calls to toss is out in favor of a more modern system may be premature.

That said, obviously if the goal is to increase the use of secure email
the UX needs to be streamlined. This is something that really hit home for
me when I was making my [GPG
Zine](https://github.com/aliceriot/PocketGuide) and had to explain things
in so much detail. This is part of the reason why I'm so excited about
projects like [Keybase.io](https://keybase.io/), if this can be integrated
into reasonably friendly interfaces like Enigmail we're most of the way
there! Well, as long as we can convince everyone to use Thunderbird...
