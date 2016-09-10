/*
---
title: "Exercise 11"
key: "ex11"
---

# Exercise 11: Writing a CBC/ECB Oracle

For this exercise we want to write an oracle. Fun! This is basically a
program which will detect whether a ciphertext has been encrypted using
CBC or ECB mode. This should be a bit tricky!
*/

package ex11

import "math/rand"

/*
First we'll need a function to generate a random AES key, or, a function
that generates 16 random bytes:
*/

func randomAESKey() (key []byte) {
	key = make([]byte, 16)
	rand.Read(key)
	return
}

/*
That was pretty straightforward!
*/
