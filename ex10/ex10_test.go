package ex10

import (
	"bytes"
	"crypto/aes"
	"crypto/cipher"
	"testing"
)

func TestExerciseInput(t *testing.T) {
	input := readExerciseInput()
	if input == nil {
		t.Error("oh no...")
	}
}

func TestAESCBCDecryption(t *testing.T) {
	ciphertext := readExerciseInput()
	ourPlaintext := decryptAESCBC(ciphertext, key, iv)

	// test that the decryption is correct

	block, _ := aes.NewCipher([]byte(key))
	mode := cipher.NewCBCDecrypter(block, iv)
	stdlibPlaintext := make([]byte, len(ciphertext))
	mode.CryptBlocks(stdlibPlaintext, ciphertext)

	if !bytes.Equal(stdlibPlaintext, ourPlaintext) {
		t.Error("we didn't do something quite right")
	}
}

func TestSolution(t *testing.T) {
	solution()
}
