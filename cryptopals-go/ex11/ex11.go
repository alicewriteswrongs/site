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
	"fmt"
	"math/rand"
	"time"
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

func AESCBCEncrypt(key []byte, iv []byte, plaintext []byte) []byte {
	block, err := aes.NewCipher(key)

	if err != nil {
		panic(err)
	}

	ciphertext := make([]byte, len(plaintext))

	mode := cipher.NewCBCEncrypter(block, iv)
	mode.CryptBlocks(ciphertext, plaintext)

	return ciphertext
}

func AESECBEncrypt(key []byte, plaintext []byte) []byte {
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

/*
So now we have two functions which encapsulate AES ECB and CBC encryption
for us nicely, so that we just pass in a key and plaintext (and an IV for CBC)
and then we get back a ciphertext.

The CryptoPals question says that next we should write a function that takes in
a plaintext, pads it on both sides with 5-10 random bytes, and then chooses a
block cipher mode and encrypts under it:
*/

func encryptionOracle(plaintext []byte) {
	rand.Seed(time.Now().UTC().UnixNano())
	prepad := randomBytes(rand.Intn(5) + 5)
	postpad := randomBytes(rand.Intn(5) + 5)

	plaintext = append(prepad, plaintext...)
	plaintext = append(plaintext, postpad...)

	fmt.Println(plaintext)
}
