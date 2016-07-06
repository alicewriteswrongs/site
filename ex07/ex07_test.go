package ex07

import "testing"

func TestExerciseInput(t *testing.T) {
	bytes := readExerciseInput()
	if bytes == nil {
		t.Error("uh oh, input is nil")
	}
}
