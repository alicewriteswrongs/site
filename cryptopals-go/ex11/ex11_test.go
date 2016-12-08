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
	for i := 0; i < 10; i++ {
		m[string(randomAESKey())]++
	}

	for _, v := range m {
		if v != 1 {
			t.Error("DUPLICATE!")
		}
	}
}

const key = "YELLOW SUBMARINE"
const plaintext = "YELLOW SUBMARINE"

var letterRunes = []rune("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ")

func RandString(n int) string {
	b := make([]rune, n)
	for i := range b {
		b[i] = letterRunes[rand.Intn(len(letterRunes))]
	}
	return string(b)
}

func TestAESCBCEncrypt(t *testing.T) {
	// we'll use our (previously verified) DecryptAESCBC
	// function from exercise 10 to test this function

	for i := 0; i < 200; i++ {
		plaintext := RandString(i)
		iv := randomBytes(aes.BlockSize)
		ciphertext := aes_cbc_encrypt([]byte(key), iv, []byte(plaintext))
		decrypted := ex10.DecryptAESCBC(ciphertext, key, iv)
		if plaintext != string(decrypted) {
			t.Error("Bad, they should be equal!")
		}
	}
}

func TestAESECBEncrypt(t *testing.T) {
	// we should be able to use the decryption function we wrote in
	// exercise 07 here, to test our encryption function.
	ciphertext := aes_ecb_encrypt([]byte(key), []byte(plaintext))

	decrypted := ex07.DecryptAESECB(ciphertext, key)

	if plaintext != string(decrypted) {
		t.Error("They should be equal oh noooo")
	}
}
