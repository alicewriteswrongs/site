/*
---
title: "Exercise 7"
key: "ex07"
---

# Exercise 7

Here we want to decrypt the Base64 encoded contents of a file which has been
encrypted with AES-128 in [ECB (electronic code
book)](https://en.wikipedia.org/wiki/Block_cipher_mode_of_operation) mode. Should be
fun!
*/

package ex07

import (
	"crypto/aes"
	"encoding/base64"
	"fmt"
	"io/ioutil"
)

/*
First, let's write a utility function to read in the data:
*/

func readExerciseInput() []byte {
	lines, _ := ioutil.ReadFile("./ex07.txt")
	cipherText, _ := base64.StdEncoding.DecodeString(string(lines))
	return cipherText
}

/*
Now what we want is to decrypt the contents of the file! Go has, of course,
some nice stuff in the standard library that makes that fairly easy.

We'll be decrypting under a particular key:
*/

const key = "YELLOW SUBMARINE"

/*
Let's write a little function that takes a ciphertext and a key, and
returns the decrypted plaintext.

This is a little wacky overall, because Go doesn't have official support for
ECB mode in the AES implementation in the standard library. Still, ECB is
the simplest block cipher mode, and it's not that hard to get it working ourselves.

We take in our ciphertext (a byte slice) and
a key. Then basically all we need to do is create an AES cipher, and then
move blockwise through the ciphertext, decrypting as we go, and collecting our
results in another byte slice.
*/

func DecryptAESECB(ciphertext []byte, key string) []byte {
	cipher, _ := aes.NewCipher([]byte(key))
	bs := cipher.BlockSize()
	plaintext := []byte{}
	buffer := make([]byte, bs)
	for i := 0; i < len(ciphertext)/bs; i++ {
		start := i * bs
		end := start + bs
		cipher.Decrypt(buffer, ciphertext[start:end])
		plaintext = append(plaintext, buffer...)
	}
	return plaintext
}

/*
Then just print everything!
*/

func solution() {
	cipherText := readExerciseInput()
	plainText := DecryptAESECB(cipherText, key)
	fmt.Println(string(plainText))
}
