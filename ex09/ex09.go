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

How does the padding scheme work? Basically we're going to add \\(n\\) bytes having
the value \\(n\\) to the end of the message, where:

\\[n = k - (l\ mod\ k) \\]

where \\(k\\) is the block size and \\(l\\) is the initial length of the input.
So basically if \\(l \ mod \ k \\) is \\(2\\) we're going to add 2 bytes with
the value `0x02` to the end of the input, which will give us a total length
of \\(x * k\\), where \\( x \in \mathbb{N}\\). The means that we can also identity
which bytes are padding and which are message, since if we look at the end of the
message and find two bytes with value `0x02` we can surmise that our message was
originally 2 bytes short of being an integer multiple of \\(k\\). Great! Let's get
going!
*/

package ex09

/*
Let's write a function that takes a `[]byte` and a block size and returns a
padded `[]byte`!
*/

func padPKCS7(msg []byte, k int) []byte {
	l := len(msg)
	n := k - (l % k)
	if n != k {
		out := make([]byte, l+n)
		copy(out, msg)
		for i := l; i < n+l; i++ {
			out[i] = byte(n)
		}
		return out
	}
	return msg
}
