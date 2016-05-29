/*
---
title: "Exercise 4"
key: "ex05"
---

# Exercise 5

This [exercise](http://cryptopals.com/sets/1/challenges/5) asks us to implement
a simple cryptosystem: repeating-key XOR, which is similar to the Vigenere cipher.

For repeating-key XOR we are going to end up sequentially XORing each byte of
key with each byte of the plaintext, so that the first byte of the plaintext will
be XORed against the first of the key, the 2nd with the 2nd, and so on. Our key is only
3 bytes long however, so in general we'll have:

\\[ C[i] = k[i\ mod\ len(k)]\ XOR\ P[i] \\]

where \\(P\\) is our plaintext, \\(k\\) is our key, and \\(C\\) is our ciphertext.
The key we're going to be using is `ICE`, and the plaintext is:

```
Burning 'em, if you ain't quick and nimble
I go crazy when I hear a cymbal
```

Anyway, turns out this one isn't too complicated. Here we go!
*/

package main

import (
	"encoding/hex"
	"fmt"
)

func main() {
	plaintext := []byte("Burning 'em, if you ain't quick and nimble\nI go crazy when I hear a cymbal")
	key := []byte("ICE")
	out := make([]byte, len(plaintext))

	for i, v := range plaintext {
		out[i] = v ^ key[i%len(key)]
	}

	expected := "0b3637272a2b2e63622c2e69692a23693a2a3c6324202d623d63343c2a26226324272765272a282b2f20430a652e2c652a3124333a653e2b2027630c692b20283165286326302e27282f"

	if expected == hex.EncodeToString(out) {
		fmt.Println("it worked!")
	} else {
		fmt.Println("it didn't work :(")
	}
}

/*
Cool! we just iterate through our plaintext, and we can use the index of each byte
thereof to determine which byte of the key to XOR it with. Then, we simply encode the
`[]byte` slice to a hex string, and check for equality with the correct answer.
*/
