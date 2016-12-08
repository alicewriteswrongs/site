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

import (
	"crypto/aes"
	"crypto/cipher"
	"math/rand"
)

/*
First we'll need a function to generate a random AES key, or, a function
that generates 16 random bytes:
*/

func randomBytes(n int) (bytes []byte) {
	bytes = make([]byte, n)
	rand.Read(bytes)
	return
}

func randomAESKey() (key []byte) {
	key = randomBytes(16)
	return
}

/*
That was pretty straightforward! Now we can generate a fresh random key whenever
we want to do so. Now, basically what we want to accomplish is that we want to
implement a function which will take some input and encrypt it, randomly choosing
whether to use AES-ECB or AES-CBC.

First, helper functions to do each of the different modes:
*/

func aes_cbc_encrypt(key []byte, iv []byte, plaintext []byte) []byte {
	block, err := aes.NewCipher(key)

	if err != nil {
		panic(err)
	}

	ciphertext := make([]byte, len(plaintext))

	mode := cipher.NewCBCEncrypter(block, iv)
	mode.CryptBlocks(ciphertext, plaintext)

	return ciphertext
}

func aes_ecb_encrypt(key []byte, plaintext []byte) []byte {
	cipher, _ := aes.NewCipher([]byte(key))

	bs := cipher.BlockSize()

	buffer := make([]byte, bs)

	ciphertext := []byte{}

	for i := 0; i < len(plaintext)/bs; i++ {
		start := i * bs
		end := start + bs
		cipher.Encrypt(buffer, plaintext[start:end])
		ciphertext = append(ciphertext, buffer...)
	}
	return ciphertext
}
