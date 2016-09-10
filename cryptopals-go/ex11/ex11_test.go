package ex11

import (
	"fmt"
	"testing"
)

func TestRandomAESKey(t *testing.T) {
	for i := 0; i < 10; i++ {
		bytes := randomAESKey()
		fmt.Println(bytes)
	}
}
