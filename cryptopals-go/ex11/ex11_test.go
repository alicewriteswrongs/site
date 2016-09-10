package ex11

import "testing"

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
