package ex11

import (
	"crypto/aes"
	"math/rand"
	"testing"

	"../ex07"
	"../ex10"
)

func TestRandomAESKey(t *testing.T) {
	m := make(map[string]int)
	for i := 0; i < 100; i++ {
		m[string(randomAESKey())]++
	}

	for _, v := range m {
		if v != 1 {
			t.Error("DUPLICATE!")
		}
	}
}

var letterRunes = []rune("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ")

func RandString(n int) string {
	b := make([]rune, n)
	for i := range b {
		b[i] = letterRunes[rand.Intn(len(letterRunes))]
	}
	return string(b)
}

func TestAESCBCEncrypt(t *testing.T) {
	for i := 0; i < 200; i++ {
		plaintext := RandString(i * aes.BlockSize)
		iv := randomBytes(aes.BlockSize)
		key := randomAESKey()
		ciphertext := AESCBCEncrypt([]byte(key), iv, []byte(plaintext))
		decrypted := ex10.DecryptAESCBC(ciphertext, string(key), iv)
		if plaintext != string(decrypted) {
			t.Error("Bad, they should be equal!")
		}
	}
}

func TestAESECBEncrypt(t *testing.T) {
	// we should be able to use the decryption function we wrote in
	// exercise 07 here, to test our encryption function.
	for i := 0; i < 200; i++ {
		plaintext := RandString(i * aes.BlockSize)
		key := randomAESKey()
		ciphertext := AESECBEncrypt([]byte(key), []byte(plaintext))
		decrypted := ex07.DecryptAESECB(ciphertext, string(key))
		if plaintext != string(decrypted) {
			t.Error("They should be equal oh noooo")
		}
	}
}
