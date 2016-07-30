package ex09

import (
	"fmt"
	"reflect"
	"testing"
)

type padTest struct {
	message     []byte
	blocksize   int
	expectation []byte
}

var paddingTestCases = []padTest{
	{
		[]byte("YELLOW SUBMARINE"),
		20,
		[]byte{'Y', 'E', 'L', 'L', 'O', 'W', ' ', 'S', 'U', 'B', 'M', 'A', 'R', 'I', 'N', 'E', 4, 4, 4, 4},
	},
	{
		[]byte("YELLOW SUBMARINE"),
		16,
		[]byte("YELLOW SUBMARINE"),
	},
}

func TestPadPKCS7(t *testing.T) {
	for _, testCase := range paddingTestCases {
		padded := PadPKCS7(testCase.message, testCase.blocksize)
		if !reflect.DeepEqual(padded, testCase.expectation) {
			fmt.Println(padded)
			fmt.Println(testCase.expectation)
			t.Error("whoops")
		}
	}
}
