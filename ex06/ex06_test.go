package main

import (
	"fmt"
	"testing"
)

// bitCount
func TestBitcountOne(t *testing.T) {
	bc := bitCount(1)
	if bc != 1 {
		t.Error("expected 1 for 1, got", bc)
	}
}

func TestBitcountTwo(t *testing.T) {
	bc := bitCount(2)
	if bc != 1 {
		t.Error("expected 1 for 2, got", bc)
	}
}

func TestBitcountThree(t *testing.T) {
	bc := bitCount(52)
	if bc != 3 {
		t.Error("expected 3 for 52, got", bc)
	}
}

func TestBitcountFour(t *testing.T) {
	bc := bitCount(255)
	if bc != 8 {
		t.Error("expected 8 for 255, got", bc)
	}
}

// hamming distance
func TestHammingDistanceOne(t *testing.T) {
	distance := hamming([]byte("foo"), []byte("bar"))
	if distance != 8 {
		t.Error("expected 8, got", distance)
	}
}

func TestHammingDistanceTwo(t *testing.T) {
	distance := hamming([]byte("foo"), []byte("foo"))
	if distance != 0 {
		t.Error("expected 0, got", distance)
	}
}

func TestHammingDistanceThree(t *testing.T) {
	distance := hamming([]byte("fizzbuzz"), []byte("fozzbozz"))
	if distance != 5 {
		t.Error("expected 5, got", distance)
	}
}

// chunks
func byteSliceEquality(b1 [][]byte, b2 [][]byte) bool {
	if len(b1) != len(b2) {
		fmt.Println("asdf")
		return false
	}
	for i := range b1 {
		if len(b1[i]) != len(b2[i]) {
			return false
		}
		for j := range b1[i] {
			if b1[i][j] != b2[i][j] {
				return false
			}
		}
	}
	return true
}

func TestChunkOne(t *testing.T) {
	slices := [][]byte{
		[]byte("foo"),
		[]byte("bar"),
	}
	if !byteSliceEquality(chunks(3, []byte("foobar")), slices) {
		t.Error("expected the other thing :(", slices)
	}
}

func TestChunkTwo(t *testing.T) {
	slices := [][]byte{
		[]byte("fo"),
		[]byte("ob"),
		[]byte("ar"),
	}
	if !byteSliceEquality(chunks(2, []byte("foobar")), slices) {
		t.Error("expected something else! oops", slices)
	}
}
