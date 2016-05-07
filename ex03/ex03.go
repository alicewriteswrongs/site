/*
---
layout: matasano_exercise
title: "Exercise 1"
---

# Exercise 3

[Matasano exercise 3](http://cryptopals.com/sets/1/challenges/3/). This asks
us to break a single byte XOR. Basically, this means that we have a
ciphertext which has been XORed against a single byte. This means we
can exhaustively try every byte until we get it.
*/

package main

import (
	"encoding/hex"
	"fmt"
)

/*
First off, something we're almost certainly going to need is a function
that takes a byte slice and a byte, and XORs the contents of that byte slice
with that byte.

We'll call it `arrayXOR`:
*/

func arrayXOR(in, out []byte, n byte) {
	for i, v := range in {
		out[i] = v ^ n
	}
}

/*
Then if we want to XOR a particular byte, say, 42, with a byte array we can
just do `xorResult := arrayXOR(in, out, byte(42))`. Nice!

Next we'll need a function that takes a string and returns a count
of the occurences of each letter.
We can use a byte -> int map to keep track.
*/

func charCount(bytes []byte, counts map[byte]int) {
	for _, c := range bytes {
		counts[c]++
	}
}

/*
## Doing the work

now that we've written all of the functions we'll need, we can go ahead
and solve the problem!

First, declare the ciphertext
*/

func main() {
	const cipherText = "1b37373331363f78151b7f2b783431333d78397828372d363c78373e783a393b3736"
	cipherBytes, _ := hex.DecodeString(cipherText)

	counts := make(map[byte]int)
	charCount(cipherBytes, counts)

	out := make([]byte, len(cipherBytes))
	arrayXOR(cipherBytes, out, byte(42))
	fmt.Println(out)
}
