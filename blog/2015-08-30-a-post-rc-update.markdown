---
layout: post
title: A post-RC update
date: 2015-08-30T16:16:56-04:00
---

Well, my batch at RC ended a little over two weeks ago. It was a really
great experience, filled with a lot of wonderful people. I wrote a whole
mess of code, and advanced a lot as a programmer during my summer in NYC.

I was worried, however, that after leaving RC I wouldn't keep the momentum
I had built, or that I wouldn't keep writing code for fun. Since tomorrow
I'll be starting my first programming job (woo job!) and my free
programming time will, accordingly, probaby drop off a bit, I thought
I would list off the things I've done since leaving RC.

This is mostly to make me feel like I'm getting more out of my time.
Anyway!

1) [Diffie-Hellman
example](https://github.com/aliceriot/crypto_primitives/tree/master/diffie-hellman):
I wrote a little Python library to calculate a DH shared secret, and then
wrote a little program that uses it to simulate Alice encrypting a message
(using repeating-key XOR) and then sending it to Bob, who can decrypt it
with their shared secret.

It's not intended to be secure in any way, but rather used as a little
demonstration to explain better how DH works.

Diffie-Hellman is super super cool! And it's actually very easy to
understand how it works (or, at least, it's easy to understand how it is
guaranteed to produce the same secret on both ends).

2) My new job is at a Ruby shop, so I've been reading a book known as the
[pickaxe](https://pragprog.com/book/ruby/programming-ruby), which is
interesting so far. I'm excited to get more in depth with Ruby. So far
it's *close enough* to Python that I don't feel too weird, but it has some
nifty or strange things (like `do` blocks, methods like `5.upto(10)`,
instance attribute access control, the `end` keyword) which are keeping it
interesting.

3) [Matasano challenges](https://github.com/aliceriot/CryptoPals): today
I finished the first set! Hooray! The first set is exercises 1-8.
I originally started doing these in C, and for exercise 4 I switched to
Python (which was so much easier omg).

I've learned a bunch about dealing with binary data in Python, about
repeating-key XOR (an ECB block cipher with a bytearray), about how to
break simple cryptosystems (like repeating-key XOR, which is really the
[Vigenere cipher](https://en.wikipedia.org/wiki/Vigen%C3%A8re_cipher)),
and a bit about AES.

Exercise 06 was probably the most challenging. We get a file which has
been encrypted using repeating-key XOR, but we do not know how long the
keysize is. So we have to 1) figure out the keysize and 2) figure out each
byte of the key. It was a fun challenge! This one was a lot of fun, and
I plan to write up my solution as a separate blog post soon-ish.

Exercise 07 and 08 gave a taste of the next section, which is about block
ciphers. Hopefully I'll have some time to start working through set 02
next week.

That's about it! It's been great to be back in Boston, and while I'm
excited to be working I wish I could just write silly programs to mess
around with crypto all day. Someday, grad school...
