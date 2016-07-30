package ex08

import "testing"

func TestExerciseInput(t *testing.T) {
	bytes := readExerciseInput()
	if bytes == nil {
		t.Error("didn't read correctly!")
	}
}

func TestSolution(t *testing.T) {
	findECBString()
}
