/*
---
title: "Exercise 6"
key: "ex06"
---

# Exercise 6

This problem is a little more involved than what we've dealt with so far.
We're presented with a base64 encoded ciphertext, and we're tasked with
breaking the encryption and finidng the plaintext. The ciphertext has been
encrypted using repeating-key XOR, the same cryptosystem we implemented in our
last exercise.

There's a number of things we need to take care of in order to solve the problem,
let's just start running through it!
*/

package main

import (
	"bufio"
	"os"
)

/*
## Keysize

The first thing we'll need to figure out it is the correct `keysize`, defined as
the length of the `[]byte` serving as our key. We have in narrowed down somewhat by
the question text, which tells us we only have to worry about keys with lengths
ranging from 2 to 40.

We'll need one thing before we can get started:

### Hamming distance

The Hamming distance of two `ASCII` strings is defined as the number of bits
at which those two strings differ. We'll need to calculate this metric when we're
trying to figure out the correct keysize.

First, though, here's a little function that takes a byte and returns a count of
the ones in it's binary representation:
*/

func isolateByte(b byte, i int) byte {
	return b<<8 - i>>7

}

func bitCount(b byte) int {
	count := 0
	for i := 0; i < 8; i++ {
	}
}

func hamming(s1 string, s2 string) int {
}

func main() {
	f, _ := os.Open("./ex06.txt")

	ciphertext := []byte{}

	input := bufio.NewScanner(f)
	for input.Scan() {

	}

}
