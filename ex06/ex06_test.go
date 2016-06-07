package main

import (
	"fmt"
	"testing"
)

// bitCount
type bitCountTestPair struct {
	value       byte
	expectation int
}

var bitCountTestPairs = []bitCountTestPair{
	{1, 1},
	{2, 1},
	{52, 3},
	{255, 8},
}

func TestBitcountOne(t *testing.T) {
	for _, pair := range bitCountTestPairs {
		bc := bitCount(pair.value)
		if bc != pair.expectation {
			t.Error(
				"For", pair.value,
				"expected", pair.expectation,
				"got", bc,
			)
		}
	}
}

// hamming distance
type hammingTestPair struct {
	s1          string
	s2          string
	expectation int
}

var hammingTestPairs = []hammingTestPair{
	{"foo", "bar", 8},
	{"foo", "foo", 0},
	{"fizzbuzz", "fozzbozz", 5},
}

func TestHammingDistance(t *testing.T) {
	for _, pair := range hammingTestPairs {
		dist := hamming([]byte(pair.s1), []byte(pair.s2))
		if dist != pair.expectation {
			t.Error(
				"For", pair.s1, pair.s2,
				"expected", pair.expectation,
				"got", dist,
			)
		}
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
