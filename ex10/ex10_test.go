package ex10

import (
	"fmt"
	"testing"
)

func TestExerciseInput(t *testing.T) {
	input := readExerciseInput()
	if input == nil {
		t.Error("oh no...")
	}
}

func TestAESCBCDecryption(t *testing.T) {
	input := readExerciseInput()
	plaintext := decryptAESCBC(input, key, iv)
	fmt.Println(string(plaintext))
}
