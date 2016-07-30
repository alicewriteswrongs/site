/*
---
title: "Exercise 9"
key: "ex09"
---

# Exercise 9: PKCS7 Padding

For this exercise we're going to implement a padding scheme referred to as PKCS\#7
padding. Basically this is a scheme that lets us pad the bytes in a message out to
an integer multiple of a given block size, so that if we have a cipher that takes
16 byte blocks but we have a 29 byte message we can pad it out to 32 bytes before
encrypting it.

The PKCS7 standard is an IETF RFC, which you can view [here](https://tools.ietf.org/html/rfc2315).

How does the padding scheme work? Basically we're going to the end of the message:

\\[k - (l\ mod \k \\]

bytes, where \\(k\\) is

*/

package ex09
