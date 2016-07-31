package ex08

import "testing"

func TestExerciseInput(t *testing.T) {
	bytes := readExerciseInput()
	if bytes == nil {
		t.Error("didn't read correctly!")
	}
}

func TestfindECBString(t *testing.T) {
	strings := readExerciseInput()
	scores := findECBString(strings)
	if scores == nil {
		t.Error("oh no something is bad")
	}
}

func TestSolution(t *testing.T) {
	solveExercise()
}
