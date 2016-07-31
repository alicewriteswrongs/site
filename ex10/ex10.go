/*
---
title: "Exercise 10"
key: "ex10"
---

# Exercise 10: Implementing CBC

For this exercise we're being asked to implement CBC mode. CBC is a slightly
more complicated block cipher mode than what we've seen before - basically what
we do is XOR each block with the previous block after decryption. Here's an idea
of what that looks like:

![](https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/CBC_decryption.svg/601px-CBC_decryption.svg.png)

Basically, we use XOR to combine each block with the previous block. For the
first block we strt with a special value called the initialization vector (IV).
This is a more secure cipher mode than ECB, because the chaining means that repeated
blocks in the plaintext do not have the same value in the ciphertext.

# Solution

How do we actually want to solve this? In exercise 7 we implemented AES-128 decryption
in ECB mode. CBC mode is essentially ECB mode with some extra sauce on top. In fact,
we can take our whole ciphertext, run ECB decryption on it, and then just loop through
XOR each byte with it's corresponding byte (either in the previous block or in the IV).
Nice! The standard library for Go also implements AES-CBC so we should be able to check
our answer pretty easily.

*/

package ex10

import (
	"encoding/base64"
	"io/ioutil"

	"../ex07"
)

/*
First, let's make sure we've got a little function to get the ciphertext for the
problem:
*/

func readExerciseInput() []byte {
	lines, _ := ioutil.ReadFile("./ex10.txt")
	cipherText, _ := base64.StdEncoding.DecodeString(string(lines))
	return cipherText
}

/*
Then let's write a function that takes a ciphertext, a key, and an IV and
decrypts a message encrypted with AES-CBC. What we're going to want to do
is iterate through \\(d\\), the decrypted bytes, and:

\\[ \forall n \in \\\{0..len(d) \\\} \\]
*/

func decryptAESCBC(ciphertext []byte, key string, iv []byte) []byte {
	buffer := ex07.DecryptAESECB(ciphertext, key)
	out := make([]byte, len(buffer))
	for i := range buffer {
		if i < 16 {
			out[i] = buffer[i] ^ iv[i]
		} else {
			out[i] = buffer[i] ^ ciphertext[i-16]
		}
	}
	return out
}

const key = "YELLOW SUBMARINE"

var iv = []byte{0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0}
