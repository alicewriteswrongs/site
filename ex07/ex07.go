/*
---
title: "Exercise 6"
key: "ex06"
---

# Exercise 7

Here we want to decrypt the Base64 encoded contents of a file which has been
encrypted with AES-128 in [ECB (electronic code
book)](https://en.wikipedia.org/wiki/Block_cipher_mode_of_operation) mode. Should be
fun!

First, let's write a utility function to read in the data:
*/

package ex07

import (
	"encoding/base64"
	"io/ioutil"
)

func readExerciseInput() []byte {
	lines, _ := ioutil.ReadFile("./ex07.txt")
	decoded, _ := base64.StdEncoding.DecodeString(string(lines))
	return decoded
}
